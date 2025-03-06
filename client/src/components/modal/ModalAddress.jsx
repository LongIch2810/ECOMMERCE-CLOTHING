import React, { useEffect } from "react";
import Modal from "./Modal";
import Label from "../label/Label";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../button/Button";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAddress } from "@/store/features/address/addressThunk";

const schema = yup
  .object({
    fullname: yup.string().required("Họ tên không được để trống !"),
    addressDetail: yup.string().required("Địa chỉ không được để trống !"),
    phone: yup
      .string()
      .required("Số điện thoại không được để trống !")
      .matches(
        /^(84|0)([3|5|7|8|9])+([0-9]{8})$/,
        "Số điện thoại không đúng định dạng !"
      ),
  })
  .required();

const ModalAddress = ({ setIsOpen = () => {} }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const handleAddAddress = (values) => {
    if (!isValid) return;
    dispatch(addAddress(values));
    setIsOpen(false);
  };

  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message);
    }
  }, [errors]);

  return (
    <Modal setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(handleAddAddress)}
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
          <Label htmlFor="addressDetail">
            <span>Địa chỉ chi tiết</span>
            <span className="text-secondary">*</span>
          </Label>
          <Input
            control={control}
            name="addressDetail"
            className="w-full p-2"
            placeholder="Nhập địa chỉ chi tiết..."
          ></Input>
        </div>
        <Button type="submit" className="w-full p-2 bg-primary text-main">
          Thêm địa chỉ
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddress;
