import React from "react";
import Login from "../../components/authentication/Login";
import Register from "../../components/authentication/Register";
import AuthHero from "./component/AuthHero";

const Authentication = ({ type }) => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      
      {/* Left Section — Hidden on small screens */}
      <div className="
        hidden 
        md:block 
        md:w-[50%] 
        h-[45vh] md:h-full 
        p-3
      ">
        <AuthHero />
      </div>

      {/* Right Section */}
      <div className="
        w-full 
        md:w-[50%] 
        h-full 
        flex items-center justify-center
        p-6
      ">
        {type === "login" ? <Login /> : <Register />}
      </div>

    </div>
  ); 
};

export default Authentication;
