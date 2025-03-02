import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <Navbar />
        <div className="p-0 mt-16 md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
