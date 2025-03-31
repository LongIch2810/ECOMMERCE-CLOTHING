import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "@/store/features/user/userThunk";
import { setUser } from "@/store/features/user/userSlice";

const ProtectedRoute = ({ roleRequired }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  console.log("isLoggedIn:", isLoggedIn);
  console.log("role:", user?.role);
  const safeParse = (data) => {
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const storedUser = userData ? safeParse(userData) : null;
    if (!isLoggedIn && storedUser) {
      dispatch(setUser(storedUser));
    } else if (!isLoggedIn) {
      dispatch(getUserInfo());
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
