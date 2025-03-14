import React, { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createOrder, capturePayment } from "../../utils/paypalAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getProducts } from "@/store/features/cart/cartThunk";
import { useNavigate } from "react-router-dom";
import { setVoucher } from "@/store/features/order/orderSlice";

function PaypalButton({ dataOrder }) {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (success && message) {
      toast.success(message);
      localStorage.removeItem("voucher");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("shippingMethod");
      dispatch(getProducts());
      dispatch(setVoucher(null));
      navigate("/user/order");
    } else if (!success && message) {
      toast.error(message);
    }
  }, [message]);
  return (
    <PayPalButtons
      style={{
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
      }}
      createOrder={async () => {
        try {
          const response = await createOrder(dataOrder?.products);

          const orderData = await response;

          if (orderData.id) {
            return orderData.id;
          } else {
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);

            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error(error);
          setSuccess(false);
          setMessage(`Could not initiate PayPal Checkout...${error}`);
        }
      }}
      onApprove={async (data, actions) => {
        if (!dataOrder.shipping) {
          toast.error("Vui lòng chọn phương thức vận chuyển !");
        } else if (!dataOrder.address) {
          toast.error("Vui lòng chọn địa chỉ của bạn !");
        } else {
          try {
            const response = await capturePayment({
              orderID: data.orderID,
              data: dataOrder,
            });

            const orderData = await response;

            const errorDetail = orderData?.jsonResponse?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
              return actions.restart();
            } else if (errorDetail) {
              throw new Error(
                `${errorDetail.description} (${orderData.debug_id})`
              );
            } else {
              setSuccess(true);
              setMessage(orderData.message);
            }
          } catch (error) {
            console.error(error);
            setSuccess(false);
            setMessage(
              `Sorry, your transaction could not be processed...${error}`
            );
          }
        }
      }}
    />
  );
}

export default PaypalButton;
