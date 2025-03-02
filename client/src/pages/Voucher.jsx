import VoucherCard from "@/components/card/VoucherCard";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import { getVouchers } from "@/store/features/voucher/voucherThunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Voucher = () => {
  const dispatch = useDispatch();
  const { vouchers } = useSelector((state) => state.voucher);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getVouchers());
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <div className="flex items-center justify-center my-8">
        <Title className="text-4xl font-bold" text="Mã giảm giá"></Title>
      </div>
      {vouchers?.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {vouchers.map((item) => (
            <VoucherCard
              isSave={
                user?.vouchers?.length > 0 &&
                user?.vouchers?.findIndex(
                  (data) => data.voucher._id === item._id
                ) !== -1
              }
              key={item._id}
              item={item}
            ></VoucherCard>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Voucher;
