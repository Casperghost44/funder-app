"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();

  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = function (data: any) {
    const { email, password } = data;
    axios.post("/api/Login", { email, password }).catch((error) => error);

    if (router && !error) {
      router.push("/");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 text-[#555] flex flex-col gap-8 border-4 border-solid border-[#ecc9f4] my-16 rounded-[14px] min-w-[50%]"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="border border-solid border-[#555] p-2 rounded-[7px]"
          {...register("email", {
            required: true,
            minLength: 3,
            maxLength: 60,
          })}
        />
        {errors.email && <span className="text-[#c92a2a]">Invalid email!</span>}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="border border-solid border-[#555] p-2 rounded-[7px]"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 50,
          })}
        />
      </div>
      <button
        type="submit"
        className="rounded-[7px] py-4 bg-[#be4bdb] text-[#fff] font-medium border-none"
      >
        Login
      </button>
      {error && <span className="text-[#c92a2a]">Wrong Credentials!</span>}
      <div className="flex gap-8 items-center">
        <span>Does not have an Account?</span>
        <Link
          href={"/singup"}
          className="text-[#be4bdb] pb-1 border-b-2 inline-block border-solid border-[#be4bdb]"
        >
          Sing Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
