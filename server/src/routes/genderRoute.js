const express = require("express");
const { getGenders } = require("../controllers/genderController");

const genderRouter = express.Router();

genderRouter.get("/", getGenders);

module.exports = genderRouter;
