import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import reviewReducer from "./features/review/reviewSlice";
import shippingReducer from "./features/shipping/shippingSlice";
import voucherReducer from "./features/voucher/voucherSlice";
import orderReducer from "./features/order/orderSlice";
import addressReducer from "./features/address/addressSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    review: reviewReducer,
    shipping: shippingReducer,
    voucher: voucherReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
