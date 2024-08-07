import React, { forwardRef } from "react";
import { nanoid } from "@reduxjs/toolkit";

const Input = (
  {
    className = "",
    type = "text",
    placeholder,
    label,
    error,
    labelClass = "",
    ...props
  },
  ref
) => {
  const inputId = nanoid();
  return (
    <div className="inputBox h-fit">
      {label && (
        <label
          htmlFor={inputId}
          className={`capitalize block mb-1 font-medium italic text-sm; ${
            error ? "text-primary-400" : "text-secondary-400"
          } ${labelClass}`}
        >
          {label}
        </label>
      )}
      <input
        className={`outline-none border-0 w-full border-b-2 ${
          error
            ? "border-primary-300"
            : type == "file"
            ? ""
            : "border-secondary-300"
        } ${type !== "file" && "p-2"} ${className}`}
        type={type}
        placeholder={placeholder}
        ref={ref}
        id={inputId}
        {...props}
      />
      {error && (
        <p className="text-sm  font-normal text-red-500">{error?.message}</p>
      )}
    </div>
  );
};

export default forwardRef(Input);
