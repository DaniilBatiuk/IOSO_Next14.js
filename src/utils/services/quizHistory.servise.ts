import axios from "@/axios";
import { QuizHistory, WrapSuccessType } from "../lib/@types";
export const QuizHistoryService = {
  async getQuizHistory(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axios.get<WrapSuccessType<QuizHistory[]>>(`/api/quizHistory?id=${id}`);
    return data;
  },
};
