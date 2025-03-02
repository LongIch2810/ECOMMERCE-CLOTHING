require("dotenv").config();
const Cart = require("../models/cartModel");
const User = require("../models/userModel");

const users = [
  {
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASS,
    role: "Admin",
  },
  {
    name: "anhlong",
    email: "ichlong2810@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test1",
    email: "test1@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test2",
    email: "test2@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test3",
    email: "test3@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test4",
    email: "test4@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test5",
    email: "test5@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test6",
    email: "test6@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test7",
    email: "test7@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test8",
    email: "test8@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test9",
    email: "test9@gmail.com",
    password: "12345678",
    role: "Customer",
  },
  {
    name: "test10",
    email: "test10@gmail.com",
    password: "12345678",
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
