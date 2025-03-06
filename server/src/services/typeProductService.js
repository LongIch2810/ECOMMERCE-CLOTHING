const Category = require("../models/categoryModel");
const TypeProduct = require("../models/typeProductModel");
const generateSlug = require("../utils/generateSlug");

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

const editTypeProductService = async ({ typeProductId, name, category_id }) => {
  try {
    const existingTypeProduct = await TypeProduct.findById(typeProductId);
    if (!existingTypeProduct) {
      return {
        SC: 404,
        success: false,
        message: "Loại sản phẩm không tồn tại",
      };
    }

    if (name) {
      const isNameTaken = await TypeProduct.findOne({
        name,
        _id: { $ne: typeProductId },
      });
      if (isNameTaken) {
        return {
          SC: 400,
          success: false,
          message: "Tên loại sản phẩm đã tồn tại",
        };
      }
      const slug = generateSlug(name);
      existingTypeProduct.name = name;
      existingTypeProduct.slug = slug;
    } else {
      return {
        SC: 400,
        success: false,
        message: "Tên loại sản phẩm không được để trống !",
      };
    }

    if (category_id) {
      const isCategoryExist = await Category.findById(category_id);
      if (!isCategoryExist) {
        return { SC: 400, success: false, message: "Danh mục không hợp lệ" };
      }
      existingTypeProduct.category = category_id;
    } else {
      return {
        SC: 400,
        success: false,
        message: "Danh mục không được để trống !",
      };
    }

    await existingTypeProduct.save();

    return {
      SC: 200,
      success: true,
      message: "Cập nhật thông tin loại sản phẩm thành công",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const deleteTypeProductService = async (typeProductId) => {
  try {
    const existingTypeProduct = await TypeProduct.findById(typeProductId);
    if (!existingTypeProduct) {
      return {
        SC: 404,
        success: false,
        message: "Loại sản phẩm không tồn tại",
      };
    }

    await TypeProduct.delete({ _id: typeProductId });

    return { SC: 200, success: true, message: "Xóa loại sản phẩm thành công" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getTypeProductByIdService = async (typeProductId) => {
  try {
    const typeProduct = await TypeProduct.findById(typeProductId).populate(
      "category"
    );

    if (!typeProduct) {
      return {
        SC: 404,
        success: false,
        message: "Loại sản phẩm không tồn tại",
      };
    }

    return { SC: 200, success: true, typeProduct };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getTypeProductsService,
  getFilterTypeProductsService,
  addTypeProductService,
  editTypeProductService,
  deleteTypeProductService,
  getTypeProductByIdService,
};
