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
          ? "border-[#86D7B0] bg-[#F3FBF7]"
          : "border-[#E4E8EC] bg-[#F9FAFB]"
      }`}
    >
      <p
        className={`text-[12px] font-normal leading-tight ${
          passed ? "text-[#0CAF60]" : "text-[#687588]"
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
          stroke={passed ? "#0CAF60" : "#687588"} // change color based on passed status
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
