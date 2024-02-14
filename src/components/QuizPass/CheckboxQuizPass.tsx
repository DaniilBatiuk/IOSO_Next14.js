import { MyCheckBox } from "..";

import styles from "@/styles/QuizPass.module.scss";

type CheckboxQuizPassData = {
  question: string;
  answers: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  selected: string | string[];
  showResults: boolean;
};

type CheckboxQuizPassProps = CheckboxQuizPassData & {
  updateFields?: (fields: Partial<CheckboxQuizPassData>) => void;
};

export const CheckboxQuizPass: React.FC<CheckboxQuizPassProps> = ({
  question,
  answers,
  selected,
  updateFields,
  showResults,
}: CheckboxQuizPassProps) => {
  return (
    <>
      <div className={styles.left__text}>{question}</div>
      <div className={styles.left__checkBox}>
        {answers.map((answer, index) => (
          <MyCheckBox
            key={index}
            updateFields={updateFields !== undefined ? updateFields : undefined}
            selected={selected}
            answer={answer}
            showResults={showResults}
          />
        ))}
      </div>
    </>
  );
};
