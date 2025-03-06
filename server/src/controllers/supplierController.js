const validator = require("validator");
const {
  addSupplierService,
  getFilterSuppliersService,
  getSuppliersService,
  editSupplierService,
  deleteSupplierService,
  getSupplierByIdService,
} = require("../services/supplierService");

const getSuppliers = async (req, res) => {
  const data = await getSuppliersService();
  if (data.SC === 200 && data?.suppliers) {
    return res.status(200).json({ success: true, suppliers: data.suppliers });
  }
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const getFilterSuppliers = async (req, res) => {
  const { page, limit, name } = req.body;
  const data = await getFilterSuppliersService({
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

const addSupplier = async (req, res) => {
  const { name, email, description } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Tên nhà cung cấp không được để trống !",
    });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Email không được để trống và phải đúng định dạng !",
    });
  }

  if (!description) {
    return res.status(400).json({
      success: false,
      message: "Mô tả không được để trống !",
    });
  }

  const data = await addSupplierService({ name, email, description });
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};

const editSupplier = async (req, res) => {
  const { id: supplierId } = req.params;
  const { name, email, description } = req.body;

  const result = await editSupplierService({
    supplierId,
    name,
    email,
    description,
  });
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const deleteSupplier = async (req, res) => {
  const { id: supplierId } = req.params;
  if (!supplierId) {
    return res
      .status(400)
      .json({ success: false, message: "Mã loại sản phẩm không hợp lệ !" });
  }
  const result = await deleteSupplierService(supplierId);
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

const getSupplierById = async (req, res) => {
  const { id: supplierId } = req.params;
  if (!supplierId) {
    return res
      .status(400)
      .json({ success: false, message: "Mã loại sản phẩm không hợp lệ !" });
  }
  const result = await getSupplierByIdService(supplierId);
  if (result.SC === 200 && result?.supplier) {
    return res.status(200).json({ success: true, supplier: result.supplier });
  }
  return res
    .status(result.SC)
    .json({ success: result.success, message: result.message });
};

module.exports = {
  getFilterSuppliers,
  addSupplier,
  getSuppliers,
  editSupplier,
  deleteSupplier,
  getSupplierById,
};
