"use client";
import CheckboxQuizPass from "@/components/QuizPass/CheckboxQuizPass";
import RadioQuizPass from "@/components/QuizPass/RadioQuizPass";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
import styles from "@/styles/QuizPass.module.scss";
import { useMultistepForm } from "@/utils/hooks/useMultistepForm";
import clsx from "clsx";
import { FormEvent, useState } from "react";

type FormData = {
  question: string;
  variants: { variant: string }[];
  selected: string | string[];
}[];

const INITIAL_DATA: FormData = [
  {
    question: "Where are you now?",
    variants: [{ variant: "Home" }, { variant: "Hospital" }, { variant: "Cinema" }],
    selected: "",
  },
  {
    question: "How old are you?",
    variants: [{ variant: "16" }, { variant: "84" }, { variant: "25" }, { variant: "42" }],
    selected: "",
  },
  {
    question: "How many cats do you have?",
    variants: [{ variant: "14" }, { variant: "63" }, { variant: "888" }],
    selected: "",
  },
  {
    question: "How many dogs do you have?",
    variants: [{ variant: "14" }, { variant: "63" }, { variant: "888" }, { variant: "777" }],
    selected: [],
  },
];

const QuizPass: React.FC = () => {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(index: number, fields: Partial<FormData[0]>) {
    setData(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], ...fields };
      return newData;
    });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Account Creation");
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
    useMultistepForm([
      ...data.map((item, index) =>
        Array.isArray(item.selected) ? (
          <CheckboxQuizPass
            key={index}
            {...item}
            updateFields={fields => updateFields(index, fields)}
          />
        ) : (
          <RadioQuizPass
            key={index}
            {...item}
            updateFields={fields => updateFields(index, fields)}
          />
        ),
      ),
    ]);
  return (
    <ThemeWrapper>
      <div className={styles.quizPass__container}>
        <form onSubmit={onSubmit} className={styles.quizPass__form}>
          <div className={styles.left}>
            <div className={styles.left__title}>Question {currentStepIndex + 1}</div>
            {step}
            <div className={styles.left__buttons}>
              {!isFirstStep && (
                <button className={styles.left__back} type="button" onClick={back}>
                  Back
                </button>
              )}
              <button className={styles.left__next} type="submit">
                {isLastStep ? "Finish" : "Next"}
              </button>
            </div>
          </div>
          <aside className={styles.right}>
            <div className={styles.right__title}>Questions</div>
            <div className={styles.right__block}>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={clsx(styles.right__number, {
                    [styles.right__number__active]: currentStepIndex === index,
                    [styles.right__number__passed]:
                      (!Array.isArray(INITIAL_DATA[index].selected) &&
                        data[index].selected !== "") ||
                      (Array.isArray(data[index].selected) && data[index].selected.length > 0),
                  })}
                  onClick={() => goTo(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <button className={styles.right__button}>Finish</button>
          </aside>
        </form>
      </div>
    </ThemeWrapper>
  );
};
export default QuizPass;
