const Color = require("../models/colorModel");

const getColorsService = async () => {
  try {
    const colors = await Color.find({}).select("_id name hexCode");
    return { SC: 200, success: true, colors };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getFilterColorsService = async ({ page = 1, limit = 5, name }) => {
  try {
    const filter = {};

    if (name) {
      filter.name = {};
      filter.name.$regex = `.*${name}.*`;
      filter.name.$options = "i";
    }
    const results = {};
    const skip = (page - 1) * limit;
    const colors = await Color.find(filter)
      .limit(limit)
      .select("-deleted -updatedAt -createdAt -__v")
      .skip(skip);
    const total_colors = await Color.countDocuments(filter);
    const total_pages = Math.ceil(total_colors / limit);
    results.total_colors = total_colors;
    results.total_pages = total_pages;
    results.current_page = page;
    results.colors = colors;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const addColorService = async (data) => {
  try {
    const { name } = data;
    const color = await Color.findOne({ name });
    if (color) {
      return { SC: 400, success: false, message: "Màu sắc đã tồn tại !" };
    }
    const newColor = new Color(data);
    await newColor.save();
    return { SC: 201, success: true, message: "Thêm màu mới thành công !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getColorsService,
  getFilterColorsService,
  addColorService,
};
