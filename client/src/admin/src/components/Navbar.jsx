import Button from "@/components/button/Button";
import { logout } from "@/store/features/auth/authThunk";
import { getUserInfo } from "@/store/features/user/userThunk";
import { Bell, User, LogOut } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-in");
  };
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  console.log(user);
  return (
    <div className="fixed top-0 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] h-16 bg-gray-800 text-white flex items-center justify-between px-6 shadow-md z-[9999]">
      <h2 className="text-lg font-semibold">Dashboard</h2>

      <div className="flex items-center gap-6">
        {/* Hồ sơ người dùng */}
        <div className="flex items-center gap-3">
          <User size={20} />
          <span>{user?.name || "Admin"}</span>
        </div>

        {/* Đăng xuất */}
        <Button
          className="p-2 rounded-lg hover:bg-gray-700"
          onClick={handleLogout}
        >
          <LogOut size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
