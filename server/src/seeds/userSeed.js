require("dotenv").config();
const Cart = require("../models/cartModel");
const User = require("../models/userModel");

const users = [
  {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASS,
    phone: process.env.ADMIN_PHONE,
    role: "Admin",
  },
  {
    name: "anhlong",
    email: "ichlong2810@gmail.com",
    password: "12345678",
    phone: "0945762064",
    role: "Customer",
  },
];

const seedUser = async () => {
  try {
    const addUsers = users.map(async (user) => {
      const newUser = await User.create(user);
      await newUser.save();
      if (user.role === "Customer") {
        await Cart.create({
          user: newUser._id,
        });
      }
      return newUser;
    });
    const results = await Promise.all(addUsers);
    if (results.length > 0) {
      console.log("Added users successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedUser;
