require("dotenv").config();
const Subcategory = require("../models/subcategoryModel");
const TypeProduct = require("../models/typeProductModel");
const generateSlug = require("../utils/generateSlug");

const typeProducts = [
  {
    name: "Áo sơ mi",
    description: "Chiếc áo sơ mi thời trang, thoải mái, phù hợp với mọi dịp.",
  },
  {
    name: "Áo phông",
    description: "Áo phông năng động, trẻ trung, dễ phối đồ.",
  },
  {
    name: "Áo khoác",
    description: "Áo khoác ấm áp và phong cách, lý tưởng cho ngày lạnh.",
  },
  {
    name: "Áo sweater",
    description: "Sweater đa năng, phù hợp cho mùa thu đông.",
  },
  {
    name: "Áo polo",
    description: "Áo polo lịch sự, thoáng mát, phù hợp với nhiều hoàn cảnh.",
  },
  {
    name: "Áo vest",
    description: "Áo vest sang trọng, tạo phong thái chuyên nghiệp.",
  },
  {
    name: "Quần âu",
    description: "Quần âu lịch lãm, phù hợp môi trường công sở.",
  },
  {
    name: "Quần jean",
    description: "Quần jean năng động, không thể thiếu trong tủ đồ.",
  },
  {
    name: "Quần kaki",
    description: "Quần kaki thoải mái, dễ phối hợp trang phục.",
  },
  {
    name: "Quần gió",
    description: "Quần gió nhẹ nhàng, phù hợp cho các hoạt động ngoài trời.",
  },
  {
    name: "Quần đùi",
    description: "Quần đùi thoáng mát, lý tưởng cho mùa hè.",
  },
  {
    name: "Chân váy",
    description: "Chân váy nữ tính, thanh lịch, dễ dàng kết hợp.",
  },
  {
    name: "Bộ váy",
    description:
      "Bộ váy là lựa chọn hoàn hảo cho những dịp đặc biệt hoặc thường ngày, mang đến sự thanh lịch và thoải mái cho người mặc. Với thiết kế đa dạng từ cổ điển đến hiện đại, sản phẩm phù hợp với nhiều phong cách thời trang khác nhau.",
  },
];

//áo 6
//quần 5
//váy 2

const addTypeProductsBySubcategory = async (slug, arr, gender) => {
  const subcategory = await Subcategory.findOne({ slug });

  const addTypeProducts = arr.map(async (typeProduct) => {
    const newTypeProduct = await TypeProduct.create({
      ...typeProduct,
      subcategory: subcategory._id,
      slug: generateSlug(`${typeProduct.name} ${gender}`),
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

    /*-----------------------------------Thêm các loại sản phẩm của nam---------------------------------- */
    const results1 = await addTypeProductsBySubcategory(
      "ao-nam",
      shirts,
      "Nam"
    );
    const results2 = await addTypeProductsBySubcategory(
      "quan-nam",
      trousers,
      "Nam"
    );

    /*-----------------------------------Thêm các loại sản phẩm của nữ---------------------------------- */
    const results3 = await addTypeProductsBySubcategory("ao-nu", shirts, "Nữ");
    const results4 = await addTypeProductsBySubcategory(
      "quan-nu",
      trousers,
      "Nữ"
    );
    const results5 = await addTypeProductsBySubcategory(
      "vay-nu",
      dresses,
      "Nữ"
    );

    /*-----------------------------------Thêm các loại sản phẩm của trẻ em---------------------------------- */
    const results6 = await addTypeProductsBySubcategory(
      "ao-tre-em",
      shirts,
      "Trẻ em"
    );
    const results7 = await addTypeProductsBySubcategory(
      "quan-tre-em",
      trousers,
      "Trẻ em"
    );
    const results8 = await addTypeProductsBySubcategory(
      "vay-tre-em",
      dresses,
      "Trẻ em"
    );

    if (
      results1.length > 0 &&
      results2.length > 0 &&
      results3.length > 0 &&
      results4.length > 0 &&
      results5.length > 0 &&
      results6.length > 0 &&
      results7.length > 0 &&
      results8.length > 0
    ) {
      console.log("Added typeProducts successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedTypeProduct;
