import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MenProduct from "./pages/MenProduct";
import WomenProduct from "./pages/WomenProduct";
import KidProduct from "./pages/KidProduct";
import Voucher from "./pages/Voucher";
import Address from "./pages/Address";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/sign-in" element={<SignIn />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/address" element={<Address />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/men" element={<MenProduct />}></Route>
      <Route path="/women" element={<WomenProduct />}></Route>
      <Route path="/kid" element={<KidProduct />}></Route>
      <Route path="/voucher" element={<Voucher />}></Route>
    </Routes>
  );
}

export default App;
