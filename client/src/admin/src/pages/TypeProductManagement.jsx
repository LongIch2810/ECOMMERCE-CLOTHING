import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import {
  addTypeProduct,
  deleteTypeProduct,
  getFilterTypeProducts,
} from "@/store/features/typeProduct/typeProductThunk";
import Tr from "../components/Tr";
import Td from "../components/Td";
import { setCurrentPage } from "@/store/features/typeProduct/typeProductSlice";
import IconSearch from "@/components/icons/IconSearch";
import Button from "@/components/button/Button";
import Label from "@/components/label/Label";
import Input from "@/components/input/Input";
import { getCategories } from "@/store/features/category/categoryThunk";
import GroupForm from "@/components/group/GroupForm";
import Select from "@/components/input/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import ModalEditTypeProduct from "@/components/modal/ModalEditTypeProduct";

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

const TypeProductList = () => {
  const dispatch = useDispatch();
  const { filterTypeProducts, current_page, total_typeProducts } = useSelector(
    (state) => state.typeProduct
  );

  const [search, setSearch] = useState("");
  const [typeProductId, setTypeProductId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(
      getFilterTypeProducts({ page: current_page, limit: 5, name: search })
    );
  }, [current_page, search]);

  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };

  const handleDeleteTypeProduct = (typeProductId) => {
    dispatch(deleteTypeProduct(typeProductId));
  };

  const handleEditTypeProduct = (typeProductId) => {
    setTypeProductId(typeProductId);
    setIsOpen(true);
  };

  console.log(typeProductId);

  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập tên loại sản phẩm ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách loại sản phẩm" className="text-2xl"></Title>
      {filterTypeProducts?.length > 0 ? (
        <Table
          ths={Object.keys(filterTypeProducts[0])}
          total_items={total_typeProducts}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {filterTypeProducts.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.slug}</Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button
                    onClick={() => handleEditTypeProduct(item._id)}
                    className="p-2 bg-foreign text-main"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteTypeProduct(item._id)}
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
      {isOpen && (
        <ModalEditTypeProduct id={typeProductId} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

const AddTypeProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { loading, isSuccess } = useSelector((state) => state.typeProduct);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const handleAddTypeProduct = (values) => {
    if (!isValid) return;
    dispatch(addTypeProduct(values));
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
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddTypeProduct)}>
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-2 lg:grid-cols-4">
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

export { TypeProductList, AddTypeProduct };
