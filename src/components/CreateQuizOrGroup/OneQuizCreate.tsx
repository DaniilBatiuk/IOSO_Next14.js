"use client";

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import {
  Control,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/CreateQuiz.module.scss";

import { CreateQuizType } from "@/utils/lib/validators/create-quiz-validator";

import { useQuizEffect } from "@/utils/hooks";

type OneQuizCreateProp = {
  numberQuiz: number;
  remove: UseFieldArrayRemove;
  control: Control<CreateQuizType>;
  register: UseFormRegister<CreateQuizType>;
  setValue: UseFormSetValue<CreateQuizType>;
  watch: UseFormWatch<CreateQuizType>;
  errors: FieldErrors<CreateQuizType>;
};

export const OneQuizCreate = React.memo(
  ({ numberQuiz, remove, register, setValue, watch, errors, control }: OneQuizCreateProp) => {
    const {
      rightMultipleAnswer,
      answerFields,
      answerAppend,
      answerRemove,
      handlerSelectRightAnswer,
      handlerSelectMultipleRightAnswer,
      handleChangeSelectQuizType,
      selectValue,
      selectRightAnswerValue,
    } = useQuizEffect(watch, numberQuiz, setValue, control, register);

    return (
      <div className={styles.form__list__item}>
        <div className={styles.right__subtitle__number}>{`${numberQuiz + 1}`}</div>
        {numberQuiz >= 1 && (
          <div className={styles.close}>{ICONS.close({ onClick: () => remove(numberQuiz) })}</div>
        )}
        <div className={styles.right__subtitle}>{`Question type`}</div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
          <InputLabel>Select question type</InputLabel>
          <Select value={selectValue} onChange={handleChangeSelectQuizType}>
            <MenuItem value={"Single_choice"}>Single choice</MenuItem>
            <MenuItem value={"Multiple_choice"}>Multiple choice</MenuItem>
            <MenuItem value={"True_or_false"}>True or False</MenuItem>
          </Select>
        </FormControl>
        <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Question</div>
        <TextField
          fullWidth
          error={Boolean(errors?.questions?.[numberQuiz]?.text?.message)}
          label={errors?.questions?.[numberQuiz]?.text?.message || "Insert question"}
          variant="standard"
          {...register(`questions.${numberQuiz}.text`)}
        />
        {selectValue === "Single_choice" ? (
          <>
            <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Answers</div>
            <div className={`${styles.form__answers}`}>
              {answerFields.map((field, index) => (
                <div key={field.id} className={`${styles.form__answers__div}`}>
                  <TextField
                    fullWidth
                    error={Boolean(
                      errors?.questions?.[numberQuiz]?.answers?.[index]?.text?.message,
                    )}
                    label={
                      errors?.questions?.[numberQuiz]?.answers?.[index]?.text?.message ||
                      `Insert answer ${index + 1}`
                    }
                    {...register(`questions.${numberQuiz}.answers.${index}.text` as const)}
                    variant="standard"
                  />
                  {index > 1 && ICONS.close({ onClick: () => answerRemove(index) })}
                </div>
              ))}
            </div>

            <div>
              <button
                className={styles.button__create}
                type="button"
                onClick={() => answerAppend({ text: "", isCorrect: false })}
              >
                Add Answer
              </button>
            </div>

            <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Right Answer</div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
              <InputLabel>Select right answer</InputLabel>
              <Select
                value={selectRightAnswerValue === -1 ? "" : String(selectRightAnswerValue)}
                onChange={handlerSelectRightAnswer}
              >
                {answerFields.map((answer, index) => (
                  <MenuItem value={index} key={answer.id}>
                    {`${index + 1}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        ) : selectValue === "Multiple_choice" ? (
          <>
            <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Answers</div>
            {answerFields.map((field, index) => (
              <div key={field.id} className={`${styles.form__answers__div}`}>
                <TextField
                  error={Boolean(errors?.questions?.[numberQuiz]?.answers?.[index]?.text?.message)}
                  label={
                    errors?.questions?.[numberQuiz]?.answers?.[index]?.text?.message ||
                    `Insert answer ${index + 1}`
                  }
                  {...register(`questions.${numberQuiz}.answers.${index}.text`)}
                  fullWidth
                  variant="standard"
                />
                {index > 2 && ICONS.close({ onClick: () => answerRemove(index) })}
              </div>
            ))}

            <div>
              <button
                className={styles.button__create}
                type="button"
                onClick={() => answerAppend({ text: "", isCorrect: false })}
              >
                Add answer
              </button>
            </div>

            <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Right Answer</div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
              <InputLabel>Select right answer</InputLabel>
              <Select
                multiple
                value={rightMultipleAnswer}
                onChange={handlerSelectMultipleRightAnswer}
                input={<OutlinedInput label="Tag" />}
                renderValue={selected => selected.map(index => `${+index + 1}`).join(", ")}
                sx={{
                  "& .MuiSelect-multiple": {
                    paddingBottom: "5px",
                  },
                }}
              >
                {answerFields.map((answer, index) => (
                  <MenuItem value={`${index}`} key={answer.id}>
                    <Checkbox
                      sx={{
                        color: "white",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                      checked={rightMultipleAnswer.includes(`${index}`)}
                    />
                    <ListItemText primary={index + 1} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        ) : selectValue === "True_or_false" ? (
          <>
            <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Right Answer</div>

            <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
              <InputLabel>Select right answer</InputLabel>
              <Select
                value={selectRightAnswerValue === -1 ? "" : selectRightAnswerValue.toString()}
                onChange={handlerSelectRightAnswer}
              >
                <MenuItem value={0}>True</MenuItem>
                <MenuItem value={1}>False</MenuItem>
              </Select>
            </FormControl>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  },
);
