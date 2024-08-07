import React from "react";

const Container = ({ className = "", children }) => {
  return (
    <div className={`p-2 max-w-[1200px] w-full mx-auto ${className}`}>{children}</div>
  );
};

export default Container;
