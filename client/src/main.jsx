import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store/store";
import "rc-pagination/assets/index.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
  "enable-funding": "venmo",
  "disable-funding": "",
  "buyer-country": "US",
  currency: "USD",
  "data-page-type": "product-details",
  components: "buttons",
  "data-sdk-integration-source": "developer-studio",
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PayPalScriptProvider options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </Provider>
    <ToastContainer></ToastContainer>
  </BrowserRouter>
);
