const Shipping = require("../models/shippingModel");

const getShippingService = async () => {
  try {
    const shipping = await Shipping.find({});
    return { SC: 200, success: true, shipping };
  } catch (error) {
    console.log(error);
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = { getShippingService };
