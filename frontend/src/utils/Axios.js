import axios from "axios";
const apiUrl = {
  local:"http://localhost:3000/api/v1",
  production:"https://react-node-curd-with-notes.onrender.com/api/v1"
}
export const Axios = axios.create({
  baseURL: apiUrl.production,
  withCredentials: true,
});
