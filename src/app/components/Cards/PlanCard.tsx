import React from "react";

interface PlanCardProps {
  name: string;
  description: string;
  features: string[];
  amount: number;
  isSelected: boolean;
  onSelect: () => void;
}

export default function PlanCard({
  name,
  description,
  features,
  amount,
  isSelected,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      className={`border ${
        isSelected ? "border-[#0BA259] bg-green-50" : "border-[#E4E8EC]"
      } rounded-[16px] w-full h-[500px] flex flex-col justify-between p-5 cursor-pointer
      transition-all duration-300 ease-in-out`} // Smooth transition here
      onClick={onSelect}
    >
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-[#0f1625] sm:text-[20px] font-bold">{name}</h1>
          {amount !== null && (
            <h1 className="text-[#0f1625] sm:text-[20px] font-bold">₦{amount.toLocaleString()}{name !== 'Free' && <span className="text-[12px]">/seat/mo</span>}</h1>
          )}
        </div>
        <p className="text-[#0f1625] text-[12px] font-normal mt-1.5">
          {description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 gap-3 mt-9">
          {features?.map((item: string, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <img
                src="/icons/plan-card-check.svg"
                width={20}
                height={20}
                alt="check"
              />
              <p className="text-[#0f1625] text-[15px] font-normal">{item}</p>
            </div>
          ))}
        </div>

        {(name === 'Standard' || name === 'Enterprise') && (
            <p className="mt-7 text-[#0F1625] text-sm font-normal">Save 20% when billed yearly</p>
        )}
      </div>

      <button
        className={`text-white ${
          isSelected ? "bg-[#0BA259]" : "bg-[#0f1625]"
        } w-full py-3 rounded-[8px] text-base font-medium
        transition-colors duration-300 ease-in-out`} // Smooth color transition for button
      >
        {isSelected ? "Selected" : "Select Plan"}
      </button>
    </div>
  );
}
