"use client";
import PlanCard from "@/app/components/Cards/PlanCard";
import Stepper from "@/app/components/Steppper/Stepper";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/subRequest.service";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Step2() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { makeRequest, isLoading } = useRequest();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [plans, setPlans] = useState<any>([]);

  const handleSelectPlan = (planTitle: any) => {
    setSelectedPlan(planTitle);
  };

  const getSubs = async () => {
    catchAsync(
      async () => {
        const res = await makeRequest({
          method: "GET",
          url: API.getSubscription,
        });

        const { data } = res.data;
        setPlans(data)
      },
      (error: any) => {
        const res: any = error?.response;
        const data = res?.data;

        enqueueSnackbar(data?.message, {
          variant: "rope_snackbar",
          autoHideDuration: 5000,
          error: true,
        });
      }
    );
  };

  useEffect(() => {
    getSubs();
  }, []);

  return (
    <div className="px-[30px] py-[150px] relative">
      <img
        src="/pentaHR-logo-dark.svg"
        width={150}
        className="absolute top-10 left-[50px]"
      />

      <div className="flex items-center mx-auto w-[750px]">
        <Stepper currentStep={currentStep} />
      </div>

      <div className="mb-7 mt-12 text-center">
        <h1 className="text-[#0f1625] text-[32px] font-bold">
          Choose the right plan for your team
        </h1>
        <p className="text-[#0f1625] font-normal text-base">
          Select a plan that fits your team&apos;s needs. Enjoy customization
          and powerful features to manage your HR processes.
        </p>
      </div>
      <div className="grid sm:grid-cols-4 gap-5">
        {plans?.map((plan: any, i: React.Key | null | undefined) => (
          <PlanCard
            key={i}
            name={plan.name}
            description={plan.description}
            features={plan.features}
            amount={plan.amount}
            isSelected={selectedPlan === plan.description} // Pass if the plan is selected
            onSelect={() => handleSelectPlan(plan.description)} // Pass selection handler
          />
        ))}
      </div>
    </div>
  );
}
