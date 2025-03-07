import React, { useEffect } from "react";
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

import {
  editVoucher,
  getVoucherById,
} from "@/store/features/voucher/voucherThunk";
import {
  setIsSuccess,
  setVoucherById,
} from "@/store/features/voucher/voucherSlice";
import Select from "../input/Select";
import Textarea from "../input/Textarea";
import { UNIT } from "@/utils/constant";
import { formatInputDate } from "@/utils/format";

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
    end_date: yup.date().required("Vui lòng chọn ngày kết thúc"),
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

const ModalEditVoucher = ({ setIsOpen = () => {}, id }) => {
  const { voucherById, loading, isSuccess } = useSelector(
    (state) => state.voucher
  );
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      title: voucherById?.title || "",
      number_of_use: voucherById?.number_of_use || "",
      code: voucherById?.code || "",
      end_date: formatInputDate(voucherById?.end_date) || "",
      unit: voucherById?.unit || "",
      value: voucherById?.value || "",
      max_discount: voucherById?.max_discount || "",
      min_order_price: voucherById?.min_order_price || "",
    },
  });

  useEffect(() => {
    if (voucherById) {
      setValue("title", voucherById.title);
      setValue("description", voucherById.description);
      setValue("number_of_use", voucherById.number_of_use);
      setValue("code", voucherById.code);
      setValue("end_date", formatInputDate(voucherById?.end_date));
      setValue("unit", voucherById.unit);
      setValue("value", voucherById.value);
      setValue("max_discount", voucherById.max_discount);
      setValue("min_order_price", voucherById.min_order_price);
    }
  }, [voucherById, setValue]);

  useEffect(() => {
    dispatch(getVoucherById(id));
  }, []);

  const dispatch = useDispatch();

  const handleEditVoucher = (values) => {
    if (!isValid) return;
    console.log(">>> end_date : ", values.end_date);
    console.log(">> values : ", values);
    dispatch(editVoucher({ ...values, voucherId: id }));
  };

  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message);
    }
  }, [errors]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      dispatch(setIsSuccess(false));
      dispatch(setVoucherById(null));
    }
  }, [isSuccess]);

  console.log(voucherById);

  return (
    <Modal setIsOpen={setIsOpen}>
      <form
        onSubmit={handleSubmit(handleEditVoucher)}
        className="flex flex-col m-5 gap-y-5"
      >
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

export default ModalEditVoucher;
