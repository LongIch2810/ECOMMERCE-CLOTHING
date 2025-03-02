import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import LayoutInfo from "../layout/LayoutInfo";
import { useDispatch, useSelector } from "react-redux";
import Label from "@/components/label/Label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/input/Input";
import Button from "@/components/button/Button";
import { updateAvatar, updateInfo } from "@/store/features/user/userThunk";
import { toast } from "react-toastify";
import { sendOTP } from "@/store/features/auth/authThunk";
import ModalResetPassword from "@/components/modal/ModalResetPassword";
import { setIsSendOTP } from "@/store/features/auth/authSlice";

const schema = yup
  .object({
    username: yup
      .string()
      .min(6, "Tên người dùng phải có ít nhất 6 kí tự !")
      .required("Tên người dùng không được để trống !"),
    fullname: yup.string().required("Họ và tên không được để trống"),
    email: yup
      .string()
      .email("Vui lòng nhập đúng định dạng email !")
      .required("Email không được để trống !"),
    phone: yup
      .string()
      .matches(
        /^(84|0)([3|5|7|8|9])+([0-9]{8})$/,
        "Số điện thoại không hợp lệ !"
      )
      .required(),
  })
  .required();
const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading: loadingUpdate } = useSelector((state) => state.user);
  const { isSendOTP, loading: loadingSendOTP } = useSelector(
    (state) => state.auth
  );
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      fullname: user?.fullname || "",
    },
  });

  useEffect(() => {
    if (user) {
      setValue("username", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("fullname", user.fullname);
    }
  }, [user, setValue]);

  const handleChangeAvatar = (e) => {
    const file = event.target.files[0]; // Lấy tệp đầu tiên
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(updateAvatar(formData));
  };

  const handleSaveInfo = (values) => {
    if (!isValid) return;
    dispatch(updateInfo(values));
  };

  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message);
    }
  }, [errors]);

  const handleSendOTP = () => {
    dispatch(sendOTP({ email: user?.email }));
  };

  useEffect(() => {
    if (isSendOTP) {
      setIsOpen(true);
      dispatch(setIsSendOTP(false));
    }
  }, [isSendOTP]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <LayoutInfo content="Thông tin tài khoản">
        <div className="grid w-full grid-cols-12 gap-3 my-5">
          <div className="flex justify-end col-span-12 mb-3">
            <Button
              disabled={loadingSendOTP}
              className={`p-1.5 md:p-2 ${
                loadingSendOTP
                  ? "bg-gray-400 text-black cursor-not-allowed bg-opacity-60"
                  : "bg-foreign text-main"
              }`}
              onClick={handleSendOTP}
            >
              {loadingSendOTP ? "Đang xử lý ..." : "Đổi mật khẩu"}
            </Button>
          </div>
          <div className="col-span-12 md:col-span-6">
            <Label
              className="flex flex-col items-center cursor-pointer gap-y-3"
              htmlFor="avatar"
            >
              <img
                src={user?.avatar}
                alt=""
                className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] rounded-full"
              />
              <span className="p-1 mx-auto bg-gray-300 rounded-md">
                Thay đổi ảnh đại diện
              </span>
            </Label>
            <input
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
              className="hidden"
            />
          </div>
          <form
            className="flex flex-col w-full col-span-12 md:col-span-6 gap-y-5"
            onSubmit={handleSubmit(handleSaveInfo)}
          >
            <div>
              <Label htmlFor="username">Tên người dùng</Label>
              <Input
                control={control}
                name="username"
                className="w-full p-2"
              ></Input>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                control={control}
                name="email"
                className="w-full p-2"
              ></Input>
            </div>
            <div>
              <Label htmlFor="fullname">Họ và tên</Label>
              <Input
                control={control}
                name="fullname"
                className="w-full p-2"
              ></Input>
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                control={control}
                name="phone"
                className="w-full p-2"
              ></Input>
            </div>
            <Button
              disabled={loadingUpdate}
              className={`p-1.5 md:p-2 ${
                loadingUpdate
                  ? "bg-gray-400 text-black cursor-not-allowed bg-opacity-60"
                  : "bg-primary text-main"
              }`}
            >
              {loadingUpdate ? "Đang lưu ..." : "Lưu thông tin"}
            </Button>
          </form>
        </div>
      </LayoutInfo>
      {isOpen && (
        <ModalResetPassword
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          email={user?.email}
        />
      )}
    </Layout>
  );
};

export default Profile;
