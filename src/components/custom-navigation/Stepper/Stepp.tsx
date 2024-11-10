"use client";

import {
  JSX,
  Dispatch,
  ElementRef,
  ButtonHTMLAttributes,
  SetStateAction,
} from "react";
import "./stepper.css";
// import CustomButton from '../../INPUTS/Buttons/CustomButton';
import { RxCross2 } from "react-icons/rx";

// ** UTILS
import { cn } from "@/lib/utils";

interface StepperProps {
  steps?: (() => JSX.Element)[];
  stepTitles: string[];
  currentStep: number;
  setCurrentStep?: Dispatch<SetStateAction<number>> | undefined;
  title: string;
  isHideStepper?: boolean;
  isCancelAndNextButton?: boolean;
  onComplete: () => void;
  goToPolicy?: () => void;
  disableButton: boolean;
  onSubmit: () => void;
  complete: boolean;
  isLoading?: boolean;
  backButtonText?: string;
  onClose?: () => void;
  isBottomStepper?: boolean;
  className?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const Stepper: React.FC<StepperProps> = ({
  steps = ["Step 1", "Step 2", "Step 3"],
  stepTitles, // Default steps
  title,
  backButtonText,
  currentStep,
  setCurrentStep,
  isHideStepper,
  onComplete,
  disableButton,
  onSubmit,
  goToPolicy,
  complete,
  isCancelAndNextButton,
  isLoading,
  onClose,
  isBottomStepper,
  className,
  ...otherProps
}) => {
  const renderStepComponent = () => {
    const StepComponent = steps[currentStep - 1];

    return <StepComponent />;
  };
  const handleBack = () => {
    if (currentStep > 1 && setCurrentStep) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="flex flex-col w-full h-full relative">
      <div className="h-full grow">
        <div className={isHideStepper ? "hidden" : "w-[90%] mx-auto"}>
          <div className="flex justify-between">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`step-item ${currentStep === i + 1 && "active"} ${
                  (i + 1 < currentStep || complete) && "complete"
                }`}
              >
                <div className="flex items-center gap-2">
                  {" "}
                  <div className="step">{i + 1}</div>
                  <p className="text-black">{stepTitles[i]}</p>{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          {/* Cancel Botton */}
          <div
            className={cn(
              "absolute right-5 top-8 w-8 h-8 bg-n100 centralize-all-col rounded-full ",
              className
            )}
            onClick={onClose}
          >
            <RxCross2 className="text-n800" />
          </div>
          {renderStepComponent()}
        </div>
      </div>

      {/* {
        isCancelAndNextButton ? 
        <div className="flex flex-row  justify-between items-center px-7 space-x-3 mb-3 mt-5">
          <CustomButton
            title={"Back" || backButtonText}
            titleColor="#110D0C"
            onClick={handleBack}
            buttonColor="transparent"
            buttonStyle={{padding: 24, width: 'fit-content', borderWidth: 1, borderColor: "#D9D8D7"}}
          />
          <CustomButton
            title={title || "Next"}
            disabled={disableButton}
            onClick={onComplete}
            isLoading={isLoading}
            style={{ cursor: disableButton ? 'not-allowed' : 'pointer' }}
            buttonStyle={{padding: 24, width: 'fit-content'}}
          />
        </div> : 
        <div className="px-4 lg:px-12 ">
          <CustomButton
            title={title || "Next"}
            disabled={disableButton}
            isLoading={isLoading}
            onClick={onComplete}
            style={{ cursor: disableButton ? 'not-allowed' : 'pointer' }}
          />
        </div>
      }   
      {
        isBottomStepper ? (
        <div className='w-[86px] h-[34px] rounded-[17px] bg-p100 mx-auto flex items-center justify-center space-x-1'>
            {
              steps.map((_, index) => <div key={index} className={`w-[10px] h-[10px] rounded-full ${currentStep === index + 1 ? "bg-p900" : "bg-p300"}`} />)
            }
          </div>      
        ) : null
        
      } */}
    </div>
  );
};

export default Stepper;
