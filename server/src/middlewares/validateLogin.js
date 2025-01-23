const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Vui lòng nhập đúng định dạng email",
    "string.empty": "Email không được để trống!",
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
    "string.empty": "Mật khẩu không được để trống!",
  }),
});

const validateLogin = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateLogin;
