import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

import styles from "@/styles/QuizPass.module.scss";

type RadioQuizPassData = {
  question: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  selected: string | string[];
  showResults: boolean;
};

type RadioQuizPassProps = RadioQuizPassData & {
  updateFields?: (fields: Partial<RadioQuizPassData>) => void;
};

export const RadioQuizPass: React.FC<RadioQuizPassProps> = ({
  question,
  answers,
  selected,
  updateFields,
  showResults,
}: RadioQuizPassProps) => {
  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (updateFields !== undefined) {
      const selectedanswer = event.target.value;
      updateFields({ selected: selectedanswer });
    }
  };

  return (
    <>
      <div className={styles.left__text}>{question}</div>
      <RadioGroup
        onChange={handlerChange}
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {answers?.map((answer, index) => (
          <FormControlLabel
            key={index}
            checked={selected.includes(answer.id)}
            value={answer.id}
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: !showResults
                      ? "#ffffff"
                      : (selected.includes(answer.id) && answer.isCorrect) ||
                          (!selected.includes(answer.id) && answer.isCorrect)
                        ? "#24d800"
                        : selected.includes(answer.id) && !answer.isCorrect
                          ? "#a80101"
                          : "#ffffff",
                  },
                }}
              />
            }
            label={
              <span
                style={{
                  color: !showResults
                    ? "#ffffff"
                    : (selected.includes(answer.id) && answer.isCorrect) ||
                        (!selected.includes(answer.id) && answer.isCorrect)
                      ? "#24d800"
                      : selected.includes(answer.id) && !answer.isCorrect
                        ? "#a80101"
                        : "#ffffff",
                }}
              >
                {answer.text}
              </span>
            }
          />
        ))}
      </RadioGroup>
    </>
  );
};
