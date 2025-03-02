import React from "react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const GroupBanner = ({
  children,
  titleBanner = "",
  textButton = "",
  descriptionBanner = "",
}) => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      {children}
      <div
        className={`absolute w-full bottom-2 md:bottom-1/4 left-2/4 -translate-x-2/4 flex flex-col items-center gap-y-3 p-1 md:p-2`}
      >
        <span className="text-xl font-bold text-main md:text-4xl">
          {titleBanner}
        </span>
        <span className="text-xs italic font-bold text-gray-300 md:text-base">
          {descriptionBanner}
        </span>

        <Button
          className="p-1 md:p-2 bg-primary text-main"
          onClick={() => navigate("/product")}
        >
          {textButton}
        </Button>
      </div>
    </div>
  );
};

export default GroupBanner;
