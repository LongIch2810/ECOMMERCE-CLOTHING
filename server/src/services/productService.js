const { default: mongoose } = require("mongoose");
const Gender = require("../models/genderModel");
const Product = require("../models/productModel");
const Stock = require("../models/stockModel");
const { getPublicIds, deleteImages } = require("../utils/uploadImages");

const getProductsService = async ({ page = 1, limit = 5, name }) => {
  try {
    const filter = {};

    if (name) {
      filter.name = {};
      filter.name.$regex = `.*${name}.*`;
      filter.name.$options = "i";
    }
    const results = {};
    const skip = (page - 1) * limit;
    const products = await Product.find(filter)
      .limit(limit)
      .select("-deleted -updatedAt -createdAt -__v")
      .populate("brand")
      .populate("type_product")
      .populate("gender")
      .skip(skip);
    const total_products = await Product.countDocuments(filter);
    const total_pages = Math.ceil(total_products / limit);
    results.total_products = total_products;
    results.total_pages = total_pages;
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
  limit = 8,
  genders,
  typeProducts,
  brands,
  min_price,
  max_price,
  sort = "price_asc",
  colors,
  search,
}) => {
  const skip = (page - 1) * limit;
  console.log(">>> brands : ", brands);
  console.log(">>> typeProducts : ", typeProducts);
  console.log(">>> genders : ", genders);
  try {
    const pipeline = [
      {
        $lookup: {
          from: "stocks",
          localField: "_id",
          foreignField: "product",
          as: "stock",
        },
      },
      {
        $match: {
          "stock.0": { $exists: true },
        },
      },
      { $unwind: "$stock" },
      { $unwind: "$stock.sizes" },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          price: { $first: "$price" },
          brand: { $first: "$brand" },
          type_product: { $first: "$type_product" },
          gender: { $first: "$gender" },
          images: { $first: "$images" },
          averageReview: { $first: "$averageReview" },
          description: { $first: "$description" },
          color_ids: { $addToSet: "$stock.sizes.color" },
        },
      },
      {
        $lookup: {
          from: "colors",
          localField: "color_ids",
          foreignField: "_id",
          as: "colors",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          brand: 1,
          type_product: 1,
          gender: 1,
          images: 1,
          averageReview: 1,
          description: 1,
          colors: {
            $map: {
              input: "$colors",
              as: "color",
              in: {
                _id: "$$color._id",
                hexCode: "$$color.hexCode",
              },
            },
          },
        },
      },
    ];

    const sortOptions = {
      newest: { createdAt: -1 },
      price_asc: { price: 1 },
      price_desc: { price: -1 },
    };

    if (sortOptions[sort]) {
      console.log(sortOptions[sort]);
      pipeline.push({ $sort: sortOptions[sort] });
    }

    const filter = {};

    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = min_price;
      if (max_price) filter.price.$lte = max_price;
    }

    if (typeProducts?.length) {
      const objectIds = typeProducts.map(
        (id) => new mongoose.Types.ObjectId(id)
      );
      filter.type_product = { $in: objectIds };
    }

    if (genders?.length) {
      const objectIds = genders.map((id) => new mongoose.Types.ObjectId(id));
      filter.gender = { $in: objectIds };
    }

    if (brands?.length) {
      const objectIds = brands.map((id) => new mongoose.Types.ObjectId(id));
      filter.brand = { $in: objectIds };
    }

    if (search) {
      filter.name = { $regex: `.*${search}.*`, $options: "i" };
    }

    pipeline.push({ $match: filter });

    if (colors?.length) {
      const objectIds = colors.map((id) => new mongoose.Types.ObjectId(id));
      pipeline.push({ $match: { "colors._id": { $in: objectIds } } });
    }

    pipeline.push({
      $facet: {
        total_count: [{ $count: "count" }],
        paginated_products: [
          { $skip: skip },
          { $limit: limit },
          {
            $lookup: {
              from: "typeproducts",
              localField: "type_product",
              foreignField: "_id",
              as: "type_product",
            },
          },
          {
            $lookup: {
              from: "brands",
              localField: "brand",
              foreignField: "_id",
              as: "brand",
            },
          },
          {
            $lookup: {
              from: "genders",
              localField: "gender",
              foreignField: "_id",
              as: "gender",
            },
          },
          {
            $unwind: {
              path: "$type_product",
              preserveNullAndEmptyArrays: true,
            },
          },
          { $unwind: { path: "$brand", preserveNullAndEmptyArrays: true } },
          { $unwind: { path: "$gender", preserveNullAndEmptyArrays: true } },
        ],
      },
    });

    const result = await Product.aggregate(pipeline);
    const total_products = result[0]?.total_count?.[0]?.count || 0;

    return {
      SC: 200,
      success: true,
      results: {
        total_products,
        total_pages: Math.ceil(total_products / limit),
        current_page: page,
        products: result[0]?.paginated_products || [],
      },
    };
  } catch (error) {
    console.error(error);
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

const editProductService = async ({
  productId,
  name,
  price,
  description,
  images,
  type_product,
  gender,
  brand,
}) => {
  try {
    console.log(productId);
    const existingProduct = await Product.findById(productId);
    console.log(existingProduct);
    if (!existingProduct) {
      return {
        SC: 404,
        success: false,
        message: "Sản phẩm không tồn tại",
      };
    }

    const publicIds = getPublicIds(existingProduct.images);

    await deleteImages(publicIds);

    existingProduct.name = name;
    existingProduct.price = price;
    existingProduct.description = description;
    existingProduct.images = images;
    existingProduct.type_product = type_product;
    existingProduct.gender = gender;
    existingProduct.brand = brand;

    await existingProduct.save();

    return {
      SC: 200,
      success: true,
      message: "Cập nhật thông tin sản phẩm thành công",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const deleteProductService = async (productId) => {
  try {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return {
        SC: 404,
        success: false,
        message: "Sản phẩm không tồn tại",
      };
    }

    await Product.delete({ _id: productId });

    return { SC: 200, success: true, message: "Xóa sản phẩm thành công" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getProductByIdService = async (productId) => {
  try {
    const product = await Product.findById(productId)
      .populate("gender")
      .populate("type_product")
      .populate("brand");
    if (!product) {
      return {
        SC: 404,
        success: false,
        message: "Sản phẩm không tồn tại",
      };
    }

    return { SC: 200, success: true, product };
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
  editProductService,
  deleteProductService,
  getProductByIdService,
};
