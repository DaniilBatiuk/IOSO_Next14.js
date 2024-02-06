import axios from "@/axios";
import { AllGroups, Group, MyManagerGroups, WrapSuccessType } from "@/utils/lib/types/index";
export const GroupsService = {
  async getMyGroups(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axios.get<WrapSuccessType<AllGroups[]>>(`/api/myGroups?id=${id}`);
    console.log(data);
    return data;
  },
  async getMyManagerGroups(id: string | undefined) {
    if (id === undefined) return;
    const { data } = await axios.get<WrapSuccessType<MyManagerGroups[]>>(
      `/api/myManagerGroups?id=${id}`,
    );
    console.log(data);
    return data;
  },
  async getAllGroups() {
    const { data } = await axios.get<WrapSuccessType<AllGroups[]>>(`/api/allGroups`);
    console.log(data);
    return data;
  },
  async getGroup(id: string) {
    const { data } = await axios.get<WrapSuccessType<Group>>(`/api/group?id=${id}`);
    console.log(data);
    return data;
  },
};
