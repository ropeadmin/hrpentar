"use client";
import Layout from "@/app/dashboard/layout";
import OnboardComponent from "./component/onboardcomponent";

export default function Onboarding() {
  return (
    <Layout>
      <div className="mt-7">
        <h1 className="text-[#0f1625] text-[28px]  font-bold font-['Cabinet Grotesk'] leading-loose">
          Welcome, Olayemi
        </h1>
        <div className="">
          <span className="text-[#323B49] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
            We are excited to have you onboard. Please complete the following
            steps to get started smoothly.
          </span>
        </div>
      </div>
      <div className="mt-8 border-[0.5px] border-[#D0D6DD] rounded-[12px] p-[40px]">
        <div className="flex items-center space-x-2">
          <h1 className="text-[#0f1625] text-[18px] font-bold font-['Cabinet Grotesk'] leading-loose">
            Onboarding overview
          </h1>
          <span className="text-[#323B49] text-[14px] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
            (1/5)
          </span>
        </div>
        <div className="mb-10">
          <span className="text-[#323B49] text-[14px] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
            Here is a quick to do list.
          </span>
        </div>
        <div className="">
          <OnboardComponent
            infoIcon="/icons/personaldetails.svg"
            infoTitle="Personal Details"
            infoSubtitle="Fill in your basic information and contact details"
          />
          <hr className="mt-6" />
          <OnboardComponent
            infoIcon="/icons/onboardingcontact.svg"
            infoTitle="Contact details"
            infoSubtitle="Provide your contacts in case of emergency."
          />
          <hr className="mt-6" />
          <OnboardComponent
            infoIcon="/icons/onboardingpayment.svg"
            infoTitle="Payment details"
            infoSubtitle="Input your preferred bank information and options."
          />
          <hr className="mt-6" />
          <OnboardComponent
            infoIcon="/icons/onboardingdocument.svg"
            infoTitle="Documents"
            infoSubtitle="Upload required documents needed to complete your registration."
          />
          <hr className="mt-6" />
          <OnboardComponent
            infoIcon="/icons/onboardingasset.svg"
            infoTitle="Assets"
            infoSubtitle="Collect your employee requirements and packages."
          />
        </div>
      </div>
    </Layout>
  );
}
