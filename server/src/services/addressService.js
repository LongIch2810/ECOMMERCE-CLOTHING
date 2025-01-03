const Address = require("../models/addressModel");

const addAddressService = async ({
  fullname,
  addressDetail,
  phone,
  user_id,
}) => {
  try {
    const addresses = await Address.find({ user: user_id });
    if (addresses.length === 2) {
      return { SC: 400, success: false, message: "Bạn đã thêm đủ 2 địa chỉ !" };
    }
    await Address.create({
      fullname,
      addressDetail,
      phone,
      user: user_id,
    });
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
const getAddressesService = async ({ user_id }) => {
  try {
    const addresses = await Address.find({ user: user_id });
    return { SC: 200, success: true, addresses };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = { addAddressService, getAddressesService };
