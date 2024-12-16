import HeaderItem from "@/components/header/HeaderItem";
import IconCart from "@/components/icons/IconCart";
import IconSearch from "@/components/icons/IconSearch";
import IconUser from "@/components/icons/IconUser";
import Logo from "@/components/logo/Logo";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const menuItem = [
  {
    id: 1,
    text: "Trang chủ",
    to: "/",
  },
  {
    id: 2,
    text: "Nam",
    to: "/men",
  },
  {
    id: 3,
    text: "Nữ",
    to: "/women",
  },
  {
    id: 4,
    text: "Trẻ em",
    to: "/kid",
  },
  {
    id: 5,
    text: "Mã giảm giá",
    to: "/voucher",
  },
  {
    id: 6,
    text: "Liên hệ",
    to: "/contact",
  },
  {
    id: 7,
    text: "Giới thiệu",
    to: "/about",
  },
];

const menuItemRight = [
  {
    id: 1,
    icon: <IconCart></IconCart>,
    to: "/cart",
  },
  {
    id: 2,
    icon: <IconSearch></IconSearch>,
    to: "/search",
  },
  {
    id: 3,
    icon: <IconUser></IconUser>,
    to: "/profile",
  },
];

const Header = () => {
  const navigate = useNavigate();
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
        <div
          onClick={() => navigate("/profile")}
          className="p-2 text-lg font-semibold cursor-pointer"
        >
          <IconUser></IconUser>
        </div>
      </div>
    </div>
  );
};

export default Header;
