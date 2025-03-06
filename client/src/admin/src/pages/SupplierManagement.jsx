import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/store/features/supplier/supplierSlice";
import Tr from "../components/Tr";
import Td from "../components/Td";
import {
  addSupplier,
  deleteSupplier,
  getFilterSuppliers,
} from "@/store/features/supplier/supplierThunk";
import IconSearch from "@/components/icons/IconSearch";
import Button from "@/components/button/Button";
import GroupForm from "@/components/group/GroupForm";
import Label from "@/components/label/Label";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textarea from "@/components/input/Textarea";
import { toast } from "react-toastify";
import ModalEditSupplier from "@/components/modal/ModalEditSupplier";

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

const SupplierList = () => {
  const dispatch = useDispatch();
  const { filterSuppliers, total_suppliers, current_page } = useSelector(
    (state) => state.supplier
  );

  const [search, setSearch] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getFilterSuppliers({ page: current_page, name: search }));
  }, [current_page, search]);

  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };

  const handleDeleteSupplier = (supplierId) => {
    dispatch(deleteSupplier(supplierId));
  };

  const handleEditSupplier = (supplierId) => {
    setSupplierId(supplierId);
    setIsOpen(true);
  };
  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập tên nhà cung cấp ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách nhà cung cấp" className="text-2xl"></Title>
      {filterSuppliers?.length > 0 ? (
        <Table
          ths={Object.keys(filterSuppliers[0])}
          total_items={total_suppliers}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {filterSuppliers.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td className="flex items-center gap-x-3">
                <Button
                  onClick={() => handleEditSupplier(item._id)}
                  className="p-2 bg-foreign text-main"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteSupplier(item._id)}
                  className="p-2 bg-secondary text-main"
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4 text-lg text-gray-700">
            Không có nhà cung cấp nào.
          </p>
        </div>
      )}
      {isOpen && <ModalEditSupplier id={supplierId} setIsOpen={setIsOpen} />}
    </div>
  );
};

const AddSupplier = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { isSuccess, loading } = useSelector((state) => state.supplier);

  const handleAddSupplier = (values) => {
    if (!isValid) return;
    dispatch(addSupplier(values));
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      arrError.forEach((_, index) => {
        toast.error(arrError[index].message);
      });
    }
  }, [errors]);

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddSupplier)}>
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-1 lg:grid-cols-2">
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
export { SupplierList, AddSupplier };
