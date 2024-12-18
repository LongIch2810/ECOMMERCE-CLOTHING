const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.string()
    .pattern(new RegExp(/^(84|0)([3|5|7|8|9])+([0-9]{8})$/))
    .required(),
});

const validateRegister = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateRegister;
