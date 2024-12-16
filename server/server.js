const express = require("express");
require("dotenv").config();
const connectDB = require("./src/configs/db");
const configs = require("./src/configs/config");

//create app
const app = express();

//declare port
const PORT = process.env.PORT || 8000;

//connected database
connectDB();

//config
configs(app);

//declare route
app.use("/", (req, res) => res.send("hello world!"));

app.listen(PORT, () => console.log(`Server is now running on ${PORT}`));
