"use client";

import MyTextField from "@/app/components/Fields/MyTextField";
// import useAuthRedirect from "@/hooks/authredirect.hook";
import useRequest from "@/services/request.service";
import { profileLoginAction } from "@/store/profile.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAdminLoginMutation } from "@/store/features/auth/authService";

export default function SignIn() {
  // useAuthRedirect();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [adminLogin, { isLoading: isAdminLoginLoading }] = useAdminLoginMutation();
  const [formData, setFormData] = useState({
    email: "gbengstar@gmail.com",
    password: "global234!!!GY",
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
    try {
 // rtk query
        await adminLogin(formData)
        .unwrap()
        .then((res) => {
          const loginData = res?.data;
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
        });
    } catch (error: any) {
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
    }
    // catchAsync(
    //   async () => {
    //     const loginRes = await makeRequest({
    //       method: "POST",
    //       url: API.login,
    //       data: formData,
    //     });

       
    //     const loginData = loginRes?.data?.data;

    //     if (loginData?.accessToken) {
    //       const combinedData = {
    //         ...loginData,
    //       };
    //       dispatch(profileLoginAction(combinedData));

    //       enqueueSnackbar("Login Successfully!", {
    //         variant: "rope_snackbar",
    //         autoHideDuration: 5000,
    //       });

    //       router.push("/");
    //       setFormData({
    //         email: "",
    //         password: "",
    //       });
    //     } else {
    //       enqueueSnackbar("Login failed. No token received!", {
    //         variant: "rope_snackbar",
    //         autoHideDuration: 5000,
    //         error: true,
    //       });
    //     }
    //   },
    //   (error: any) => {
    //     const response = error?.response;
    //     if (response) {
    //       enqueueSnackbar(
    //         response?.data?.data?.message || "An error occurred during login",
    //         {
    //           variant: "rope_snackbar",
    //           autoHideDuration: 5000,
    //           error: true,
    //         }
    //       );
    //     } else {
    //       enqueueSnackbar("A network error occurred!", {
    //         variant: "rope_snackbar",
    //         autoHideDuration: 5000,
    //         error: true,
    //       });
    //     }
    //   }
    // );
  // };

  const slides = [
    {
      text: `"PentaHR has revolutionized our HR processes. The intuitive interface and comprehensive features have significantly reduced administrative tasks, allowing us to focus more on employee engagement and development. It's a game-changer for any HR team!"`,
      author: "Kolawole Immanuel",
      role: "Payroll Specialist - Mactay Consulting",
    },
    {
      text: `"The ease of use and powerful tools provided by PentaHR have streamlined our HR workflow like never before. We have cut down manual effort and improved employee satisfaction across the board."`,
      author: "Sandra Taylor",
      role: "HR Manager - TechWave Solutions",
    },
    {
      text: `"Thanks to PentaHR, our company has been able to handle payroll and employee management much more efficiently. It's been a transformative tool for our team."`,
      author: "Michael Johnson",
      role: "Operations Manager - NextGen Ltd",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
    arrows: false, // No arrows
    appendDots: (dots: any) => (
      <div className="w-full text-center pb-2">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-8 h-8 rounded-full bg-white opacity-50"></button>
    ),
  };

  return (
    <div className="bg-[#fff] h-screen flex p-4 overflowHidden">
      <div
        className="relative p-[32px] rounded-[16px] flex-grow min-h-full min-w-[47vw] max-w-[47vw] w-[47vw] overflow-hidden bg-[url('/images/auth-1.jpeg')]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="">
          <img src="/pentaHR.svg" width={150} height={150} />
        </div>

        <div className="absolute bottom-7 left-7 right-7 h-auto auth-glass p-5">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index}>
                <div>
                  <p className="text-white text-base font-medium leading-tight">
                    {slide.text}
                  </p>
                  <div className="mt-5">
                    <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">
                      {slide.author}
                    </div>
                    <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">
                      {slide.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="bg-white flex flex-col justify-center items-center mx-auto w-full min-h-full">
        <form className="w-[65%] space-y-5" onSubmit={handleSubmit}>
          <div className="mb-7 text-left">
            <h1 className="text-[#0f1625] text-[28px] font-bold leading-tight">
              Log in to your account
            </h1>
          </div>

          <MyTextField
            id="email"
            name="email"
            label="Work email"
            placeholder="Enter email address"
            value={formData.email}
            type="email"
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
            onChange={handleChange}
            autoComplete
          />

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
            className={`${
              !isFormValid
                ? "bg-[#f0f2f5] text-[#a0aec0]"
                : "bg-[#0f1625] text-white"
            } w-full transition-all duration-150 py-[14px] rounded-[8px] text-base font-medium mt-10 leading-none ${
              isAdminLoginLoading || !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormValid || isAdminLoginLoading}
          >
            {isAdminLoginLoading ? "Logging In..." : "Log in"}
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
