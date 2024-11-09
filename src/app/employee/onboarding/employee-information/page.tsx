import React, { useState } from 'react';
import Stepp from "../../../../components/custom-navigation/Stepper/Stepp";
// import PersonalDetails from "../employee-information/component/personal-details";
// import ContactDetails from "../employee-information/component/contact-details";
// import PaymentDetails from "../employee-information/component/payment-details";
// import Forms from "../employee-information/component/forms";
// import Assets from "../employee-information/component/assets";

const StepperPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleComplete = () => {
    alert('All steps completed');
  };

  const handleSubmit = () => {
    console.log('Form submitted');
  };

  return (
    <Stepp
      // steps={["PersonalDetails", "ContactDetails", "PaymentDetails", "Forms", "Assets"]}
      title="Step-by-Step Form"
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      onComplete={handleComplete}
      disableButton={false}
      onSubmit={handleSubmit}
      complete={currentStep === 5}
      backButtonText="Back"
      isHideStepper={false}
      isCancelAndNextButton={true}
      isLoading={false}
    />
  );
};

export default StepperPage;
