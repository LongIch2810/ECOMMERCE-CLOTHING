const Address = require("../models/addressModel");

const addAddressService = async ({
  fullname,
  addressDetail,
  phone,
  isDefault = false,
  user_id,
}) => {
  try {
    const addresses = await Address.find({ user: user_id });
    if (addresses.length === 0) {
      await Address.create({
        fullname,
        addressDetail,
        phone,
        isDefault: true,
        user: user_id,
      });
    } else {
      await Address.create({
        fullname,
        addressDetail,
        phone,
        isDefault,
        user: user_id,
      });
    }
    return { SC: 201, success: true, message: "Thêm thành công !" };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const updateAddressService = async ({
  id,
  fullname,
  addressDetail,
  phone,
}) => {};
const deleteAddressService = async ({ id }) => {};
const getAddressesByUserIdService = async ({ user_id }) => {
  try {
    const addresses = await Address.find({ user: user_id });
    return { SC: 200, success: true, addresses };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getAddressDefaultService = async ({ user_id }) => {
  try {
    const addresses = await Address.find({ user: user_id, isDefault: true });
    const addressDefault = addresses[0];
    return { SC: 200, success: true, addressDefault };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const getAddressesService = async ({ page = 1, limit = 10, fullname }) => {
  try {
    const filter = {};

    if (fullname) {
      filter.fullname = {};
      filter.fullname.$regex = `.*${fullname}.*`;
      filter.fullname.$options = "i";
    }
    const results = {};
    const skip = (page - 1) * limit;
    const addresses = await Address.find(filter)
      .limit(limit)
      .skip(skip)
      .select("_id phone fullname addressDetail");
    const total_addresses = await Address.countDocuments(filter);
    const total_pages = Math.ceil(total_addresses / limit);
    results.total_addresses = total_addresses;
    results.total_pages = total_pages;
    results.current_page = page;
    results.addresses = addresses;
    return { SC: 200, success: true, results };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

const setAddressDefaultService = async ({ user_id, address_id }) => {
  try {
    await Address.findByIdAndUpdate(address_id, { isDefault: true });

    await Address.updateMany(
      { user: user_id, _id: { $ne: address_id } },
      { isDefault: false }
    );

    return {
      SC: 200,
      success: true,
      message: "Cập nhật địa chỉ mặc định thành công",
    };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  addAddressService,
  getAddressesByUserIdService,
  getAddressDefaultService,
  getAddressesService,
  setAddressDefaultService,
};
