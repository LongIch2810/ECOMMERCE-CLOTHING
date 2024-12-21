const Gender = require("../models/genderModel");

const getGendersService = async () => {
  try {
    const genders = await Gender.find({});
    return { SC: 200, success: true, genders };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = { getGendersService };
