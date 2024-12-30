import Button from "@/components/button/Button";
import IconAdd from "@/components/icons/IconAdd";
import IconAddress from "@/components/icons/IconAddress";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconBack from "@/components/icons/IconBack";
import IconContinue from "@/components/icons/IconContinue";
import IconShipping from "@/components/icons/IconShipping";
import Radio from "@/components/radio/Radio";
import Step from "@/components/step/Step";
import SubTitle from "@/components/title/SubTitle";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <section className="mt-40">
        <Step process="w-1/2" details={true} address={true}></Step>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <header className="text-center">
              <div className="flex items-center justify-center my-8">
                <Title
                  className="text-4xl font-bold"
                  text="Địa chỉ nhận hàng"
                ></Title>
              </div>
            </header>

            <div className="mt-8">
              <div className="flex flex-col gap-y-5">
                <div>
                  <Button className="flex items-center justify-center gap-2 p-2 text-sm border border-black">
                    <span>
                      <IconAdd></IconAdd>
                    </span>
                    <span>Thêm địa chỉ</span>
                  </Button>
                </div>
                <div>
                  <SubTitle icon={<IconAddress />} text="Địa chỉ"></SubTitle>
                  <div>
                    <Radio
                      name="address"
                      text1="Ích Trác Huy Long"
                      text2="0822917787"
                    ></Radio>
                    <Radio
                      name="address"
                      text1="Đoàn Văn Khoan"
                      text2="0123567721"
                    ></Radio>
                  </div>
                </div>
                <div>
                  <SubTitle
                    icon={<IconShipping />}
                    text="Phương thức vận chuyển"
                  ></SubTitle>
                  <div>
                    <Radio
                      name="method"
                      text1="Tiết kiệm"
                      text2="20000"
                    ></Radio>
                    <Radio name="method" text1="Nhanh" text2="30000"></Radio>
                    <Radio name="method" text1="Hỏa tốc" text2="50000"></Radio>
                  </div>
                </div>
              </div>

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

                  <Button
                    onClick={() => navigate("/payment")}
                    className="flex items-center px-5 py-3 border bg-primary gap-x-3 text-main"
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

export default Address;
