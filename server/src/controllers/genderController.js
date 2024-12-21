const { getGendersService } = require("../services/genderService");

const getGenders = async (req, res) => {
  const data = await getGendersService();
  if (data.success && data?.genders) {
    return res.status(200).json({ success: true, genders: data.genders });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = { getGenders };
