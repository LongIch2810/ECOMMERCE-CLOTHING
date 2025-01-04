import BillItem from "@/components/bill/BillItem";
import Button from "@/components/button/Button";
import CartItem from "@/components/cart/CartItem";
import IconContinue from "@/components/icons/IconContinue";
import LoadingView from "@/components/loading/LoadingView";
import Step from "@/components/step/Step";
import Title from "@/components/title/Title";
import Layout from "@/layout/Layout";
import { getProducts } from "@/store/features/cart/cartThunk";
import { formatCurrency } from "@/utils/format";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);
  return (
    <>
      <Layout>
        <section className="mt-40">
          <div className="flex flex-col gap-y-5">
            <div className="grid grid-cols-12 gap-5 p-2 font-medium border-b-2 border-primary">
              <p className="col-span-8">Sản phẩm</p>
              <p className="place-self-center">Giá</p>
              <p className="place-self-center">Số lượng</p>
              <p className="place-self-center">Tổng tiền</p>
              <p className="place-self-center">Thao tác</p>
            </div>
            {products?.length > 0 &&
              products.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}

            {products?.length === 0 && (
              <div className="flex items-center justify-center">
                <p>Không có sản phẩm nào trong giỏ hàng của bạn .</p>
              </div>
            )}

            {products?.length > 0 && (
              <div className="grid grid-cols-12 gap-5 p-2 font-medium border-b border-gray-300 ">
                <p className="col-span-9">Chọn đơn vị vận chuyển</p>
                <p className="flex flex-col place-self-center gap-y-3">
                  <input type="radio" />
                  <input type="radio" />
                  <input type="radio" />
                </p>
              </div>
            )}

            {products?.length > 0 && (
              <div className="grid grid-cols-12 gap-5 p-2">
                <div className="flex items-center col-span-6 gap-x-5">
                  <span>Voucher</span>
                  <span className="font-medium text-blue-500 cursor-pointer">
                    Chọn mã
                  </span>
                  <span className="text-secondary">KM50PERCENT</span>
                </div>

                <div className="col-span-4 place-self-center">
                  <p>
                    {`Tổng thanh toán (${products.length} sản phẩm) : `}
                    <span className="text-secondary">
                      {formatCurrency(
                        products.reduce((acc, item) => {
                          return acc + item.product.price * item.quantity;
                        }, 0)
                      )}
                    </span>
                  </p>
                </div>
                <div className="col-span-2 place-self-center">
                  <Button className="p-2 bg-primary text-main">
                    Đi đến thanh toán
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Cart;
