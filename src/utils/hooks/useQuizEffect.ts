"use client";

import { SelectChangeEvent } from "@mui/material";
import { QuestionType } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
  useWatch,
} from "react-hook-form";

import { Answer, Answers } from "../lib/@types";
import { CreateQuizType } from "../lib/validators/create-quiz-validator";

export const useQuizEffect = (
  watch: UseFormWatch<CreateQuizType>,
  numberQuiz: number,
  setValue: UseFormSetValue<CreateQuizType>,
  control: Control<CreateQuizType>,
  register: UseFormRegister<CreateQuizType>,
  getValues: UseFormGetValues<CreateQuizType>,
) => {
  const [rightAnswer, setRightAnswer] = useState<Answers>([]);
  const [rightMultipleAnswer, setMultipleRightAnswer] = useState<string[]>([]);
  const [_, rerender] = useState<string>("");

  const {
    fields: answerFields,
    append: answerAppend,
    remove: answerRemove,
  } = useFieldArray({ control, name: `questions.${numberQuiz}.answers` as const });

  useEffect(() => {
    const question = getValues(`questions.${numberQuiz}`);
    const answers = getValues(`questions.${numberQuiz}.answers`);
    if (question.type === QuestionType.Multiple_choice) {
      const newRightMultipleAnswer: string[] | undefined = answers?.reduce(
        (
          indexes: string[],
          answer: { text?: string; isCorrect?: boolean } | undefined,
          index: number,
        ) => {
          if (answer && answer.isCorrect) {
            return [...indexes, index.toString()];
          }
          return indexes;
        },
        [],
      );

      setMultipleRightAnswer(newRightMultipleAnswer);
    } else {
      setRightAnswer(answers as Answers);
    }
  }, []);

  const handleChangeSelectQuizType = (
    event: SelectChangeEvent<"Single_choice" | "Multiple_choice" | "True_or_false">,
  ) => {
    const selectedValue = event.target.value as
      | "Single_choice"
      | "Multiple_choice"
      | "True_or_false";
    setValue(`questions.${numberQuiz}.type`, selectedValue);

    handleRemoveAll();

    setRightAnswer([{ text: "", isCorrect: true }]);
    setMultipleRightAnswer(["0"]);
    switch (selectedValue) {
      case "Single_choice":
        answerAppend([
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
        ]);
        break;
      case "Multiple_choice":
        answerAppend([
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ]);
        break;
      case "True_or_false":
        answerAppend([
          { text: "true", isCorrect: true },
          { text: "false", isCorrect: false },
        ]);
        break;
      default:
        break;
    }
  };

  const handleRemoveAll = () => {
    const allIndexes = answerFields.map((_, index) => index);

    answerRemove(allIndexes);

    if (rightMultipleAnswer.length !== 0) {
      setMultipleRightAnswer([]);
    }
  };

  const handlerSelectRightAnswer = (event: SelectChangeEvent) => {
    const answers = getValues(`questions.${numberQuiz}.answers`);
    setRightAnswer(answers);
    rerender(event.target.value);
    answerFields.forEach((field, index) => {
      setValue(`questions.${numberQuiz}.answers.${index}.isCorrect`, index === +event.target.value);
    });
  };

  const handlerSelectMultipleRightAnswer = (
    event: SelectChangeEvent<typeof rightMultipleAnswer>,
  ) => {
    const {
      target: { value },
    } = event;
    setMultipleRightAnswer(typeof value === "string" ? value.split(",") : value);

    answerFields.forEach((field, index) => {
      setValue(
        `questions.${numberQuiz}.answers.${index}.isCorrect`,
        event.target.value.includes(index.toString()),
      );
    });
  };

  const selectValue = useWatch({
    control,
    name: `questions.${numberQuiz}.type`,
    defaultValue: "Single_choice",
  });

  const selectRightAnswerValue = rightAnswer?.findIndex(
    (value: Answer, index: number, obj: Answers) => value.isCorrect,
  );

  useEffect(() => {
    register(`questions.${numberQuiz}.type`);
  }, [register]);

  return {
    rightMultipleAnswer,
    answerFields,
    answerAppend,
    answerRemove,
    handlerSelectRightAnswer,
    handlerSelectMultipleRightAnswer,
    handleChangeSelectQuizType,
    selectValue,
    selectRightAnswerValue,
  };
};
