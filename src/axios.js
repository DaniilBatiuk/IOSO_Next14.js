import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

export default instance;
