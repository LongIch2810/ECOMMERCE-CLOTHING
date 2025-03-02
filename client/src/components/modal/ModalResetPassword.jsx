import { useForm } from "react-hook-form";
import Modal from "./Modal"; // Import modal bạn đã có
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, sendOTP } from "@/store/features/auth/authThunk";
import { useEffect } from "react";
import {
  setIsResetPassword,
  setIsSendOTP,
} from "@/store/features/auth/authSlice";

const ModalResetPassword = ({ isOpen, setIsOpen, email }) => {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();

  const { isSendOTP, isResetPassword, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSendOTP) {
      dispatch(setIsSendOTP(false));
    }
  }, [isSendOTP]);

  const onSubmit = async (data) => {
    dispatch(resetPassword({ ...data, email }));
  };

  useEffect(() => {
    if (isResetPassword) {
      reset();
      dispatch(setIsSendOTP(false));
      dispatch(setIsResetPassword(false));
      setIsOpen(false);
    }
  }, [isResetPassword]);

  return (
    isOpen && (
      <Modal setIsOpen={setIsOpen}>
        <h2 className="mb-4 text-2xl font-bold text-center">
          Đặt lại mật khẩu
        </h2>

        <p className="text-center text-gray-700">
          Xác nhận OTP cho: <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="my-4 space-y-4">
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

        <button
          disabled={loading}
          onClick={() => dispatch(sendOTP({ email }))}
          className={`w-full py-2  rounded-lg  ${
            loading
              ? "bg-opacity-60 bg-gray-400 text-black cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 text-main"
          }`}
        >
          Gửi lại OTP
        </button>
      </Modal>
    )
  );
};

export default ModalResetPassword;
