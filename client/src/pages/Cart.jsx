import BillItem from "@/components/bill/BillItem";
import Button from "@/components/button/Button";
import CartItem from "@/components/cart/CartItem";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconContinue from "@/components/icons/IconContinue";
import IconVoucher from "@/components/icons/IconVoucher";
import Step from "@/components/step/Step";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <section className="mt-40">
        <Step details={true}></Step>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center my-8">
              <Title className="text-4xl font-bold" text="Giỏ hàng"></Title>
            </div>

            <div className="mt-8">
              <div className="flex flex-col gap-y-5">
                <CartItem></CartItem>
                <CartItem></CartItem>
                <CartItem></CartItem>
                <CartItem></CartItem>
              </div>

              <div className="flex flex-col justify-end pt-8 mt-8 border-t border-gray-100 gap-y-10">
                <BillItem title="Tổng tiền" price={120000}></BillItem>

                <div className="flex justify-end gap-x-3">
                  <Button
                    onClick={() => navigate("/address")}
                    className="flex items-center px-5 py-3 border bg-primary gap-x-3 hover:border-primary hover:bg-white"
                  >
                    <span>Tiếp tục</span>
                    <span>
                      <IconContinue></IconContinue>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
