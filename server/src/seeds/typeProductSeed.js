require("dotenv").config();
const Category = require("../models/categoryModel");
const TypeProduct = require("../models/typeProductModel");
const generateSlug = require("../utils/generateSlug");

const typeProducts = [
  {
    name: "Áo sơ mi",
  },
  {
    name: "Áo phông",
  },
  {
    name: "Áo khoác",
  },
  {
    name: "Áo sweater",
  },
  {
    name: "Áo polo",
  },
  {
    name: "Quần jean",
  },
  {
    name: "Quần kaki",
  },
  {
    name: "Quần gió",
  },
  {
    name: "Quần short",
  },
  {
    name: "Chân váy",
  },
  {
    name: "Váy liền thân",
  },
];

//áo 6
//quần 5
//váy 2

const addTypeProductsBySubcategory = async (slug, arr) => {
  const category = await Category.findOne({ slug });

  const addTypeProducts = arr.map(async (typeProduct) => {
    const newTypeProduct = await TypeProduct.create({
      ...typeProduct,
      category: category._id,
      slug: generateSlug(`${typeProduct.name}`),
    });
    return await newTypeProduct.save();
  });

  return await Promise.all(addTypeProducts);
};

const seedTypeProduct = async () => {
  try {
    //Chia loại sản phẩm
    const shirts = typeProducts.filter((item) =>
      item.name.toLowerCase().includes("áo")
    );
    const trousers = typeProducts.filter((item) =>
      item.name.toLowerCase().includes("quần")
    );
    const dresses = typeProducts.filter((item) =>
      item.name.toLowerCase().includes("váy")
    );

    const results1 = await addTypeProductsBySubcategory("ao", shirts);
    const results2 = await addTypeProductsBySubcategory("quan", trousers);
    const results3 = await addTypeProductsBySubcategory("vay", dresses);

    if (results1.length > 0 && results2.length > 0 && results3.length > 0) {
      console.log("Added typeProducts successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedTypeProduct;
