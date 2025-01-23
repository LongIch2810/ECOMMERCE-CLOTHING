const validator = require("validator");
const {
  addAddressService,
  getAddressesService,
  getAddressDefaultService,
} = require("../services/addressService");

const addAddress = async (req, res) => {
  const { id: user_id } = req.user;
  const { addressDetail, fullname, phone } = req.body;
  if (validator.isEmpty(fullname))
    return res
      .status(400)
      .json({ success: false, message: "Vùi lòng nhập họ và tên !" });
  if (validator.isEmpty(addressDetail))
    return res
      .status(400)
      .json({ success: false, message: "Vùi lòng nhập chi tiết địa chỉ !" });
  if (
    validator.isEmpty(phone) ||
    !phone.match(/^(84|0)([3|5|7|8|9])+([0-9]{8})$/)
  )
    return res.status(400).json({
      success: false,
      message: "Vùi lòng nhập số điện thoại và chính xác !",
    });
  const data = await addAddressService({
    fullname,
    phone,
    addressDetail,
    user_id,
  });
  return res
    .status(data.SC)
    .json({ success: data.success, message: data.message });
};
const updateAddress = (req, res) => {};
const deleteAddress = (req, res) => {};

const getAddresses = async (req, res) => {
  const { id: user_id } = req.user;
  const data = await getAddressesService({ user_id });
  if (data.SC === 200 && data?.addresses) {
    return res.status(200).json({ success: true, addresses: data.addresses });
  }
  return res.status(data.SC).json({ success: false, message: data.message });
};

const getAddressDefault = async (req, res) => {
  const { id: user_id } = req.user;
  const data = await getAddressDefaultService({ user_id });
  if (data.SC === 200 && data?.addressDefault) {
    return res
      .status(200)
      .json({ success: true, addressDefault: data.addressDefault });
  }
  return res.status(data.SC).json({ success: false, message: data.message });
};

module.exports = {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  getAddressDefault,
};
