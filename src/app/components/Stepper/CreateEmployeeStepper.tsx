import React from 'react';

export default function CreateEmployeeStepper({ currentStep }: { currentStep: number }) {
  const steps = [
    "Personal details",
    "Contract details",
    "Job details",
    "Payment details",
    "Salary composition",
    "Documents",
    "Asset",
  ];

  return (
    <div className="space-y-4">
      {/* Steps */}
      <div className="mt-6 space-y-8 relative">
        {steps.map((label, index) => (
          <div key={index} className="flex items-start">
            {/* Step Number and Connector Line */}
            <div className="relative flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  index <= currentStep
                    ? "bg-black text-white border-gray-600"
                    : "text-gray-500 border-gray-300 bg-white"
                }`}
              >
                {index + 1}
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={`w-px h-8 ${
                  index < currentStep ? "bg-black" : "bg-gray-300"
                } absolute top-full`}></div>
              )}
            </div>

            {/* Step Label */}
            <div className="ml-4">
              <span
                className={`text-lg font-medium ${
                  index <= currentStep ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
