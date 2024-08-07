import axios from "axios";
import { apiUrl } from "./env";
export const Axios = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
