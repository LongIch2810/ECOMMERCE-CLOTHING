const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(6).required().messages({
    "string.base": "Tên phải là một chuỗi",
    "string.min": "Tên phải có ít nhất 6 ký tự",
    "string.empty": "Tên không được để trống",
    "any.required": "Tên là bắt buộc",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email phải là một chuỗi",
    "string.email": "Vui lòng nhập đúng định dạng email",
    "string.empty": "Email không được để trống",
    "any.required": "Email là bắt buộc",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Mật khẩu phải là một chuỗi",
    "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Mật khẩu là bắt buộc",
  }),
  phone: Joi.string()
    .pattern(new RegExp(/^(84|0)([3|5|7|8|9])+([0-9]{8})$/))
    .required()
    .messages({
      "string.base": "Số điện thoại phải là một chuỗi",
      "string.pattern.base":
        "Số điện thoại không đúng định dạng (phải bắt đầu bằng 84 hoặc 0 và có 10 chữ số hợp lệ)",
      "string.empty": "Số điện thoại không được để trống",
      "any.required": "Số điện thoại là bắt buộc",
    }),
});

const validateRegister = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateRegister;
