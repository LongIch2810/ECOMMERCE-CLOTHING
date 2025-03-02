const {
  getBrandsService,
  getFilterBrandsService,
  addBrandService,
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

module.exports = { getBrands, getFilterBrands, addBrand };
