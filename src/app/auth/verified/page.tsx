"use client";

import MyTextField from "@/app/components/Fields/MyTextField";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useAuthRedirect from "@/hooks/authredirect.hook";
import useRequest from "@/services/request.service";
import { profileLoginAction } from "@/store/profile.slice";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function EmailVerificationSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { makeRequest, isLoading } = useRequest();
  const [tokenData, setTokenData] = useState<any>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const token = searchParams.get("token"); // Extract the 'token' query parameter

    if (token) {
      try {
        // Decode Base64 encoded token
        const decodedToken = atob(token);

        // Parse the decoded token as JSON
        const parsedToken = JSON.parse(decodedToken);

        setTokenData(parsedToken);
      } catch (error) {
        console.error("Invalid token format", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Automatically trigger verifyOtp if tokenData exists and is valid
    if (tokenData?.email && tokenData?.code) {
      verifyOtp(); // Call the function when both email and code are available
    }
  }, [tokenData]);

  const payload = {
    email: tokenData?.email,
    code: tokenData?.code,
  };

  const verifyOtp = async () => {
    catchAsync(
      async () => {
        const otpRes = await makeRequest({
          method: "POST",
          url: API.verifyOtp,
          data: payload,
        });

        const otpData = otpRes?.data?.data;

        if (otpData?.accessToken) {
          dispatch(profileLoginAction(otpData));
          setVerified(true);
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

      {verified ? (
        <div className="bg-white mx-auto w-full min-h-screen px-28 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center text-center">
            <img src="/icons/success-icon.svg" width={70} height={70} />
            <div className="mt-7">
              <h1 className="text-[#0f1625] text-[28px]  font-bold font-['Cabinet Grotesk'] leading-loose">
                Email verification successful
              </h1>
              <div className="text-center">
                <span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                  Your email has been verified successfully. Let’s get you fully
                  onboarded.
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/auth/onboarding/step1"
            className="text-[#0f1625] border w-fit px-7 py-3 rounded-[8px] text-base font-medium mt-10"
          >
            Continue
          </Link>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
