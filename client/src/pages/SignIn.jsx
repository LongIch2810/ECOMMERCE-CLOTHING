import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Label from "@/components/label/Label";
import Logo from "@/components/logo/Logo";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/features/auth/authThunk";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Vui lòng nhập đúng định dạng email !")
      .required("Email không được để trống"),
    password: yup
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 kí tự !")
      .required("Mật khẩu không được để trống !"),
  })
  .required();

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    const arrError = Object.values(errors);
    if (arrError.length > 0) {
      toast.error(arrError[0].message);
    }
  }, [errors]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);

  const handleSignIn = (values) => {
    if (!isValid) return;
    dispatch(login(values));
  };
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://plus.unsplash.com/premium_photo-1664201890484-a5f7109c8e56?q=80&w=1952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 object-cover w-full h-full"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div>
              <Logo></Logo>
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome to Dirty Clothes
            </h1>

            <form
              className="grid grid-cols-6 gap-6 mt-8"
              onSubmit={handleSubmit(handleSignIn)}
            >
              <div className="col-span-6">
                <Label htmlFor="email">
                  <span>Email</span>
                  <span className="text-secondary">*</span>
                </Label>
                <Input
                  control={control}
                  type="email"
                  name="email"
                  className="w-full p-2"
                  placeholder="Hãy nhập email"
                ></Input>
              </div>

              <div className="col-span-6">
                <Label htmlFor="password">
                  <span>Mật khẩu</span>
                  <span className="text-secondary">*</span>
                </Label>

                <Input
                  control={control}
                  type="password"
                  name="password"
                  className="w-full p-2"
                  placeholder="Hãy nhập mật khẩu"
                ></Input>
              </div>

              <div className="col-span-6 mt-4 text-sm">
                <Link to="/forgot-password" className="underline text-primary">
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button className="inline-block px-12 py-3 text-sm text-main bg-primary border-primary shrink-0 ">
                  Đăng nhập
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Bạn đã có tài khoản chưa?
                  <Link to="/sign-up" className="underline text-primary">
                    Đăng ký
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignIn;
