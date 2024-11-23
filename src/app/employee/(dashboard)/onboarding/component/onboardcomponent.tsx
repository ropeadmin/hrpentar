import React from "react";
import Image from "next/image";
import Link from "next/link";

interface OnboardComponentProps {
  infoIcon: any;
  infoTitle: string;
  infoSubtitle: string;
  stepIndex: number;
}

const OnboardComponent: React.FC<OnboardComponentProps> = ({ infoIcon, infoTitle, infoSubtitle, stepIndex }) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image src={infoIcon} alt="" width={32} height={32} />
        <div>
          <h1 className="text-xl font-bold">{infoTitle}</h1>
          <div>
            <span className="text-[#323B49] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
              {infoSubtitle}
            </span>
          </div>
        </div>
      </div>
      <Link className="text-[#1F2937] pt-2 pb-2 pr-3.5 pl-3.5 border-[0.5px] border-[#D0D6DD] rounded-[8px]" href={`/employee/onboarding/${stepIndex}`}>
        View
      </Link>
    </div>
  );
};

export default OnboardComponent;

