import axios from "axios";
import { apiUrl } from "./env";
console.log('api url is',apiUrl);
export const Axios = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
