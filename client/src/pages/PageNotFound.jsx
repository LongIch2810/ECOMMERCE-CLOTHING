import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-2 text-xl text-gray-700">
        Oops! Trang bạn tìm kiếm không tồn tại.
      </p>
      <Link
        to={role === "Admin" ? "/admin" : "/"}
        className="px-6 py-3 mt-4 text-lg text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
};

export default PageNotFound;
