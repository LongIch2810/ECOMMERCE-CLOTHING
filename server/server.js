const express = require("express");
require("dotenv").config();
const connectDB = require("./src/configs/db");
const configs = require("./src/configs/config");
const authRouter = require("./src/routes/authRoute");
const userRouter = require("./src/routes/userRoute");
const productRouter = require("./src/routes/productRoute");
const cartRouter = require("./src/routes/cartRoute");
const genderRouter = require("./src/routes/genderRoute");
const reviewRouter = require("./src/routes/reviewRoute");
const addressRouter = require("./src/routes/addressRoute");
const shippingRouter = require("./src/routes/shippingRoute");
const voucherRouter = require("./src/routes/voucherRoute");
const orderRouter = require("./src/routes/orderRoute");
const stockRouter = require("./src/routes/stockRoute");
const paypalRouter = require("./src/routes/paypalRoute");
const typeProductRouter = require("./src/routes/typeProductRoute");
const sendMail = require("./src/configs/email");
const brandRouter = require("./src/routes/brandRoute");
const supplierRouter = require("./src/routes/supplierRoute");
const categoryRouter = require("./src/routes/categoryRoute");
const colorRouter = require("./src/routes/colorRoute");
const importReceiptRouter = require("./src/routes/importReceiptRoute");

//create app
const app = express();

//declare port
const PORT = process.env.PORT || 8000;

//connected database
connectDB();

//config
configs(app);

//declare route
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/gender", genderRouter);
app.use("/api/review", reviewRouter);
app.use("/api/address", addressRouter);
app.use("/api/shipping", shippingRouter);
app.use("/api/voucher", voucherRouter);
app.use("/api/order", orderRouter);
app.use("/api/stock", stockRouter);
app.use("/api/paypal", paypalRouter);
app.use("/api/type-product", typeProductRouter);
app.use("/api/brand", brandRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/category", categoryRouter);
app.use("/api/color", colorRouter);
app.use("/api/import-receipt", importReceiptRouter);

app.listen(PORT, () => console.log(`Server is now running on ${PORT}`));
