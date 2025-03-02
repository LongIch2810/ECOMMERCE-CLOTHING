const TypeProduct = require("../models/typeProductModel");

const getTypeProductsService = async () => {
  try {
    const typeProducts = await TypeProduct.find({}).select("_id name slug");
    return { SC: 200, success: true, typeProducts };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getFilterTypeProductsService = async ({ page = 1, limit = 5, name }) => {
  try {
    const filter = {};

    if (name) {
      filter.name = {};
      filter.name.$regex = `.*${name}.*`;
      filter.name.$options = "i";
    }
    const results = {};
    const skip = (page - 1) * limit;
    const typeProducts = await TypeProduct.find(filter)
      .limit(limit)
      .skip(skip)
      .select("_id name slug");
    const total_typeProducts = await TypeProduct.countDocuments(filter);
    const total_pages = Math.ceil(total_typeProducts / limit);
    results.total_typeProducts = total_typeProducts;
    results.total_pages = total_pages;
    results.current_page = page;
    results.typeProducts = typeProducts;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const addTypeProductService = async (data) => {
  try {
    const new_type_product = new TypeProduct(data);
    await new_type_product.save();
    return { SC: 201, success: true, message: "Thêm loại sản phẩm thành công" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getTypeProductsService,
  getFilterTypeProductsService,
  addTypeProductService,
};
