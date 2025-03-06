import React, { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getProducts,
} from "@/store/features/product/productThunk";
import Tr from "../components/Tr";
import IconSearch from "@/components/icons/IconSearch";
import Td from "../components/Td";
import { formatCurrency } from "@/utils/format";
import Button from "@/components/button/Button";
import { setCurrentPage } from "@/store/features/product/productSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GroupForm from "@/components/group/GroupForm";
import Label from "@/components/label/Label";
import InputFile from "@/components/input/InputFile";
import Textarea from "@/components/input/Textarea";
import Input from "@/components/input/Input";
import { getBrands } from "@/store/features/brand/brandThunk";
import { getTypeProducts } from "@/store/features/typeProduct/typeProductThunk";
import { getGenders } from "@/store/features/gender/genderThunk";
import Select from "@/components/input/Select";
import { FILE_SIZE, TYPE_IMAGE } from "@/utils/constant";
import { toast } from "react-toastify";
import ModalEditProduct from "@/components/modal/ModalEditProduct";

const schema = yup
  .object()
  .shape({
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
  })
  .test(
    "at-least-one-image",
    "Ít nhất một ảnh phải được chọn",
    (values) => values.image1 || values.image2 || values.image3 || values.image4
  )
  .test(
    "valid-image-size",
    "Dung lượng ảnh không được vượt quá 2MB",
    (values) => {
      return [values.image1, values.image2, values.image3, values.image4].every(
        (file) => !file || file.size <= FILE_SIZE
      );
    }
  )
  .test("valid-image-type", "Định dạng ảnh không hợp lệ", (values) => {
    return [values.image1, values.image2, values.image3, values.image4].every(
      (file) => !file || TYPE_IMAGE.includes(file.type)
    );
  });

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, total_products, current_page } = useSelector(
    (state) => state.product
  );

  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e) => {
    const newSearch = e.target.value;
    if (search !== newSearch) {
      dispatch(setCurrentPage(1));
    }
    setSearch(newSearch);
  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handleEditProduct = (productId) => {
    setProductId(productId);
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getProducts({ page: current_page, limit: 5, name: search }));
  }, [current_page, search]);

  console.log(">>> current_page : ", current_page);

  console.log(products);

  console.log(search);
  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập tên sản phẩm ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách sản phẩm" className="text-2xl"></Title>
      {products?.length > 0 ? (
        <Table
          ths={Object.keys(products[0])}
          total_items={total_products}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {products.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.name}</Td>
              <Td>{formatCurrency(item.price)}</Td>
              <Td className="truncate">{item.description}</Td>
              <Td>{item.averageReview}</Td>
              <Td className="flex items-center justify-center">
                <img src={item.images[0]} alt="" className="w-20" />
              </Td>
              <Td>{item.gender.name}</Td>
              <Td>{item.type_product.name}</Td>
              <Td>{item.brand.name}</Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button
                    onClick={() => handleEditProduct(item._id)}
                    className="p-2 bg-foreign text-main"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteProduct(item._id)}
                    className="p-2 bg-secondary text-main"
                  >
                    Delete
                  </Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4 text-lg text-gray-700">
            Không có loại sản phẩm nào.
          </p>
        </div>
      )}
      {isOpen && <ModalEditProduct setIsOpen={setIsOpen} id={productId} />}
    </div>
  );
};

const AddProduct = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { loading, isSuccess } = useSelector((state) => state.product);
  const { typeProducts } = useSelector((state) => state.typeProduct);
  const { brands } = useSelector((state) => state.brand);
  const { genders } = useSelector((state) => state.gender);

  const fileInput1Ref = useRef(null);
  const fileInput2Ref = useRef(null);
  const fileInput3Ref = useRef(null);
  const fileInput4Ref = useRef(null);

  const handleAddProduct = (values) => {
    if (!isValid) return;
    const formData = new FormData();
    formData.append("image1", values.image1);
    formData.append("image2", values.image2);
    formData.append("image3", values.image3);
    formData.append("image4", values.image4);
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("gender", values.gender);
    formData.append("type_product", values.type_product);
    formData.append("brand", values.brand);
    dispatch(addProduct(formData));
  };

  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      arrError.forEach((_, index) => {
        toast.error(arrError[index].message);
      });
    }
  }, [errors]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      fileInput1Ref.current.value = "";
      fileInput2Ref.current.value = "";
      fileInput3Ref.current.value = "";
      fileInput4Ref.current.value = "";
    }
  }, [isSuccess]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getTypeProducts());
    dispatch(getGenders());
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-2 lg:grid-cols-4">
          <GroupForm>
            <Label>Ảnh 1</Label>
            <InputFile
              errors={errors}
              control={control}
              name="image1"
              className="w-full p-2"
              fileInputRef={fileInput1Ref}
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
              errors={errors}
              name="gender"
              control={control}
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
              errors={errors}
              name="type_product"
              control={control}
              className="w-full p-2"
            >
              <option value="">Loại sản phẩm</option>
              {typeProducts.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </GroupForm>
          <GroupForm>
            <Label>Thương hiệu</Label>
            <Select
              errors={errors}
              name="brand"
              control={control}
              className="w-full p-2"
            >
              <option value="">Thương hiệu</option>
              {brands.map((item, index) => (
                <option key={index} value={item._id}>
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
          {loading ? "Đang xử lý ..." : "Thêm"}
        </Button>
      </form>
    </div>
  );
};

export { ProductList, AddProduct };
