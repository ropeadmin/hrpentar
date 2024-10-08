"use client";

import MyTextField from "@/app/components/Fields/MyTextField";
import Stepper from "@/app/components/Stepper/Stepper";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/accountRequest.service";
import { profileLoginAction } from "@/store/profile.slice";
import { MenuItem } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import ReactFlagsSelect from "react-flags-select";

export default function Step1() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { makeRequest, isLoading } = useRequest();
  const [currentStep, setCurrentStep] = useState(1);
  const [country, setCountry] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    registrationNumber: "",
    size: "",
    businessType: "",
    subsidiary: "",
    subsidiaryDetails: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const payload = {
    businessName: formData.businessName,
    registrationNumber: formData.registrationNumber,
    size: formData.size,
    country: country,
    businessType: formData.businessType,
    subsidiary: formData.subsidiaryDetails,
    main: false,
    // address: {
    //     "country": "Nigeria",
    //     "state": "Osun",
    //     "address": "Iwo",
    //     "city": "Iwo",
    //     "postalCode": "21333"
    // },
    // director: {
    //     name: "Naheem",
    //     email: "naheemadedokun@gmail.com",
    //     country: "Nigeria",
    //     idCard: ["https://alpharides.s3.us-east-1.amazonaws.com/66e2b9e9ba5ee534ab474d9c/Screenshot-2024-08-25-at-03.19.17.png"],
    //     position: "Director",
    //     signature: "https://alpharides.s3.us-east-1.amazonaws.com/66e2b9e9ba5ee534ab474d9c/Screenshot-2024-08-25-at-03.19.17.png"
    // }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    catchAsync(
      async () => {
        const res = await makeRequest({
          method: "POST",
          url: API.createBusiness,
          data: payload,
        });

        const { data } = res;

        // Move to step 3 on success
        if (data?.status === 'SUCCESS') {
          setCurrentStep(3);
          router.push('/auth/onboarding/step2')
        }
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

  const companySize = [
    "10 - 50",
    "51 - 100",
    "100 - 200",
    "200 - 500",
    "501 - above",
  ];

  const businessTypes = [
    "Limited Liability Company",
    "Private Company",
    "Sole Proprietorship",
    "Small-Medium Enterprise",
    "NGOs (Governmental)",
  ];

  const subsidiary = ["Yes", "No"];

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

      <div className="bg-white flex flex-col justify-center items-center mx-auto w-full min-h-screen px-16 py-10">
        <form className="w-[100%]" onSubmit={handleSubmit}>
          <div className="flex items-center mx-auto w-full">
            <Stepper currentStep={currentStep} />
          </div>
          <div className="my-7">
            <h1 className="text-[#0f1625] text-[28px] text-start font-bold font-['Cabinet Grotesk'] leading-loose">
              Tell us about your company
            </h1>
            <div>
              <span className="text-[#313a48] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                Please provide details about your business below.
              </span>
            </div>
          </div>
          <div className="space-y-5 overflow-auto h-[300px] remove-scroll-bar">
            <MyTextField
              id="companyName"
              name="businessName"
              label="Company name"
              placeholder="Enter Company name"
              value={formData.businessName}
              type="text"
              onChange={handleChange}
            />
            <MyTextField
              id="businessRegistrationNumber"
              name="registrationNumber"
              label="Business registration number"
              placeholder="Enter business registration number"
              value={formData.registrationNumber}
              type="text"
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-5">
              <MyTextField
                id="companySize"
                name="size"
                label="Company size"
                placeholder=""
                type="text"
                value={formData.size}
                onChange={handleChange}
                select
                required
              >
                {companySize.map((size, i) => (
                  <MenuItem key={i} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </MyTextField>
              <div className="flex flex-col justify-between">
                <h3 className="text-[3.5vw] sm:text-[14px] font-[500] mb-[5px] text-[#0F1625]">
                  Country
                </h3>
                <div className="w-full">
                  <ReactFlagsSelect
                    selected={country}
                    onSelect={(val) => setCountry(val)}
                  />
                </div>
              </div>

              <MyTextField
                id="businessType"
                name="businessType"
                label="Business type"
                placeholder=""
                type="text"
                value={formData.businessType}
                onChange={handleChange}
                select
                required
              >
                {businessTypes.map((businessType, i) => (
                  <MenuItem key={i} value={businessType}>
                    {businessType}
                  </MenuItem>
                ))}
              </MyTextField>
              <MyTextField
                id="subsidiary"
                name="subsidiary"
                label="Do you have a subsidiary company?"
                placeholder=""
                type="text"
                value={formData.subsidiary}
                onChange={handleChange}
                select
                required
              >
                {subsidiary.map((subsidiary, i) => (
                  <MenuItem key={i} value={subsidiary}>
                    {subsidiary}
                  </MenuItem>
                ))}
              </MyTextField>
            </div>
            {formData.subsidiary === "Yes" && (
              <MyTextField
                id="subsidiaryDetail"
                name="subsidiaryDetails"
                label="Please enter subsidiary company (details will be required after onboarding)"
                placeholder=""
                value={formData.subsidiaryDetails}
                type="text"
                onChange={handleChange}
              />
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-[#0f1625] w-full py-4 rounded-[8px] text-base font-medium mt-10"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
