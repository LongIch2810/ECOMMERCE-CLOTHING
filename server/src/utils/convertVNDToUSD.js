const axios = require("axios");
require("dotenv").config();
// API key của bạn (đăng ký miễn phí tại https://www.exchangerate-api.com/)
const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

async function convertVNDToUSD(amountInVND) {
  try {
    const response = await axios.get(url);
    const exchangeRate = response.data.conversion_rates.VND;

    if (!exchangeRate) {
      throw new Error("Không tìm thấy tỷ giá VND.");
    }

    const amountInUSD = amountInVND / exchangeRate;
    console.log(
      `Số tiền ${amountInVND} VND tương đương với ${amountInUSD.toFixed(
        2
      )} USD.`
    );
    return amountInUSD.toFixed(2);
  } catch (error) {
    console.error("Lỗi khi lấy tỷ giá:", error);
  }
}
module.exports = convertVNDToUSD;
