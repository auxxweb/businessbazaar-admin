import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../config/appConfig";
// import { getLocalStorageItem } from '../utils/appUtils'

export const postApi = async ({ url = "", body, authToken = true }) => {
  console.log(url, "url-url-url");

  const userData = JSON.parse(localStorage.getItem("authToken"));
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (authToken) {
    config.headers = {
      Authorization: `Bearer ${userData?.token}`
    };
  }
  const response = await axios.post(
    `${appConfig?.apiUrl}/${url}`,
    body,
    config
  );
  console.log(response, "response");

  return response?.data;
};

export const getApi = async (url, authToken) => {
  const adminData = localStorage.getItem("authToken");
  const parsedAdminData = JSON.parse(adminData);

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (authToken) {
    config.headers = {
      Authorization: `Bearer ${parsedAdminData?.token}`
    };
  }

  const response = await axios.get(`${appConfig.apiUrl}/${url}`, config);

  return response?.data;
};
export const patchApi = async ({ url = "", body, authToken = true }) => {
  const userData = JSON.parse(localStorage.getItem("authToken"));

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (authToken) {
    config.headers.Authorization = `Bearer ${userData?.token}`;
  }

  const response = await axios.patch(
    `${appConfig.apiUrl}/${url}`,
    body,
    config
  );
  console.log(response, "response");

  return response?.data;
};

export const deleteApi = async (url, authToken = true) => {
  const userData = JSON.parse(localStorage.getItem("authToken"));

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (authToken) {
    config.headers.Authorization = `Bearer ${userData?.token}`;
  }

  const response = await axios.delete(`${appConfig.apiUrl}/${url}`, config);
  console.log(response, "response");

  return response?.data;
};
