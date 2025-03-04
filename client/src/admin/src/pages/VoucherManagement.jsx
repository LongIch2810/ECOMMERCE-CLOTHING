import React, { useEffect } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { addVoucher, getVouchers } from "@/store/features/voucher/voucherThunk";
import Tr from "../components/Tr";
import Td from "../components/Td";
import { formatCurrency } from "@/utils/format";
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
  const { vouchers } = useSelector((state) => state.voucher);
  useEffect(() => {
    dispatch(getVouchers());
  }, []);
  return (
    <>
      <Title text="Danh sách mã giảm giá" className="text-2xl"></Title>
      {vouchers?.length > 0 ? (
        <Table ths={Object.keys(vouchers[0])}>
          {vouchers.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.title}</Td>
              <Td>{item.number_of_use}</Td>
              <Td>{item.code}</Td>
              <Td>{formatCurrency(item.max_discount)}</Td>
              <Td>{formatCurrency(item.min_order_price)}</Td>
              <Td>{item.status}</Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button className="p-2 bg-foreign text-main">Edit</Button>
                  <Button className="p-2 bg-secondary text-main">Delete</Button>
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
    </>
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
