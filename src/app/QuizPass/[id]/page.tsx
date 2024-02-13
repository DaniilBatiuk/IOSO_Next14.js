"use client";

import { CheckboxQuizPass, Modal, RadioQuizPass, ThemeWrapper } from "@/components";
import { Timer } from "@/components/QuizPass/Timer";
import styles from "@/styles/QuizPass.module.scss";
import { useMultistepForm } from "@/utils/hooks";
import { QuizPassType } from "@/utils/lib/@types";
import {
  createAllQuestionsAnswersAndAnswerSelected,
  createQuizResult,
} from "@/utils/lib/actions/quizResultActions";
import { calculateScore } from "@/utils/lib/helpers/calculateScore";
import { QuizService } from "@/utils/services/quiz.servise";
import { Skeleton } from "@mui/material";
import { QuestionType, QuizResultStatus } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export type Result = {
  durationOfAttempt: Date;
  score: number;
  questionCount: number;
  rightAnswerCount: number;
};

export default function QuizPass({ params }: { params: { id: string } }) {
  const { data: quiz } = useQuery({
    queryKey: ["Quiz", params.id],
    queryFn: () => QuizService.getQuiz(params.id),
  });

  const [quizResult, setQuizResult] = useState<QuizPassType>([]);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [newQuizResultId, setNewQuizResultId] = useState<string>("");
  const [result, setResult] = useState<Result>();
  const [timeToLeave, setTimeToLeave] = useState<boolean>(false);
  const [startAt, setStartAt] = useState<number>(Date.now());
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const checkSelected = (data: QuizPassType) => {
    for (const item of data) {
      if (item.selected === "" || (Array.isArray(item.selected) && item.selected.length === 0)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setQuizResult(
      quiz
        ? quiz.result.questions.map(question => ({
            id: question.id,
            question: question.text,
            answers: question.answers,
            selected: question.type === QuestionType.Multiple_choice ? [] : "",
          }))
        : [],
    );
  }, [quiz]);

  const updateFields = (index: number, fields: Partial<QuizPassType[0]>) => {
    setQuizResult(prev => {
      const newData = [...prev];
      newData[index] = { ...newData[index], ...fields };
      return newData;
    });
  };

  useEffect(() => {
    if (activeModal) {
      setTimeToLeave(true);
    }
  }, [activeModal]);

  useEffect(() => {
    if (timeToLeave && !activeModal) {
      router.push(`/Profile/${session?.user.id}`);
    }
  }, [timeToLeave, activeModal]);

  const onSubmit = async (e?: FormEvent, isTimerFinish?: boolean) => {
    if (e) e.preventDefault();

    if (checkSelected(quizResult) || !quiz) {
      if (isTimerFinish) {
        router.push(`/Profile/${session?.user.id}`);
        toast.error("Time is over! Some questions remain unanswered!. This attempt denied.");
      } else {
        toast.error("Some questions remain unanswered!");
      }
      return;
    }

    if (session === null) {
      toast.error("You have to register to create the group!");
      return;
    }

    setActiveModal(true);
    setIsSubmitting(true);

    const res: Result = {
      durationOfAttempt: new Date(Date.now() - startAt - 10800000),
      ...calculateScore(quizResult),
      questionCount: quiz.result.questions.length,
    };

    setResult(res);
    try {
      const { newQuizResultId } = await createQuizResult({
        userId: session.user.id,
        quizId: quiz?.result.id,
        ...res,
        status:
          quiz.result.percentagePass >= res.score
            ? QuizResultStatus.Denied
            : QuizResultStatus.Passed,
      });

      setNewQuizResultId(newQuizResultId);
      await createAllQuestionsAnswersAndAnswerSelected(newQuizResultId, quizResult);
      await queryClient.refetchQueries({
        queryKey: ["quizHistory"],
        type: "active",
        exact: true,
      });
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClickNext = (e: FormEvent) => {
    if (!isLastStep) return next();
    onSubmit(e);
  };

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

  return (
    <ThemeWrapper>
      <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
        <div className={styles.modal__head}>
          <h2 className={styles.modal__title}>Result</h2>

          {result && quiz?.result.percentagePass !== undefined && (
            <>
              <div
                className={
                  quiz.result.percentagePass >= result.score
                    ? styles.modal__status_close
                    : styles.modal__status_open
                }
              >
                {quiz.result.percentagePass >= result.score ? "Denied" : "Passed"}
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
            Cancel
          </button>
          <button
            className={
              isSubmitting ? styles.modal__button__disable : styles.modal__button__activate
            }
            disabled={isSubmitting}
            onClick={() => router.push(`/Result/${newQuizResultId}?quizName=${quiz?.result.name}`)}
          >
            {isSubmitting ? "Saving..." : "View result"}
          </button>
        </div>
      </Modal>
      <div className={styles.quizPass__container}>
        <form onSubmit={onSubmit} className={styles.quizPass__form}>
          {quiz?.result ? (
            <div className={styles.left}>
              <div className={styles.left__top}>
                <div className={styles.left__title}>Question {currentStepIndex + 1}</div>
                {quiz.result.duration && (
                  <Timer duration={quiz.result.duration} onSubmit={onSubmit} />
                )}
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
          ) : (
            <Skeleton variant="rectangular" height={500} width={956} />
          )}

          <aside className={styles.right}>
            {quiz?.result ? (
              <>
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
              </>
            ) : (
              <Skeleton variant="rectangular" height={500} />
            )}
          </aside>
        </form>
      </div>
    </ThemeWrapper>
  );
}
