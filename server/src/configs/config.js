const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173/",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const configs = (app) => {
  //config cors
  app.options(
    "*",
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  app.use(
    cors({
      origin: "http://localhost:5173",
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
