import React from "react";

export default function PasswordToolTip({
  title,
  passed,
}: {
  title: any;
  passed: boolean;
}) {
  return (
    <div
      className={`rounded-full border-[0.5px] py-[4px] px-[10px] flex justify-center items-center gap-2 ${
        passed
          ? "border-green-500 bg-green-50"
          : "border-[#E4E8EC] bg-[#F9FAFB]"
      }`}
    >
      <p
        className={`text-[12px] font-normal leading-tight ${
          passed ? "text-green-600" : "text-[#687588]"
        }`}
      >
        {title}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
      >
        <path
          d="M0.5 5L2.25 6.75L7.5 1.25"
          stroke={passed ? "#22C55E" : "#687588"} // change color based on passed status
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
