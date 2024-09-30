"use client";

import MyTextField from "@/app/components/Fields/MyTextField";
import API from "@/constants/api.constant";
import { obfuscateEmail } from "@/helpers";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import { profileLoginAction } from "@/store/profile.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import OtpInput from "react-otp-input";
import OtpInputField from "@/app/components/Fields/OtpInputField";
import useAuthRedirect from "@/hooks/authredirect.hook";

interface OTPInputProps {
  onSubmitOTP: (otp: string) => void; // Function to handle OTP submission
}

export default function VerifyUser() {
  useAuthRedirect();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { makeRequest, isLoading } = useRequest();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("register-user-email");

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const [otp, setOtp] = useState<string>("");

  const handleChange = (otpValue: string) => {
    setOtp(otpValue);

    if (otpValue.length === 6) {
      handleSubmit(otpValue);
    }
  };

  const handleSubmit = async (otpValue: string) => {
    const formData = { email, code: otpValue };

    catchAsync(
      async () => {
        const otpRes = await makeRequest({
          method: "POST",
          url: API.verifyOtp,
          data: formData,
        });

        const otpData = otpRes?.data?.data;

        if (otpData?.accessToken) {
          dispatch(profileLoginAction(otpData));
          router.push("/auth/email-verification-success");
          setOtp("");
        } else {
          displaySnackbar(
            "Email Verification failed. No token received!",
            true
          );
        }
      },
      (error: any) => handleError(error)
    );
  };

  const displaySnackbar = (message: string, error: boolean = false) => {
    enqueueSnackbar(message, {
      variant: "rope_snackbar",
      autoHideDuration: 5000,
      error,
    });
  };

  const handleError = (error: any) => {
    const response = error?.response;
    const message =
      response?.data?.data?.message || "An error occurred during login";

    if (response) {
      displaySnackbar(message, true);
    } else {
      displaySnackbar("A network error occurred!", true);
    }
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

      <div className="bg-white mx-auto w-full min-h-screen px-28 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-start text-start">
          <img src="/icons/email.svg" width={100} height={100} />
          <div className="mt-7 mb-7">
            <h1 className="text-[#0f1625] text-[32px]  font-bold font-['Cabinet Grotesk'] leading-loose">
              Verify Your Email
            </h1>
            <div className="">
              <span className="text-[#313a48] text-base font-medium font-['Cabinet Grotesk'] leading-tight">
                An OTP code was sent to{" "}
              </span>
              <span className="text-[#0f1625] text-base font-bold font-['Cabinet Grotesk'] leading-tight">
                {email || "*******"}
              </span>
              <span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] leading-tight">
                {" "}
              </span>
            </div>
          </div>
          <OtpInputField onChange={handleChange} error={""} value={otp} />
        </div>
      </div>
    </div>
  );
}
