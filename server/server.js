const express = require("express");
require("dotenv").config();
const connectDB = require("./src/configs/db");
const configs = require("./src/configs/config");
const authRouter = require("./src/routes/authRoute");
const userRouter = require("./src/routes/userRoute");

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

app.listen(PORT, () => console.log(`Server is now running on ${PORT}`));
