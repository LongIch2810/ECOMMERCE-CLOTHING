const express = require("express");
const { getGenders } = require("../controllers/genderController");

const genderRouter = express.Router();

//Lấy ra danh sách giới tính
genderRouter.get("/list", getGenders);

module.exports = genderRouter;
