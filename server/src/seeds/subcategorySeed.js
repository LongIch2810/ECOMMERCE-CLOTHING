require("dotenv").config();
const Category = require("../models/categoryModel");
const Subcategory = require("../models/subcategoryModel");
const generateSlug = require("../utils/generateSlug");

const subcategories = [
  {
    name: "Áo",
    description:
      "Chiếc áo được thiết kế với sự kết hợp giữa phong cách hiện đại và sự thoải mái, phù hợp cho mọi lứa tuổi và mọi dịp. Với chất liệu vải cao cấp, mềm mại và thoáng khí, áo mang lại cảm giác dễ chịu suốt cả ngày. Dù bạn cần một chiếc áo cho công việc, dạo phố hay các hoạt động thường nhật, thiết kế đa dạng và tinh tế của chúng tôi sẽ đáp ứng mọi nhu cầu của bạn.",
  },
  {
    name: "Quần",
    description:
      "Chiếc quần này kết hợp giữa phong cách thời trang hiện đại và sự thoải mái, lý tưởng cho mọi hoạt động trong ngày. Được làm từ chất liệu vải cao cấp, bền đẹp và thoáng khí, quần mang lại sự dễ chịu tối đa cho người mặc. Với thiết kế tinh tế và kiểu dáng đa dạng, từ quần âu lịch lãm đến quần jeans năng động, chiếc quần này sẽ là lựa chọn hoàn hảo cho cả những buổi đi làm hay dạo phố cuối tuần.",
  },
  {
    name: "Váy",
    description:
      "Chiếc váy này được thiết kế tinh tế, giúp tôn vinh vẻ đẹp nữ tính và thanh lịch của bạn. Với chất liệu vải mềm mại, thoải mái và thoáng khí, váy mang đến cảm giác dễ chịu suốt cả ngày dài. Được tạo ra để phù hợp với nhiều dịp, từ những buổi tiệc trang trọng đến những ngày dạo phố thư giãn, váy của chúng tôi sẽ giúp bạn nổi bật và tự tin trong mọi khoảnh khắc.",
  },
];

const addSubcategoriesByCategory = async (slug, arr, gender) => {
  const category = await Category.findOne({ slug });
  const addSubcategories = arr.map(async (subcategory) => {
    const newSubcategory = await Subcategory.create({
      ...subcategory,
      category: category._id,
      slug: generateSlug(`${subcategory.name} ${gender}`),
    });
    return await newSubcategory.save();
  });

  return await Promise.all(addSubcategories);
};

const seedSubcategory = async () => {
  try {
    //Thêm danh mục con của Nam
    const subcategoriesCopy = subcategories.filter(
      (item) => item.name !== "Váy"
    );
    const results1 = await addSubcategoriesByCategory(
      "nam",
      subcategoriesCopy,
      "Nam"
    );

    //Thêm danh mục con của Nữ
    const results2 = await addSubcategoriesByCategory(
      "nu",
      subcategories,
      "Nữ"
    );

    //Thêm danh mục con của trẻ em
    const results3 = await addSubcategoriesByCategory(
      "tre-em",
      subcategories,
      "Trẻ em"
    );

    if (results1.length > 0 && results2.length > 0 && results3.length > 0) {
      console.log("Added subcategories successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedSubcategory;
