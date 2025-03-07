const moment = require("moment-timezone");

const formatDate = (date) => {
  return moment(date).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm:ss");
};

module.exports = formatDate;
