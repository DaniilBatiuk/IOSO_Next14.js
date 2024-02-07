import axios from "@/axios";
import { MyQuiz, WrapSuccessType } from "@/utils/lib/types/index";
export const QuizService = {
  async getMyQuizzes(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axios.get<WrapSuccessType<MyQuiz[]>>(`/api/myQuizzes?id=${id}`);
    return data;
  },
  async getAllQuizzes() {
    const { data } = await axios.get<WrapSuccessType<MyQuiz[]>>(`/api/allQuizzes`);
    return data;
  },
};
