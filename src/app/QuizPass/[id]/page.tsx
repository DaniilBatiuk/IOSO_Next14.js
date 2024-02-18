"use client";

import { Skeleton } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

import { Timer } from "@/components/QuizPass/Timer";

import styles from "@/styles/QuizPass.module.scss";

import { CheckboxQuizPass, Modal, RadioQuizPass, ThemeWrapper } from "@/components";
import { useMultistepForm, useQuizPass } from "@/utils/hooks";

export default function QuizPass({ params }: { params: { id: string } }) {
  const router = useRouter();

  const onClickNext = (e: FormEvent) => {
    if (!isLastStep) return next();
    onSubmit(e);
  };

  const {
    quizResult,
    onSubmit,
    sortedQuiz,
    isSubmitting,
    setActiveModal,
    result,
    activeModal,
    updateFields,
    newQuizResultId,
  } = useQuizPass(params.id, router);

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
    useMultistepForm([
      ...quizResult.map((question, index) =>
        Array.isArray(question.selected) ? (
          <CheckboxQuizPass
            key={index}
            {...question}
            showResults={false}
            updateFields={fields => updateFields(index, fields)}
          />
        ) : (
          <RadioQuizPass
            key={index}
            {...question}
            showResults={false}
            updateFields={fields => updateFields(index, fields)}
          />
        ),
      ),
    ]);

  if (!sortedQuiz) {
    return (
      <div className={styles.quizPass__container}>
        <form onSubmit={onSubmit} className={styles.quizPass__form}>
          <Skeleton variant="rectangular" height={500} width={956} />
          <aside className={styles.right}>
            <Skeleton variant="rectangular" height={500} />
          </aside>
        </form>
      </div>
    );
  }

  return (
    <ThemeWrapper>
      <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
        <div className={styles.modal__head}>
          <h2 className={styles.modal__title}>Result</h2>

          {result && sortedQuiz.percentagePass !== undefined && (
            <>
              <div
                className={
                  sortedQuiz.percentagePass >= result.score
                    ? styles.modal__status_close
                    : styles.modal__status_open
                }
              >
                {sortedQuiz.percentagePass >= result.score ? "Denied" : "Passed"}
              </div>
              <div className={styles.modal__text}>
                {result.durationOfAttempt.toLocaleTimeString()}
              </div>
              <div className={styles.modal__text_percent}>{result.score.toFixed(2)}%</div>
            </>
          )}
        </div>
        <div className={styles.modal__buttons}>
          <button className={styles.modal__button__cancel} onClick={() => setActiveModal(false)}>
            {isSubmitting ? "Don't save" : "Close"}
          </button>
          <button
            className={
              isSubmitting ? styles.modal__button__disable : styles.modal__button__activate
            }
            disabled={isSubmitting}
            onClick={() => router.push(`/Result/${newQuizResultId}?quizName=${sortedQuiz.name}`)}
          >
            {isSubmitting ? "Saving..." : "View result"}
          </button>
        </div>
      </Modal>
      <div className={styles.quizPass__container}>
        <form onSubmit={onSubmit} className={styles.quizPass__form}>
          <div className={styles.left}>
            <div className={styles.left__top}>
              <div className={styles.left__title}>Question {currentStepIndex + 1}</div>
              {sortedQuiz.duration && <Timer duration={sortedQuiz.duration} onSubmit={onSubmit} />}
            </div>
            {step}
            <div className={styles.left__buttons}>
              {!isFirstStep && (
                <button className={styles.left__back} type="button" onClick={back}>
                  Back
                </button>
              )}
              <button type="button" className={styles.left__next} onClick={onClickNext}>
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
                      (!Array.isArray(quizResult[index].selected) &&
                        quizResult[index].selected !== "") ||
                      (Array.isArray(quizResult[index].selected) &&
                        quizResult[index].selected.length > 0),
                  })}
                  onClick={() => goTo(index)}
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <button type="submit" className={styles.right__button}>
              Finish
            </button>
          </aside>
        </form>
      </div>
    </ThemeWrapper>
  );
}
