import React from "react";

const Button = ({ children, className = "", onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className={`font-medium transition rounded-md hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
