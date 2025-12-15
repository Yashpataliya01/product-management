import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux action
import { loginUser } from "../../redux/actions/authActions";
import IsAuthenticated from "../../utils/IsAuthenticated";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const result = await dispatch(loginUser(data))

      if (result?.error) {
        setErrors({ submit: result.payload || "Invalid credentials" });
        return;
      }
      console.log("result after login:", result);
      if (result.user.role === "client") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrors({ submit: "Something went wrong" });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-12 bg-white">
      {/* Brand */}
      <h1 className="text-4xl font-semibold text-[rgb(49,82,139)] tracking-wide mb-10">
        Product System
      </h1>

      {/* Welcome */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-semibold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2 text-sm">
          Enter your email & password to access your dashboard
        </p>
      </div>

      {/* Form */}
      <form
        className="w-full max-w-[420px] flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            className="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[rgb(49,82,139)]"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[rgb(49,82,139)]"
          />
        </div>

        {/* Error */}
        {errors.submit && (
          <p className="text-red-500 text-sm">{errors.submit}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="mt-4 bg-[rgb(49,82,139)] text-white p-3 rounded-xl font-medium hover:bg-opacity-90 transition"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-10 text-sm text-gray-700">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-[rgb(49,82,139)] font-medium hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
