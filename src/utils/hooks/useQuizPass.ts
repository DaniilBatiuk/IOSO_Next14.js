import { QuestionType, QuizResultStatus } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { PassQuiz, QuizPassType, Result } from "../lib/@types";
import {
  createAllQuestionsAnswersAndAnswerResult,
  createQuizResult,
} from "../lib/actions/quizResultActions";
import { calculateScore, shufflePassQuiz } from "../lib/helpers";
import { QuizService } from "../services/quiz.servise";

export const useQuizPass = (id: string, router: AppRouterInstance) => {
  const { data: quiz } = useQuery({
    queryKey: ["Quiz", id],
    queryFn: () => QuizService.getQuiz(id),
  });

  const [quizResult, setQuizResult] = useState<QuizPassType>([]);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [newQuizResultId, setNewQuizResultId] = useState<string>("");
  const [result, setResult] = useState<Result>();
  const [timeToLeave, setTimeToLeave] = useState<boolean>(false);
  const [startAt, setStartAt] = useState<number>(Date.now());
  const [sortedQuiz, setSortedQuiz] = useState<PassQuiz>();
  const { data: session } = useSession();
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
    if (!quiz?.result) return;
    setSortedQuiz(shufflePassQuiz(quiz.result));
  }, [quiz]);

  useEffect(() => {
    setQuizResult(
      sortedQuiz
        ? sortedQuiz.questions.map(question => ({
            id: question.id,
            question: question.text,
            answers: question.answers,
            type: question.type,
            selected: question.type === QuestionType.Multiple_choice ? [] : "",
          }))
        : [],
    );
  }, [sortedQuiz]);

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
        percentagePass: quiz.result.percentagePass,
        ...res,
        status:
          quiz.result.percentagePass >= res.score
            ? QuizResultStatus.Denied
            : QuizResultStatus.Passed,
      });

      setNewQuizResultId(newQuizResultId);
      await createAllQuestionsAnswersAndAnswerResult(newQuizResultId, quizResult);
      await queryClient.refetchQueries({
        queryKey: ["quizHistory"],
        type: "active",
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["myQuizzes"],
        type: "active",
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["allQuizzes"],
        type: "active",
        exact: true,
      });
      queryClient.refetchQueries({
        queryKey: ["user", session.user.id],
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

  return {
    quizResult,
    onSubmit,
    sortedQuiz,
    isSubmitting,
    setActiveModal,
    result,
    activeModal,
    updateFields,
    newQuizResultId,
  };
};
