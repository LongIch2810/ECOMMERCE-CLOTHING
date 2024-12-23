import HeaderItem from "@/components/header/HeaderItem";
import IconCart from "@/components/icons/IconCart";
import IconUser from "@/components/icons/IconUser";
import Logo from "@/components/logo/Logo";
import { logout } from "@/store/features/auth/authThunk";
import { getGenders } from "@/store/features/gender/genderThunk";
import { getProducts } from "@/store/features/product/productThunk";
import { getUserInfo } from "@/store/features/user/userThunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const menuItem = [
  // {
  //   id: 1,
  //   text: "Nam",
  //   to: "/men",
  // },
  // {
  //   id: 2,
  //   text: "Nữ",
  //   to: "/women",
  // },
  {
    id: 1,
    text: "Sản phẩm",
    to: "/product",
  },
  {
    id: 2,
    text: "Mã giảm giá",
    to: "/voucher",
  },
  {
    id: 3,
    text: "Liên hệ",
    to: "/contact",
  },
  {
    id: 4,
    text: "Giới thiệu",
    to: "/about",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user?._id) {
      dispatch(getUserInfo());
    }
  }, [user?._id]);
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-3 bg-gray-100 z-[999]">
      <div>
        <Logo></Logo>
      </div>
      {menuItem.map((item) => (
        <HeaderItem to={item.to} key={item.id}>
          {item.text}
        </HeaderItem>
      ))}
      <div className="flex items-center gap-x-5">
        <div
          onClick={() => navigate("/cart")}
          className="relative p-2 text-lg font-semibold cursor-pointer"
        >
          <IconCart></IconCart>
          <div className="absolute top-0 flex items-center justify-center w-5 h-5 text-white bg-black rounded-full left-2/4">
            <span>0</span>
          </div>
        </div>
        <div className="p-2 text-lg font-semibold cursor-pointer">
          <div className="relative flex items-center p-2 gap-x-3 group">
            <IconUser></IconUser>
            {user ? <span>{user?.name}</span> : ""}
            <div className="absolute hidden p-5 rotate-45 bg-primary left-3/4 -translate-x-3/4 top-full group-hover:block"></div>
            <div className="absolute hidden w-[140px] p-2 rounded shadow-xl bg-primary top-full left-3/4 -translate-x-3/4 group-hover:block">
              {user ? (
                <ul>
                  <li
                    className="block text-sm font-bold text-gray-500 hover:text-[#1ac5ae] p-2 border-b border-black"
                    onClick={() => navigate("/profile")}
                  >
                    Tài khoản của tôi
                  </li>
                  <li className="block text-sm font-bold text-gray-500 hover:text-[#1ac5ae] p-2 border-b border-black">
                    Đơn mua
                  </li>
                  <li
                    className="block text-sm font-bold text-gray-500 hover:text-[#1ac5ae] p-2"
                    onClick={() => dispatch(logout())}
                  >
                    Đăng xuất
                  </li>
                </ul>
              ) : (
                <ul>
                  <li
                    className="block text-sm font-bold text-gray-500 hover:text-[#1ac5ae] p-2 border-b border-black"
                    onClick={() => navigate("/sign-in")}
                  >
                    Đăng nhập
                  </li>
                  <li
                    className="block text-sm font-bold text-gray-500 hover:text-[#1ac5ae] p-2"
                    onClick={() => navigate("/sign-up")}
                  >
                    Đăng ký
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
