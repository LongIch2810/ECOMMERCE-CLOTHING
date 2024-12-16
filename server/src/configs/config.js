const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const configs = (app) => {
  //config cors
  app.use(
    cors({
      origin: "https://localhost:5173/",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );

  //config cookie
  app.use(cookieParser());

  //config req.body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};
module.exports = configs;
