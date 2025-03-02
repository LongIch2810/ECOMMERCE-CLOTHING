import InfoItem from "@/components/info/InfoItem";
import IconUser from "@/components/icons/IconUser";
import React, { useEffect } from "react";
import Button from "@/components/button/Button";
import IconAddress from "@/components/icons/IconAddress";
import IconShipping from "@/components/icons/IconShipping";
import IconVoucher from "@/components/icons/IconVoucher";
import IconLogout from "@/components/icons/IconLogout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/features/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/store/features/user/userThunk";

const LayoutInfo = ({ content, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };
  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-5 gap-y-5">
      <div className="inline-flex flex-col w-full shadow-xl lg:w-1/3 lg:h-1/3">
        <div className="p-3 bg-primary text-main">
          {user && <p>Xin chào, {user.name}</p>}
        </div>
        <div>
          <InfoItem
            icon={<IconUser />}
            text="Thông tin tài khoản"
            to="/user/profile"
          ></InfoItem>
          <InfoItem
            icon={<IconShipping />}
            text="Đơn hàng"
            to="/user/order"
          ></InfoItem>
          <InfoItem
            icon={<IconVoucher />}
            text="Mã giảm giá"
            to="/user/voucher"
          ></InfoItem>
          <InfoItem
            icon={<IconAddress />}
            text="Địa chỉ"
            to="/user/address"
          ></InfoItem>
          <Button
            onClick={handleLogout}
            className="flex items-center w-full p-2 transition-all gap-x-3 hover:text-secondary"
          >
            <IconLogout></IconLogout>
            <span>Đăng xuất</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col w-full p-3 border border-gray-300">
        <h3 className="p-2 mb-3 text-lg font-medium border-b border-gray-300">
          {content}
        </h3>
        {children}
      </div>
    </div>
  );
};

export default LayoutInfo;
