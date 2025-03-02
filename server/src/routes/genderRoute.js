const express = require("express");
const { getGenders } = require("../controllers/genderController");

const genderRouter = express.Router();

genderRouter.get("/list", getGenders);

module.exports = genderRouter;
