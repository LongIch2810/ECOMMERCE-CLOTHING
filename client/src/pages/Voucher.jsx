import VoucherCard from "@/components/card/VoucherCard";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import React from "react";

const Voucher = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center my-8">
        <Title className="text-4xl font-bold" text="Mã giảm giá"></Title>
      </div>
      <div className="grid grid-cols-5 gap-5">
        <VoucherCard
          value={15}
          type="%"
          discount_max={100}
          min_order_price={200}
        ></VoucherCard>
        <VoucherCard
          value={20}
          type="%"
          discount_max={200}
          min_order_price={400}
        ></VoucherCard>
        <VoucherCard
          value={5}
          type="%"
          discount_max={100}
          min_order_price={200}
        ></VoucherCard>
        <VoucherCard
          value={7}
          type="%"
          discount_max={100}
          min_order_price={200}
        ></VoucherCard>
        <VoucherCard
          value={8}
          type="%"
          discount_max={100}
          min_order_price={200}
        ></VoucherCard>
      </div>
    </Layout>
  );
};

export default Voucher;
