import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../config/appConfig";
import { toast } from "react-toastify";
import { resetLogin } from "../Features/Authority";
import { resetBusiness } from "../Features/Business";
import { store } from "../Store";

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

  try {
    const response = await axios.post(
      `${appConfig?.apiUrl}/${url}`,
      body,
      config
    );
    console.log(response, "response");

    return response?.data;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken"); // Clear invalid token
      window?.location('/login'); // Redirect to login page
    } else {
      throw error; // Re-throw other errors
    }
  }

};


// navigation.js

export const getApi = async (url, authToken) => {
  const adminData = localStorage.getItem("authToken");
  const parsedAdminData = adminData ? JSON.parse(adminData) : null;

  // Redirect to login if token is not available
  if (!parsedAdminData?.token) {
    handleTokenError(); // Dispatch Redux action and redirect to login
    return;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${parsedAdminData.token}`,
    },
  };

  try {
    const response = await axios.get(`${appConfig.apiUrl}/${url}`, config);
    return response?.data;
  } catch (error) {
    if (error.response?.status === 401) {
      handleTokenError(); // Dispatch Redux action and redirect to login
    } else {
      throw error; // Rethrow for other errors
    }
  }
};

// Utility function to handle token errors
const handleTokenError = () => {
  store.dispatch(resetLogin()); // Dispatch the resetLogin action to update Redux state
  toast.error("Session Expired. Redirecting to login...", {
    position: "top-right",
    autoClose: 3000, // Close after 3 seconds
  });
  // setTimeout(() => {
  //   window.location.href = "/login"; // Redirect to the login page
  // }, 3000); // Allow toast to display before redirecting
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
