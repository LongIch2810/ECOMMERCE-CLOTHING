import Button from "@/components/button/Button";
import CartItem from "@/components/cart/CartItem";
import ModalVoucherDetail from "@/components/modal/ModalVoucherDetail";
import Layout from "@/layout/Layout";
import { getAddressesByUserId } from "@/store/features/address/addressThunk";
import { setTotalPrice, setVoucher } from "@/store/features/order/orderSlice";
import { getShipping } from "@/store/features/shipping/shippingThunk";
import { calculateTotal } from "@/utils/calculate";
import { formatCurrency } from "@/utils/format";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "@/components/title/Title";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.cart);
  const { total_price, voucher } = useSelector((state) => state.order);
  const [isOpen, setIsOpen] = useState(false);

  console.log(voucher);

  useEffect(() => {
    const storedVoucher = localStorage.getItem("voucher");
    if (storedVoucher) dispatch(setVoucher(JSON.parse(storedVoucher)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getShipping());
    dispatch(getAddressesByUserId());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setTotalPrice(
        calculateTotal(
          products?.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
          }, 0),
          voucher?.max_discount,
          voucher?.value,
          voucher?.unit,
          0
        )
      )
    );
  }, [voucher?._id, products]);

  const handleCheckout = () => {
    localStorage.setItem("voucher", JSON.stringify(voucher));
    localStorage.setItem("totalPrice", total_price);
    navigate("/payment");
  };
  return (
    <Layout>
      <section className="mt-40">
        <div className="flex flex-col">
          <Title className="text-4xl font-bold" text="Giỏ hàng"></Title>

          {products?.length > 0 && (
            <div className="hidden grid-cols-1 gap-5 p-2 font-medium border-b-2 md:grid md:grid-cols-12 border-primary">
              <p className="col-span-8">Sản phẩm</p>
              <p className="place-self-center">Giá</p>
              <p className="place-self-center">Số lượng</p>
              <p className="place-self-center">Tổng tiền</p>
              <p className="place-self-center">Thao tác</p>
            </div>
          )}

          {/*-----------------------------------------Hiển thị sản phẩm trong giỏ----------------------------------------*/}
          {products?.length > 0 &&
            products.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}

          {/*---------------------------------------Hiển thị thông báo nếu giỏ hàng rỗng----------------------------------*/}
          {products?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
              <p className="mb-4 text-lg text-gray-700">
                Không có sản phẩm nào trong giỏ hàng.
              </p>
            </div>
          )}

          {/*-----------------------------------------------Hiển thị thông tin voucher------------------------------------------*/}
          {products?.length > 0 && (
            <div className="grid grid-cols-1 gap-5 p-5 mb-10 border-t border-gray-300 md:grid-cols-12">
              <div className="flex items-center col-span-12 font-medium md:col-span-6 gap-x-5">
                <span>Voucher</span>
                <span
                  onClick={() => setIsOpen(true)}
                  className="font-medium cursor-pointer text-foreign"
                >
                  Chọn mã
                </span>
                {voucher?.code && (
                  <div className="flex items-center gap-x-1">
                    <span className="text-foreign">Mã voucher:</span>
                    <span className="text-secondary">{voucher?.code}</span>
                  </div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6 place-self-end">
                <p>
                  {`Tổng thanh toán (${products.length} sản phẩm) : `}
                  <span className="text-secondary">
                    {formatCurrency(total_price)}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {products?.length > 0 && (
          <div className="flex items-center justify-end">
            <Button
              onClick={() => handleCheckout()}
              className={
                "px-5 py-3 text-sm border bg-primary gap-x-3 text-main md:text-base"
              }
            >
              Thanh toán
            </Button>
          </div>
        )}
      </section>

      {/*--------------------------------------------------------Modal để chọn mã giảm giá---------------------------------------------*/}
      {isOpen && (
        <ModalVoucherDetail
          setIsOpen={setIsOpen}
          order_price={products.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
          }, 0)}
          voucher={voucher || null}
        ></ModalVoucherDetail>
      )}
    </Layout>
  );
};

export default Cart;
