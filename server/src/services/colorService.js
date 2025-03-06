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

const editColorService = async ({ colorId, name, hexCode }) => {
  try {
    const existingColor = await Color.findById(colorId);
    if (!existingColor) {
      return {
        SC: 404,
        success: false,
        message: "Màu sắc không tồn tại",
      };
    }

    if (name) {
      const isNameTaken = await Color.findOne({
        name,
        _id: { $ne: colorId },
      });
      if (isNameTaken) {
        return {
          SC: 400,
          success: false,
          message: "Tên màu sắc đã tồn tại",
        };
      }

      existingColor.name = name;
    } else {
      return res.status(400).json({
        success: true,
        message: "Tên màu sắc không được để trống !",
      });
    }

    if (hexCode) {
      const isHexCodeTaken = await Color.findOne({
        hexCode,
        _id: { $ne: colorId },
      });
      if (isHexCodeTaken) {
        return {
          SC: 400,
          success: false,
          message: "Mã màu đã tồn tại",
        };
      }

      existingColor.hexCode = hexCode;
    } else {
      return res.status(400).json({
        success: true,
        message: "Mã màu không được để trống !",
      });
    }

    await existingColor.save();

    return {
      SC: 200,
      success: true,
      message: "Cập nhật thông tin màu sắc thành công",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const deleteColorService = async (colorId) => {
  try {
    const existingColor = await Color.findById(colorId);
    if (!existingColor) {
      return {
        SC: 404,
        success: false,
        message: "Màu sắc không tồn tại",
      };
    }

    await Color.delete({ _id: colorId });

    return { SC: 200, success: true, message: "Xóa màu sắc thành công" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getColorByIdService = async (colorId) => {
  try {
    const color = await Color.findById(colorId);

    if (!color) {
      return {
        SC: 404,
        success: false,
        message: "Màu sắc không tồn tại",
      };
    }

    return { SC: 200, success: true, color };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getColorsService,
  getFilterColorsService,
  addColorService,
  editColorService,
  deleteColorService,
  getColorByIdService,
};
