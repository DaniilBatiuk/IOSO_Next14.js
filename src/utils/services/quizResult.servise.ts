import { QuizHistory, QuizResult, WrapSuccessType } from "../lib/@types";

import { axiosClassic } from "@/axios";

export const QuizResultService = {
  async getQuizHistory(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axiosClassic.get<WrapSuccessType<QuizHistory[]>>(
      `/api/quizHistory?id=${id}`,
    );
    return data;
  },
  async getQuizResults(id: string | undefined, quizName: string | null) {
    if (!id || !quizName) return;
    const { data } = await axiosClassic.get<WrapSuccessType<QuizResult[]>>(
      `/api/quizResult?quizName=${quizName}&id=${id}`,
    );
    return data;
  },
};
