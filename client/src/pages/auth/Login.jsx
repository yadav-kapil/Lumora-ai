import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Sparkles, ShieldCheck, Palette, Mail, Lock, Eye } from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();

  const { login, error, isLoading } = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (!result.success) {
      return;
    }
    console.log(result.data);
    navigate("/app/text-to-image", {replace: true});
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] overflow-hidden relative px-4 py-10 md:px-6">
      {/* BACKGROUND BLURS */}
      <div className="absolute top-[-180px] left-[20%] w-[450px] h-[450px] bg-green-200/30 rounded-full blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-80px] w-[300px] h-[300px] bg-green-100/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-md md:max-w-2xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-8">
          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            {/* ICON */}
            <img src="/logo-lumora-ai.png" alt="Lumora Logo" className="w-9 h-9 object-contain rounded-xl group-hover:scale-[1.04] transition-all duration-200" />

            {/* TEXT */}
            <div className="leading-none">
              <h1 className="text-[17px] font-black tracking-[-0.4px] text-[#081028]">
                Lumora<span className="text-green-500">.ai</span>
              </h1>
              <p className="text-[10.5px] text-gray-400 font-medium mt-[2px] tracking-wide">
                AI Image Generator
              </p>
            </div>
          </NavLink>
        </div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-[1fr_460px] gap-8 items-center">
          {/* LEFT SIDE */}
          <div className="hidden lg:block">
            {/* HEADING */}
            <div className="max-w-[500px]">
              <h2 className="text-[40px] leading-[1.08] tracking-[-1.5px] font-bold text-[#081028]">
                Welcome back
                <br />
                continue creating
                <br />
                <span className="text-green-500">stunning images ✨</span>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-gray-600 max-w-[440px]">
                Sign in to access your AI creations, prompts, history and
                personalized workspace.
              </p>
            </div>

            {/* FEATURES */}
            <div className="mt-9 space-y-5">
              {/* ITEM */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-green-500" />
                </div>

                <div>
                  <h3 className="text-[15px] font-bold text-[#081028]">
                    AI Powered
                  </h3>

                  <p className="text-[13px] text-gray-600 mt-0.5">
                    Create stunning visuals in seconds.
                  </p>
                </div>
              </div>

              {/* ITEM */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>

                <div>
                  <h3 className="text-[15px] font-bold text-[#081028]">
                    Secure Access
                  </h3>

                  <p className="text-[13px] text-gray-600 mt-0.5">
                    Your data and prompts stay protected.
                  </p>
                </div>
              </div>

              {/* ITEM */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <Palette className="w-5 h-5 text-green-500" />
                </div>

                <div>
                  <h3 className="text-[15px] font-bold text-[#081028]">
                    Creative Workspace
                  </h3>

                  <p className="text-[13px] text-gray-600 mt-0.5">
                    Manage all your creations effortlessly.
                  </p>
                </div>
              </div>
            </div>

            {/* IMAGES */}
            <div className="relative mt-10 h-[230px]">
              {/* LEFT */}
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=320&q=80&fit=crop&crop=center"
                alt=""
                className="absolute left-0 bottom-7 w-36 h-44 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] rotate-[-10deg] border-[3px] border-white object-cover hover:z-20"
              />

              {/* CENTER */}
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80&fit=crop&crop=center"
                alt=""
                className="absolute left-24 bottom-0 w-52 h-52 rounded-[24px] shadow-[0_25px_50px_rgba(0,0,0,0.18)] border-[3px] border-white object-cover z-12"
              />

              {/* RIGHT */}
              <img
                src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=320&q=80&fit=crop&crop=center"
                alt=""
                className="absolute left-72 bottom-9 w-36 h-44 rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] rotate-[10deg] border-[3px] border-white object-cover hover:z-20"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="bg-white/85 backdrop-blur-2xl border border-white/70 rounded-[28px] shadow-[0_20px_70px_rgba(0,0,0,0.07)] p-6 sm:p-7 md:p-8">
              {/* HEADING */}
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#081028]">
                  Welcome <span className="text-green-500">back ✨</span>
                </h2>

                <p className="mt-2 text-xs md:text-sm text-gray-500">
                  Sign in to continue generating amazing AI images.
                </p>
              </div>

              {/* SOCIAL BUTTONS */}
              <div className="grid sm:grid-cols-2 gap-2.5 mt-6">
                <button className="h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-[13px] font-medium text-gray-700 hover:shadow-md">
                  <FcGoogle className="text-lg" />
                  Google
                </button>

                <button className="h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-[13px] font-medium text-gray-700 hover:shadow-md">
                  <FaGithub className="text-base" />
                  GitHub
                </button>
              </div>

              {/* DIVIDER */}
              <div className="flex items-center gap-3 my-4">
                <div className="h-[1px] flex-1 bg-gray-200" />

                <span className="text-[10px] tracking-wide text-gray-400 font-medium">
                  OR CONTINUE WITH EMAIL
                </span>

                <div className="h-[1px] flex-1 bg-gray-200" />
              </div>

              {/* FORM */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div>
                  <label className="block text-xs font-semibold text-[#081028] mb-1.5">
                    Email Address
                  </label>

                  <div className="h-10 rounded-xl border border-gray-200 bg-white px-3.5 flex items-center gap-2.5 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-100 transition-all">
                    <Mail className="w-4 h-4 text-gray-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full h-full bg-transparent outline-none text-[13px]"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#081028]">
                      Password
                    </label>

                    <NavLink
                      to="/forgot-password"
                      className="text-[11px] text-green-500 font-medium hover:underline"
                    >
                      Forgot password?
                    </NavLink>
                  </div>

                  <div className="h-10 rounded-xl border border-gray-200 bg-white px-3.5 flex items-center gap-2.5 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-100 transition-all">
                    <Lock className="w-4 h-4 text-gray-400" />

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full h-full bg-transparent outline-none text-[13px]"
                    />

                    <Eye className="w-4 h-4 text-gray-400 cursor-pointer" />
                  </div>
                </div>

                {/* REMEMBER */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-green-500 w-3.5 h-3.5"
                  />

                  <span className="text-[11px] text-gray-500">Remember me</span>
                </label>

                {error && (
                  <div className="relative overflow-hidden rounded-2xl border border-red-200/80 bg-gradient-to-br from-red-50 to-white px-4 py-3 shadow-[0_10px_30px_rgba(239,68,68,0.08)]">
                    {/* ACCENT */}
                    <div className="absolute left-0 top-0 h-full w-1 bg-red-500" />

                    <div className="flex items-start gap-3">
                      {/* ICON */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.4}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8v4m0 4h.01"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.71-3.14l-7.5-13a2 2 0 00-3.42 0z"
                          />
                        </svg>
                      </div>

                      {/* TEXT */}
                      <div>
                        
                        <h3 className="text-[13px] font-bold text-red-700">
                          Login Failed
                        </h3>

                        <p className="mt-0.5 text-[12px] leading-relaxed text-red-600">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* BUTTON */}
                <button
                  disabled={isLoading}
                  className="w-full h-10 rounded-xl bg-green-500 hover:bg-green-600 transition-all text-white text-[13px] font-bold shadow-[0_10px_30px_rgba(34,197,94,0.30)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? "Logging..." : "Sign In →"}
                </button>
              </form>

              {/* SIGNUP */}
              <div className="text-[13px] text-gray-500 flex justify-center items-center gap-1 mt-5">
                Don&apos;t have an account?
                <NavLink
                  to="/auth/signup"
                  className="text-green-500 font-semibold hover:text-green-600 transition-all"
                >
                  Sign up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
