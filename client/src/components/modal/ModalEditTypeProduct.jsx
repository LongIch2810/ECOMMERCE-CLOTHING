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
import {
  editTypeProduct,
  getTypeProductById,
} from "@/store/features/typeProduct/typeProductThunk";
import {
  setIsSuccess,
  setTypeProductById,
} from "@/store/features/typeProduct/typeProductSlice";
import Select from "../input/Select";
import GroupForm from "../group/GroupForm";
import { getCategories } from "@/store/features/category/categoryThunk";

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .min(3, "Tên loại sản phẩm phải có ít nhất 3 ký tự")
      .max(50, "Tên loại sản phẩm không được quá 50 ký tự")
      .required("Tên loại sản phẩm không được để trống"),
    category_id: yup.string().required("Vui lòng chọn danh mục"),
  })
  .required();

const ModalEditTypeProduct = ({ setIsOpen = () => {}, id }) => {
  const { typeProductById, loading, isSuccess } = useSelector(
    (state) => state.typeProduct
  );
  const { categories } = useSelector((state) => state.category);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      name: typeProductById?.name || "",
      category_id: typeProductById?.category._id || "",
    },
  });

  useEffect(() => {
    if (typeProductById) {
      setValue("name", typeProductById.name);
      setValue("category_id", typeProductById.category._id);
    }
  }, [typeProductById, setValue]);

  useEffect(() => {
    dispatch(getTypeProductById(id));
    dispatch(getCategories());
  }, []);

  const dispatch = useDispatch();

  const handleEditTypeProduct = (values) => {
    if (!isValid) return;
    dispatch(editTypeProduct({ ...values, typeProductId: id }));
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
      dispatch(setTypeProductById(null));
    }
  }, [isSuccess]);

  return (
    <Modal setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(handleEditTypeProduct)}
        className="flex flex-col m-5 gap-y-5"
      >
        <GroupForm>
          <Label>Tên loại sản phẩm</Label>
          <Input
            errors={errors}
            control={control}
            name="name"
            placeholder="Nhập tên loại sản phẩm ..."
            className="w-full p-2"
          ></Input>
        </GroupForm>
        <GroupForm>
          <Label>Danh mục</Label>
          <Select
            errors={errors}
            name="category_id"
            control={control}
            className="w-full p-2"
          >
            <option value="">Danh mục</option>
            {categories?.length > 0 &&
              categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
          </Select>
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

export default ModalEditTypeProduct;
