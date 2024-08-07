import axios from "axios";
import { apiUrl } from "./env";
// console.log('api url is',apiUrl);
export const Axios = axios.create({
  baseURL: "https://react-node-curd-with-notes.onrender.com/api/v1/",
  withCredentials: true,
});
