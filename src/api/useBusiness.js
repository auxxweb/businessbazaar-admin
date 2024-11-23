import { toast } from "react-toastify";
import { getApi, patchApi, postApi } from "./api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const useBusiness = () => {
  const [businesses, setBusinesses] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {
    setBusinesses(null);
    localStorage.removeItem("userCredential");
    navigate("/login");
  };


  const changePassword = async (passwordData) => {
    setLoading(true);
    try {
      await patchApi("business/password", passwordData, true, logout); // Replace "admin/change-password" with your actual endpoint
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error("Failed to change password");
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    
    try {
      const response = await postApi(
        {url:`admin/forgot-password`,
          body:{email},
          authToken:false} ,
        logout,
        navigate
      );
      
      if (response?.data){
        toast.success("Email send successfully", {
          theme: "colored",
          position: "top-right",
          style: {
            backgroundColor: "green",
            color: "#07eb38",
            height: "60px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }
        });
        // navigate("/")
      }
    } catch (error) {
      toast.error("Invalid Email");
      console.error("Error sending mail:", error);
    } finally {
      setLoading(false);
    }
  };
  const resetpassword = async (body) => {
    setLoading(true);
    try {
      const response = await postApi(
        `business/reset-password`,
        { ...body },
        false,
        logout,
        navigate
      );
      if (response?.data){
        toast.success("Password reset successfully", {
          theme: "colored",
          position: "top-right",
          style: {
            backgroundColor: "green",
            color: "#07eb38",
            height: "60px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }
        });
        navigate("/")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ??" password reset failed", {
        theme: "colored",
        position: "top-right",
        style: {
          backgroundColor: "red",
          color: "#ffffff",
          height: "60px",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }
      });
      console.error("Error sending mail:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    forgotPassword,
    resetpassword
  };
};
export default useBusiness;
