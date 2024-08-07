import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  to,
  varient,
  className = "",
  type = "",
  children,
  disabled = false,
  ...props
}) => {
  const buttonBg = `${
    varient
      ? "bg-primary-400 hover:bg-primary-500"
      : "bg-secondary-300 hover:bg-secondary-400"
  }`;
  const classBtn = `btn duration-200 flex justify-center gap-2 items-center h-fit font-semibold text-white px-4 py-2 rounded-full ${
    disabled ? "bg-gray-300 hover:bg-gray-300 shadow-none" : buttonBg
  } uppercase`;
  return to ? (
    <Link to={to} className={`${classBtn} ${className} `} {...props}>
      {children}
    </Link>
  ) : (
    <button
      disabled={disabled}
      type={type}
      className={`${classBtn} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
