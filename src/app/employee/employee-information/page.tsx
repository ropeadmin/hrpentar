"use client";

import React, { useState } from "react";
// import Layout from "../../component/employeelayout";
import Stepper from "@/components/custom-navigation/Stepper/Stepp";
import PersonalDetails from "../onboarding/employee-information/personal-details/page";
import ContactDetails from "../onboarding/employee-information/component/contact-details";
import PaymentDetails from "../onboarding/employee-information/component/payment-details";
import Forms from "../onboarding/employee-information/component/forms";
import Assets from "../onboarding/employee-information/component/assets";

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

  const StepComponent = steps[currentStep - 1];
  const title = stepTitles[currentStep - 1];

  return (
    // <Layout>
    // </Layout>
    <div>
      <Stepper
        isHideStepper={false}
        title={title}
        steps={steps}
        currentStep={currentStep}
        disableButton={false}
        complete={complete}
        onComplete={handleComplete}
        onSubmit={() => null}
      />

      <StepComponent />

      <div style={{ marginTop: "20px" }}>
        <button disabled={currentStep === 1} onClick={handleBack}>
          Back
        </button>
        <button onClick={handleNext}>
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepperPage;
