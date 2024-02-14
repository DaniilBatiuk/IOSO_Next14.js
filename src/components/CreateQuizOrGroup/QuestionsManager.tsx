"use client";

import { OneQuizCreate } from "..";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";

import styles from "@/styles/CreateQuiz.module.scss";

import { CreateQuizType } from "@/utils/lib/validators/create-quiz-validator";

type Prop = {
  control: Control<CreateQuizType>;
  register: UseFormRegister<CreateQuizType>;
  setValue: UseFormSetValue<CreateQuizType>;
  watch: UseFormWatch<CreateQuizType>;
  errors: FieldErrors<CreateQuizType>;
};

export const QuestionsManager: React.FC<Prop> = React.memo(
  ({ control, register, setValue, watch, errors }: Prop) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(false);
    }, []);

    const {
      fields: questionFields,
      append: questionAppend,
      remove: questionRemove,
    } = useFieldArray({ control, name: "questions" });

    if (isLoading) {
      return (
        <div className={styles.right__loading}>
          <Skeleton variant="rectangular" height={500} />
        </div>
      );
    } else {
      return (
        <div className={styles.right}>
          <div className={`${styles.form}`}>
            <div className={`${styles.form__question__list}`}>
              {questionFields.map((field, index) => (
                <React.Fragment key={field.id}>
                  <OneQuizCreate
                    numberQuiz={index}
                    remove={questionRemove}
                    control={control}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                  />
                </React.Fragment>
              ))}
            </div>
            <div className="modal__button-div">
              <button
                className={styles.button__create}
                type="button"
                onClick={() =>
                  questionAppend({
                    text: "",
                    type: "Single_choice",
                    answers: [
                      { text: "", isCorrect: true },
                      { text: "", isCorrect: false },
                    ],
                  })
                }
              >
                Add question
              </button>
            </div>
          </div>
        </div>
      );
    }
  },
);
