const {
  getBrandsService,
  getFilterBrandsService,
  addBrandService,
  editBrandService,
  deleteBrandService,
  getBrandByIdService,
} = require("../services/brandService");

const generateSlug = require("../utils/generateSlug");

const cloudinary = require("../configs/cloudinary");

const getBrands = async (req, res) => {
  const data = await getBrandsService();
  if (data.SC === 200 && data?.brands) {
    return res.status(200).json({ success: true, brands: data.brands });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getFilterBrands = async (req, res) => {
  const { page, limit, name } = req.body;
  const data = await getFilterBrandsService({
    page,
    limit,
    name,
  });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const addBrand = async (req, res) => {
  const { name } = req.body;
  console.log(">>> req.body : ", req.body);
  console.log(">>> req.body.name : ", name);
  const logo = req.file;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Tên thương hiệu không được để trống !",
    });
  }

  if (!logo) {
    return res
      .status(400)
      .json({ success: false, message: "Logo không được để trống !" });
  }

  const slug = generateSlug(name);

  // Upload ảnh lên Cloudinary
  const uploadResult = await cloudinary.uploader.upload(logo.path, {
    folder: "logo", // Lưu vào thư mục logo trên Cloudinary
  });

  const data = await addBrandService({
    name,
    slug,
    logo: uploadResult.secure_url,
  });

  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const editBrand = async (req, res) => {
  const { id: brandId } = req.params;
  const logo = req.file;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Tên thương hiệu không được để trống !",
    });
  }

  if (!logo) {
    return res
      .status(400)
      .json({ success: false, message: "Logo không được để trống !" });
  }

  // Upload ảnh lên Cloudinary
  const uploadResult = await cloudinary.uploader.upload(logo.path, {
    folder: "logo", // Lưu vào thư mục logo trên Cloudinary
  });

  const data = await editBrandService({
    brandId,
    name,
    logo: uploadResult.secure_url,
  });

  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const deleteBrand = async (req, res) => {
  const { id: brandId } = req.params;
  if (!brandId) {
    return res
      .status(400)
      .json({ success: false, message: "Mã thương hiệu không hợp lệ !" });
  }
  const result = await deleteBrandService(brandId);
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const getBrandById = async (req, res) => {
  const { id: brandId } = req.params;
  console.log(brandId);
  if (!brandId) {
    return res
      .status(400)
      .json({ success: false, message: "Mã thương hiệu không hợp lệ !" });
  }
  const result = await getBrandByIdService(brandId);
  if (result.SC === 200 && result?.brand) {
    return res.status(200).json({ success: true, brand: result.brand });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = {
  getBrands,
  getFilterBrands,
  addBrand,
  editBrand,
  deleteBrand,
  getBrandById,
};
