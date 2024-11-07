import { useState } from "react";
import { toast } from "react-toastify";
import { postApi, patchApi } from "../../api/api"; // Assuming `postApi` and `patchApi` are functions for making POST and PATCH requests

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Admin login function
  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await postApi("admin/login", credentials, true); // Replace "admin/login" with your actual login endpoint
      if (response?.data?.token) {
        setIsAuthenticated(true);
        localStorage.setItem("authToken", response?.data?.token); // Store token for session persistence
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error("Login failed");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  // Change password function
  const changePassword = async (passwordData) => {
    setLoading(true);
    try {
      await patchApi(
        { url: "admin/change-password", body: passwordData },
        true
      ); // Replace "admin/change-password" with your actual endpoint
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error("Failed to change password");
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  return { login, changePassword, loading, isAuthenticated };
};

export default useAuth;
