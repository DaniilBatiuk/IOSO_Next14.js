import { MyQuiz, PassQuiz, UpdateQuiz, WrapSuccessType } from "../lib/@types";

import { axiosClassic } from "@/axios";

export const QuizService = {
  async getMyQuizzes(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axiosClassic.get<WrapSuccessType<MyQuiz[]>>(`/api/myQuizzes?id=${id}`);
    return data;
  },
  async getAllQuizzes() {
    const { data } = await axiosClassic.get<WrapSuccessType<MyQuiz[]>>(`/api/allQuizzes`);
    return data;
  },
  async getQuiz(id: string) {
    const { data } = await axiosClassic.get<WrapSuccessType<PassQuiz>>(`/api/quiz?id=${id}`);
    return data;
  },
  async getQuizForUpdate(id: string) {
    const { data } = await axiosClassic.get<WrapSuccessType<UpdateQuiz>>(
      `/api/updateQuiz?id=${id}`,
    );
    return data;
  },
};
