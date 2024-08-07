import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Logo = ({ className = "" }) => {
  const { user, status, statusVal } = useSelector((state) => state.auth);
  return (
    <Link to="/" className={`text-primary-400 flex justify-center items-center font-bold uppercase text-[clamp(1.5rem,2vw,2rem)] ${className} `}>
      {/* <img className='w-auto' src="/franchiseavs copy.png" alt="franchiseavs.com" /> */}
      { status != statusVal.idle && user?.username ? user?.username : "Logo"}
    </Link>
  );
};

export default Logo;
