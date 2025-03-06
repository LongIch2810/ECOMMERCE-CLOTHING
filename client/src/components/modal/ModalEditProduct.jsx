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
import InputFile from "../input/InputFile";
import {
  editProduct,
  getProductById,
} from "@/store/features/product/productThunk";
import { getBrands } from "@/store/features/brand/brandThunk";
import { getGenders } from "@/store/features/gender/genderThunk";
import { getTypeProducts } from "@/store/features/typeProduct/typeProductThunk";
import Textarea from "../input/Textarea";
import Select from "../input/Select";
import urlToFile from "@/utils/convertUrlToFile";
import {
  setIsSuccess,
  setProductById,
} from "@/store/features/product/productSlice";

const schema = yup.object().shape({
  image1: yup.mixed(),
  image2: yup.mixed(),
  image3: yup.mixed(),
  image4: yup.mixed(),
  name: yup.string().required("Tên sản phẩm không được để trống"),
  price: yup
    .number()
    .typeError("Giá phải là số")
    .positive("Giá phải lớn hơn 0")
    .required("Giá không được để trống"),
  description: yup.string().required("Mô tả không được để trống"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  type_product: yup.string().required("Vui lòng chọn loại sản phẩm"),
  brand: yup.string().required("Vui lòng chọn thương hiệu"),
});

const ModalEditProduct = ({ setIsOpen = () => {}, id }) => {
  const { productById, loading, isSuccess } = useSelector(
    (state) => state.product
  );
  const { typeProducts } = useSelector((state) => state.typeProduct);
  const { brands } = useSelector((state) => state.brand);
  const { genders } = useSelector((state) => state.gender);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      image1: productById?.images[0] || "",
      image2: productById?.images[1] || "",
      image3: productById?.images[2] || "",
      image4: productById?.images[3] || "",
      name: productById?.name || "",
      description: productById?.description || "",
      price: productById?.price || "",
      gender: productById?.gender.name || "",
      brand: productById?.brand.name || "",
      type_product: productById?.type_product.name || "",
    },
  });

  const fileInput1Ref = useRef(null);
  const fileInput2Ref = useRef(null);
  const fileInput3Ref = useRef(null);
  const fileInput4Ref = useRef(null);

  useEffect(() => {
    if (productById) {
      console.log("Đang setValue với dữ liệu: ", productById);
      setValue("name", productById.name);
      setValue("price", productById.price);
      setValue("description", productById.description);
      setValue("gender", productById.gender?._id);
      setValue("brand", productById.brand?._id);
      setValue("type_product", productById.type_product?._id);
      setValue("image1", productById.images[0]);
      setValue("image2", productById.images[1]);
      setValue("image3", productById.images[2]);
      setValue("image4", productById.images[3]);
    }
  }, [productById, setValue]);

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getBrands());
    dispatch(getGenders());
    dispatch(getTypeProducts());
  }, []);

  const dispatch = useDispatch();

  const handleEditProduct = async (values) => {
    if (!isValid) return;

    let image1 = values.image1;
    let image2 = values.image2;
    let image3 = values.image3;
    let image4 = values.image4;

    if (typeof values.image1 === "string") {
      image1 = await urlToFile(values.image1, "image1.jng");
    }

    if (typeof values.image2 === "string") {
      image2 = await urlToFile(values.image2, "image2.jng");
    }

    if (typeof values.image3 === "string") {
      image3 = await urlToFile(values.image3, "image3.jng");
    }

    if (typeof values.image4 === "string") {
      image4 = await urlToFile(values.image4, "image4.jng");
    }

    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("gender", values.gender);
    formData.append("type_product", values.type_product);
    formData.append("brand", values.brand);

    dispatch(editProduct({ productId: id, formData }));
  };

  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message);
    }
  }, [errors]);

  console.log(errors);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      dispatch(setIsSuccess(false));
      reset();
      fileInput1Ref.current.value = "";
      fileInput2Ref.current.value = "";
      fileInput3Ref.current.value = "";
      fileInput4Ref.current.value = "";
      dispatch(setProductById(null));
    }
  }, [isSuccess]);

  return (
    <Modal setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(handleEditProduct)}
        className="flex flex-col m-5 gap-y-5"
      >
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-1 lg:grid-cols-2">
          <GroupForm>
            <Label>Ảnh 1</Label>
            <InputFile
              errors={errors}
              control={control}
              name="image1"
              className="w-full p-2"
              fileInputRef={fileInput1Ref}
              defaultImage={productById?.images[0] || ""}
            ></InputFile>
          </GroupForm>
          <GroupForm>
            <Label>Ảnh 2</Label>
            <InputFile
              errors={errors}
              control={control}
              name="image2"
              className="w-full p-2"
              fileInputRef={fileInput2Ref}
              defaultImage={productById?.images[1] || ""}
            ></InputFile>
          </GroupForm>
          <GroupForm>
            <Label>Ảnh 3</Label>
            <InputFile
              errors={errors}
              control={control}
              name="image3"
              className="w-full p-2"
              fileInputRef={fileInput3Ref}
              defaultImage={productById?.images[2] || ""}
            ></InputFile>
          </GroupForm>
          <GroupForm>
            <Label>Ảnh 4</Label>
            <InputFile
              errors={errors}
              control={control}
              name="image4"
              className="w-full p-2"
              fileInputRef={fileInput4Ref}
              defaultImage={productById?.images[3] || ""}
            ></InputFile>
          </GroupForm>
          <GroupForm>
            <Label>Tên sản phẩm</Label>
            <Input
              errors={errors}
              control={control}
              name="name"
              placeholder="Nhập tên sản phẩm ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Giá</Label>
            <Input
              errors={errors}
              control={control}
              type="number"
              name="price"
              placeholder="Nhập giá sản phẩm ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Mô tả</Label>
            <Textarea
              errors={errors}
              control={control}
              name="description"
              placeholder="Nhập mô tả ..."
              className="w-full p-2"
            ></Textarea>
          </GroupForm>
          <GroupForm>
            <Label>Giới tính</Label>
            <Select
              defaultValue={productById?.gender?._id || ""}
              name="gender"
              control={control}
              errors={errors}
              className="w-full p-2"
            >
              <option value="">Giới tính</option>
              {genders.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </GroupForm>
          <GroupForm>
            <Label>Loại sản phẩm</Label>
            <Select
              defaultValue={productById?.type_product?._id || ""}
              errors={errors}
              name="type_product"
              control={control}
              className="w-full p-2"
            >
              <option value="">Loại sản phẩm</option>
              {typeProducts.map((item, index) => (
                <option
                  selected={productById?.type_product.name === item.name}
                  key={index}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}
            </Select>
          </GroupForm>
          <GroupForm>
            <Label>Thương hiệu</Label>
            <Select
              defaultValue={productById?.brand?._id || ""}
              errors={errors}
              name="brand"
              control={control}
              className="w-full p-2"
            >
              <option value="">Thương hiệu</option>
              {brands.map((item, index) => (
                <option
                  selected={productById?.brand.name === item.name}
                  key={index}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}
            </Select>
          </GroupForm>
        </div>
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

export default ModalEditProduct;
