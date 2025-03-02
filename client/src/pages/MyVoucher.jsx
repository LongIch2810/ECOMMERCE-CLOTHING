import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import LayoutInfo from "../layout/LayoutInfo";
import { useDispatch, useSelector } from "react-redux";
import MyVoucherCard from "@/components/card/MyVoucherCard";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "@/store/features/user/userThunk";

const MyVoucher = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user?.vouchers);
  useEffect(() => {
    dispatch(getUserInfo());
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <LayoutInfo content="Mã giảm giá của bạn">
        <div className="flex flex-col gap-y-5">
          {user?.vouchers?.length > 0 ? (
            user.vouchers.map((item) => (
              <MyVoucherCard
                isUse={item.status.toLowerCase() === "đã sử dụng"}
                key={item._id}
                item={item.voucher}
                onClickUseVoucher={() => navigate("/cart")}
              ></MyVoucherCard>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
              <p className="mb-4 text-lg text-gray-700">
                Hiện tại bạn không có mã giảm giá nào.
              </p>
            </div>
          )}
        </div>
      </LayoutInfo>
    </Layout>
  );
};

export default MyVoucher;
