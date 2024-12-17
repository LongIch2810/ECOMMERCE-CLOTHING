const { getUserInfoService } = require("../services/userService");

const getUserInfo = async (req, res) => {
  const { id } = req.user;
  const result = await getUserInfoService({ id });
  if (result?.SC === 200 && result?.user) {
    return res
      .status(result.SC)
      .json({ success: result.success, user: result.user });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = { getUserInfo };
