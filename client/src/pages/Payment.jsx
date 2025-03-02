import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Layout from "@/layout/Layout";
import Bill from "@/components/bill/Bill";
import Button from "@/components/button/Button";
import IconCash from "@/components/icons/IconCash";
import IconPaymentMethod from "@/components/icons/IconPaymentMethod";
import IconPaypal from "@/components/icons/IconPaypal";
import PaypalButton from "@/components/paypal/PaypalButton";
import AddressRadio from "@/components/radio/AddressRadio";
import Radio from "@/components/radio/Radio";
import SubTitle from "@/components/title/SubTitle";
import Title from "@/components/title/Title";

import { getAddressesByUserId } from "@/store/features/address/addressThunk";
import { getProducts } from "@/store/features/cart/cartThunk";
import {
  setAddOrderSuccess,
  setShippingMethod,
  setTotalPrice,
  setVoucher,
} from "@/store/features/order/orderSlice";
import { getShipping } from "@/store/features/shipping/shippingThunk";
import { calculateTotal } from "@/utils/calculate";
import { formatCurrency } from "@/utils/format";
import { setAddressItem } from "@/store/features/address/addressSlice";
import { addOrder } from "@/store/features/order/orderThunk";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.cart);
  const { shipping } = useSelector((state) => state.shipping);
  const { addressesByUserId, addressItem } = useSelector(
    (state) => state.address
  );
  const { addOrderSuccess, loading, total_price, shippingMethod, voucher } =
    useSelector((state) => state.order);

  const [paymentMethod, setPaymentMethod] = useState("tiền mặt");

  /** 🌟 Load dữ liệu từ localStorage khi component mount */
  useEffect(() => {
    const storedTotalPrice = localStorage.getItem("totalPrice");
    const storedVoucher = localStorage.getItem("voucher");
    const storedShippingMethod = localStorage.getItem("shippingMethod");

    if (storedTotalPrice) dispatch(setTotalPrice(Number(storedTotalPrice)));
    if (storedVoucher) dispatch(setVoucher(JSON.parse(storedVoucher)));
    if (storedShippingMethod)
      dispatch(setShippingMethod(JSON.parse(storedShippingMethod)));
  }, [dispatch]);

  /** 🌟 Fetch dữ liệu từ backend */
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getShipping());
    dispatch(getAddressesByUserId());
  }, [dispatch]);

  /** 🌟 Cập nhật `localStorage` khi giá trị thay đổi */
  useEffect(() => {
    if (total_price) localStorage.setItem("totalPrice", total_price);
    if (voucher) localStorage.setItem("voucher", JSON.stringify(voucher));
    if (shippingMethod)
      localStorage.setItem("shippingMethod", JSON.stringify(shippingMethod));
  }, [total_price, voucher, shippingMethod]);

  useEffect(() => {
    if (addOrderSuccess) {
      localStorage.removeItem("voucher");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("shippingMethod");

      dispatch(setAddOrderSuccess(false));
      dispatch(setVoucher(null));
      navigate("/user/order");
    }
  }, [addOrderSuccess, dispatch, navigate]);

  /** 🌟 Cập nhật tổng giá */
  useEffect(() => {
    dispatch(
      setTotalPrice(
        calculateTotal(
          products.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          ),
          voucher?.max_discount,
          voucher?.value,
          voucher?.unit,
          shippingMethod?.shipping_price
        )
      )
    );
  }, [products, voucher, shippingMethod, dispatch]);

  const makePayment = async () => {
    if (!shippingMethod) {
      toast.error("Vui lòng chọn phương thức vận chuyển !");
      return;
    }
    if (!addressItem) {
      toast.error("Vui lòng chọn địa chỉ của bạn !");
      return;
    }

    const body = {
      products,
      total_price,
      voucher: voucher?._id || null,
      payment_method: paymentMethod,
      address: addressItem?._id,
      shipping: shippingMethod?._id,
    };

    dispatch(addOrder(body));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <section className="flex flex-col gap-y-5">
        <Title className="text-4xl font-bold" text="Thanh toán" />

        {/* 🚛 Chọn phương thức vận chuyển */}
        {products.length > 0 && shipping.length > 0 && (
          <div className="grid grid-cols-1 gap-5 p-5 border-b border-gray-300 md:grid-cols-12">
            <p className="col-span-12 font-medium md:col-span-9">
              Chọn phương thức vận chuyển
            </p>
            <div className="flex flex-col col-span-12 md:col-span-3 gap-y-3">
              {shipping.map((item) => (
                <Radio
                  key={item._id}
                  checked={
                    shippingMethod?.shipping_method === item.shipping_method
                  }
                  onClick={() => dispatch(setShippingMethod(item))}
                >
                  <span>
                    {item.shipping_method} -{" "}
                    <span className="text-secondary">
                      {formatCurrency(item.shipping_price)}
                    </span>
                  </span>
                </Radio>
              ))}
            </div>
          </div>
        )}

        {/* 📍 Chọn địa chỉ */}
        {products.length > 0 && (
          <div className="p-5 border-b border-gray-300">
            <p className="font-medium">Địa chỉ</p>
            {addressesByUserId?.length > 0 ? (
              <div className="max-h-[500px] overflow-y-scroll flex flex-col gap-y-3">
                {addressesByUserId.map((item) => (
                  <AddressRadio
                    key={item._id}
                    address={item}
                    checked={addressItem?._id === item._id}
                    onChange={() => dispatch(setAddressItem(item))}
                  />
                ))}
              </div>
            ) : (
              <Button
                onClick={() => navigate("/user/address")}
                className="px-4 py-2 text-white rounded-lg shadow-md bg-foreign hover:bg-foreign"
              >
                Đi tới trang địa chỉ của bạn
              </Button>
            )}
          </div>
        )}

        {/* 🧾 Hiển thị hóa đơn */}
        {total_price && shippingMethod && (
          <Bill
            products={products}
            shippingFee={shippingMethod.shipping_price}
            voucher={voucher}
            totalPrice={total_price}
          />
        )}

        {/* 💳 Chọn phương thức thanh toán */}
        {products.length > 0 && (
          <div className="p-5">
            <SubTitle
              icon={<IconPaymentMethod />}
              text="Phương thức thanh toán"
            />
            <div className="flex gap-x-3">
              <Radio
                checked={paymentMethod === "tiền mặt"}
                onClick={() => setPaymentMethod("tiền mặt")}
              >
                <span>Tiền mặt</span> <IconCash />
              </Radio>
              <Radio
                checked={paymentMethod === "paypal"}
                onClick={() => setPaymentMethod("paypal")}
              >
                <IconPaypal className="size-14" />
              </Radio>
            </div>
          </div>
        )}

        {/* 🛒 Nút đặt hàng */}
        <div className="flex justify-end p-5">
          {paymentMethod === "paypal" ? (
            <PaypalButton
              dataOrder={{
                products,
                total_price,
                voucher: voucher?._id || null,
                payment_method: paymentMethod,
                address: addressItem?._id,
                shipping: shippingMethod?._id,
              }}
            />
          ) : (
            <Button
              onClick={makePayment}
              className={`px-5 py-3 text-white bg-primary ${
                loading ? "bg-opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Đang xử lý ..." : "Đặt hàng"}
            </Button>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Payment;
