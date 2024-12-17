require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/userModel");
const seedUser = require("../seeds/userSeed");
const state = [
  {
    value: 0,
    label: "Disconnected",
  },
  {
    value: 1,
    label: "Connected",
  },
  {
    value: 2,
    label: "Connecting",
  },
  {
    value: 3,
    label: "Disconnecting",
  },
];
const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGO_URL}/shopDev`);
  if (mongoose.connection.readyState === 1) {
    const countUser = await User.countDocuments();
    if (countUser === 0) {
      await seedUser();
    }
  }
  console.log(
    `${
      state.find((item) => item.value === mongoose.connection.readyState).label
    } to database`
  );
};

module.exports = connectDB;
