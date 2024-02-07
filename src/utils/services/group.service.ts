import axios from "@/axios";
import { AllGroups, Group, MyManagerGroups, WrapSuccessType } from "../lib/@types";
export const GroupsService = {
  async getMyGroups(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axios.get<WrapSuccessType<AllGroups[]>>(`/api/myGroups?id=${id}`);
    return data;
  },
  async getMyManagerGroups(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axios.get<WrapSuccessType<MyManagerGroups[]>>(
      `/api/myManagerGroups?id=${id}`,
    );
    return data;
  },
  async getAllGroups() {
    const { data } = await axios.get<WrapSuccessType<AllGroups[]>>(`/api/allGroups`);
    return data;
  },
  async getGroup(id: string) {
    const { data } = await axios.get<WrapSuccessType<Group>>(`/api/group?id=${id}`);
    return data;
  },
};
