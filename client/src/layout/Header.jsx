import HeaderItem from "@/components/header/HeaderItem";
import IconCart from "@/components/icons/IconCart";
import IconDown from "@/components/icons/IconDown";
import IconLogin from "@/components/icons/IconLogin";
import IconLogout from "@/components/icons/IconLogout";
import IconMenu from "@/components/icons/IconMenu";
import IconUp from "@/components/icons/IconUp";
import IconUser from "@/components/icons/IconUser";
import Logo from "@/components/logo/Logo";
import ModalMenuMobile from "@/components/modal/ModalMenuMobile";
import TooltipCartDetail from "@/components/tooltip/TooltipCartDetail";
import TooltipUserDetail from "@/components/tooltip/TooltipUserDetail";
import { logout } from "@/store/features/auth/authThunk";
import { getProducts } from "@/store/features/cart/cartThunk";
import { getCategories } from "@/store/features/category/categoryThunk";
import { setTypeProductsByCategory } from "@/store/features/typeProduct/typeProductSlice";
import {
  getTypeProducts,
  getTypeProductsByCategory,
} from "@/store/features/typeProduct/typeProductThunk";
import { getUserInfo } from "@/store/features/user/userThunk";

import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.cart);
  const { categories } = useSelector((state) => state.category);
  const { typeProductsByCategory } = useSelector((state) => state.typeProduct);
  const [isOpen, setIsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    if (!user?._id) {
      dispatch(getUserInfo());
    } else {
      dispatch(getProducts());
    }
    dispatch(getCategories());
  }, [user?._id, dispatch]);

  const createQueryUrl = (params) => {
    const searchParams = new URLSearchParams(params);
    return `?${searchParams.toString()}`;
  };

  const handleSelectTypeProduct = (typeProductId) => {
    const queryUrl = createQueryUrl({
      typeProducts: [typeProductId],
    });
    return `/product${queryUrl}`;
  };

  const handleHoverCategory = (category_id) => {
    setOpenCategory(category_id);
    dispatch(getTypeProductsByCategory(category_id));
  };

  const handleLeaveCategory = () => {
    setOpenCategory(null);
    dispatch(setTypeProductsByCategory(null));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleCategory = (categoryId) => {
    if (openCategory === categoryId) {
      setOpenCategory(null);
    } else {
      setOpenCategory(categoryId);
      dispatch(getTypeProductsByCategory(categoryId));
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-between p-3 bg-gray-100 z-[999]">
        <div>
          <Logo></Logo>
        </div>

        <div className="items-center justify-center flex-1 hidden md:flex gap-x-10">
          {categories.map((category) => (
            <div
              onMouseEnter={() => handleHoverCategory(category._id)}
              onMouseLeave={handleLeaveCategory}
              className="relative group"
              key={category._id}
            >
              <div className="flex items-center text-lg font-normal cursor-pointer gap-x-2">
                {category.name}
                <IconDown
                  className={`size-4 transition-transform ${
                    openCategory === category._id ? "rotate-180" : ""
                  }`}
                ></IconDown>
              </div>
              {typeProductsByCategory?.length > 0 && (
                <div className="absolute left-0 flex-col hidden p-2 bg-white rounded-lg shadow-md w-60 group-hover:flex">
                  {typeProductsByCategory.map((item) => (
                    <HeaderItem
                      to={handleSelectTypeProduct(item._id)}
                      key={item._id}
                    >
                      {item.name}
                    </HeaderItem>
                  ))}
                </div>
              )}
            </div>
          ))}
          <HeaderItem to="/voucher">Mã giảm giá</HeaderItem>
          <HeaderItem to="/contact">Liên hệ</HeaderItem>
          <HeaderItem to="/about">Giới thiệu</HeaderItem>
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
            {categories.map((category) => (
              <div key={category._id}>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleCategory(category._id)}
                >
                  <span>{category.name}</span>
                  <IconDown
                    className={`size-4 transition-transform ${
                      openCategory === category._id ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openCategory === category._id &&
                  typeProductsByCategory?.length > 0 && (
                    <div className="flex flex-col pl-4 mt-2 space-y-2">
                      {typeProductsByCategory.map((item) => (
                        <HeaderItem
                          to={`/product?typeProducts=${item._id}`}
                          key={item._id}
                        >
                          {item.name}
                        </HeaderItem>
                      ))}
                    </div>
                  )}
              </div>
            ))}
            <HeaderItem to="/voucher">Mã giảm giá</HeaderItem>
            <HeaderItem to="/contact">Liên hệ</HeaderItem>
            <HeaderItem to="/about">Giới thiệu</HeaderItem>
          </div>
          {user && user._id ? (
            <div
              className="flex items-center p-5 gap-x-3 hover:text-orange-500"
              onClick={handleLogout}
            >
              <span className="p-2 text-lg font-semibold cursor-pointer">
                Đăng xuất
              </span>
              <IconLogout />
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
              <IconLogin />
            </div>
          )}
        </ModalMenuMobile>
      )}
    </>
  );
};

export default Header;
