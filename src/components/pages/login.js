import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../api/authRequest";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { setLogin } from "../../Features/Authority";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: "", password: "" }); // Manage errors for both fields
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
  
    // Clear previous errors
    setErrors({ email: "", password: "" });
  
    try {
      const body = { email, password };
      const res = await logIn?.(body);
  
      // Debugging: Check the response
      console.log("API Response:", res?.data);
  
      if (res?.data?.success) {
        localStorage.setItem("authToken", JSON.stringify(res?.data.data));
        console.log("Redirecting to dashboard");
        dispatch(setLogin(res?.data.data));
        navigate("/"); // Redirect on successful login
        toast.success("Login successful!", { position: "top-right" });
      } else {
        const errorMsg = res?.data?.message || "Invalid credentials.";
        if (errorMsg.includes("email")) {
          setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
        } else if (errorMsg.includes("password")) {
          setErrors((prev) => ({ ...prev, password: "Invalid password" }));
        } else {
          setErrors({ email: "Invalid email address", password: "Invalid password" });
        }
        toast.error(errorMsg, { position: "top-right" });
      }
    } catch (error) {
      console.log("Error response:", error.response);
  
      const errorMessage = error?.response?.data?.message || "Login failed.";
      if (errorMessage.includes("email")) {
        setErrors((prev) => ({ ...prev, email: "Invalid email address" }));
      } else if (errorMessage.includes("password")) {
        setErrors((prev) => ({ ...prev, password: "Invalid password" }));
      } else {
        setErrors({ email: "Invalid email address", password: "Invalid password" });
      }
      
    }
  };
  

  return (
    <div className="relative min-h-screen bg-[#e7edf4] bg-center p-8">
      <div className="relative z-10 flex flex-col h-full items-center justify-center p-6">
        <div
          className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6"
          style={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex justify-center mb-6">
            <img src="/enConnectLogo.jpg" alt="Logo" className="h-24 object-contain" />
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <h1 className="text-3xl font-semibold text-center text-[#333]">Welcome back</h1>
            <h3 className="text-sm sm:text-base text-center text-[#686219]">
              Sign in to your Admin dashboard to continue
            </h3>

            {/* Email Input Field */}
            <div className="relative mb-6">
              <label
                htmlFor="email"
                className="text-lg font-medium text-[#333] mb-2 block"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-600" : "border-[#105193]"
                } rounded-lg bg-transparent focus:ring-2 focus:ring-[#105193] outline-none transition duration-300`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-2">{errors.email}</p>
              )}
            </div>

            {/* Password Input Field */}
            <div className="relative mb-6">
              <label
                htmlFor="password"
                className="text-lg font-medium text-[#333] mb-2 block"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  className={`w-full px-4 py-3 border ${
                    errors.password ? "border-red-600" : "border-[#105193]"
                  } rounded-lg bg-transparent focus:ring-2 focus:ring-[#105193] outline-none transition duration-300`}
                />
               
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-[#888888] cursor-pointer"
                >
                  {showPassword ? <PiEyeSlashFill /> : <PiEyeFill />}
                </button>
                
              </div>
               {errors.email ? ' ' :errors.password && (
                  <p className="text-sm text-red-600 mt-2">{errors.password}</p>
                )}
            </div>

            {/* Log In Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#105193] to-[#107D93] text-white font-semibold rounded-lg hover:translate-y-1 transform transition duration-300"
              >
                Log In
              </button>
            </div>
             {/* Forgot Password Link (Right-aligned under Password) */}
             <div className="flex justify-between mb-8 text-sm text-[#105193] ">
                <span className="space-x-2 flex items-center">
                  <input type="checkbox" className="bg-[#C19D5C] h-4 w-4" />
                  <span className="hover:underline cursor-pointer">
                    Remember me
                  </span>
                </span>
                <span
                  onClick={() => navigate("/forgotPassword")}
                  className="hover:underline cursor-pointer"
                >
                  Forgot Password?
                </span>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;