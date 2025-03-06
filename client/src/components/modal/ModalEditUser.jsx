import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Label from "../label/Label";
import Input from "../input/Input";
import Button from "../button/Button";
import { editUser, getUserById } from "@/store/features/user/userThunk";
import Modal from "./Modal";
import { setIsSuccess } from "@/store/features/user/userSlice";

const schema = yup
  .object({
    name: yup
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
    password: yup
      .string()
      .min(8, "Mật khẩu phải lớn hơn 8 kí tự !")
      .required("Mật khẩu không được để trống !"),
  })
  .required();

const ModalEditUser = ({ setIsOpen = () => {}, id }) => {
  const { userById, loading, isSuccess } = useSelector((state) => state.user);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      name: userById?.name || "",
      email: userById?.email || "",
      phone: userById?.phone || "",
      fullname: userById?.fullname || "",
      password: "12345678",
    },
  });

  useEffect(() => {
    if (userById) {
      setValue("name", userById.name);
      setValue("email", userById.email);
      setValue("phone", userById.phone);
      setValue("fullname", userById.fullname);
      setValue("password", "12345678");
    }
  }, [userById, setValue]);

  useEffect(() => {
    dispatch(getUserById(id));
  }, []);

  const dispatch = useDispatch();

  const handleEditUser = (values) => {
    if (!isValid) return;
    dispatch(editUser({ user_id: id, ...values }));
  };

  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message);
    }
  }, [errors]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      dispatch(setIsSuccess(false));
    }
  }, [isSuccess]);

  return (
    <Modal setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(handleEditUser)}
        className="flex flex-col m-5 gap-y-5"
      >
        <div>
          <Label htmlFor="fullname">
            <span>Họ và tên</span>
            <span className="text-secondary">*</span>
          </Label>
          <Input
            control={control}
            name="fullname"
            className="w-full p-2"
            placeholder="Nhập họ và tên..."
          ></Input>
        </div>
        <div>
          <Label htmlFor="phone">
            <span>Số điện thoại</span>
            <span className="text-secondary">*</span>
          </Label>
          <Input
            control={control}
            name="phone"
            className="w-full p-2"
            placeholder="Nhập số điện thoại..."
          ></Input>
        </div>
        <div>
          <Label htmlFor="name">
            <span>Tên người dùng</span>
            <span className="text-secondary">*</span>
          </Label>
          <Input
            control={control}
            name="name"
            className="w-full p-2"
            placeholder="Nhập tên người dùng..."
          ></Input>
        </div>
        <div>
          <Label htmlFor="email">
            <span>Email</span>
            <span className="text-secondary">*</span>
          </Label>
          <Input
            control={control}
            name="email"
            className="w-full p-2"
            placeholder="Nhập email..."
          ></Input>
        </div>
        <div>
          <Label htmlFor="password">
            <span>Mật khẩu</span>
            <span className="text-secondary">*</span>
          </Label>
          <Input
            type="password"
            control={control}
            name="password"
            className="w-full p-2"
            placeholder="Nhập mật khẩu..."
          ></Input>
        </div>

        <Button
          disabled={loading}
          className={`w-1/5 p-2  ${
            loading
              ? "bg-gray-400 opacity-60 cursor-not-allowed text-black"
              : "bg-foreign text-main"
          }`}
        >
          {loading ? "Đang xử lý ..." : "Thêm"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalEditUser;
