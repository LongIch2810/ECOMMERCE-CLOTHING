const urlToFile = async (imageUrl, fileName = "image.jpg") => {
  console.log(imageUrl);
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Lỗi tải ảnh: ${response.status}`);

    const blob = await response.blob();
    const fileType = blob.type || "image/jpeg"; // Gán mặc định nếu không có type

    return new File([blob], fileName, { type: fileType });
  } catch (error) {
    console.error("Lỗi chuyển đổi URL thành File:", error);
    return null; // Trả về null nếu lỗi
  }
};

export default urlToFile;
