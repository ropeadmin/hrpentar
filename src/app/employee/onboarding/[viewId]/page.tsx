"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "../../component/employeelayout";
import Stepper from "@/components/custom-navigation/Stepper/Stepp";
import PersonalDetails from "./personal-details/page";
import ContactDetails from "./contact-details/page";
import PaymentDetails from "./payment-details/page";
import Forms from "./form-details/page";
import Assets from "./asset-details/page";

const StepperPage: React.FC = () => {
  const steps = [
    PersonalDetails as () => JSX.Element,
    ContactDetails as () => JSX.Element,
    PaymentDetails as () => JSX.Element,
    Forms as () => JSX.Element,
    Assets as () => JSX.Element,
  ];

  const stepTitles = [
    "PersonalDetails",
    "ContactDetails",
    "PaymentDetails",
    "Forms",
    "Assets",
  ];
  const params = useParams();
  const router = useRouter();
  const stepIndex = params.viewId;
  const [currentStep, setCurrentStep] = useState(Number(stepIndex) || 1);
  const [complete, setComplete] = useState(false);

  const handleComplete = () => {
    setComplete(true);
    alert("All steps completed");
  };

  const handleSubmit = () => {
    console.log("Form submitted");
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.push("/employee/onboarding");
    }
  };

  const title = stepTitles[currentStep - 1];

  useEffect(() => {
    if (stepIndex) {
      setCurrentStep(Number(stepIndex));
    }
  }, [stepIndex]);

  return (
    <Layout>
      <div className="mt-200 relative h-full bg-red-500 w-full">
        <Stepper
          isHideStepper={false}
          title={title}
          steps={steps}
          stepTitles={stepTitles}
          currentStep={currentStep}
          disableButton={false}
          complete={complete}
          onComplete={handleComplete}
          onSubmit={() => null}
        />

        <div className="flex items-center gap-2 mt-6 justify-end">
          <button
            className={`rounded-[8px] border text-[#1F2937] py-2 border-[#D0D6DD99] bg-transparent text-center ${
              currentStep === 1 ? "w-[160px]" : "w-[105px]"
            }`}
            onClick={handleBack}
          >
            {currentStep === 1 ? "Onboarding Page" : "Back"}
          </button>
          <button
            className="rounded-[8px] border text-[#fcfcfc] bg-[#0e1118] py-2 border-[#D0D6DD99] w-[169px] text-center"
            onClick={handleNext}
          >
            {currentStep === steps.length ? "Finish" : "Save & Continue"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StepperPage;
