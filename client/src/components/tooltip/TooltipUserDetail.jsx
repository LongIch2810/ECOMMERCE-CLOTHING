import React from "react";
import Tooltip from "./Tooltip";

const TooltipUserDetail = ({ user }) => {
  return (
    <Tooltip className="w-[140px]">
      {user ? (
        <ul>
          <li
            className="block text-sm font-bold cursor-pointer text-gray-500 hover:text-[#1ac5ae] p-2 border-b border-main"
            onClick={() => navigate("/profile")}
          >
            Tài khoản của tôi
          </li>
          <li className="block text-sm cursor-pointer font-bold text-gray-500 hover:text-[#1ac5ae] p-2 border-b border-main">
            Đơn mua
          </li>
          <li
            className="block p-2 text-sm font-bold text-gray-500 cursor-pointer hover:text-secondary"
            onClick={() => dispatch(logout())}
          >
            Đăng xuất
          </li>
        </ul>
      ) : (
        <ul>
          <li
            className="block text-sm cursor-pointer font-bold text-gray-500 hover:text-[#1ac5ae] p-2 border-b border-main"
            onClick={() => navigate("/sign-in")}
          >
            Đăng nhập
          </li>
          <li
            className="block text-sm cursor-pointer font-bold text-gray-500 hover:text-[#1ac5ae] p-2"
            onClick={() => navigate("/sign-up")}
          >
            Đăng ký
          </li>
        </ul>
      )}
    </Tooltip>
  );
};

export default TooltipUserDetail;
