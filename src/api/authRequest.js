import axios from "axios";
import { appConfig } from "../config/appConfig";

const API = axios.create({ baseURL: `${appConfig.apiUrl}/` });

export const logIn = (formdata) => API.post("/admin/login", formdata);
export const signUp = (formdata) => API.post("/user", formdata);
