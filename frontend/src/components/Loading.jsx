import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loading = ({ className = "", text, color = "#FF5C5C" }) => {
  return (
    <div
      className={`w-full h-full flex justify-center items-center ${className}`}
    >
      {text && <h2>{text}</h2>}
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color={color}
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
