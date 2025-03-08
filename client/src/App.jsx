import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Product from "./pages/Product";
import Voucher from "./pages/Voucher";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import MyVoucher from "./pages/MyVoucher";
import Address from "./pages/Address";
import PageNotFound from "./pages/PageNotFound";
import Admin from "./admin/src/pages/Admin";
import { AddUser, UserList } from "./admin/src/pages/UserManagement";
import {
  AddTypeProduct,
  TypeProductList,
} from "./admin/src/pages/TypeProductManagement";
import { AddProduct, ProductList } from "./admin/src/pages/ProductManagement";
import { AddBrand, BrandList } from "./admin/src/pages/BrandManagement";
import { OrderList } from "./admin/src/pages/OrderManagement";
import {
  AddSupplier,
  SupplierList,
} from "./admin/src/pages/SupplierManagement";
import { AddVoucher, VoucherList } from "./admin/src/pages/VoucherManagement";
import { AddReceipt, ReceiptList } from "./admin/src/pages/StockManagement";
import Dashboard from "./admin/src/components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "./store/features/user/userThunk";
import Payment from "./pages/Payment";
import ForgotPassword from "./pages/ForgotPassword";
import { AddColor, ColorList } from "./admin/src/pages/ColorManagement";
import OrderDetail from "./pages/OrderDetail";
import StatisticalInStock from "./admin/src/pages/StatisticalInStock";
import StatisticalRevenueDetail from "./admin/src/pages/StatisticalRevenueDetail";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  // if (loading) return <LoadingView />;
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/product" element={<Product />}></Route>
      <Route path="/voucher" element={<Voucher />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/order/:orderId" element={<OrderDetail />}></Route>

      {/* User Routes */}
      <Route path="/user">
        <Route path="profile" element={<Profile />} />
        <Route path="order" element={<Order />} />
        <Route path="voucher" element={<MyVoucher />} />
        <Route path="address" element={<Address />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/*" element={<Admin />}>
        <Route index element={<Dashboard />} /> {/* 📌 Trang mặc định */}
        <Route path="users/list" element={<UserList />} />
        <Route path="users/add-user" element={<AddUser />} />
        <Route path="type_products/list" element={<TypeProductList />} />
        <Route
          path="type_products/add-type-product"
          element={<AddTypeProduct />}
        />
        <Route path="products/list" element={<ProductList />} />
        <Route path="products/add-product" element={<AddProduct />} />
        <Route path="brands/list" element={<BrandList />} />
        <Route path="brands/add-brand" element={<AddBrand />} />
        <Route path="orders/list" element={<OrderList />} />
        <Route path="suppliers/list" element={<SupplierList />} />
        <Route path="suppliers/add-supplier" element={<AddSupplier />} />
        <Route path="vouchers/list" element={<VoucherList />} />
        <Route path="vouchers/add-voucher" element={<AddVoucher />} />
        <Route path="colors/list" element={<ColorList />} />
        <Route path="colors/add-color" element={<AddColor />} />
        <Route path="stock-in/list" element={<ReceiptList />} />
        <Route path="stock-in/add-receipt" element={<AddReceipt />} />
        <Route path="statistical/in-stock" element={<StatisticalInStock />} />
        <Route
          path="statistical/revenue-detail"
          element={<StatisticalRevenueDetail />}
        />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
