import axios from "@/axios";
import { QuizHistory, QuizResult, WrapSuccessType } from "../lib/@types";
export const QuizResultService = {
  async getQuizHistory(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axios.get<WrapSuccessType<QuizHistory[]>>(`/api/quizHistory?id=${id}`);
    return data;
  },
  async getQuizResults(id: string | undefined, quizName: string | null) {
    if (!id || !quizName) return;
    const { data } = await axios.get<WrapSuccessType<QuizResult[]>>(
      `/api/quizResult?quizName=${quizName}&id=${id}`,
    );
    return data;
  },
};
