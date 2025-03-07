import React, { useEffect, useState } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import {
  addVoucher,
  deleteVoucher,
  getFilterVouchers,
  getVouchers,
} from "@/store/features/voucher/voucherThunk";
import Tr from "../components/Tr";
import Td from "../components/Td";
import { formatCurrency, formatDate } from "@/utils/format";
import Button from "@/components/button/Button";
import { UNIT } from "@/utils/constant";
import GroupForm from "@/components/group/GroupForm";
import Label from "@/components/label/Label";
import Select from "@/components/input/Select";
import Input from "@/components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textarea from "@/components/input/Textarea";
import { toast } from "react-toastify";
import { setCurrentPage } from "@/store/features/voucher/voucherSlice";
import IconSearch from "@/components/icons/IconSearch";
import ModalEditVoucher from "@/components/modal/ModalEditVoucher";

const schema = yup
  .object({
    title: yup.string().required("Vui lòng nhập tiêu đề mã giảm giá"),
    number_of_use: yup
      .number()
      .typeError("Số lượng phải là số")
      .min(1, "Số lượng phải lớn hơn 0")
      .required("Vui lòng nhập số lượng"),
    code: yup.string().required("Vui lòng nhập mã code"),
    description: yup.string().required("Vui lòng nhập mô tả"),
    end_date: yup
      .date()
      .required("Vui lòng chọn ngày kết thúc")
      .min(new Date(), "Ngày kết thúc phải lớn hơn ngày hiện tại"),
    unit: yup
      .string()
      .oneOf(["%", "VND"], "Chỉ có đơn vị % và VND !")
      .required("Vui lòng chọn đơn vị"), // Chỉ chấp nhận % hoặc VND
    value: yup
      .number()
      .typeError("Giá trị phải là số")
      .required("Vui lòng nhập giá trị")
      .test("validate-value", "Giá trị không hợp lệ", function (value) {
        const { unit } = this.parent; // Lấy unit từ form
        if (unit === "%") {
          return value >= 1 && value <= 100;
        }
        if (unit === "VND") {
          return value >= 1000;
        }
        return true;
      }),
    max_discount: yup
      .number()
      .typeError("Giảm giá tối đa phải là số")
      .min(1, "Giảm giá tối đa phải lớn hơn 0")
      .required("Vui lòng nhập giá tối đa được giảm"),
    min_order_price: yup
      .number()
      .typeError("Giá đơn tối thiểu phải là số")
      .min(1, "Giá đơn tối thiểu phải lớn hơn 0")
      .required("Vui lòng nhập giá đơn tối thiểu"),
  })
  .required();

const VoucherList = () => {
  const dispatch = useDispatch();
  const { filterVouchers, total_vouchers, current_page } = useSelector(
    (state) => state.voucher
  );

  const [search, setSearch] = useState("");
  const [voucherId, setVoucherId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };

  const handleDeleteVoucher = (voucherId) => {
    dispatch(deleteVoucher(voucherId));
  };

  const handleEditVoucher = (supplierId) => {
    setVoucherId(supplierId);
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getFilterVouchers({ page: current_page, limit: 5, code: search }));
  }, [current_page, search]);

  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập code giảm giá ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách mã giảm giá" className="text-2xl"></Title>
      {filterVouchers?.length > 0 ? (
        <Table
          ths={Object.keys(filterVouchers[0])}
          total_items={total_vouchers}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {filterVouchers.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.title}</Td>
              <Td>{item.number_of_use}</Td>
              <Td>{item.code}</Td>
              <Td>{formatDate(item.end_date)}</Td>
              <Td>{formatCurrency(item.max_discount)}</Td>
              <Td>{formatCurrency(item.min_order_price)}</Td>
              <Td>{item.status}</Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button
                    onClick={() => handleEditVoucher(item._id)}
                    className="p-2 bg-foreign text-main"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteVoucher(item._id)}
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
            Không có mã giảm giá nào.
          </p>
        </div>
      )}
      {isOpen && <ModalEditVoucher id={voucherId} setIsOpen={setIsOpen} />}
    </div>
  );
};

const AddVoucher = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const { loading, isAddVoucher } = useSelector((state) => state.voucher);

  const dispatch = useDispatch();

  const handleAddVoucher = (values) => {
    if (!isValid) return;
    dispatch(addVoucher(values));
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
    if (isAddVoucher) {
      reset();
    }
  }, [isAddVoucher]);
  return (
    <div>
      <form onSubmit={handleSubmit(handleAddVoucher)}>
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-2 lg:grid-cols-3">
          <GroupForm>
            <Label>Tiêu đề mã giảm giá</Label>
            <Input
              control={control}
              errors={errors}
              name="title"
              placeholder="Nhập tiêu đề mã giảm giá ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Số lượng</Label>
            <Input
              control={control}
              errors={errors}
              type="number"
              name="number_of_use"
              placeholder="Nhập số lượng ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Code</Label>
            <Input
              control={control}
              errors={errors}
              name="code"
              placeholder="Nhập code ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>description</Label>
            <Textarea
              control={control}
              errors={errors}
              name="description"
              placeholder="Nhập mô tả ..."
              className="w-full p-2"
            ></Textarea>
          </GroupForm>
          <GroupForm>
            <Label>Ngày kết thúc mã giảm giá</Label>
            <Input
              control={control}
              errors={errors}
              name="end_date"
              type="date"
              placeholder="Nhập ngày kết thúc ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Giá trị</Label>
            <Input
              control={control}
              errors={errors}
              name="value"
              type="number"
              placeholder="Nhập giá trị ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Giảm giá tối đa</Label>
            <Input
              control={control}
              errors={errors}
              name="max_discount"
              type="number"
              placeholder="Nhập giá tối đa được giảm ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Giá đơn tối thiểu</Label>
            <Input
              control={control}
              errors={errors}
              type="number"
              name="min_order_price"
              placeholder="Nhập giá đơn tối thiểu ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Đơn vị</Label>
            <Select
              errors={errors}
              name="unit"
              control={control}
              className="w-full p-2"
            >
              <option value="">Đơn vị</option>
              {UNIT.map((item) => (
                <option key={item._id} value={item.unit}>
                  {item.unit}
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
export { VoucherList, AddVoucher };
