import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getVoucher } from "@/store/features/user/userThunk";
import { setVoucher } from "@/store/features/order/orderSlice";
import MyVoucherCard from "../card/MyVoucherCard";

const ModalVoucherDetail = ({
  setIsOpen = () => {},
  order_price,
  voucher = null,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClickUseVoucher = (item) => {
    console.log(item);
    dispatch(getVoucher({ voucher_id: item.voucher._id }));
    dispatch(setVoucher(item));
    localStorage.setItem("voucher", JSON.stringify({ ...item }));
    setIsOpen(() => setIsOpen(false));
  };
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="m-5 w-[500px] flex flex-col gap-y-5">
        <input
          type="text"
          className="w-full p-2 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-lg outline-primary"
          placeholder="Nhập mã giảm giá ..."
        />
        <div className="flex flex-col gap-y-3">
          {user?.vouchers?.length > 0 &&
            user.vouchers.map((item) => (
              <MyVoucherCard
                isUse={
                  item.status.toLowerCase() === "đã sử dụng" ||
                  order_price < item.voucher.min_order_price ||
                  voucher?.code === item.voucher.code
                }
                key={item._id}
                item={item.voucher}
                onClickUseVoucher={() => handleClickUseVoucher(item)}
              ></MyVoucherCard>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalVoucherDetail;
