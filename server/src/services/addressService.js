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
const getAddressesService = async ({ user_id }) => {
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
    const addresses = await Address.find({ user: user_id });
    const addressDefault = addresses.filter((item) => item.isDefault)[0];
    return { SC: 200, success: true, addressDefault };
  } catch (error) {
    console.log(error);
    return { SC: 500, success: false, message: error.message };
  }
};

module.exports = {
  addAddressService,
  getAddressesService,
  getAddressDefaultService,
};
