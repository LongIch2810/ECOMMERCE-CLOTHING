import moment from "moment-timezone";

const formatCurrency = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatDate = (date) => {
  return moment(date).tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm:ss");
};

const formatInputDate = (date) => {
  return moment.utc(date).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
};

export { formatCurrency, formatDate, formatInputDate };
