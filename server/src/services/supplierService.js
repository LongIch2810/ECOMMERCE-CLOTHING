const Supplier = require("../models/supplierModel");

const getSuppliersService = async () => {
  try {
    const suppliers = await Supplier.find({});
    return { SC: 200, success: true, suppliers };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getFilterSuppliersService = async ({ page = 1, limit = 5, name }) => {
  try {
    const filter = {};

    if (name) {
      filter.name = {};
      filter.name.$regex = `.*${name}.*`;
      filter.name.$options = "i";
    }
    const results = {};
    const skip = (page - 1) * limit;
    const suppliers = await Supplier.find(filter)
      .limit(limit)
      .skip(skip)
      .select("_id name email");
    const total_suppliers = await Supplier.countDocuments(filter);
    const total_pages = Math.ceil(total_suppliers / limit);
    results.total_suppliers = total_suppliers;
    results.total_pages = total_pages;
    results.current_page = page;
    results.suppliers = suppliers;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const addSupplierService = async (data) => {
  try {
    const newSupplier = new Supplier(data);
    await newSupplier.save();
    return {
      SC: 201,
      success: true,
      message: "Thêm nhà cung cấp thành công !",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const editSupplierService = async ({
  supplierId,
  name,
  email,
  description,
}) => {
  try {
    const existingSupplier = await Supplier.findById(supplierId);
    if (!existingSupplier) {
      return {
        SC: 404,
        success: false,
        message: "Nhà cung cấp không tồn tại",
      };
    }

    if (name) {
      const isNameTaken = await Supplier.findOne({
        name,
        _id: { $ne: supplierId },
      });
      if (isNameTaken) {
        return {
          SC: 400,
          success: false,
          message: "Tên nhà cung cấp đã tồn tại",
        };
      }

      existingSupplier.name = name;
    } else {
      return res.status(400).json({
        success: true,
        message: "Tên nhà cung cấp không được để trống !",
      });
    }

    if (email) {
      const isEmailTaken = await Supplier.findOne({
        email,
        _id: { $ne: supplierId },
      });
      if (isEmailTaken) {
        return {
          SC: 400,
          success: false,
          message: "Email nhà cung cấp đã tồn tại",
        };
      }

      existingSupplier.email = email;
    } else {
      return res.status(400).json({
        success: true,
        message: "Mã màu không được để trống !",
      });
    }

    existingSupplier.description = description;
    await existingSupplier.save();

    return {
      SC: 200,
      success: true,
      message: "Cập nhật thông tin nhà cung cấp thành công",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const deleteSupplierService = async (supplierId) => {
  try {
    const existingSupplier = await Supplier.findById(supplierId);
    if (!existingSupplier) {
      return {
        SC: 404,
        success: false,
        message: "Nhà cung cấp không tồn tại",
      };
    }

    await Supplier.delete({ _id: supplierId });

    return { SC: 200, success: true, message: "Xóa nhà cung cấp thành công" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getSupplierByIdService = async (supplierId) => {
  try {
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return {
        SC: 404,
        success: false,
        message: "Nhà cung cấp không tồn tại",
      };
    }

    return { SC: 200, success: true, supplier };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  getFilterSuppliersService,
  addSupplierService,
  getSuppliersService,
  editSupplierService,
  deleteSupplierService,
  getSupplierByIdService,
};
