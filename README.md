# 🛍️ Fashion Store - Website Bán Áo Quần

## 📌 Giới thiệu
Fashion Store là một website thương mại điện tử chuyên bán các sản phẩm thời trang. Với giao diện hiện đại, dễ sử dụng, khách hàng có thể mua sắm một cách tiện lợi và nhanh chóng.

## 🚀 Công nghệ sử dụng
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **State Management:** Redux Toolkit

## 📂 Cấu trúc thư mục
```
Ecommerce/
│── client/          # Frontend
│── server/          # Backend
│── .gitignore       # Các file cần bỏ qua khi push lên GitHub
│── README.md        # Hướng dẫn sử dụng dự án
```

## 🔧 Cách cài đặt và chạy dự án

### 1️⃣ Cấu hình file `.env`
Trước khi chạy dự án, bạn cần tạo file `.env` trong cả thư mục `client` và `server`.

#### 📌 Cấu hình `.env` trong `client`
```
VITE_BASE_URL=
VITE_PAYPAL_CLIENT_ID=
VITE_PUBLISHABLE_KEY=
```

#### 📌 Cấu hình `.env` trong `server`
```
MONGO_URL=
PORT=
JWT_SECRET=
ADMIN_NAME=
ADMIN_PASS=
ADMIN_PHONE=
ADMIN_ADDRESS=
ADMIN_EMAIL=
PAYPAL_CLIENT_ID=
PAYPAL_SECRET=
PAYPAL_API=
EXCHANGE_RATE_API_KEY=
GOOGLE_APP_PASSWORD=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 2️⃣ Cài đặt và chạy **Client**
```sh
cd client
npm install
npm run dev
```

### 3️⃣ Cài đặt và chạy **Server**
```sh
cd server
npm install
npm run dev
```

## 💡 Tính năng nổi bật
✅ Đăng ký & đăng nhập & quên mật khẩu người dùng  
✅ Quản lý giỏ hàng  
✅ Thanh toán online với paypal  
✅ Tìm kiếm & lọc sản phẩm  
✅ Người dùng sửa profile
✅ Xem chi tiết sản phẩm
✅ Lưu và sử dụng mã giảm giá
✅ Xem chi tiết đơn hàng
✅ Đánh giá sản phẩm
✅ Quản lý sản phẩm  
✅ Quản lý loại sản phẩm
✅ Quản lý thương hiệu
✅ Quản lý màu sắc
✅ Quản lý người dùng
✅ Quản lý nhà cung cấp
✅ Quản lý mã giảm giá
✅ Nhập hàng
✅ Quản lý đơn hàng  
✅ Thống kê  

## 📜 License
Dự án này được phát triển với mục đích học tập và không dùng cho mục đích thương mại.

## 👨‍💻 Liên hệ
📩 Email: ichtrachuylong.91.04@gmail.com  
📌 GitHub: https://github.com/LongIch2810

