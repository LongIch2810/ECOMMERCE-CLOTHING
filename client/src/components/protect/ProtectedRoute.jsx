import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "@/store/features/user/userThunk";
import { setUser } from "@/store/features/user/userSlice";

const ProtectedRoute = ({ roleRequired }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  console.log("isLoggedIn:", isLoggedIn);
  console.log("role:", user?.role);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!isLoggedIn && storedUser) {
      dispatch(setUser(storedUser)); // ✅ Nếu mất Redux, lấy lại từ localStorage
    } else if (!isLoggedIn) {
      dispatch(getUserInfo()); // 🔄 Nếu chưa có thông tin user, gọi API
    }
  }, [dispatch, isLoggedIn]);

  if (!isLoggedIn || !user) {
    console.log("User not logged in, redirecting to /sign-in");
    return <Navigate to="/sign-in" replace />;
  }

  if (roleRequired && user?.role !== roleRequired) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
