import { api } from "./config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${api.baseURL}`,
});

export { axiosInstance };
