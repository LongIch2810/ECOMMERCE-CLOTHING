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
import typeProductReducer from "./features/typeProduct/typeProductSlice";
import genderReducer from "./features/gender/genderSlice";
import brandReducer from "./features/brand/brandSlice";
import supplierReducer from "./features/supplier/supplierSlice";
import statisticalReducer from "./features/statistical/statisticalSlice";
import categoryReducer from "./features/category/categorySlice";

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
    typeProduct: typeProductReducer,
    gender: genderReducer,
    brand: brandReducer,
    supplier: supplierReducer,
    statistical: statisticalReducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
