"use client";

import MyTextField from "@/app/components/Fields/MyTextField";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useAccountRequest from "@/services/accountRequest.service";
import useRequest from "@/services/request.service";
import { profileLoginAction } from "@/store/profile.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";

export default function SignUp() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { makeRequest, isLoading } = useAccountRequest();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // phoneNumber: "",
    title: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: phoneNumber,
    title: formData.title,
    password: formData.password,
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("Passwords do not match!", {
        variant: "rope_snackbar",
        autoHideDuration: 5000,
        error: true,
      });
      return;
    }

    catchAsync(
      async () => {
        const res = await makeRequest({
          method: "POST",
          url: API.register,
          data: payload,
        });

        const { data } = res;
        localStorage.setItem("register-user-email", formData.email);
        dispatch(profileLoginAction(data));

        enqueueSnackbar("Account Created Successfully!", {
          variant: "rope_snackbar",
          autoHideDuration: 5000,
        });

        router.push("/auth/verify-email");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          // phoneNumber: "",
          title: "",
          password: "",
          confirmPassword: "",
        });
      },
      (error: any) => {
        const response = error?.response;
        if (response) {
          enqueueSnackbar(
            response?.data?.data?.message || "An error occurred during sign up",
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
    <div className="bg-[#fff] h-full flex p-4">
      <div
        className="relative rounded-[16px] flex-grow h-screen w-full overflow-hidden bg-[url('/images/auth-1.jpeg')] min-h-screen p-7"
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

      <div className="bg-white flex flex-col justify-center items-center mx-auto w-full h-auto py-10 px-20">
        <form className="w-[100%]" onSubmit={handleSubmit}>
          <div className="mb-7">
            <h1 className="text-[#0f1625] text-[28px] text-start font-bold leading-tight">
              Create account
            </h1>
            <div>
              <span className="text-[#313a48] text-base font-normal leading-tight">
                By creating a PentaHR account, you are agreeing to our{" "}
              </span>
              <span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] underline leading-tight">
                Terms of Use
              </span>
              <span className="text-[#313a48] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                {" "}
                <br />
                and{" "}
              </span>
              <span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] underline leading-tight">
                Privacy Policy
              </span>
            </div>
          </div>
          <div className="space-y-5 overflow-auto h-[290px] remove-scroll-bar">
            <div className="space-x-5 flex">
              <MyTextField
                id="firstName"
                name="firstName"
                label="First name"
                placeholder="Enter first name"
                value={formData.firstName}
                type="text"
                disabled={false}
                onChange={handleChange}
              />
              <MyTextField
                id="lastName"
                name="lastName"
                label="Last name"
                placeholder="Enter last name"
                value={formData.lastName}
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-5">
              <MyTextField
                id="email"
                name="email"
                label="Work email"
                placeholder="Enter email address"
                value={formData.email}
                type="email"
                onChange={handleChange}
              />
              <div>
                <h3 className="max-xs:text-[3.5vw] text-[12px] md:text-[14px] font-normal mb-[5px]">
                  Phone number
                </h3>
                <PhoneInput
                  defaultCountry="ng"
                  value={phoneNumber}
                  forceDialCode={true}
                  onChange={(phone, country) => {
                    setPhoneNumber(phone);
                  }}
                />
                {/* {formData.phoneNumber.trim().length > 4 && errors.phoneNumber && (
                <small className='text-[11px] text-errorColor'>
                  {errors.phoneNumber}
                </small>
              )} */}
              </div>
              {/* <MyTextField
                id="phoneNumber"
                name="phoneNumber"
                label="Phone number"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                type="tel"
                onChange={handleChange}
              /> */}
            </div>
            <div className="flex flex-col space-y-5">
              <MyTextField
                id="password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                value={formData.password}
                type="password"
                onChange={handleChange}
              />
              <MyTextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                placeholder="Enter Password"
                value={formData.confirmPassword}
                type="password"
                onChange={handleChange}
              />
            </div>
            {/* <MyTextField
              id="title"
              name="title"
              label="Title"
              placeholder="CEO"
              value={formData.title}
              type="text"
              onChange={handleChange}
            /> */}
          </div>

          <button
            type="submit"
            className="text-[#a0aec0] bg-[#f0f2f5] w-full py-4 rounded-[8px] text-base font-medium mt-10"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="font-medium leading-tight flex justify-center items-center space-x-1 mt-5">
          <p className="text-[#677488] text-sm">Already have an account?</p>
          <span>
            <Link
              className="text-[#ef0000] hover:underline underline-offset-2 text-sm"
              href={"/auth/signin"}
            >
              Login here
            </Link>
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
}
