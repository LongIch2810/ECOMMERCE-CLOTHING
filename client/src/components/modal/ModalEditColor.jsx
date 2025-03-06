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

import { editColor, getColorById } from "@/store/features/color/colorThunk";
import { setColorById, setIsSuccess } from "@/store/features/color/colorSlice";

const schema = yup
  .object({
    name: yup.string().trim().required("Tên màu sắc không được để trống"),
    hexCode: yup
      .string()
      .trim()
      .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Mã màu không hợp lệ")
      .required("Mã màu không được để trống"),
  })
  .required();

const ModalEditColor = ({ setIsOpen = () => {}, id }) => {
  const { colorById, loading, isSuccess } = useSelector((state) => state.color);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      name: colorById?.name || "",
      hexCode: colorById?.hexCode || "",
    },
  });

  useEffect(() => {
    if (colorById) {
      setValue("name", colorById.name);
      setValue("hexCode", colorById.hexCode);
    }
  }, [colorById, setValue]);

  useEffect(() => {
    dispatch(getColorById(id));
  }, []);

  const dispatch = useDispatch();

  const handleEditColor = (values) => {
    if (!isValid) return;
    dispatch(editColor({ ...values, colorId: id }));
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
      dispatch(setColorById(null));
    }
  }, [isSuccess]);

  console.log(colorById);

  return (
    <Modal setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(handleEditColor)}
        className="flex flex-col m-5 gap-y-5"
      >
        <GroupForm>
          <Label>Tên màu sắc</Label>
          <Input
            control={control}
            errors={errors}
            name="name"
            placeholder="Nhập tên màu sắc ..."
            className="w-full p-2"
          ></Input>
        </GroupForm>
        <GroupForm>
          <Label>Mã màu hex</Label>
          <Input
            control={control}
            errors={errors}
            name="hexCode"
            placeholder="Nhập mã màu ..."
            className="w-full p-2"
          ></Input>
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

export default ModalEditColor;
