import React, { useState } from "react";
import Modal from "./Modal";
import VoucherCard from "../card/VoucherCard";
import { useDispatch, useSelector } from "react-redux";
import { getVoucher } from "@/store/features/user/userThunk";
import { setVoucher } from "@/store/features/order/orderSlice";

const ModalVoucherDetail = ({
  setIsOpen = () => {},
  order_price,
  voucherInfo = null,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClickUseVoucher = (item) => {
    dispatch(getVoucher({ voucher_id: item.voucher._id }));
    dispatch(setVoucher(item));
    setIsOpen(() => setIsOpen(false));
  };
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
              <VoucherCard
                isUse={
                  item.status.toLowerCase() === "sử dụng" ||
                  order_price < item.voucher.min_order_price ||
                  voucherInfo?.code === item.voucher.code
                }
                key={item._id}
                item={item.voucher}
                isMyVoucher={true}
                onClickUseVoucher={() => handleClickUseVoucher(item)}
              ></VoucherCard>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default ModalVoucherDetail;
