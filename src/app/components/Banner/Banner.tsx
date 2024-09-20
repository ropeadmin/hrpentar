import { IconButton } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
    <div className="w-full border border-[#FFDE65] bg-[#FFFAE9] rounded-[8px] py-[12px] px-[24px] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <circle
            cx="10.0003"
            cy="10.0001"
            r="8.33333"
            fill="#FFD023"
            stroke="#FFD023"
            stroke-width="1.5"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.99398 12.5H10.0015H9.99398Z"
            fill="#FFD023"
          />
          <path
            d="M9.99398 12.5H10.0015"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 10L10 6.66667"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p className="text-[14px] font-[500] text-[#0F1625] leading-none">
          Your free trials ends in 5 days. &nbsp;&nbsp;
          <span>
            <Link href="" className="font-[700] underline underline-offset-4">
              Upgrade plan
            </Link>
          </span>
        </p>
      </div>

      <IconButton>
        <img src='/icons/close.svg' alt='close-icon' width={10} height={10} />
      </IconButton>
    </div>
  );
}
