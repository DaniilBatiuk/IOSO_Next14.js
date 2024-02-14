import axios, { type CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXTAUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosClassic = axios.create(options);
