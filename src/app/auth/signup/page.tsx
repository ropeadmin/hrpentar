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
import PasswordToolTip from "@/app/components/ToolTip/Password";
// import "react-international-phone/style.css";

// Example password tooltip structure
const initialPasswordTooltip = [
  { title: "8 characters", passed: false },
  { title: "Uppercase", passed: false },
  { title: "Lowercase", passed: false },
  { title: "Special character", passed: false },
];

export default function SignUp() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { makeRequest, isLoading } = useAccountRequest();
  const [passwordTooltip, setPasswordTooltip] = useState(initialPasswordTooltip);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    // title: "",
    password: "",
    confirmPassword: "",
  });

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
      { title: "Special character", passed: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];
    setPasswordTooltip(tooltipUpdates);
    setIsPasswordValid(
      password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasSpecialChar
    );
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      phoneNumber &&
      isPasswordValid &&
      formData.password === formData.confirmPassword
    );
  };

  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: phoneNumber,
    // title: formData.title,
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
          // title: "",
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
              <div>
                <MyTextField
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  value={formData.password}
                  type="password"
                  onChange={handleChange}
                />
                <div className="flex items-center gap-1.5 mt-2">
                  {passwordTooltip.map(({ title, passed }: any, index: React.Key | null | undefined) => (
                    <PasswordToolTip
                      key={index}
                      title={title}
                      passed={passed}
                    />
                  ))}
                </div>
              </div>
              <MyTextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                placeholder="Enter password"
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
            className={`${!isFormValid() ? 'bg-[#f0f2f5] text-[#a0aec0]' : 'bg-[#0f1625] text-white'} transition-all duration-150 w-full py-[14px] rounded-[8px] text-base font-medium mt-10 ${
              isLoading || !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? "Loading..." : "Create account"}
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
