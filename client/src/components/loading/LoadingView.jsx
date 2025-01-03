import React from "react";
import Loading from "./Loading";

const LoadingView = () => {
  return (
    <div className="fixed inset-0  z-[999] flex items-center justify-center modal-overlay">
      <Loading></Loading>
    </div>
  );
};

export default LoadingView;
