"use client";

import MyTextField from "@/app/components/Fields/MyTextField";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
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

export default function CreatePasswordSuccess() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    catchAsync(
      async () => {
        const loginRes = await makeRequest({
          method: "POST",
          url: API.login,
          data: formData,
        });

        const loginData = loginRes.data;

        if (loginData?.token) {
          localStorage.setItem("auth-token", loginData.token);

          const sessionRes = await makeRequest({
            method: "GET",
            url: "",
            headers: {
              Authorization: `Bearer ${loginData.token}`,
            },
          });

          const sessionData = sessionRes.data;

          // Combine login data and session data
          const combinedData = {
            ...loginData,
            ...sessionData,
          };

          dispatch(profileLoginAction(combinedData));

          enqueueSnackbar("Account Accessed Successfully!", {
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
            response?.data?.message || "An error occurred during login",
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
    <div className="bg-[#fff] h-screen flex p-4 overflowHidden">
      <div
        className="relative p-[32px] rounded-[16px] flex-grow min-h-full min-w-[47vw] max-w-[47vw] w-[47vw] overflow-hidden bg-[url('/images/mactayhq.svg')]"
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

      <div className="bg-white mx-auto w-full min-h-screen px-28 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center text-center">
          <img src="/icons/success-icon.svg" width={70} height={70} />
          <div className="mt-7">
            <h1 className="text-[#0f1625] text-[28px]  font-bold font-['Cabinet Grotesk'] leading-loose">
              Password Created
            </h1>
            <div className="text-center">
              <span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                Your password has been created successfully.
              </span>
            </div>
            <div className="text-center">
              <span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                You can proceed to Login
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/auth/signin"
          className="text-white bg-[#0f1625] w-4/5 py-4 rounded-[8px] text-base font-medium mt-10 text-center"
        >
          Proceed to Login
        </Link>
      </div>
    </div>
  );
}
