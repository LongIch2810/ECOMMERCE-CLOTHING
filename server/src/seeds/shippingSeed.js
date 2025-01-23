const Shipping = require("../models/shippingModel");
const shipping = [
  {
    shipping_method: "Tiết kiệm",
    shipping_price: 20000,
  },
  {
    shipping_method: "Nhanh",
    shipping_price: 50000,
  },
  {
    shipping_method: "Hỏa tốc",
    shipping_price: 100000,
  },
];

const seedShipping = async () => {
  try {
    const addShipping = shipping.map(async (shipping) => {
      const newShipping = await Shipping.create(shipping);
      return await newShipping.save();
    });

    const results = await Promise.all(addShipping);
    if (results.length > 0) {
      console.log("Added shipping successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedShipping;
