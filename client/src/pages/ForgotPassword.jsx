import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, sendOTP } from "@/store/features/auth/authThunk";
import {
  setIsResetPassword,
  setIsSendOTP,
  setSavedEmail,
} from "@/store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // Bước 1: Nhập email, Bước 2: Nhập OTP & mật khẩu mới
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSendOTP, isResetPassword, savedEmail, loading } = useSelector(
    (state) => state.auth
  );

  // Gửi OTP
  const onSubmitEmail = async (data) => {
    dispatch(setSavedEmail(data?.email));
    dispatch(sendOTP(data));
  };

  useEffect(() => {
    if (isSendOTP) {
      setStep(2);
      dispatch(setIsSendOTP(false));
    }
  }, [isSendOTP]);

  // Xác nhận OTP & đổi mật khẩu
  const onSubmitOTP = async (data) => {
    console.log(data);
    dispatch(resetPassword(data));
  };

  const handleResendOTP = () => {
    dispatch(sendOTP({ email: savedEmail }));
  };

  useEffect(() => {
    if (isResetPassword) {
      reset();
      setStep(1);
      dispatch(setIsSendOTP(false));
      dispatch(setIsResetPassword(false));
      navigate("/sign-in");
    }
  }, [isResetPassword]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-96">
        <h2 className="mb-4 text-2xl font-bold text-center">
          {step === 1 ? "Quên Mật Khẩu" : "Xác Nhận OTP"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-4">
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              disabled={loading}
              type="submit"
              className={`w-full py-2  rounded-lg  ${
                loading
                  ? "bg-opacity-60 bg-gray-400 text-black cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-main"
              }`}
            >
              {loading ? "Đang gửi ..." : "Gửi OTP"}
            </button>
          </form>
        ) : (
          <>
            <form
              onSubmit={handleSubmit(onSubmitOTP)}
              className="mb-2 space-y-4"
            >
              <p className="text-gray-700">
                Xác nhận OTP cho: <strong>{savedEmail}</strong>
              </p>
              <input
                type="text"
                {...register("otp", { required: true })}
                placeholder="Nhập mã OTP"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                {...register("newPassword", { required: true })}
                placeholder="Nhập mật khẩu mới"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                disabled={loading}
                type="submit"
                className={`w-full py-2  rounded-lg  ${
                  loading
                    ? "bg-opacity-60 bg-gray-400 text-black cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-main"
                }`}
              >
                Xác Nhận
              </button>
            </form>
            <div>
              <button
                disabled={loading}
                onClick={handleResendOTP}
                className={`w-full py-2  rounded-lg  ${
                  loading
                    ? "bg-opacity-60 bg-gray-400 text-black cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-600 text-main"
                }`}
              >
                Gửi lại OTP
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
