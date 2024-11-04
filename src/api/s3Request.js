import axios from "axios";
// import { getLocalStorageItem } from "../utils/appUtils";
import { appConfig } from "../config/appConfig";

const API = axios.create({ baseURL: appConfig.apiUrl });

export const getPreSignedUrl = async (fileData) => {
  try {
    // const token = getLocalStorageItem("token");
    // const token = userData?.data?.token;

    return await API.post(
      `s3url`,
      {
        ...fileData,
      }
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}` // Include the Bearer token in the Authorization header
      //   }
      // }
    );
  } catch (error) {
    console.log(error);
  }
};

export const preRequestFun = async (file, position) => {
  const url = 'https://businessbazaarserver.auxxweb.in/api/v1/s3url';
  const requestBody = {
      files: [{
          position: position,
          file_type: file.type
      }]
  };
  
  try {
      const response = await axios.post(url, requestBody, {
          headers: { 'Content-Type': 'application/json' },
      });
      const preReq = response.data.data[0];
  

      // if (!preReq.url) {
      //     throw new Error('The URL is not defined in the response.');
      // }
      // await axios.put(preReq.url, file, {
      //     headers: { 'Content-Type': file.type }, 
      // });

      return preReq;
  } catch (error) {
      console.error('Error uploading file:', error.message || error);
      // throw new Error('File upload failed');
  }
};


export const postImageToS3 = async () => {};
