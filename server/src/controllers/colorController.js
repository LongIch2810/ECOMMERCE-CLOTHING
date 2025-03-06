const {
  getColorsService,
  getFilterColorsService,
  addColorService,
  editColorService,
  deleteColorService,
  getColorByIdService,
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

const addColor = async (req, res) => {
  const { name, hexCode } = req.body;

  if (!name || !hexCode) {
    return res
      .status(400)
      .json({ success: false, message: "Thông tin phải điền đầy đủ !" });
  }

  if (!hexCode.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g)) {
    return res.status(400).json({
      success: false,
      message: "hexCode không hợp lệ !",
    });
  }

  const result = await addColorService({ name, hexCode });

  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const editColor = async (req, res) => {
  const { id: colorId } = req.params;
  const { name, hexCode } = req.body;

  if (!name || !hexCode) {
    return res
      .status(400)
      .json({ success: false, message: "Thông tin phải điền đầy đủ !" });
  }

  if (!hexCode.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g)) {
    return res.status(400).json({
      success: false,
      message: "hexCode không hợp lệ !",
    });
  }

  const result = await editColorService({
    colorId,
    name,
    hexCode,
  });
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const deleteColor = async (req, res) => {
  const { id: colorId } = req.params;
  if (!colorId) {
    return res
      .status(400)
      .json({ success: false, message: "Mã màu sắc không hợp lệ !" });
  }
  const result = await deleteColorService(colorId);
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const getColorById = async (req, res) => {
  const { id: colorId } = req.params;
  if (!colorId) {
    return res
      .status(400)
      .json({ success: false, message: "Mã màu sắc không hợp lệ !" });
  }
  const result = await getColorByIdService(colorId);
  if (result.SC === 200 && result?.color) {
    return res.status(200).json({ success: true, color: result.color });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = {
  getColors,
  getFilterColors,
  addColor,
  editColor,
  deleteColor,
  getColorById,
};
