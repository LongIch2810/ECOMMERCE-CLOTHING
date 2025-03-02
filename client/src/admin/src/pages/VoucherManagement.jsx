import React, { useEffect } from "react";
import LayoutAdmin from "../components/LayoutAdmin";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { getVouchers } from "@/store/features/voucher/voucherThunk";
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
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
  });

  const handleAddUser = (values) => {
    console.log(values);
  };
  return (
    <div>
      <form>
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-2 lg:grid-cols-3">
          <GroupForm>
            <Label>Tiêu đề mã giảm giá</Label>
            <Input
              control={control}
              name="title"
              placeholder="Nhập tiêu đề mã giảm giá ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Số lượng</Label>
            <Input
              control={control}
              name="number_of_use"
              placeholder="Nhập số lượng ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Code</Label>
            <Input
              control={control}
              name="code"
              placeholder="Nhập code ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>description</Label>
            <Input
              control={control}
              name="description"
              placeholder="Nhập mô tả ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Ngày kết thúc mã giảm giá</Label>
            <Input
              control={control}
              name="end_date"
              placeholder="Nhập ngày kết thúc ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Giá trị</Label>
            <Input
              control={control}
              name="value"
              placeholder="Nhập giá trị ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Giảm giá tối đa</Label>
            <Input
              control={control}
              name="max_discount"
              placeholder="Nhập giá tối đa được giảm ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Giá đơn tối thiểu</Label>
            <Input
              control={control}
              name="min_order_price"
              placeholder="Nhập giá đơn tối thiểu ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Đơn vị</Label>
            <Select name="role" control={control} className="w-full p-2">
              {UNIT.map((item) => (
                <option key={item._id} value={item.unit}>
                  {item.unit}
                </option>
              ))}
            </Select>
          </GroupForm>
        </div>
        <Button className="w-1/5 p-2 bg-foreign text-main">Thêm</Button>
      </form>
    </div>
  );
};
export { VoucherList, AddVoucher };
