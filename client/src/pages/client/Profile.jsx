import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/actions/authActions";
import { FiUser, FiMail, FiShield, FiCalendar } from "react-icons/fi";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Fetch logged-in user data
  useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    <div className="w-full min-h-screen p-6 md:p-10 bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">

      {/* Header */}
      <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
      <p className="text-white/70 mb-8">Your account details</p>

      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          backdrop-blur-2xl bg-white/10 border border-white/20 
          rounded-2xl p-8 shadow-xl max-w-3xl mx-auto
        "
      >
        {/* Profile Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
            <img
              src={
                user?.avatar ||
                "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
              }
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="mt-4 text-white text-2xl font-semibold">{user?.name}</h2>
          <p className="text-white/60">{user?.email}</p>
        </div>

        {/* INFO FIELDS LIST */}
        <div className="space-y-6 mt-6">

          {/* Name */}
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="p-3 bg-white/20 rounded-full">
              <FiUser className="text-white text-xl" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Full Name</p>
              <p className="text-white text-lg font-medium">{user?.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="p-3 bg-white/20 rounded-full">
              <FiMail className="text-white text-xl" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Email Address</p>
              <p className="text-white text-lg font-medium">{user?.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="p-3 bg-white/20 rounded-full">
              <FiShield className="text-white text-xl" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Role</p>
              <p className="text-white text-lg font-medium capitalize">
                {user?.role}
              </p>
            </div>
          </div>

          {/* Joined Date */}
          <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
            <div className="p-3 bg-white/20 rounded-full">
              <FiCalendar className="text-white text-xl" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Joined On</p>
              <p className="text-white text-lg font-medium">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Profile;
