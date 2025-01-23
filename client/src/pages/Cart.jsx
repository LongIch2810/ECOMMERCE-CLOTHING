import Button from "@/components/button/Button";
import CartItem from "@/components/cart/CartItem";
import IconAdd from "@/components/icons/IconAdd";
import IconBack from "@/components/icons/IconBack";
import IconCash from "@/components/icons/IconCash";
import IconPaymentMethod from "@/components/icons/IconPaymentMethod";
import IconPaypal from "@/components/icons/IconPaypal";
import IconSetting from "@/components/icons/IconSetting";
import IconStripe from "@/components/icons/IconStripe";
import ModalAddress from "@/components/modal/ModalAddress";
import ModalVoucherDetail from "@/components/modal/ModalVoucherDetail";
import Radio from "@/components/radio/Radio";
import SubTitle from "@/components/title/SubTitle";
import Layout from "@/layout/Layout";
import { getAddresses } from "@/store/features/address/addressThunk";
import { setShipping } from "@/store/features/order/orderSlice";
import { getShipping } from "@/store/features/shipping/shippingThunk";
import { calculateTotal } from "@/utils/calculate";
import { formatCurrency } from "@/utils/format";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../configs/axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { setAddressDefault } from "@/store/features/address/addressSlice";
import { deleteAllProductToCart } from "@/store/features/cart/cartThunk";
import PayPalButton from "@/components/paypal/PaypalButton";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const { shipping } = useSelector((state) => state.shipping);
  const { voucherInfo } = useSelector((state) => state.user);
  const { addresses, addressDefault } = useSelector((state) => state.address);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModalAddress, setIsOpenModalAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("tiền mặt");
  const [shippingMethod, setShippingMethod] = useState(null);
  const [totalPrice, setTotalPrice] = useState(
    products?.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0) || 0
  );

  useEffect(() => {
    dispatch(getShipping());
    dispatch(getAddresses());
  }, [dispatch]);

  useEffect(() => {
    setTotalPrice(
      calculateTotal(
        products?.reduce((acc, item) => {
          return acc + item.product.price * item.quantity;
        }, 0),
        voucherInfo?.max_discount,
        voucherInfo?.value,
        voucherInfo?.unit,
        shippingMethod?.shipping_price || 0
      )
    );
  }, [voucherInfo?._id, shippingMethod?._id, products]);

  const makePayment = async () => {
    if (!shippingMethod) {
      toast.error("Vui lòng chọn phương thức vận chuyển !");
    } else {
      const stripe = await loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

      const body = {
        products,
        total_price: totalPrice,
        voucher: voucherInfo?._id || null,
        payment_method: paymentMethod,
        address: addressDefault?._id,
        shipping: shippingMethod?._id,
      };

      const response = await axios.post("/order/add", body);
      if (paymentMethod === "tiền mặt") {
        const { message, success } = response.data;
        if (success) {
          toast.success(message);
        }
      }
    }
  };

  return (
    <Layout>
      <section className="mt-40">
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-5 p-2 font-medium border-b-2 md:grid-cols-12 border-primary">
            <p className="col-span-8">Sản phẩm</p>
            <p className="place-self-center">Giá</p>
            <p className="place-self-center">Số lượng</p>
            <p className="place-self-center">Tổng tiền</p>
            <p className="place-self-center">Thao tác</p>
          </div>

          {/*-----------------------------------------Hiển thị sản phẩm trong giỏ----------------------------------------*/}
          {products?.length > 0 &&
            products.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}

          {/*---------------------------------------Hiển thị thông báo nếu giỏ hàng rỗng----------------------------------*/}
          {products?.length === 0 && (
            <div className="flex items-center justify-center">
              <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
            </div>
          )}

          {/*------------------------------------------------Hiển thị đơn vị vận chuyển---------------------------------------*/}
          {products?.length > 0 && shipping?.length > 0 && (
            <div className="grid grid-cols-1 gap-5 p-5 font-medium border-b border-gray-300 md:grid-cols-12">
              <p className="col-span-9">Chọn đơn vị vận chuyển</p>
              <div className="flex flex-col col-span-3 place-self-end gap-y-3">
                {shipping.map((item) => (
                  <Radio
                    checked={
                      shippingMethod?.shipping_method === item.shipping_method
                    }
                    key={item._id}
                    onClick={() => setShippingMethod(item)}
                  >
                    <div className="flex items-center gap-x-1">
                      <span>{item.shipping_method}</span>
                      <span>-</span>
                      <span className="text-secondary">
                        {formatCurrency(item.shipping_price)}
                      </span>
                    </div>
                  </Radio>
                ))}
              </div>
            </div>
          )}

          {/*-----------------------------------------------Hiển thị thông tin thanh toán------------------------------------------*/}
          {products?.length > 0 && (
            <div className="grid grid-cols-1 gap-5 p-5 mb-10 md:grid-cols-12">
              <div className="flex items-center col-span-6 font-medium gap-x-5">
                <span>Voucher</span>
                <span
                  onClick={() => setIsOpen(true)}
                  className="font-medium cursor-pointer text-foreign"
                >
                  Chọn mã
                </span>
                {voucherInfo?.code && (
                  <div className="flex items-center gap-x-1">
                    <span className="text-foreign">Mã voucher:</span>
                    <span className="text-secondary">{voucherInfo?.code}</span>
                  </div>
                )}
              </div>

              <div className="col-span-6 place-self-end">
                <p>
                  {`Tổng thanh toán (${products.length} sản phẩm) : `}
                  <span className="text-secondary">
                    {formatCurrency(totalPrice)}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/*----------------------------------------------------Địa chỉ---------------------------------------------------*/}
          {products?.length > 0 && (
            <div className="p-5 border-b border-gray-300">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                <p className="col-span-8 font-medium">Địa chỉ</p>
                <div className="flex flex-col col-span-4 place-self-end gap-y-3">
                  <div className="flex items-center gap-x-3">
                    <Button
                      onClick={() => setIsOpenModalAddress(true)}
                      className="flex items-center p-2 text-sm border border-black gap-x-3"
                    >
                      <span>
                        <IconAdd></IconAdd>
                      </span>
                      <span>Thêm địa chỉ</span>
                    </Button>
                    <Button className="flex items-center p-2 text-sm border border-black gap-x-3">
                      <span>
                        <IconSetting></IconSetting>
                      </span>
                      <span>Thiết lập địa chỉ</span>
                    </Button>
                  </div>
                </div>
              </div>
              {addresses?.length > 0 ? (
                <div className="inline-flex flex-col gap-y-3">
                  {addresses.map((item) => (
                    <Radio
                      key={item._id}
                      checked={item._id === addressDefault?._id}
                      onClick={() => dispatch(setAddressDefault(item))}
                    >
                      <div className="flex items-center gap-x-3">
                        <span>{`${item.fullname} - ${item.phone} - ${item.addressDetail}`}</span>
                        {item.isDefault && (
                          <div className="flex items-center text-xs text-green-500 gap-x-1">
                            <span className="p-1 bg-green-500 rounded-full"></span>
                            <span>Mặc định</span>
                          </div>
                        )}
                      </div>
                    </Radio>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <p>Hiện tại bạn không có địa chỉ nào.</p>
                </div>
              )}
            </div>
          )}

          {/*-------------------------------------------------------Phương thức thanh toán--------------------------------------------------*/}
          {products?.length > 0 && (
            <div className="flex flex-col p-5 gap-y-5">
              <div>
                <div className="flex flex-col gap-y-5">
                  <SubTitle
                    icon={<IconPaymentMethod></IconPaymentMethod>}
                    text="Phương thức thanh toán"
                  ></SubTitle>
                  <div className="inline-flex gap-x-3">
                    <Radio
                      checked={paymentMethod === "tiền mặt"}
                      onClick={() => setPaymentMethod("tiền mặt")}
                    >
                      <div className="flex items-center gap-x-1">
                        <span>Tiền mặt</span>
                        <IconCash></IconCash>
                      </div>
                    </Radio>
                    <Radio
                      checked={paymentMethod === "paypal"}
                      onClick={() => setPaymentMethod("paypal")}
                    >
                      <IconPaypal className="size-14"></IconPaypal>
                    </Radio>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/*-------------------------------------------------------Trở về hoặc Đặt hàng--------------------------------------------------*/}
          {products?.length > 0 && (
            <div className="flex flex-col justify-end p-5 gap-y-10">
              <div className="flex justify-end gap-x-3">
                {paymentMethod === "paypal" ? (
                  <PayPalButton
                    dataOrder={{
                      products,
                      total_price: totalPrice,
                      voucher: voucherInfo?._id || null,
                      payment_method: paymentMethod,
                      address: addressDefault?._id,
                      shipping: shippingMethod?._id,
                    }}
                  />
                ) : (
                  <Button
                    onClick={makePayment}
                    className="flex items-center px-5 py-3 border bg-primary gap-x-3 text-main"
                  >
                    <span>Đặt hàng</span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/*--------------------------------------------------------Modal để chọn mã giảm giá---------------------------------------------*/}
      {isOpen && (
        <ModalVoucherDetail
          setIsOpen={setIsOpen}
          order_price={products.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
          }, 0)}
          voucherInfo={voucherInfo || null}
        ></ModalVoucherDetail>
      )}

      {/*--------------------------------------------------------Modal để chọn mã giảm giá---------------------------------------------*/}
      {isOpenModalAddress && (
        <ModalAddress setIsOpen={setIsOpenModalAddress}></ModalAddress>
      )}
    </Layout>
  );
};

export default Cart;
