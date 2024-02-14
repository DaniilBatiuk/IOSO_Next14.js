import { AllGroups, Group, MyManagerGroups, QuizHistory, WrapSuccessType } from "../lib/@types";

import { axiosClassic } from "@/axios";

export const GroupsService = {
  async getMyGroups(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axiosClassic.get<WrapSuccessType<AllGroups[]>>(`/api/myGroups?id=${id}`);
    return data;
  },
  async getMyManagerGroups(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axiosClassic.get<WrapSuccessType<MyManagerGroups[]>>(
      `/api/myManagerGroups?id=${id}`,
    );
    return data;
  },
  async getAllGroups() {
    const { data } = await axiosClassic.get<WrapSuccessType<AllGroups[]>>(`/api/allGroups`);
    return data;
  },
  async getGroup(id: string) {
    const { data } = await axiosClassic.get<WrapSuccessType<Group>>(`/api/group?id=${id}`);
    return data;
  },
  async getGroupQuizHistory(id: string | undefined, groupId: string) {
    if (!id) return;
    const { data } = await axiosClassic.get<WrapSuccessType<QuizHistory[]>>(
      `/api/groupQuizHistory?id=${id}&groupId=${groupId}`,
    );
    return data;
  },
};
