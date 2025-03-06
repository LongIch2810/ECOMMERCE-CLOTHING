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
        folder: "image_clothing/image_product", // Thay đổi thư mục lưu trữ
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

const deleteImage = async (imageUrl) => {
  try {
    const publicId = imageUrl.split("/image/upload/")[1].split(".")[0];

    await cloudinary.uploader.destroy(publicId);

    console.log("Ảnh đã bị xóa thành công!");
  } catch (error) {
    console.error("Lỗi khi xóa ảnh:", error);
  }
};

const deleteImages = async (publicIds) => {
  try {
    if (publicIds.length === 0) {
      console.log("❌ Không có ảnh nào để xóa.");
      return;
    }

    const result = await cloudinary.api.delete_resources(publicIds);

    console.log("✅ Đã xóa các ảnh thành công:", result.deleted);
  } catch (error) {
    console.error("❌ Lỗi khi xóa ảnh:", error);
  }
};

const getPublicId = (imageUrl) => {
  try {
    const urlParts = imageUrl.split("/image/upload/");
    if (urlParts.length < 2) {
      throw new Error(`URL không hợp lệ: ${imageUrl}`);
    }
    const pathWithoutVersion = urlParts[1].replace(/v\d+\//, ""); // Loại bỏ `vXXXXXXXXXX/`
    return pathWithoutVersion.split(".")[0]; // Loại bỏ phần mở rộng
  } catch (error) {
    console.error("❌ Lỗi khi lấy publicId:", error.message);
    return null;
  }
};

const getPublicIds = (imageUrls) => {
  return imageUrls
    .map((imageUrl) => {
      try {
        const urlParts = imageUrl.split("/image/upload/");
        if (urlParts.length < 2) {
          throw new Error(`URL không hợp lệ: ${imageUrl}`);
        }
        const pathWithoutVersion = urlParts[1].replace(/v\d+\//, ""); // Loại bỏ `vXXXXXXXXXX/`
        return pathWithoutVersion.split(".")[0]; // Loại bỏ phần mở rộng
      } catch (error) {
        console.error("❌ Lỗi khi lấy publicId:", error.message);
        return null;
      }
    })
    .filter(Boolean); // Loại bỏ các giá trị null
};

module.exports = {
  uploadImages,
  deleteImage,
  getPublicIds,
  getPublicId,
  deleteImages,
};
