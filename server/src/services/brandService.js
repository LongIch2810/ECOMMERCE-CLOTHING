const Brand = require("../models/brandModel");

const getBrandsService = async () => {
  try {
    const brands = await Brand.find({}).select("_id name slug");
    return { SC: 200, success: true, brands };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getFilterBrandsService = async ({ page = 1, limit = 5, name }) => {
  try {
    const filter = {};

    if (name) {
      filter.name = {};
      filter.name.$regex = `.*${name}.*`;
      filter.name.$options = "i";
    }
    const results = {};
    const skip = (page - 1) * limit;
    const brands = await Brand.find(filter)
      .limit(limit)
      .select("-deleted -updatedAt -createdAt -__v")
      .skip(skip);
    const total_brands = await Brand.countDocuments(filter);
    const total_pages = Math.ceil(total_brands / limit);
    results.total_brands = total_brands;
    results.total_pages = total_pages;
    results.current_page = page;
    results.brands = brands;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const addBrandService = async (data) => {
  try {
    const newBrand = new Brand(data);
    await newBrand.save();
    return { SC: 201, success: true, message: "Thêm thương hiệu thành công" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getBrandsService,
  getFilterBrandsService,
  addBrandService,
};
