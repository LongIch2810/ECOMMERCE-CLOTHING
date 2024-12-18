const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8),
});

const validateLogin = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateLogin;
