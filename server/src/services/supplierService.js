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

module.exports = {
  getFilterSuppliersService,
  addSupplierService,
  getSuppliersService,
};
