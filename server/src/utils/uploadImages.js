const cloudinary = require("../configs/cloudinary");

const uploadImages = async (files) => {
  try {
    // Kiểm tra nếu không có file nào được upload
    if (!files || files.length === 0) {
      throw new Error("Ít nhất một ảnh phải được tải lên");
    }

    // Upload tất cả ảnh lên Cloudinary
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: "image clothing/image product", // Thay đổi thư mục lưu trữ
      })
    );

    // Chờ tất cả ảnh upload xong
    const uploadResults = await Promise.all(uploadPromises);

    // Lấy danh sách URL ảnh từ kết quả upload
    const imageUrls = uploadResults.map((result) => result.secure_url);

    return imageUrls;
  } catch (error) {
    console.error("Lỗi upload ảnh:", error);
    throw error;
  }
};

module.exports = uploadImages;
