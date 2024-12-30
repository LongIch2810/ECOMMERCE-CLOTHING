import React from "react";

const Button = ({ children, className = "", onClick = () => {}, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-medium transition rounded-md hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
