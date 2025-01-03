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

app.listen(PORT, () => console.log(`Server is now running on ${PORT}`));
