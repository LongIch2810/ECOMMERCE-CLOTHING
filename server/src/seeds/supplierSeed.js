const Supplier = require("../models/supplierModel");

const suppliers = [
  {
    name: "NIKE",
    email: "nike@gmail.com",
    description:
      "NIKE là thương hiệu thể thao hàng đầu thế giới, nổi tiếng với các sản phẩm chất lượng cao, phong cách hiện đại, và công nghệ tiên tiến. Từ giày thể thao đến quần áo và phụ kiện, NIKE luôn mang đến sự thoải mái, hiệu suất vượt trội và thời trang phù hợp với mọi nhu cầu của người dùng.",
  },
  {
    name: "ADIDAS",
    email: "adidas@gmail.com",
    description:
      "ADIDAS là thương hiệu thể thao biểu tượng toàn cầu, nổi tiếng với sự đổi mới và cam kết đem lại hiệu suất cao cho các vận động viên và người yêu thích thể thao. Với khẩu hiệu 'Impossible Is Nothing' (Không gì là không thể), ADIDAS không chỉ sản xuất giày thể thao, quần áo và phụ kiện mà còn truyền cảm hứng vượt qua mọi giới hạn.",
  },
  {
    name: "PUMA",
    email: "puma@gmail.com",
    description:
      "PUMA là một trong những thương hiệu thể thao hàng đầu thế giới, nổi tiếng với các sản phẩm kết hợp giữa hiệu suất cao, sự thoải mái và phong cách hiện đại. Với di sản lâu đời và sự đổi mới không ngừng, PUMA mang đến những thiết kế độc đáo và chất lượng vượt trội trong lĩnh vực giày dép, quần áo và phụ kiện thể thao.",
  },
];

const seedSupplier = async () => {
  try {
    const addSuppliers = suppliers.map(async (supplier) => {
      const newSupplier = await Supplier.create(supplier);
      return await newSupplier.save();
    });

    const results = await Promise.all(addSuppliers);
    if (results.length > 0) {
      console.log("Added suppliers successfully !");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = seedSupplier;
