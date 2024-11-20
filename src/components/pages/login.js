import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../api/authRequest";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Features/Authority";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const body = { email, password };
      const res = await logIn?.(body);
      if (res?.data?.success) {
        localStorage.setItem("authToken", JSON.stringify(res?.data.data));
        dispatch(setLogin(res?.data.data));
        navigate("/"); // Redirect after form submission
      } else {
        console.log(res.data?.response?.data?.message,"resodata");
        
       
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#fb0909", // Custom red color for error
          color: "#FFFFFF" // Text color
        },
        dismissible: true
      });
      console.log("error", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#e7edf4] bg-center p-8" >
      <div className="relative z-10 flex flex-col h-full items-center justify-center p-6">
        <div
          className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6"
          style={{ boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)" }}>
          <div className="flex justify-center mb-6">
            <img src="/enConnectLogo.jpg" alt="Logo" className="h-24 object-contain" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <h1 className="text-3xl font-semibold text-center text-[#333]">Welcome back</h1>
            <h3 className="text-sm sm:text-base text-center text-[#686219]">Sign in to your Admin dashboard to continue</h3>

            {/* Email Input Field */}
            <div className="relative mb-6">
              <label
                htmlFor="email"
                className="text-lg font-medium text-[#333] mb-2 block">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 border border-[#105193] rounded-lg bg-transparent focus:ring-2 focus:ring-[#105193] outline-none transition duration-300"
              />
            </div>

            {/* Password Input Field */}
            <div className="relative mb-6">
              <label
                htmlFor="password"
                className="text-lg font-medium text-[#333] mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 border border-[#105193] rounded-lg bg-transparent focus:ring-2 focus:ring-[#105193] outline-none transition duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-[#888888] cursor-pointer">
                  {showPassword ? <PiEyeSlashFill /> : <PiEyeFill />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between mb-8 text-sm text-[#105193]">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>Remember me</span>
              </label>
              <span
                onClick={() => navigate("/forgotPassword")}
                className="cursor-pointer hover:underline">
                Forgot Password?
              </span>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
