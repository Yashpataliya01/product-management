import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Redux action
import { registerUser } from "../../redux/actions/authActions";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (data.password !== data.confirmPassword) {
      setErrors({ submit: "Passwords do not match" });
      return;
    }

    if (!data.role) {
      setErrors({ submit: "Please select a role" });
      return;
    }

    try {
      const result = await dispatch(registerUser(data));

      if (result?.error) {
        setErrors({ submit: result.payload || "Registration failed" });
        return;
      }

      navigate("/login");

    } catch (error) {
      setErrors({ submit: "Something went wrong" });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-12 bg-white">

      {/* Title */}
      <h1 className="text-4xl font-semibold text-[rgb(49,82,139)] tracking-wide mb-10">
        Create Account
      </h1>

      <div className="text-center mb-10">
        <h1 className="text-5xl font-semibold text-gray-900">Join Us</h1>
        <p className="text-gray-600 mt-2 text-sm">
          Create an account to manage your products
        </p>
      </div>

      <form
        className="w-full max-w-[420px] flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter your full name"
            className="bg-gray-100 p-3 rounded-xl focus:ring-2 focus:ring-[rgb(49,82,139)] outline-none"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="bg-gray-100 p-3 rounded-xl focus:ring-2 focus:ring-[rgb(49,82,139)] outline-none"
          />
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">Select Role</label>
          <select
            name="role"
            required
            className="bg-gray-100 p-3 rounded-xl focus:ring-2 focus:ring-[rgb(49,82,139)] outline-none"
          >
            <option value="">Choose Role</option>
            <option value="client">Client (Product Manager)</option>
            <option value="customer">Customer (Viewer)</option>
          </select>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="Enter your password"
            className="bg-gray-100 p-3 rounded-xl focus:ring-2 focus:ring-[rgb(49,82,139)] outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            className="bg-gray-100 p-3 rounded-xl focus:ring-2 focus:ring-[rgb(49,82,139)] outline-none"
          />
        </div>

        {/* Error */}
        {errors.submit && (
          <p className="text-red-500 text-sm">{errors.submit}</p>
        )}

        <button
          type="submit"
          className="mt-4 bg-[rgb(49,82,139)] text-white p-3 rounded-xl font-medium hover:bg-opacity-90 transition"
        >
          {loading ? "Loading..." : "Create Account"}
        </button>
      </form>

      <p className="mt-10 text-sm text-gray-700">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[rgb(49,82,139)] font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
