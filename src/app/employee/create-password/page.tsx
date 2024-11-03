"use client";
import MyTextField from "@/app/components/Fields/MyTextField";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useAuthRedirect from "@/hooks/authredirect.hook";
import useRequest from "@/services/request.service";
import { profileLoginAction } from "@/store/profile.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FadeIn } from "@/app/components/Transitions/Transitions";
import PasswordToolTip from "@/app/components/ToolTip/Password";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Example password tooltip structure
const initialPasswordTooltip = [
  { title: "8 characters", passed: false },
  { title: "Uppercase", passed: false },
  { title: "Lowercase", passed: false },
  { title: "Special character", passed: false },
];

export default function CreatePassword() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { makeRequest, isLoading } = useRequest();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordTooltip, setPasswordTooltip] = useState(
    initialPasswordTooltip
  );
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Function to handle password input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate password complexity
    if (name === "password") {
      validatePassword(value);
    }
  };
  // Function to validate password and update the tooltip
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const tooltipUpdates = [
      { title: "8 characters", passed: password.length >= 8 },
      { title: "Uppercase", passed: /[A-Z]/.test(password) },
      { title: "Lowercase", passed: /[a-z]/.test(password) },
      {
        title: "Special character",
        passed: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
    ];
    setPasswordTooltip(tooltipUpdates);
    setIsPasswordValid(
      password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasSpecialChar
    );
  };

  // Testimonials
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

  // Testimonials Carousel
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

  // Handle Create Password
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
            confirmPassword: "",
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
        <form className="w-[55%]" onSubmit={handleSubmit}>
          <div className="mb-2 text-left">
            <h1 className="text-[#0f1625] text-[28px] font-bold leading-tight">
              Hello, Olayemi Adewale
            </h1>
          </div>
          <div className="mb-7 text-left">
            <span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
              Your admin has invited you as an employee to PentaHR’s portal.
              Please setup your password to continue.
            </span>
          </div>
          <div className="mb-4">
            <MyTextField
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              type="password"
              onChange={handleChange}
            />
            {formData.password.length > 0 && (
              <FadeIn>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {passwordTooltip.map(({ title, passed }, index) => (
                    <PasswordToolTip
                      key={index}
                      title={title}
                      passed={passed}
                    />
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
          <MyTextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            type="password"
            onChange={handleChange}
          />
          <div className="flex items-start gap-2 mt-8 mb-12">
            <input type="checkbox" className="mt-1" />
            <div className="flex-grow">
              <span className="text-[#313a48] text-base font-normal leading-tight">
                I have read and agreed to PentaHR’s{" "}
              </span>
              <span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] underline leading-tight">
                Terms of Use
              </span>
              <span className="text-[#313a48] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                {" "}
                and{" "}
              </span>
              <span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] underline leading-tight">
                Privacy Policy
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#0f1625] text-white w-full transition-all duration-150 py-[14px] rounded-[8px] text-base font-medium leading-none"
          >
            Set Password & Log in
          </button>
        </form>
      </div>
    </div>
  );
}
