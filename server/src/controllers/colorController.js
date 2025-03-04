const {
  getColorsService,
  getFilterColorsService,
} = require("../services/colorService");

const getColors = async (req, res) => {
  const data = await getColorsService();
  if (data.SC === 200 && data?.colors) {
    return res.status(200).json({ success: true, colors: data.colors });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getFilterColors = async (req, res) => {
  const { page, limit, name } = req.body;
  const data = await getFilterColorsService({
    page,
    limit,
    name,
  });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = { getColors, getFilterColors };
