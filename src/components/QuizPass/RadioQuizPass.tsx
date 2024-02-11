import styles from "@/styles/QuizPass.module.scss";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

type RadioQuizPassData = {
  question: string;
  answers: {
    id: string;
    answer: string;
    isCorrect: boolean;
  }[];
  selected: string | string[];
};

type RadioQuizPassProps = RadioQuizPassData & {
  updateFields?: (fields: Partial<RadioQuizPassData>) => void;
  rightAnswers?: string | string[];
};

export const RadioQuizPass: React.FC<RadioQuizPassProps> = ({
  question,
  answers,
  selected,
  updateFields,
  rightAnswers,
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
            checked={selected === answer.id}
            value={answer.id}
            control={
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color:
                      rightAnswers === answer.id
                        ? "#24d800"
                        : rightAnswers !== answer.id &&
                          selected === answer.id &&
                          rightAnswers !== undefined
                        ? "#a80101"
                        : "#ffffff",
                  },
                }}
              />
            }
            label={
              <span
                style={{
                  color:
                    rightAnswers === answer.id
                      ? "#24d800"
                      : rightAnswers !== answer.id &&
                        selected === answer.id &&
                        rightAnswers !== undefined
                      ? "#a80101"
                      : "#ffffff",
                }}
              >
                {answer.answer}
              </span>
            }
          />
        ))}
      </RadioGroup>
    </>
  );
};
