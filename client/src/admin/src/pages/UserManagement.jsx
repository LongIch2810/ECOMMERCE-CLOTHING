import React, { useEffect, useRef, useState } from "react";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { addUser, getUsers } from "@/store/features/user/userThunk";
import Tr from "../components/Tr";
import Td from "../components/Td";
import Button from "@/components/button/Button";
import IconSearch from "@/components/icons/IconSearch";
import { setCurrentPage } from "@/store/features/user/userSlice";
import Label from "@/components/label/Label";
import Input from "@/components/input/Input";
import GroupForm from "@/components/group/GroupForm";
import Select from "@/components/input/Select";
import { FILE_SIZE, ROLE, TYPE_IMAGE } from "@/utils/constant";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import InputFile from "@/components/input/InputFile";

const schema = yup
  .object({
    avatar: yup
      .mixed()
      .test(
        "required",
        "Ảnh đại diện là bắt buộc",
        (file) => file instanceof File
      )
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
    name: yup
      .string()
      .min(6, "Tên người dùng phải có ít nhất 6 kí tự !")
      .required(),
    email: yup
      .string()
      .email("Vui lòng nhập đúng định dạng email !")
      .required("Email không được để trống"),
    password: yup
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 kí tự !")
      .required("Mật khẩu không được để trống !"),
    fullname: yup
      .string()
      .trim()
      .min(3, "Họ và tên phải có ít nhất 3 ký tự")
      .max(100, "Họ và tên không được quá 100 ký tự")
      .required("Họ và tên là bắt buộc"),
    phone: yup
      .string()
      .trim()
      .matches(/^(0\d{9,10})$/, "Số điện thoại không hợp lệ")
      .required("Số điện thoại là bắt buộc"),
    role: yup
      .string()
      .oneOf(["Admin", "Customer"], "Vai trò không hợp lệ")
      .required("Vai trò là bắt buộc"),
  })
  .required();

const UserList = () => {
  const dispatch = useDispatch();
  const { users, total_users, current_page } = useSelector(
    (state) => state.user
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getUsers({ page: current_page, name: search }));
  }, [current_page, search]);

  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };
  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập tên người dùng ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách người dùng" className="text-2xl"></Title>
      {users?.length > 0 ? (
        <Table
          ths={Object.keys(users[0])}
          total_items={total_users}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {users.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.email}</Td>
              <Td>{item.fullname}</Td>
              <Td>{item.phone}</Td>
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
          <p className="mb-4 text-lg text-gray-700">Không có người dùng nào.</p>
        </div>
      )}
    </div>
  );
};

const AddUser = () => {
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
  const { loading, isSuccess } = useSelector((state) => state.user);

  const fileInputRef = useRef(null);

  const handleAddUser = (values) => {
    if (!isValid) return;
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("avatar", values.avatar);
    formData.append("phone", values.phone);
    formData.append("fullname", values.fullname);
    formData.append("role", values.role);
    dispatch(addUser(formData));
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
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="grid grid-cols-1 gap-10 mb-5 md:grid-cols-2 lg:grid-cols-3">
          <GroupForm>
            <Label>Ảnh đại diện</Label>
            <InputFile
              errors={errors}
              control={control}
              name="avatar"
              className="w-full p-2"
              fileInputRef={fileInputRef}
            ></InputFile>
          </GroupForm>
          <GroupForm>
            <Label>Tên người dùng</Label>
            <Input
              errors={errors}
              control={control}
              name="name"
              placeholder="Nhập tên người dùng ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Email</Label>
            <Input
              errors={errors}
              control={control}
              name="email"
              placeholder="Nhập email ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Mật khẩu</Label>
            <Input
              errors={errors}
              control={control}
              name="password"
              placeholder="Nhập mật khẩu ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Họ và tên</Label>
            <Input
              errors={errors}
              control={control}
              name="fullname"
              placeholder="Nhập họ và tên ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Số điện thoại</Label>
            <Input
              errors={errors}
              control={control}
              name="phone"
              placeholder="Nhập số điện thoại ..."
              className="w-full p-2"
            ></Input>
          </GroupForm>
          <GroupForm>
            <Label>Vai trò</Label>
            <Select
              errors={errors}
              name="role"
              control={control}
              className="w-full p-2"
            >
              <option value="">Vai trò</option>
              {ROLE.map((item, index) => (
                <option key={index} value={item}>
                  {item}
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

export { UserList, AddUser };
