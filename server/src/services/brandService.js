const Brand = require("../models/brandModel");
const generateSlug = require("../utils/generateSlug");
const { getPublicId, deleteImage } = require("../utils/uploadImages");

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

const editBrandService = async ({ brandId, name, logo }) => {
  try {
    // Kiểm tra xem thương hiệu có tồn tại không
    const existingBrand = await Brand.findById(brandId);
    if (!existingBrand) {
      return { SC: 404, success: false, message: "Thương hiệu không tồn tại" };
    }

    // Kiểm tra name không được để trống
    if (!name) {
      return {
        SC: 400,
        success: false,
        message: "Tên thương hiệu không được để trống!",
      };
    }

    // Kiểm tra xem tên thương hiệu có bị trùng không
    const isNameTaken = await Brand.findOne({ name, _id: { $ne: brandId } });
    if (isNameTaken) {
      return { SC: 400, success: false, message: "Tên thương hiệu đã tồn tại" };
    }

    const publicId = getPublicId(existingBrand.logo);

    await deleteImage(publicId);

    const slug = generateSlug(name);
    existingBrand.name = name;
    existingBrand.slug = slug;
    existingBrand.logo = logo;

    await existingBrand.save();

    return {
      SC: 200,
      success: true,
      message: "Cập nhật thương hiệu thành công",
      data: existingBrand,
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const deleteBrandService = async (brandId) => {
  try {
    const existingBrand = await Brand.findById(brandId);
    if (!existingBrand) {
      return {
        SC: 404,
        success: false,
        message: "Thương hiệu không tồn tại",
      };
    }

    await Brand.delete({ _id: brandId });

    return { SC: 200, success: true, message: "Xóa thương hiệu thành công" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getBrandByIdService = async (brandId) => {
  try {
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return {
        SC: 404,
        success: false,
        message: "Thương hiệu không tồn tại",
      };
    }

    return { SC: 200, success: true, brand };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getBrandsService,
  getFilterBrandsService,
  addBrandService,
  editBrandService,
  deleteBrandService,
  getBrandByIdService,
};
