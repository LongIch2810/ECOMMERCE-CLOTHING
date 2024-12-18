require("dotenv").config();
const Category = require("../models/categoryModel");
const generateSlug = require("../utils/generateSlug");

const categories = [
  {
    name: "Nam",
    description:
      "Khám phá bộ sưu tập thời trang nam độc đáo, nơi kết hợp hoàn hảo giữa phong cách hiện đại và sự tinh tế cổ điển. Từ những bộ vest lịch lãm, trang phục công sở sang trọng đến đồ casual năng động và đồ thể thao thoải mái, chúng tôi mang đến cho bạn mọi lựa chọn để thể hiện cá tính riêng. Dù bạn diện đồ đi làm, dự tiệc hay dạo phố cuối tuần, chất liệu cao cấp và thiết kế đa dạng sẽ giúp bạn luôn tự tin và nổi bật.",
    slug: generateSlug("Nam"),
  },
  {
    name: "Nữ",
    description:
      "Khám phá bộ sưu tập thời trang nữ tinh tế, nơi tôn vinh vẻ đẹp và cá tính của bạn qua từng thiết kế. Từ những chiếc váy quyến rũ, trang phục công sở thanh lịch, đến đồ casual năng động và đồ dạ hội lộng lẫy, chúng tôi mang đến sự đa dạng để bạn luôn tự tin trong mọi khoảnh khắc. Với chất liệu cao cấp và xu hướng thời trang hiện đại, hãy để phong cách của bạn tỏa sáng ở bất kỳ nơi đâu.",
    slug: generateSlug("Nữ"),
  },
  {
    name: "Trẻ em",
    description:
      "Mang đến những bộ trang phục đáng yêu và thoải mái nhất cho các bé yêu của bạn. Bộ sưu tập thời trang trẻ em của chúng tôi được thiết kế với chất liệu an toàn, mềm mại, phù hợp cho làn da nhạy cảm. Từ quần áo hằng ngày năng động, váy áo xinh xắn, đến trang phục dự tiệc sang trọng, chúng tôi có mọi lựa chọn để bé luôn thoải mái vui chơi và tỏa sáng.",
    slug: generateSlug("Trẻ em"),
  },
];

const seedCategory = async () => {
  try {
    const addCategories = categories.map(async (category) => {
      const newCategory = await Category.create(category);
      return await newCategory.save();
    });

    const results = await Promise.all(addCategories);
    if (results.length > 0) {
      console.log("Added categories successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedCategory;
