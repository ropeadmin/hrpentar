import React from "react";

export default function SignupStepper({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="flex items-center mx-auto w-full">
      <div
        className={`flex items-center w-full ${
          currentStep >= 1 ? "completed" : ""
        }`}
      >
        <div
          className={`w-8 h-8 shrink-0 mx-[-1px] ${
            currentStep >= 1 ? "bg-[#0BA259]" : "bg-gray-300"
          } p-1.5 flex items-center justify-center rounded-full`}
        >
          {currentStep >= 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full fill-white"
              viewBox="0 0 24 24"
            >
              <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
            </svg>
          ) : (
            <span className="text-base text-[#687588] font-bold leading-none">
              1
            </span>
          )}
        </div>
        <h6 className="text-base ml-4 whitespace-nowrap max-lg:hidden">
          Personal Information
        </h6>
        <div
          className={`w-full h-1 rounded-xl mx-4 ${
            currentStep >= 1 ? "bg-[#0BA259]" : "bg-gray-300"
          }`}
        ></div>
      </div>

      <div
        className={`flex items-center w-max ${
          currentStep >= 2 ? "completed" : ""
        }`}
      >
        <div
          className={`w-8 h-8 shrink-0 mx-[-1px] ${
            currentStep >= 2
              ? "bg-[#0BA259]"
              : "border-[#687588] border-[1.5px]"
          } p-1.5 flex items-center justify-center rounded-full`}
        >
          <span
            className={`text-base ${
              currentStep >= 2 ? "text-white" : "text-[#687588]"
            } font-bold leading-none`}
          >
            2
          </span>
        </div>
        <h6 className="text-base ml-4 whitespace-nowrap max-lg:hidden">
          Create Password
        </h6>
      </div>
    </div>
  );
}
