import React, { useEffect, useRef } from "react";
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
import { editBrand, getBrandById } from "@/store/features/brand/brandThunk";
import { setBrandById, setIsSuccess } from "@/store/features/brand/brandSlice";
import InputFile from "../input/InputFile";
import urlToFile from "@/utils/convertUrlToFile";

const schema = yup
  .object({
    name: yup.string().trim().required("Tên loại sản phẩm không được để trống"),
    logo: yup.mixed().required("Logo không được để trống !"),
  })
  .required();

const ModalEditBrand = ({ setIsOpen = () => {}, id }) => {
  const { brandById, loading, isSuccess } = useSelector((state) => state.brand);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      name: brandById?.name || "",
      logo: brandById?.logo || "",
    },
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (brandById) {
      setValue("name", brandById.name);
      setValue("logo", brandById.logo);
    }
  }, [brandById, setValue]);

  useEffect(() => {
    dispatch(getBrandById(id));
  }, []);

  const dispatch = useDispatch();

  const handleEditBrand = async (values) => {
    if (!isValid) return;

    console.log(values);

    let logo = values.logo;

    if (typeof logo === "string") {
      logo = await urlToFile(values.logo, "logo.jng");
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("logo", logo);
    dispatch(editBrand({ brandId: id, formData }));
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
      dispatch(setBrandById(null));
      fileInputRef.current.value = "";
    }
  }, [isSuccess]);

  console.log(brandById);

  return (
    <Modal setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(handleEditBrand)}
        className="flex flex-col m-5 gap-y-5"
      >
        <GroupForm>
          <Label>Tên thương hiệu</Label>
          <Input
            control={control}
            errors={errors}
            name="name"
            placeholder="Nhập tên thương hiệu ..."
            className="w-full p-2"
          ></Input>
        </GroupForm>
        <GroupForm>
          <Label>Logo</Label>
          <InputFile
            errors={errors}
            control={control}
            name="logo"
            className="w-full p-2"
            fileInputRef={fileInputRef}
            defaultImage={brandById?.logo || ""}
          ></InputFile>
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

export default ModalEditBrand;
