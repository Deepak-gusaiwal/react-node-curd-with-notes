import React, { forwardRef } from "react";

const Select = (
  {
    className = "",
    placeholder,
    label,
    name,
    value,
    options = [],
    error,
    ...props
  },
  ref
) => {
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  return (
    <div className="inputBox">
      {label && (
        <label
          className={`capitalize block mb-1 font-medium italic text-sm; ${
            error ? "text-primary-400" : "text-secondary-400"
          }`}
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        name={name}
        defaultChecked={value}
        value={value}
        className={`outline-none w-full p-2 border-b-2 ${
          error ? "border-primary-300" : "border-secondary-300"
        } ${className}`}
        {...props}
      >
        <option className="capitalize" value="">
          {placeholder}
        </option>
        {options.map((item) => {
          const capitalizedItem = capitalizeWords(item);

          return (
            <option key={item} value={item}>
              {capitalizedItem}
            </option>
          );
        })}
      </select>
      {error && (
        <p className="text-sm  font-normal text-red-500">{error?.message}</p>
      )}
    </div>
  );
};

export default forwardRef(Select);
