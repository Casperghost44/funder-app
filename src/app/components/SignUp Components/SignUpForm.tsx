"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = function (data: any) {
    const { username, email, password } = data;
    axios
      .post("/api/Signup", { username, email, password })
      .catch((error) => console.error(error));
    if (router) {
      router.push("/login");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 text-[#555] flex flex-col gap-8 border-4 border-solid border-[#ecc9f4] my-16 rounded-[14px] min-w-[50%]"
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className="border border-solid border-[#555] p-2 rounded-[7px]"
          {...register("username", {
            required: true,
            minLength: 3,
            maxLength: 60,
          })}
        />
        {errors.username && (
          <span className="text-[#c92a2a]">
            Invalid username! Username Should be between 3 and 60 characters.
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="border border-solid border-[#555] p-2 rounded-[7px]"
          {...register("email", { required: true })}
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
        {errors.password && (
          <span className="text-[#c92a2a]">
            Invalid Password! Password should be between 6 and 50 characters.
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="border border-solid border-[#555] p-2 rounded-[7px]"
          {...register("confirmPassword", {
            required: true,
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-[#c92a2a]">
            Password does not match or empty
          </span>
        )}
      </div>
      <button
        type="submit"
        className="rounded-[7px] py-4 bg-[#be4bdb] text-[#fff] font-medium border-none"
      >
        Submit
      </button>
      <div className="flex gap-8 items-center">
        <span>Already have an Account?</span>
        <Link
          href={"/login"}
          className="text-[#be4bdb] pb-1 border-b-2 inline-block border-solid border-[#be4bdb]"
        >
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
