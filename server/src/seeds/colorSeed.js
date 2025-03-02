const Color = require("../models/colorModel");

const colors = [
  { name: "Đỏ", hexCode: "#FF0000" },
  { name: "Xanh Dương", hexCode: "#0000FF" },
  { name: "Xanh Lá", hexCode: "#00FF00" },
  { name: "Vàng", hexCode: "#FFFF00" },
  { name: "Cam", hexCode: "#FFA500" },
  { name: "Hồng", hexCode: "#FFC0CB" },
  { name: "Tím", hexCode: "#800080" },
  { name: "Đen", hexCode: "#000000" },
  { name: "Trắng", hexCode: "#FFFFFF" },
  { name: "Xám", hexCode: "#808080" },
  { name: "Nâu", hexCode: "#A52A2A" },
  { name: "Xanh Ngọc", hexCode: "#00CED1" },
];

const seedColor = async () => {
  try {
    const addColors = colors.map(async (color) => {
      const newColor = await Color.create(color);
      return await newColor.save();
    });

    const results = await Promise.all(addColors);
    if (results.length > 0) {
      console.log("Added colors successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedColor;
