import styles from "@/styles/QuizPass.module.scss";
import { MyCheckBox } from "..";

type CheckboxQuizPassData = {
  question: string;
  answers: {
    id: string;
    answer: string;
    isCorrect: boolean;
  }[];
  selected: string | string[];
};

type CheckboxQuizPassProps = CheckboxQuizPassData & {
  updateFields?: (fields: Partial<CheckboxQuizPassData>) => void;
  rightAnswers?: string | string[];
};

export const CheckboxQuizPass: React.FC<CheckboxQuizPassProps> = ({
  question,
  answers,
  selected,
  updateFields,
  rightAnswers,
}: CheckboxQuizPassProps) => {
  return (
    <>
      <div className={styles.left__text}>{question}</div>
      <div className={styles.left__checkBox}>
        {updateFields !== undefined &&
          answers.map((answer, index) => (
            <MyCheckBox
              key={index}
              updateFields={updateFields}
              selected={selected}
              answer={{ id: answer.id, text: answer.answer }}
            />
          ))}
        {rightAnswers !== undefined &&
          answers.map((answer, index) => (
            <MyCheckBox
              key={index}
              selected={selected}
              rightAnswers={rightAnswers}
              answer={{ id: answer.id, text: answer.answer }}
            />
          ))}
      </div>
    </>
  );
};
