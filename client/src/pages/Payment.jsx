import Bill from "@/components/bill/Bill";
import BillItem from "@/components/bill/BillItem";
import Button from "@/components/button/Button";
import CartItem from "@/components/cart/CartItem";
import IconBack from "@/components/icons/IconBack";
import IconBill from "@/components/icons/IconBill";
import IconCash from "@/components/icons/IconCash";
import IconPayment from "@/components/icons/IconPayment";
import IconPaymentMethod from "@/components/icons/IconPaymentMethod";
import IconPaypal from "@/components/icons/IconPaypal";
import IconStripe from "@/components/icons/IconStripe";
import Radio from "@/components/radio/Radio";
import SubTitle from "@/components/title/SubTitle";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import { setShipping } from "@/store/features/order/orderSlice";
import { getShipping } from "@/store/features/shipping/shippingThunk";
import { calculateTotal } from "@/utils/calculate";
import { formatCurrency } from "@/utils/format";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shipping: shippingMethod, voucher } = useSelector(
    (state) => state.order
  );
  const { products } = useSelector((state) => state.cart);
  const { shipping } = useSelector((state) => state.shipping);
  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
  useEffect(() => {
    dispatch(getShipping());
  }, []);
  return (
    <Layout>
      <section className="mt-40">
        <div>
          <div>
            <header className="text-center">
              <div className="flex items-center justify-center my-8">
                <Title className="text-4xl font-bold" text="Thanh toán"></Title>
              </div>
            </header>

            {/*---------------------------------------------------------Địa chỉ---------------------------------------*/}
            <div></div>

            <div>
              {/*-------------------------------------------------------Bill thanh toán--------------------------------------------------*/}
              <div className="flex flex-col gap-y-5">
                <div className="grid grid-cols-1 gap-5 p-2 font-medium border-b-2 md:grid-cols-12 border-primary">
                  <p className="col-span-8">Sản phẩm</p>
                  <p className="place-self-center">Giá</p>
                  <p className="place-self-center">Số lượng</p>
                  <p className="place-self-center">Tổng tiền</p>
                  <p className="place-self-center">Thao tác</p>
                </div>

                {/* Hiển thị sản phẩm trong giỏ */}
                {products?.length > 0 &&
                  products.map((item) => (
                    <CartItem key={item.product._id} item={item} />
                  ))}

                {/* Hiển thị thông báo nếu giỏ hàng rỗng */}
                {products?.length === 0 && (
                  <div className="flex items-center justify-center">
                    <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                  </div>
                )}

                {/* Hiển thị đơn vị vận chuyển */}
                {products?.length > 0 && shipping?.length > 0 && (
                  <div className="grid grid-cols-1 gap-5 p-2 font-medium border-b border-gray-300 md:grid-cols-12">
                    <p className="col-span-9">Chọn đơn vị vận chuyển</p>
                    <div className="flex flex-col col-span-3 place-self-center gap-y-3">
                      {shipping.map((item) => (
                        <Radio
                          checked={
                            shippingMethod?.shipping_method ===
                            item.shipping_method
                          }
                          key={item._id}
                          onClick={() => dispatch(setShipping(item))}
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

                {/* Hiển thị thông tin thanh toán */}
                {products?.length > 0 && (
                  <div className="grid grid-cols-1 gap-5 p-2 md:grid-cols-12">
                    <div className="flex items-center col-span-6 font-medium gap-x-5">
                      <span>Voucher</span>
                      <span
                        onClick={() => setIsOpen(true)}
                        className="font-medium cursor-pointer text-foreign"
                      >
                        Chọn mã
                      </span>
                      {voucher?.voucher?.code && (
                        <div className="flex items-center gap-x-1">
                          <span className="text-foreign">Mã voucher:</span>
                          <span className="text-secondary">
                            {voucher?.voucher?.code}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="col-span-4 place-self-center">
                      <p>
                        {`Tổng thanh toán (${products.length} sản phẩm) : `}
                        <span className="text-secondary">
                          {formatCurrency(
                            calculateTotal(
                              products.reduce((acc, item) => {
                                return acc + item.product.price * item.quantity;
                              }, 0),
                              voucher?.voucher?.max_discount,
                              voucher?.voucher?.value,
                              voucher?.voucher?.unit,
                              shippingMethod?.shipping_price || 0
                            )
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
              {/*-------------------------------------------------------Phương thức thanh toán--------------------------------------------------*/}
              <div className="flex flex-col gap-y-5">
                <div>
                  <div className="flex flex-col gap-y-5">
                    <SubTitle
                      icon={<IconPaymentMethod></IconPaymentMethod>}
                      text="Phương thức thanh toán"
                    ></SubTitle>
                    <div className="inline-flex gap-x-3">
                      <Radio
                        checked={paymentMethod === "cash on delivery"}
                        onClick={() => setPaymentMethod("cash on delivery")}
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
                      <Radio
                        checked={paymentMethod === "paypal"}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <IconStripe className="size-14"></IconStripe>
                      </Radio>
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
                  <Button className="flex items-center px-5 py-3 border bg-primary gap-x-3 text-main">
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
