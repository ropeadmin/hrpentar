"use client";

import MyTextField from "@/app/components/Fields/MyTextField";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import { profileLoginAction } from "@/store/profile.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { makeRequest, isLoading } = useRequest();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    catchAsync(
      async () => {
        const loginRes = await makeRequest({
          method: "POST",
          url: API.login,
          data: formData,
        });

        const loginData = loginRes?.data?.data;

        if (loginData?.accessToken) {
          const combinedData = {
            ...loginData,
          };
          dispatch(profileLoginAction(combinedData));

          enqueueSnackbar("Login Successfully!", {
            variant: "rope_snackbar",
            autoHideDuration: 5000,
          });

          router.push("/dashboard");
          setFormData({
            email: "",
            password: "",
          });
        } else {
          enqueueSnackbar("Login failed. No token received!", {
            variant: "rope_snackbar",
            autoHideDuration: 5000,
            error: true,
          });
        }
      },
      (error: any) => {
        const response = error?.response;
        if (response) {
          enqueueSnackbar(
            response?.data?.data?.message || "An error occurred during login",
            {
              variant: "rope_snackbar",
              autoHideDuration: 5000,
              error: true,
            }
          );
        } else {
          enqueueSnackbar("A network error occurred!", {
            variant: "rope_snackbar",
            autoHideDuration: 5000,
            error: true,
          });
        }
      }
    );
  };

  return (
    <div className="bg-[#fff] min-h-screen flex p-4">
      <div
        className="relative rounded-[16px] flex-grow h-full w-full overflow-hidden bg-[url('/images/auth-1.jpeg')] min-h-screen p-7"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img src="/pentaHR.svg" width={150} height={150} />

        <div className="absolute bottom-7 left-7 right-7 h-auto auth-glass p-5">
          <p className="text-white text-base font-medium font-['Cabinet Grotesk'] leading-tight">
            &quot;PentaHR has revolutionized our HR processes. The intuitive
            interface and comprehensive features have significantly reduced
            administrative tasks, allowing us to focus more on employee
            engagement and development. It&apos;s a game-changer for any HR
            team!&quot;
          </p>
          <div className="mt-5">
            <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">
              Kolawole Immanuel
            </div>
            <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">
              Payroll Specialist - Mactay Consulting
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col justify-center items-center mx-auto w-full min-h-screen">
        <form className="w-[65%]" onSubmit={handleSubmit}>
          <div className="mb-7 flex justify-start text-start">
            <h1 className="text-[#0f1625] text-[28px] font-bold leading-tight">
              Log in to your account
            </h1>
          </div>
          <div className="space-y-5">
            <MyTextField
              id="email"
              name="email"
              label="Work Email"
              placeholder="Enter email address"
              value={formData.email}
              type="email"
              disabled={false}
              onChange={handleChange}
              autoComplete
            />
            <MyTextField
              id="password"
              name="password"
              label="Password"
              placeholder="Enter password"
              value={formData.password}
              type="password"
              disabled={false}
              onChange={handleChange}
              autoComplete
            />
          </div>

          <div className="flex justify-end mt-4">
            <Link
              href={"/auth/reset-password"}
              className="text-[#ef0000] text-sm font-[500] hover:underline underline-offset-4"
            >
              Forgot password
            </Link>
          </div>

          <button
            type="submit"
            className={`${!isFormValid ? 'bg-[#f0f2f5] text-[#a0aec0]' : 'bg-[#0f1625] text-white'} w-full transition-all duration-150 py-[14px] rounded-[8px] text-base font-medium mt-10 ${
              isLoading || !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Logging In..." : "Log in"}
          </button>
        </form>

        <div className="font-medium leading-tight flex justify-center items-center space-x-1 mt-5">
          <p className="text-[#677488] text-sm">Don`t have an account?</p>
          <span>
            <Link
              className="text-[#ef0000] hover:underline underline-offset-2 text-sm"
              href={"/auth/signup"}
            >
              Create new account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
