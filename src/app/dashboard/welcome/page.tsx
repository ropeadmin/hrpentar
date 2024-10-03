"use client";
import Banner from "@/app/components/Banner/Banner";
import { AppModal } from "@/app/components/Modals";
import useAuthRedirect from "@/hooks/authredirect.hook";
import useAppTheme from "@/hooks/theme.hook";
import { ButtonBase } from "@mui/material";
import React, { useState } from "react";

export default function Welcome() {
  // useAuthRedirect();
  // const { isMobile } = useAppTheme();
  const percentage = 32;

  // Get Started Steps
  const steps = [
    {
      header: "Complete your company profile",
      title: "Fill in company information and customize account. ",
      actionTitle: "Continue setup",
      action: "/",
    },
    {
      header: "Submit documents for background checks and verification",
      title: "Upload required documents needed to verify your business.",
      actionTitle: "Submit documents",
      action: "/",
    },
    {
      header: "Setup organizations chart and directory",
      title: "Build your company’s internal structure.",
      actionTitle: "Setup organization",
      action: "/",
    },
    {
      header: "Onboard your success team",
      title: "Create departments and add team members.",
      actionTitle: "Create teams",
      action: "/",
    },
    {
      header: "Make your first payment",
      title: "Activate payroll and benefits.",
      actionTitle: "Run payroll",
      action: "/",
    },
  ];

  {
    /* Step Features */
  }
  const stepFeatures = [
    {
      icon: "/icons/upgrade.svg",
      header: "Upgrade to standard plan",
      title: "Subscribe to get access to more features.",
      actionTitle: "Upgrade plan",
      action: "",
    },
    {
      icon: "/icons/support.svg",
      header: "Help & Support",
      title: "Step by step platform guide on PentaHR.",
      actionTitle: "Read articles",
      action: "",
    },
    {
      icon: "/icons/tour.svg",
      header: "App tour guide",
      title: "An interactive tour to learn the basics  of our app.",
      actionTitle: "Take tour",
      action: "",
    },
  ];

  const welcomeTips = [
    {
      image: "/icons/image-1.svg",
      header: "Welcome onboard!",
      title:
        "Manage employees, optimize employee performance,  streamline recruitment, etc.",
    },
    {
      image: "/icons/image-2.svg",
      header: "AI powered productivity",
      title:
        "Get work done fast with AISA, Pentahr’s AI assistant tailored to your role.",
    },
    {
      image: "/icons/image-3.svg",
      header: "Integrations",
      title:
        "Connect all your apps, zoom, skype, jira, github, excel, slack, etc.",
    },
    {
      image: "/icons/image-4.svg",
      header: "Manage payments",
      title:
        "Run payroll and benefits, report an expense, raise invoices, etc...",
    },
  ];

  const [modalIndex, setModalIndex] = useState(0);
  const [openModal, setOpenModal] = useState(true);

  const handleNext = () => {
    if (modalIndex < welcomeTips.length - 1) {
      setModalIndex((prev) => prev + 1);
    } else {
      // Close the modal on the last step
      setOpenModal(false);
    }
  };

  const handlePrevious = () => {
    if (modalIndex > 0) {
      setModalIndex((prev) => prev - 1);
    }
  };

  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Banner />

      {/* Content */}
      <div>
        <div className="mt-7">
          <h1 className="text-[28px] font-[700] text-[#0F1625] flex items-center">
            Welcome to PentaHR &nbsp;
            <span>
              <img src="/icons/popper.svg" width={25} height={25} />
            </span>
          </h1>
          <p className="text-[16px] font-[400] text-[#323B49] leading-tight">
            We need you to complete a few things to help us improve your HR
            processes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-5 mt-7">
          <div className="col-span-2 w-full h-auto rounded-[12px] border-[0.5px] border-[#D0D6DD] p-[20px]">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-[18px] font-[700] text-[#0F1625]">
                  Getting started &nbsp;
                  <span className="text-[14px] font-[400] text-[#323B49] leading-none">
                    (1/5)
                  </span>
                </h1>
                <p className="text-[14px] font-[400] text-[#323B49]">
                  Here is a quick to do list.
                </p>
              </div>

              {/* Progress */}
              <div className="flex gap-3 items-center">
                <div className="w-[100px] bg-[#F0F2F5] rounded-full h-[4px]">
                  <div
                    className="bg-[#0BA259] h-[4px] rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div>
                  <p className="text-[14px] font-[500] text-[#0BA259] leading-none">
                    {percentage}% done
                  </p>
                </div>
              </div>
            </div>

            {/* Steps Progress */}
            <div className="grid grid-cols-1 gap-10 mt-10">
              {steps.map((step, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-[32px] h-[32px] rounded-full flex justify-center items-center border border-[#D0D6DD] bg-[#FBFBFC]">
                      <span
                        className={`text-[18px] font-[700] text-[#1F2937] leading-none`}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h1 className="text-[16px] font-[700] text-[#1F2937]">
                        {step.header}
                      </h1>
                      <p className="text-[14px] font-[400] text-[#323B49]">
                        {step.title}
                      </p>
                    </div>
                  </div>
                  <button className="px-[14px] py-[8px] rounded-[8px] border border-[#D0D6DD] leading-none text-[14px] font-[500] text-[#1F2937]">
                    {step.actionTitle}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 w-full h-auto rounded-[12px] grid grid-cols-1 gap-5">
            {stepFeatures.map((feature, i) => (
              <div
                key={i}
                className="rounded-[12px] border-[0.5px] border-[#D0D6DD] w-full p-5"
              >
                <div className="w-[32px] h-[32px] rounded-[6px] bg-[#F0F2F5] flex justify-center items-center">
                  <img src={feature.icon} width={20} height={20} />
                </div>
                <div className="mt-2">
                  <h1 className="text-[16px] font-[700] text-[#1F2937]">
                    {feature.header}
                  </h1>
                  <p className="text-[14px] font-[400] text-[#323B49]">
                    {feature.title}
                  </p>
                </div>
                <button className="px-[14px] py-[8px] rounded-[8px] border border-[#D0D6DD] leading-none text-[14px] font-[500] text-[#1F2937] mt-5 flex items-center gap-2">
                  {feature.actionTitle}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="10"
                    viewBox="0 0 16 10"
                    fill="none"
                  >
                    <path
                      d="M13.8335 4.99976L1.3335 4.99976"
                      stroke="#1F2937"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.5 0.833252L13.9596 4.29281C14.2929 4.62615 14.4596 4.79281 14.4596 4.99992C14.4596 5.20703 14.2929 5.37369 13.9596 5.70703L10.5 9.16659"
                      stroke="#1F2937"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AppModal
        open={openModal}
        handleClose={handleClose}
        style={{
          backgroundImage:
            "linear-gradient(179deg, #F0F1F7 15.73%, #FFF 49.36%)",
          padding: "30px",
          position: "relative",
          height: "auto",
          width: "500px",
        }}
      >
        <div className="w-full flex justify-end">
          <ButtonBase
            onClick={handleClose}
            className="rounded-full w-[32px] h-[32px]"
          >
            <div className="rounded-full w-[32px] h-[32px] bg-[#F9FAFB] flex justify-center items-center">
              <img src="/icons/close.svg" alt="Close" width={10} height={10} />
            </div>
          </ButtonBase>
        </div>

        <div className="w-full h-auto rounded-[16px]">
          <img
            src={welcomeTips[modalIndex].image}
            alt=""
            className="w-full h-[190px] rounded-[16px] object-contain"
          />
        </div>

          {/* Navigation Dots */}
      <div className="flex justify-center w-full mt-1 gap-2">
        {welcomeTips.map((_, index) => (
          <div
            key={index}
            className={`w-[6px] h-[6px] rounded-full ${
              modalIndex === index ? 'bg-[#EF0000]' : 'bg-[#E4E8EC]'
            }`}
          ></div>
        ))}
      </div>

        <div className="mt-3">
          <h1 className="text-[20px] font-[700] text-[#0F1625] leading-tight">
            {welcomeTips[modalIndex].header}
          </h1>
          <p className="text-[14px] font-[400] text-[#323B49]">
            {welcomeTips[modalIndex].title}
          </p>
        </div>

        <div className="mt-2 flex justify-end w-full gap-2">
          {/* If modalIndex > 0, show 'Previous' button, otherwise show 'Close' */}
          {modalIndex > 0 ? (
            <button
              onClick={handlePrevious}
              className="px-[16px] py-[10px] rounded-[8px] border border-[#D0D6DD] leading-none text-[14px] font-[500] text-[#1F2937]"
            >
              Previous
            </button>
          ) : (
            <button
              onClick={handleClose}
              className="px-[16px] py-[10px] rounded-[8px] border border-[#D0D6DD] leading-none text-[14px] font-[500] text-[#1F2937]"
            >
              Close
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-[16px] py-[10px] rounded-[8px] border border-transparent leading-none text-[14px] font-[500] text-white bg-[#0F1625]"
          >
            {modalIndex === welcomeTips.length - 1 ? "Finish" : "Continue"}
          </button>
        </div>
      </AppModal>
    </div>
  );
}
