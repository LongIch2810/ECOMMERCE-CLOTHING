const Gender = require("../models/genderModel");
const Product = require("../models/productModel");
const Stock = require("../models/stockModel");

const getProductsService = async ({ page = 1, limit = 10 }) => {
  try {
    const results = {};
    const skip = (page - 1) * limit;
    const total_products = await Product.countDocuments();
    const products = await Product.find({})
      .limit(limit)
      .skip(skip)
      .populate("type_product")
      .populate("brand")
      .populate("gender")
      .exec();
    results.total_products = total_products;
    results.total_pages = Math.ceil(total_products / limit);
    results.current_page = page;
    results.products = products;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getFilterProductsService = async ({
  page = 1,
  limit = 10,
  genders,
  typeProducts,
  brands,
  min_price,
  max_price,
  sort = 1,
  search,
}) => {
  try {
    const filter = {};

    //Lọc theo giá
    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = min_price;
      if (max_price) filter.price.$lte = max_price;
    }

    //Lọc theo loại sản phẩm
    if (typeProducts && typeProducts.length > 0) {
      filter.type_product = { $in: typeProducts };
    }

    //Lọc theo giới tính
    if (genders && genders.length > 0) {
      filter.gender = { $in: genders };
    }

    if (brands && brands.length > 0) {
      filter.brand = { $in: brands };
    }

    if (search) {
      filter.name = {};
      filter.name.$regex = `.*${search}.*`;
      filter.name.$options = "i";
    }

    const skip = (page - 1) * limit;
    const total_products = await Product.countDocuments(filter);
    const results = {};
    const products = await Product.find(filter)
      .limit(limit)
      .skip(skip)
      .populate("type_product")
      .populate("brand")
      .populate("gender")
      .sort(sort === 0 ? { createdAt: -1 } : { price: sort })
      .select("-__v -createdAt -updatedAt -deleted")
      .exec();
    results.total_products = total_products;
    results.total_pages = Math.ceil(total_products / limit);
    results.current_page = page;
    results.products = products;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getMenProductsService = async ({ slug }) => {
  try {
    const results = {};
    const gender = await Gender.findOne({ slug });
    const products = await Product.find({ gender: gender._id })
      .populate("type_product")
      .limit(10);
    results.products = products;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getWomenProductsService = async ({ slug }) => {
  try {
    const results = {};
    const gender = await Gender.findOne({ slug });
    const products = await Product.find({ gender: gender._id })
      .populate("type_product")
      .limit(10);
    results.products = products;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getRelatedProductsService = async ({ id }) => {
  try {
    const results = {};
    const product = await Product.findById(id);
    const products = await Product.find({
      type_product: product.type_product,
      _id: { $ne: id },
    })
      .populate("type_product")
      .limit(10);
    results.products = products;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getProductDetailService = async ({ id }) => {
  try {
    const stock = await Stock.findOne({
      product: id,
    })
      .populate({
        path: "product",
        populate: [{ path: "type_product" }, { path: "brand" }],
      })
      .populate("sizes.color")
      .select("-deleted -createdAt -updatedAt -__v");
    if (!stock) {
      return { SC: 404, success: false, message: "Sản phẩm không tồn tại !" };
    }

    const groupSizes = stock.sizes.reduce((acc, item) => {
      const indexSize = acc.findIndex((i) => i.size === item.size);
      if (indexSize !== -1) {
        acc[indexSize].colors.push({
          color: item.color,
          quantity: item.quantity,
          status: item.status,
        });
      } else {
        acc.push({
          size: item.size,
          colors: [
            { color: item.color, quantity: item.quantity, status: item.status },
          ],
        });
      }
      return acc;
    }, []);

    return {
      SC: 200,
      success: true,
      result: { ...stock.toObject(), sizes: groupSizes },
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getMaxPriceProductService = async () => {
  try {
    const products = await Product.find({}).sort({ price: -1 }).limit(1);

    // Kiểm tra nếu có sản phẩm, tránh lỗi undefined
    if (!products.length) {
      return { SC: 404, success: false, message: "No products found" };
    }

    return { SC: 200, success: true, max_price: products[0].price };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getMinPriceProductService = async () => {
  try {
    const products = await Product.find({}).sort({ price: 1 }).limit(1);

    // Kiểm tra nếu có sản phẩm
    if (!products.length) {
      return {
        SC: 404,
        success: false,
        message: "Danh sách sản phẩm không tồn tại !",
      };
    }

    return { SC: 200, success: true, min_price: products[0].price };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const addProductService = async (data) => {
  try {
    const newProduct = new Product(data);
    await newProduct.save();
    return { SC: 201, success: true, message: "Thêm sản phẩm thành công !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getProductsService,
  getMenProductsService,
  getWomenProductsService,
  getRelatedProductsService,
  getProductDetailService,
  getFilterProductsService,
  getMaxPriceProductService,
  getMinPriceProductService,
  addProductService,
};
