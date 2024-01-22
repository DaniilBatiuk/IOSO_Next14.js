import styles from "@/styles/QuizPass.module.scss";
import MyCheckBox from "../UI/MyCheckBox/CheckBox";

type CheckboxQuizPassData = {
  question: string;
  variants: { variant: string }[];
  selected: string | string[];
};

type CheckboxQuizPassProps = CheckboxQuizPassData & {
  updateFields?: (fields: Partial<CheckboxQuizPassData>) => void;
  rightAnswers?: string | string[];
};

const CheckboxQuizPass: React.FC<CheckboxQuizPassProps> = ({ question, variants, selected, updateFields, rightAnswers }: CheckboxQuizPassProps) => {
  return (
    <>
      <div className={styles.left__text}>{question}</div>
      <div className={styles.left__checkBox}>
        {updateFields !== undefined && variants.map((variant, index) => <MyCheckBox key={index} updateFields={updateFields} selected={selected} variants={variants} variant={variant.variant} />)}
        {rightAnswers !== undefined && variants.map((variant, index) => <MyCheckBox key={index} selected={selected} variants={variants} rightAnswers={rightAnswers} variant={variant.variant} />)}
      </div>
    </>
  );
};
export default CheckboxQuizPass;
