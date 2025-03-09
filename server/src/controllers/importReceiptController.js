const {
  addImportReceiptService,
  getFilterImportReceiptsService,
  fetchImportReceiptDetailService,
} = require("../services/importReceipt");

const addImportReceipt = async (req, res) => {
  const { products, note, supplier } = req.body;

  if (!products || products.length <= 0)
    return res.status(400).json({
      success: false,
      message: "Danh sách sản phẩm không có sản phẩm !",
    });

  const total_price = products.reduce((total, product) => {
    return total + product.quantity * product.import_price;
  }, 0);

  const result = await addImportReceiptService({
    products,
    total_price,
    note,
    supplier,
  });

  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const getFilterImportReceipts = async (req, res) => {
  const { page, limit, id } = req.body;
  const data = await getFilterImportReceiptsService({
    page,
    limit,
    id,
  });
  if (data.SC === 200 && data?.results) {
    return res.status(200).json({ success: true, results: data.results });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const fetchImportReceiptDetail = async (req, res) => {
  const { importReceiptId } = req.params;

  const result = await fetchImportReceiptDetailService(importReceiptId);

  if (result.SC === 200 && result?.importReceipt) {
    return res
      .status(200)
      .json({ success: result.success, importReceipt: result.importReceipt });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

module.exports = {
  addImportReceipt,
  getFilterImportReceipts,
  fetchImportReceiptDetail,
};
