require("dotenv").config();
const Gender = require("../models/genderModel");
const generateSlug = require("../utils/generateSlug");

const genders = [
  {
    name: "Nam",
    slug: generateSlug("Nam"),
  },
  {
    name: "Nữ",
    slug: generateSlug("Nữ"),
  },
];

const seedGender = async () => {
  try {
    const addGenders = genders.map(async (gender) => {
      const newGender = await Gender.create(gender);
      return await newGender.save();
    });

    const results = await Promise.all(addGenders);
    if (results.length > 0) {
      console.log("Added categories successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedGender;
