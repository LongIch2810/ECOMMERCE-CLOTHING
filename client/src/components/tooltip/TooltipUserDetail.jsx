import React from "react";
import Tooltip from "./Tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authThunk";

const TooltipUserDetail = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };
  return (
    <>
      {user ? (
        <Tooltip className="w-[140px]">
          <ul>
            <li
              className="block text-sm font-bold cursor-pointer text-gray-500 hover:text-[#1ac5ae] p-2 border-b border-main"
              onClick={() => navigate("/user/profile")}
            >
              Tài khoản của tôi
            </li>
            <li
              className="block text-sm cursor-pointer font-bold text-gray-500 hover:text-[#1ac5ae] p-2 border-b border-main"
              onClick={() => navigate("/user/order")}
            >
              Đơn mua
            </li>
            <li
              className="block p-2 text-sm font-bold text-gray-500 cursor-pointer hover:text-secondary"
              onClick={handleLogout}
            >
              Đăng xuất
            </li>
          </ul>
        </Tooltip>
      ) : (
        <Tooltip className="w-[100px]">
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
        </Tooltip>
      )}
    </>
  );
};

export default TooltipUserDetail;
