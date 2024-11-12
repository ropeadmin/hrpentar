"use client";
import OnboardComponent from "./component/onboardcomponent";
import Image from "next/image";
import * as Progress from "@radix-ui/react-progress";

export default function Onboarding() {
  const progressValue = 33;

  return (
    <>
      <div className="mt-7">
        <div className="flex items-center gap-2">
          <h1 className="text-[#0f1625] text-[28px]  font-bold font-['Cabinet Grotesk'] leading-loose">
            Welcome, Olayemi
          </h1>
          <Image src="/icons/party.svg" alt="" width={24} height={24} />
        </div>
        <div className="">
          <span className="text-[#323B49] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
            We are excited to have you onboard. Please complete the following
            steps to get started smoothly.
          </span>
        </div>
      </div>
      <div className="mt-8 border-[0.5px] border-[#D0D6DD] rounded-[12px] p-[40px]">
        <div className="flex items-center space-x-2 justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-[#0f1625] text-[18px] font-bold font-['Cabinet Grotesk'] leading-loose">
                Onboarding overview
              </h1>
              <span className="text-[#323B49] text-[14px] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                (1/5)
              </span>
            </div>
            <div className="mb-4">
              <span className="text-[#323B49] text-[14px] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                Here is a quick to do list.
              </span>
            </div>
          </div>
          <div className="w-[200px] flex items-center justify-end space-x-2">
            <div className="w-[100px] bg-[#f8f8f8] rounded-full h-[4px] overflow-hidden">
              <Progress.Root className="h-[4px]" value={progressValue}>
                <Progress.Indicator
                  className="bg-[#0BA259] w-full h-full" style={{ transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)", transform: `translateX(-${100 - progressValue}%)` }}
                />
              </Progress.Root>
            </div>
            <span className="w-[70px] text-custom_green">
              {progressValue}% done
            </span>
          </div>
        </div>
        <div className="">
          <OnboardComponent
            infoIcon="/icons/one.svg"
            infoTitle="Personal Details"
            infoSubtitle="Fill in your basic information and contact details"
          />
          <hr className="mt-6" />
          <OnboardComponent
            infoIcon="/icons/two.svg"
            infoTitle="Contact details"
            infoSubtitle="Provide your contacts in case of emergency."
          />
          <hr className="mt-6" />
          <OnboardComponent
            infoIcon="/icons/three.svg"
            infoTitle="Payment details"
            infoSubtitle="Input your preferred bank information and options."
          />
          <hr className="mt-6" />
          <OnboardComponent
            infoIcon="/icons/four.svg"
            infoTitle="Documents"
            infoSubtitle="Upload required documents needed to complete your registration."
          />
          <hr className="mt-6" />
          <OnboardComponent
            infoIcon="/icons/five.svg"
            infoTitle="Assets"
            infoSubtitle="Collect your employee requirements and packages."
          />
        </div>
      </div>
    </>
  );
}
