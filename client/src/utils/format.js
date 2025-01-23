import moment from "moment";

const formatCurrency = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatDate = (date) => {
  const tempDate = moment(date).utc(); // Giữ nguyên thời gian UTC
  const formattedDate = tempDate.format("DD/MM/YYYY HH:mm:ss");
  return formattedDate;
};

export { formatCurrency, formatDate };
