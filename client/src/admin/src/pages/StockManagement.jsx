import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import ProductSelect from "@/components/input/ProductSelect";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GroupForm from "@/components/group/GroupForm";
import Input from "@/components/input/Input";
import Select from "@/components/input/Select";
import Label from "@/components/label/Label";
import { SIZES } from "@/utils/constant";
import Button from "@/components/button/Button";
import { toast } from "react-toastify";
import { getColors } from "@/store/features/color/colorThunk";
import { formatCurrency, formatDate } from "@/utils/format";
import { getSuppliers } from "@/store/features/supplier/supplierThunk";
import {
  addImportReceipt,
  getFilterImportReceipts,
} from "@/store/features/importReceipt/importReceiptThunk";
import { setCurrentPage } from "@/store/features/importReceipt/importReceiptSlice";
import IconSearch from "@/components/icons/IconSearch";
import Tr from "../components/Tr";
import Td from "../components/Td";

const schema = yup.object().shape({
  product: yup.object().required("Vui lòng chọn sản phẩm"),
  size: yup.string().required("Vui lòng chọn size"),
  color: yup.string().required("Vui lòng chọn màu sắc"),
  quantity: yup
    .number()
    .typeError("Số lượng phải là một số")
    .integer("Số lượng phải là số nguyên")
    .min(1, "Số lượng phải lớn hơn 0")
    .max(100, "Số lượng phải bé hơn 100")
    .required("Vui lòng nhập số lượng"),
  import_price: yup
    .number()
    .typeError("Giá nhập phải là một số")
    .min(1000, "Giá nhập phải lớn hơn 1000")
    .required("Vui lòng nhập giá nhập"),
});

const ReceiptList = () => {
  const dispatch = useDispatch();
  const { importReceipts, total_importReceipts, current_page, loading } =
    useSelector((state) => state.importReceipt);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getFilterImportReceipts({ page: current_page, id: search }));
  }, [current_page, search]);

  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };

  console.log(importReceipts);

  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập mã phiếu nhập ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách phiếu nhập" className="text-2xl"></Title>

      {importReceipts?.length > 0 ? (
        <Table
          ths={Object.keys(importReceipts[0])}
          total_items={total_importReceipts}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {importReceipts.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.supplier.name}</Td>
              <Td>{formatCurrency(item.total_price)}</Td>
              <Td>{item.note}</Td>
              <Td>{formatDate(item.createdAt)}</Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button className="p-2 bg-foreign text-main">Detail</Button>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4 text-lg text-gray-700">Không có phiếu nhập nào.</p>
        </div>
      )}
    </div>
  );
};

const AddReceipt = () => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const [products, setProducts] = useState([]);
  const [note, setNote] = useState("");
  const [supplier, setSupplier] = useState("");

  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.color);
  const { suppliers } = useSelector((state) => state.supplier);
  const { loading, isSuccess } = useSelector((state) => state.importReceipt);

  const handleAddProduct = (values) => {
    if (!isValid) return;
    const colorParse = values.color;
    setProducts((prev) => [
      ...prev,
      { ...values, color: JSON.parse(colorParse) },
    ]);
  };

  const handleDeleteProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImport = () => {
    if (products.length === 0) {
      toast.error("Phiếu nhập đang không có sản phẩm !");
      return;
    }

    if (!supplier) {
      toast.error("Vui lòng chọn nhà cung cấp !");
      return;
    }

    const tempProducts = products.map((item) => ({
      ...item,
      product: item.product._id,
      color: item.color._id,
    }));

    dispatch(addImportReceipt({ products: tempProducts, supplier, note }));
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
      setSupplier("");
      setProducts([]);
    }
  }, [isSuccess]);

  console.log(isSuccess);

  useEffect(() => {
    dispatch(getColors());
    dispatch(getSuppliers());
  }, []);

  return (
    <div>
      <form className="mb-10" onSubmit={handleSubmit(handleAddProduct)}>
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-2 lg:grid-cols-4">
          <GroupForm>
            <Label>Tên sản phẩm</Label>
            <ProductSelect
              control={control}
              name="product"
              errors={errors}
            ></ProductSelect>
          </GroupForm>
          <GroupForm>
            <Label>Size</Label>
            <Select
              errors={errors}
              name="size"
              control={control}
              className="w-full p-2"
            >
              <option value={{}}>Size</option>
              {SIZES.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </GroupForm>
          <GroupForm>
            <Label>Màu sắc</Label>
            <Select
              errors={errors}
              name="color"
              control={control}
              className="w-full p-2"
            >
              <option value="">Màu sắc</option>
              {colors?.map((item, index) => (
                <option key={index} value={JSON.stringify(item)}>
                  {item.name}
                </option>
              ))}
            </Select>
          </GroupForm>
          <GroupForm>
            <Label>Số lượng</Label>
            <Input
              errors={errors}
              control={control}
              type="number"
              name="quantity"
              placeholder="Nhập số lượng..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Giá nhập</Label>
            <Input
              errors={errors}
              control={control}
              type="number"
              name="import_price"
              placeholder="Nhập giá nhập sản phẩm..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
        </div>
        <Button
          // disabled={loading}
          className={`w-1/5 p-2  bg-foreign text-main`}
        >
          Thêm sản phẩm
        </Button>
      </form>

      <div className="mb-20">
        {products?.length > 0 ? (
          <table className="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="px-4 py-2">STT</th>
                {Object.keys(products[0]).map((item, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item}
                  </th>
                ))}

                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    {formatCurrency(item.import_price)}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    {item.color.name}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                    {item.size}
                  </td>
                  <td className="px-4 py-2 font-medium text-center text-gray-900 whitespace-nowrap">
                    {item.product?.name}
                  </td>
                  <td className="px-4 py-2 text-center whitespace-nowrap">
                    <Button
                      onClick={() => handleDeleteProduct(index)}
                      className="p-2 bg-secondary text-main"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
            <p className="mb-4 text-lg text-gray-700">
              Không có loại sản phẩm nào.
            </p>
          </div>
        )}
      </div>

      <div className="inline-block mb-3">
        <Label>Nhà cung cấp</Label>
        <select
          onChange={(e) => setSupplier(e.target.value)}
          className="w-full p-2 border rounded-md shadow-lg outline-none"
        >
          <option value="">Nhà cung cấp</option>
          {suppliers?.length > 0 &&
            suppliers.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mt-5">
        <Label>Ghi chú</Label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows="3"
          placeholder="Nhập ghi chú..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* ✅ Thêm button Nhập hàng */}
      <div className="mt-5 text-right cursor-pointer">
        <Button
          onClick={handleImport}
          className={`p-3  ${
            loading
              ? "bg-gray-400 opacity-60 cursor-not-allowed text-black"
              : "bg-foreign text-main"
          }`}
          disabled={loading}
        >
          {loading ? "Đang xử lý ..." : "Nhập hàng"}
        </Button>
      </div>
    </div>
  );
};

export { ReceiptList, AddReceipt };
