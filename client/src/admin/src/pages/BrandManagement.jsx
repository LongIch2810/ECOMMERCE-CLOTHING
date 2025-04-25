import React, { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/store/features/brand/brandSlice";
import IconSearch from "@/components/icons/IconSearch";
import Button from "@/components/button/Button";
import {
  addBrand,
  deleteBrand,
  getFilterBrands,
} from "@/store/features/brand/brandThunk";
import Tr from "../components/Tr";
import Td from "../components/Td";
import GroupForm from "@/components/group/GroupForm";
import { Label } from "recharts";
import Input from "@/components/input/Input";
import { FILE_SIZE, TYPE_IMAGE } from "@/utils/constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputFile from "@/components/input/InputFile";
import { toast } from "react-toastify";
import ModalEditBrand from "@/components/modal/ModalEditBrand";

const schema = yup
  .object({
    name: yup.string().trim().required("Tên loại sản phẩm không được để trống"),
    logo: yup
      .mixed()
      .test("required", "Logo là bắt buộc", (file) => file instanceof File)
      .test(
        "fileSize",
        "Dung lượng ảnh không được vượt quá 2MB",
        (file) => file && file.size <= FILE_SIZE
      )
      .test(
        "fileType",
        "Định dạng ảnh không hợp lệ",
        (file) => file && TYPE_IMAGE.includes(file.type)
      ),
  })
  .required();

const BrandList = () => {
  const dispatch = useDispatch();
  const { filterBrands, current_page, total_brands } = useSelector(
    (state) => state.brand
  );

  const [search, setSearch] = useState("");
  const [brandId, setBrandId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getFilterBrands({ page: current_page, limit: 5, name: search }));
  }, [current_page, search]);

  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };

  const handleDeleteBrand = (brandId) => {
    dispatch(deleteBrand(brandId));
  };

  const handleEditBrand = (brandId) => {
    setBrandId(brandId);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập tên thương hiệu ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách loại sản phẩm" className="text-2xl"></Title>
      {filterBrands?.length > 0 ? (
        <Table
          ths={Object.keys(filterBrands[0])}
          total_items={total_brands}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {filterBrands.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.slug}</Td>
              <Td>
                <div className="flex items-center justify-center">
                  <img src={item.logo} alt="" className="w-20" />
                </div>
              </Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button
                    onClick={() => handleEditBrand(item._id)}
                    className="p-2 bg-foreign text-main"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteBrand(item._id)}
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
      {isOpen && <ModalEditBrand id={brandId} setIsOpen={setIsOpen} />}
    </div>
  );
};

const AddBrand = () => {
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
  const { loading, isSuccess } = useSelector((state) => state.brand);
  const fileInputRef = useRef(null);

  const handleAddBrand = (values) => {
    if (!isValid) return;
    const formData = new FormData();
    formData.append("name", values.name.toUpperCase());
    formData.append("logo", values.logo);
    dispatch(addBrand(formData));
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
      fileInputRef.current.value = "";
    }
  }, [isSuccess]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddBrand)}>
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-2 lg:grid-cols-3">
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
            ></InputFile>
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
export { BrandList, AddBrand };
