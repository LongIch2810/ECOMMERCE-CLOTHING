import {
  Boxes,
  FilePlus,
  Home,
  MapPin,
  PackageSearch,
  Palette,
  ShoppingCart,
  Ticket,
  Truck,
  Users,
  Briefcase,
  ChartArea,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const items = [
  {
    id: 1,
    text: "Dashboard",
    to: "/admin",
    icon: <Home size={20} />,
  },
  {
    id: 2,
    text: "Người dùng",
    icon: <Users size={20} />,
    children: [
      { id: 30, text: "Danh sách người dùng", to: "/admin/users/list" },
      { id: 31, text: "Thêm người dùng", to: "/admin/users/add-user" },
    ],
  },
  {
    id: 3,
    text: "Loại sản phẩm",
    icon: <PackageSearch size={20} />,
    children: [
      {
        id: 32,
        text: "Danh sách loại sản phẩm",
        to: "/admin/type_products/list",
      },
      {
        id: 33,
        text: "Thêm loại sản phẩm",
        to: "/admin/type_products/add-type-product",
      },
    ],
  },
  {
    id: 4,
    text: "Sản phẩm",
    icon: <Boxes size={20} />,
    children: [
      { id: 34, text: "Danh sách sản phẩm", to: "/admin/products/list" },
      { id: 35, text: "Thêm sản phẩm", to: "/admin/products/add-product" },
    ],
  },
  {
    id: 5,
    text: "Thương hiệu",
    icon: <Briefcase size={20} />,
    children: [
      { id: 36, text: "Danh sách thương hiệu", to: "/admin/brands/list" },
      { id: 37, text: "Thêm thương hiệu", to: "/admin/brands/add-brand" },
    ],
  },
  {
    id: 6,
    text: "Đơn hàng",
    icon: <ShoppingCart size={20} />,
    children: [
      { id: 38, text: "Danh sách đơn hàng", to: "/admin/orders/list" },
    ],
  },
  {
    id: 7,
    text: "Nhà cung cấp",
    icon: <Truck size={20} />,
    children: [
      { id: 40, text: "Danh sách nhà cung cấp", to: "/admin/suppliers/list" },
      {
        id: 41,
        text: "Thêm nhà cung cấp",
        to: "/admin/suppliers/add-supplier",
      },
    ],
  },
  {
    id: 8,
    text: "Mã giảm giá",
    icon: <Ticket size={20} />,
    children: [
      { id: 42, text: "Danh sách mã giảm giá", to: "/admin/vouchers/list" },
      { id: 43, text: "Thêm mã giảm giá", to: "/admin/vouchers/add-voucher" },
    ],
  },
  {
    id: 9,
    text: "Màu sắc",
    icon: <Palette size={20} />,
    children: [
      { id: 44, text: "Danh sách màu sắc", to: "/admin/colors/list" },
      { id: 45, text: "Thêm màu sắc", to: "/admin/colors/add-color" },
    ],
  },
  {
    id: 10,
    text: "Nhập hàng",
    icon: <FilePlus size={20} />,
    children: [
      { id: 46, text: "Danh sách phiếu nhập", to: "/admin/stock-in/list" },
      { id: 47, text: "Thêm phiếu nhập", to: "/admin/stock-in/add-receipt" },
    ],
  },
  {
    id: 11,
    title: "Thống kê",
    text: "Thống kê",
    to: "/admin/statistical",
    icon: <ChartArea size={20} />,
    children: [
      { id: 48, text: "Thống kê doanh thu", to: "/admin/statistical/" },
      { id: 49, text: "Thống kê lợi nhuận", to: "/admin/statistical/" },
      { id: 50, text: "Thống kê tồn kho", to: "/admin/statistical/" },
    ],
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  // Toggle menu con
  const toggleMenu = (id) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="fixed hidden w-64 h-screen p-5 overflow-y-auto text-white bg-gray-900 md:block z-[99999]">
      <h2 className="mb-6 text-2xl font-bold">Admin Dashboard</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id}>
            {/* Nếu có children thì sẽ hiển thị button */}
            {item.children ? (
              <div>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700"
                >
                  <span className="flex items-center gap-3">
                    {item.icon} {item.text}
                  </span>
                  {openMenus[item.id] ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>

                {/* Hiển thị sub menu nếu mở */}
                {openMenus[item.id] && (
                  <ul className="mt-2 ml-6 space-y-2">
                    {item.children.map((sub) => (
                      <li key={sub.id}>
                        <NavLink
                          to={sub.to}
                          className={({ isActive }) =>
                            `${
                              isActive ? "text-blue-400" : ""
                            } flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700`
                          }
                        >
                          {sub.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-400" : ""
                  } flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700`
                }
              >
                {item.icon} {item.text}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
