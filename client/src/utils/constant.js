import { formatCurrency } from "./format";

const bgColorStatusOrder = {
  "Chờ xác nhận": "bg-pending",
  "Chờ lấy hàng": "bg-waiting",
  "Chuẩn bị gửi hàng": "bg-prepare",
  "Đang giao hàng": "bg-shipped",
  "Giao hàng thành công": "bg-delivered",
  "Hủy bỏ": "bg-secondary",
};

const textColorStatusOrder = {
  "Chờ xác nhận": "text-pending",
  "Chờ lấy hàng": "text-waiting",
  "Chuẩn bị gửi hàng": "text-prepare",
  "Đang giao hàng": "text-shipped",
  "Giao hàng thành công": "text-delivered",
  "Hủy bỏ": "text-secondary",
};

const COLORS = [
  "#EAB308",
  "#f97316",
  "#38bdf8",
  "#30AE9E",
  "#22C55E",
  "#E2231A",
];

const COLOR_REVENUE = "#8884d8";
const COLOR_PROFIT = "#82ca9d";

const orderStatus = [
  { status: "Chờ xác nhận", adminButton: "Xác nhận" },
  { status: "Chờ lấy hàng", adminButton: "Đã lấy hàng" },
  { status: "Chuẩn bị gửi hàng", adminButton: "Gửi hàng" },
  { status: "Đang giao hàng", adminButton: "" },
  { status: "Giao hàng thành công", adminButton: "" },
  { status: "Hủy bỏ", adminButton: "" },
];

const ROLE = ["Customer", "Admin"];

const UNIT = [
  { _id: 1, unit: "%" },
  { _id: 2, unit: "VND" },
];

const FILE_SIZE = 100 * 1024 * 1024; // 2MB
const TYPE_IMAGE = ["image/jpg", "image/jpeg", "image/png", "image/avif"];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export {
  orderStatus,
  bgColorStatusOrder,
  textColorStatusOrder,
  COLORS,
  COLOR_REVENUE,
  COLOR_PROFIT,
  ROLE,
  UNIT,
  FILE_SIZE,
  TYPE_IMAGE,
  SIZES,
};
