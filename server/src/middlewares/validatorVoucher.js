const { body } = require("express-validator");

// Middleware validate dữ liệu đầu vào
const validatorVoucher = [
  body("title").notEmpty().withMessage("Tiêu đề không được để trống"),
  body("number_of_use")
    .isInt({ min: 1 })
    .withMessage("Số lượng phải là số nguyên lớn hơn 0"),
  body("code").notEmpty().withMessage("Mã giảm giá không được để trống"),
  body("description").notEmpty().withMessage("Mô tả không được để trống"),
  body("end_date")
    .isISO8601()
    .withMessage("Ngày kết thúc không hợp lệ")
    .custom((value) => {
      const now = new Date();
      const selectedDate = new Date(value);
      if (selectedDate <= now) {
        throw new Error("Ngày kết thúc phải lớn hơn ngày hiện tại");
      }
      return true;
    }),
  body("unit")
    .isIn(["%", "VND"])
    .withMessage("Đơn vị chỉ được là '%' hoặc 'VND'"),
  body("value")
    .isNumeric()
    .withMessage("Giá trị phải là số")
    .custom((value, { req }) => {
      if (req.body.unit === "%" && (value < 1 || value > 100)) {
        throw new Error("Nếu đơn vị là '%', giá trị phải từ 1 đến 100");
      }
      if (req.body.unit === "VND" && value < 1000) {
        throw new Error("Nếu đơn vị là 'VND', giá trị phải từ 1000 trở lên");
      }
      return true;
    }),
  body("max_discount")
    .isNumeric()
    .withMessage("Giảm giá tối đa phải là số")
    .isInt({ min: 1 })
    .withMessage("Giảm giá tối đa phải lớn hơn 0"),
  body("min_order_price")
    .isNumeric()
    .withMessage("Giá đơn tối thiểu phải là số")
    .isInt({ min: 1 })
    .withMessage("Giá đơn tối thiểu phải lớn hơn 0"),
];

module.exports = validatorVoucher;
