import styles from "@/styles/CreateQuiz.module.scss";
import { ICONS } from "@/utils/config/icons";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { UseFieldArrayRemove, useFieldArray } from "react-hook-form";

type OneQuizCreateProp = {
  control: any;
  numberQuiz: number;
  remove: UseFieldArrayRemove;
  key: string;
  register: any;
};

const OneQuizCreate = ({ control, numberQuiz, remove, key, register }: OneQuizCreateProp) => {
  const [questionType, setQuestionType] = useState<string>("");
  const [rightAnswer, setRightAnswer] = useState<string>("");
  const [rightMultipleAnswer, setMultipleRightAnswer] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value);
    setRightAnswer("");
  };
  const handleChange2 = (event: SelectChangeEvent) => {
    setRightAnswer(event.target.value);
  };

  const handleChange3 = (event: SelectChangeEvent<typeof rightMultipleAnswer>) => {
    const {
      target: { value },
    } = event;
    setMultipleRightAnswer(typeof value === "string" ? value.split(",") : value);
  };

  const { fields: answerFields, append: answerAppend, remove: answerRemove } = useFieldArray({ control, name: "answerList" });
  const { fields: answerMultipleFields, append: answerMultipleAppend, remove: answerMultipleRemove } = useFieldArray({ control, name: "answerMultipleList" });

  return (
    <div className={styles.form__list__item} key={key}>
      <div className={styles.right__subtitle__number}>{`${numberQuiz + 1}`}</div>
      {numberQuiz >= 1 && <div className={styles.close}>{ICONS.close({ onClick: () => remove(numberQuiz) })}</div>}
      <div className={styles.right__subtitle}>{`Question type`}</div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
        <InputLabel>Select question type</InputLabel>
        <Select value={questionType} onChange={handleChange}>
          <MenuItem value={"1"}>Single choice</MenuItem>
          <MenuItem value={"2"}>Multiple choice</MenuItem>
          <MenuItem value={"3"}>True or False</MenuItem>
        </Select>
      </FormControl>
      <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Question</div>
      <TextField fullWidth label="Insert question" variant="standard" {...register(`questionList.${numberQuiz}.question`)} />
      {questionType === "1" ? (
        <>
          <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Answers</div>
          <div className={`${styles.form__answers}`}>
            {answerFields.map((field, index) => (
              <div key={field.id} className={`${styles.form__answers__div}`}>
                <TextField fullWidth label={`Insert answer ${index + 1}`} variant="standard" />
                {index > 1 && ICONS.close({ onClick: () => answerRemove(numberQuiz) })}
              </div>
            ))}
          </div>

          <div>
            <button className={styles.button__create} type="button" onClick={() => answerAppend({ answer: "" })}>
              Add Answer
            </button>
          </div>

          <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Right Answer</div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
            <InputLabel>Select right answer</InputLabel>
            <Select value={rightAnswer} onChange={handleChange2}>
              {answerFields.map((answer, index) => (
                <MenuItem value={`${index}`} key={answer.id}>
                  {`${index + 1}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      ) : questionType === "2" ? (
        <>
          <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Answers</div>
          {answerMultipleFields.map((field, index) => (
            <div key={field.id} className={`${styles.form__answers__div}`}>
              <TextField fullWidth label={`Insert answer ${index + 1}`} variant="standard" />
              {index > 2 && ICONS.close({ onClick: () => answerMultipleRemove(numberQuiz) })}
            </div>
          ))}

          <div>
            <button className={styles.button__create} type="button" onClick={() => answerMultipleAppend({ answer: "" })}>
              Add answer
            </button>
          </div>

          <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Right Answer</div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
            <InputLabel id="demo-multiple-checkbox-label">Select right answer</InputLabel>
            <Select
              multiple
              value={rightMultipleAnswer}
              onChange={handleChange3}
              input={<OutlinedInput label="Tag" />}
              renderValue={selected => selected.join(", ")}
              sx={{
                "& .MuiSelect-multiple": {
                  paddingBottom: "5px",
                },
              }}
            >
              {answerMultipleFields.map((answer, index) => (
                <MenuItem value={`${index}`} key={answer.id}>
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                    checked={rightMultipleAnswer.indexOf(`${index}`) > -1}
                  />
                  <ListItemText primary={index + 1} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      ) : questionType === "3" ? (
        <>
          <div className={`${styles.right__subtitle} ${styles.marginTop}`}>Right Answer</div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: "100% " }}>
            <InputLabel>Select right answer</InputLabel>
            <Select value={rightAnswer} onChange={handleChange2}>
              <MenuItem value={"True"}>True </MenuItem>
              <MenuItem value={"False"}>False </MenuItem>
            </Select>
          </FormControl>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OneQuizCreate;
