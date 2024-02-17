import { TUser, WrapSuccessType } from "../lib/@types";

import { axiosClassic } from "@/axios";

export const UserService = {
  async getUser(id: string | undefined) {
    if (!id) return;
    const { data } = await axiosClassic.get<WrapSuccessType<TUser>>(`/api/user?id=${id}`);
    return data;
  },
};
