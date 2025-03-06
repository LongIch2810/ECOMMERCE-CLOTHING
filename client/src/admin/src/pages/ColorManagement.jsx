import React, { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import IconSearch from "@/components/icons/IconSearch";
import Button from "@/components/button/Button";
import { addBrand, getFilterBrands } from "@/store/features/brand/brandThunk";
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
import { setCurrentPage } from "@/store/features/color/colorSlice";
import {
  addColor,
  deleteColor,
  getFilterColors,
} from "@/store/features/color/colorThunk";
import ModalEditColor from "@/components/modal/ModalEditColor";

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

const ColorList = () => {
  const dispatch = useDispatch();
  const { filterColors, current_page, total_colors, loading } = useSelector(
    (state) => state.color
  );

  const [search, setSearch] = useState("");
  const [colorId, setColorId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getFilterColors({ page: current_page, limit: 5, name: search }));
  }, [current_page, search]);

  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };

  const handleDeleteColor = (colorId) => {
    dispatch(deleteColor(colorId));
  };

  const handleEditColor = (colorId) => {
    setColorId(colorId);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập tên màu sắc ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách màu sắc" className="text-2xl"></Title>
      {filterColors?.length > 0 ? (
        <Table
          ths={Object.keys(filterColors[0])}
          total_items={total_colors}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {filterColors.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.hexCode}</Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button
                    onClick={() => handleEditColor(item._id)}
                    className="p-2 bg-foreign text-main"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteColor(item._id)}
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
          <p className="mb-4 text-lg text-gray-700">Không có màu sắc nào.</p>
        </div>
      )}
      {isOpen && <ModalEditColor id={colorId} setIsOpen={setIsOpen} />}
    </div>
  );
};

const AddColor = () => {
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
  const { loading, isSuccess } = useSelector((state) => state.color);

  const handleAddColor = (values) => {
    if (!isValid) return;
    dispatch(addColor({ ...values, name: values.name.toUpperCase() }));
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
    }
  }, [isSuccess]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddColor)}>
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-2 lg:grid-cols-3">
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
export { ColorList, AddColor };
