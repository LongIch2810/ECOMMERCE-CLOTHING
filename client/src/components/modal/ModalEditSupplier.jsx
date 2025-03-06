import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Label from "../label/Label";
import Input from "../input/Input";
import Button from "../button/Button";

import Modal from "./Modal";

import GroupForm from "../group/GroupForm";
import {
  editSupplier,
  getSupplierById,
} from "@/store/features/supplier/supplierThunk";
import {
  setIsSuccess,
  setSupplierById,
} from "@/store/features/supplier/supplierSlice";
import Textarea from "../input/Textarea";

const schema = yup
  .object({
    name: yup.string().required("Tên nhà cung cấp là bắt buộc"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    description: yup
      .string()
      .min(10, "Mô tả phải lớn hơn 10 kí tự")
      .max(500, "Mô tả không được vượt quá 500 ký tự"),
  })
  .required();

const ModalEditSupplier = ({ setIsOpen = () => {}, id }) => {
  const { supplierById, loading, isSuccess } = useSelector(
    (state) => state.supplier
  );
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      name: supplierById?.name || "",
      email: supplierById?.email || "",
      description: supplierById?.description || "",
    },
  });

  useEffect(() => {
    if (supplierById) {
      setValue("name", supplierById.name);
      setValue("email", supplierById.email);
      setValue("description", supplierById.description);
    }
  }, [supplierById, setValue]);

  useEffect(() => {
    dispatch(getSupplierById(id));
  }, []);

  const dispatch = useDispatch();

  const handleEditSupplier = (values) => {
    if (!isValid) return;
    dispatch(editSupplier({ ...values, supplierId: id }));
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
      dispatch(setSupplierById(null));
    }
  }, [isSuccess]);

  console.log(supplierById);

  return (
    <Modal setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(handleEditSupplier)}
        className="flex flex-col m-5 gap-y-5"
      >
        <GroupForm>
          <Label>Tên nhà cung cấp</Label>
          <Input
            control={control}
            name="name"
            errors={errors}
            placeholder="Nhập tên nhà cung cấp ..."
            className="w-full p-2"
          ></Input>
        </GroupForm>
        <GroupForm>
          <Label>Email</Label>
          <Input
            control={control}
            name="email"
            errors={errors}
            placeholder="Nhập email ..."
            className="w-full p-2"
          ></Input>
        </GroupForm>
        <GroupForm>
          <Label>Mô tả</Label>
          <Textarea
            control={control}
            name="description"
            errors={errors}
            placeholder="Nhập mô tả ..."
            className="w-full p-2"
          ></Textarea>
        </GroupForm>

        <Button
          disabled={loading}
          className={`w-1/5 p-2  ${
            loading
              ? "bg-gray-400 opacity-60 cursor-not-allowed text-black"
              : "bg-foreign text-main"
          }`}
        >
          {loading ? "Đang xử lý ..." : "Lưu thông tin"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalEditSupplier;
