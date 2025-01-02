import HeaderItem from "@/components/header/HeaderItem";
import IconCart from "@/components/icons/IconCart";
import IconUser from "@/components/icons/IconUser";
import Logo from "@/components/logo/Logo";
import TooltipCartDetail from "@/components/tooltip/TooltipCartDetail";
import TooltipUserDetail from "@/components/tooltip/TooltipUserDetail";
import { logout } from "@/store/features/auth/authThunk";
import { getProducts } from "@/store/features/cart/cartThunk";
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
  const { products } = useSelector((state) => state.cart);
  useEffect(() => {
    if (!user?._id) {
      dispatch(getUserInfo());
    } else {
      dispatch(getProducts());
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
        <div className="relative p-2 text-lg font-semibold group">
          <div className="cursor-pointer" onClick={() => navigate("/cart")}>
            <IconCart></IconCart>
          </div>
          <div className="absolute top-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full left-2/4">
            {user?._id && products?.length >= 0 && (
              <span>{products.length}</span>
            )}
          </div>
          <TooltipCartDetail products={products}></TooltipCartDetail>
        </div>
        <div className="p-2 text-lg font-semibold">
          <div className="relative group">
            <div
              className="flex items-center cursor-pointer gap-x-3"
              onClick={() => navigate("/profile")}
            >
              <IconUser></IconUser>
              {user ? <span>{user?.name}</span> : ""}
            </div>
            <TooltipUserDetail user={user}></TooltipUserDetail>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
