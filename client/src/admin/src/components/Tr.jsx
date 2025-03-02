import Button from "@/components/button/Button";
import React from "react";

const Tr = ({ children, className = "" }) => {
  return <tr className={className}>{children}</tr>;
};

export default Tr;
