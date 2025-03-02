import HeaderItem from "@/components/header/HeaderItem";
import IconCart from "@/components/icons/IconCart";
import IconLogin from "@/components/icons/IconLogin";
import IconLogout from "@/components/icons/IconLogout";
import IconMenu from "@/components/icons/IconMenu";
import IconUser from "@/components/icons/IconUser";
import Logo from "@/components/logo/Logo";
import ModalMenuMobile from "@/components/modal/ModalMenuMobile";
import TooltipCartDetail from "@/components/tooltip/TooltipCartDetail";
import TooltipUserDetail from "@/components/tooltip/TooltipUserDetail";
import { logout } from "@/store/features/auth/authThunk";
import { getProducts } from "@/store/features/cart/cartThunk";
import { getUserInfo } from "@/store/features/user/userThunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const menuItem = [
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
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!user?._id) {
      dispatch(getUserInfo());
    } else {
      dispatch(getProducts());
    }
  }, [user?._id]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex  justify-between p-3 bg-gray-100 z-[999]">
        <div>
          <Logo></Logo>
        </div>

        <div className="items-center justify-center flex-1 hidden md:flex gap-x-10">
          {menuItem.map((item) => (
            <HeaderItem to={item.to} key={item.id}>
              {item.text}
            </HeaderItem>
          ))}
        </div>

        <div className="flex items-center gap-x-5">
          <div className="relative p-2 text-lg font-semibold group">
            <div
              className="cursor-pointer"
              onClick={() => {
                if (!user) {
                  navigate("/sign-in");
                } else navigate("/cart");
              }}
            >
              <IconCart></IconCart>
            </div>
            <div className="absolute top-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full left-2/4">
              {user?._id && products?.length >= 0 ? (
                <span>{products.length}</span>
              ) : (
                <span>0</span>
              )}
            </div>
            {user?._id && (
              <TooltipCartDetail products={products}></TooltipCartDetail>
            )}
          </div>
          <div className="p-2 text-lg font-semibold">
            <div className="relative p-2 group">
              <div
                className="flex items-center cursor-pointer gap-x-3"
                onClick={() => {
                  if (!user) {
                    navigate("/sign-in");
                  } else navigate("/user/profile");
                }}
              >
                <IconUser></IconUser>
                {user ? <span className="text-sm">{user?.name}</span> : ""}
              </div>
              <TooltipUserDetail user={user}></TooltipUserDetail>
            </div>
          </div>
          <div className="block md:hidden" onClick={() => setIsOpen(true)}>
            <IconMenu></IconMenu>
          </div>
        </div>
      </div>
      {isOpen && (
        <ModalMenuMobile setIsOpen={setIsOpen}>
          <div className="flex flex-col flex-1 p-5 gap-y-5">
            {menuItem.map((item) => (
              <HeaderItem to={item.to} key={item.id}>
                {item.text}
              </HeaderItem>
            ))}
          </div>
          {user && user._id ? (
            <div
              className="flex items-center p-5 gap-x-3 hover:text-orange-500"
              onClick={handleLogout}
            >
              <span className="p-2 text-lg font-semibold cursor-pointer">
                Đăng xuất
              </span>
              <IconLogout></IconLogout>
            </div>
          ) : (
            <div
              className="flex items-center p-5 gap-x-3 hover:text-orange-500"
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              <span className="p-2 text-lg font-semibold cursor-pointer">
                Đăng nhập
              </span>
              <IconLogin></IconLogin>
            </div>
          )}
        </ModalMenuMobile>
      )}
    </>
  );
};

export default Header;
