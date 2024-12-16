import BillItem from "@/components/bill/BillItem";
import Button from "@/components/button/Button";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconBack from "@/components/icons/IconBack";
import IconBill from "@/components/icons/IconBill";
import IconPayment from "@/components/icons/IconPayment";
import IconPaymentMethod from "@/components/icons/IconPaymentMethod";
import IconVoucher from "@/components/icons/IconVoucher";
import Radio from "@/components/radio/Radio";
import Step from "@/components/step/Step";
import SubTitle from "@/components/title/SubTitle";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <section className="mt-40">
        <Step
          process="w-full"
          details={true}
          address={true}
          payment={true}
        ></Step>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <header className="text-center">
              <div className="flex items-center justify-center my-8">
                <Title className="text-4xl font-bold" text="Thanh toán"></Title>
              </div>
            </header>

            <div className="mt-8">
              {/*-------------------------------------------------------Bill thanh toán--------------------------------------------------*/}
              <div className="flex flex-col mb-10 gap-y-5">
                <SubTitle
                  icon={<IconBill></IconBill>}
                  text="Hóa đơn"
                ></SubTitle>
                <div className="flex flex-col gap-y-3">
                  <BillItem
                    title="Tổng tiền sản phẩm"
                    price={120000}
                  ></BillItem>
                  <BillItem title="Phí vận chuyển" price={30000}></BillItem>
                  <BillItem title="Tổng giảm giá" price={0}></BillItem>
                </div>
                <div className="mb-10">
                  <Button className="flex items-center justify-center gap-2 p-2 text-sm border border-black">
                    <span>
                      <IconVoucher></IconVoucher>
                    </span>
                    <span>Áp mã giảm giá</span>
                  </Button>
                </div>
                <div className="border border-gray-100"></div>
                <BillItem title="Tổng tiền" price={150000}></BillItem>
              </div>
              {/*-------------------------------------------------------Phương thức thanh toán--------------------------------------------------*/}
              <div className="flex flex-col gap-y-5">
                <div>
                  <div>
                    <SubTitle
                      icon={<IconPaymentMethod></IconPaymentMethod>}
                      text="Phương thức thanh toán"
                    ></SubTitle>
                    <div>
                      <Radio text1="Thanh toán" text2="Tiền mặt"></Radio>
                      <Radio text1="Thanh toán" text2="Paypal"></Radio>
                    </div>
                  </div>
                </div>
              </div>
              {/*-------------------------------------------------------Trở về hoặc thanh toán--------------------------------------------------*/}
              <div className="flex flex-col justify-end pt-8 mt-8 border-t border-gray-100 gap-y-10">
                <div className="flex justify-end gap-x-3">
                  <Button
                    onClick={() => navigate("/cart")}
                    className="flex items-center px-5 py-3 text-sm border border-black gap-x-3"
                  >
                    <span>
                      <IconBack></IconBack>
                    </span>
                    <span>Trở về</span>
                  </Button>
                  <Button className="flex items-center px-5 py-3 border bg-primary gap-x-3 hover:border-primary hover:bg-white">
                    <span>Thanh toán</span>
                    <span>
                      <IconPayment></IconPayment>
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

export default Payment;
