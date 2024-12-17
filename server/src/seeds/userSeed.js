require("dotenv").config();
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
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
    phone: "0123456781",
    role: "Customer",
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
    phone: "0123456782",
    role: "Customer",
  },
  {
    name: "user3",
    email: "user3@example.com",
    password: "12345678",
    phone: "0123456783",
    role: "Customer",
  },
  {
    name: "user4",
    email: "user4@example.com",
    password: "12345678",
    phone: "0123456784",
    role: "Customer",
  },
];

const seedUser = async () => {
  try {
    const addUsers = users.map(async (user) => {
      const newUser = await User.create(user);
      return await newUser.save();
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
