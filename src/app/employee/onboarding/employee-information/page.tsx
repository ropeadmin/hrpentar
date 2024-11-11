"use client";

import React, { useState } from "react";
import Layout from "../../component/employeelayout";
import Stepper from "@/components/custom-navigation/Stepper/Stepp";
import PersonalDetails from "../employee-information/personal-details/page";
import ContactDetails from "../employee-information/contact-details/page";
import PaymentDetails from "../employee-information/payment-details/page";
import Forms from "../employee-information/component/forms";
import Assets from "../employee-information/component/assets";

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

  const [currentStep, setCurrentStep] = useState(1);
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
    }
  };
  const title = stepTitles[currentStep - 1];

  return (
    <Layout>
      <div className="mt-100 relative h-full">
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

        <div className="flex items-center gap-2 mt-6">
          <button className="rounded-[8px] border text-[#1F2937] py-2 border-[#D0D6DD99] bg-transparent w-[105px] text-center" disabled={currentStep === 1} onClick={handleBack}>
            Back
          </button>
          <button className="rounded-[8px] border text-[#1F2937] py-2 border-[#D0D6DD99] bg-transparent w-[105px] text-center" onClick={handleNext}>
            {currentStep === steps.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StepperPage;
