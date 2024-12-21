import Button from "@/components/button/Button";
import Input from "@/components/input/Input";
import Label from "@/components/label/Label";
import Logo from "@/components/logo/Logo";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/store/features/auth/authThunk";

const schema = yup
  .object({
    name: yup
      .string()
      .min(6, "Username must be at least 6 characters")
      .required(),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: yup
      .string()
      .matches(/^(84|0)([3|5|7|8|9])+([0-9]{8})$/, "Invalid phone number")
      .required(),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { loading, isLoggedIn } = useSelector((state) => state.auth);

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

  const handleSignUp = (values) => {
    if (!isValid) return;
    const { name, email, phone, password } = values;
    dispatch(register({ name, email, phone, password }));
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
              action="#"
              className="grid grid-cols-6 gap-6 mt-8"
              onSubmit={handleSubmit(handleSignUp)}
            >
              <div className="col-span-6">
                <Label htmlFor="name">
                  <span>Username</span>
                  <span className="text-secondary">*</span>
                </Label>
                <Input
                  control={control}
                  name="name"
                  className="w-full p-2"
                  placeholder="Hãy nhập username"
                ></Input>
              </div>

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
                <Label htmlFor="phone">
                  <span>Phone</span>
                  <span className="text-secondary">*</span>
                </Label>
                <Input
                  control={control}
                  name="phone"
                  className="w-full p-2"
                  placeholder="Hãy nhập số điện thoại"
                ></Input>
              </div>

              <div className="col-span-6">
                <Label htmlFor="password">
                  <span>Password</span>
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

              <div className="col-span-6">
                <Label htmlFor="confirm">
                  <span>Password confirmation</span>
                  <span className="text-secondary">*</span>
                </Label>

                <Input
                  control={control}
                  type="password"
                  name="confirm"
                  className="w-full p-2"
                  placeholder="Hãy nhập lại mật khẩu"
                ></Input>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <Button className="inline-block px-12 py-3 text-sm bg-primary border-primary shrink-0 ">
                  Create an account
                </Button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <Link to="/sign-in" className="underline text-primary">
                    Log in
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

export default SignUp;
