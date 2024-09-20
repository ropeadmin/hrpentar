'use client'

import { formatCurrency } from "@/helpers";
import React from "react";

export default function Dashboard() {
  const cards = [
    {
      icon: "/icons/employees.svg",
      data: 3041,
      title: "Total Employees",
    },
    {
      icon: "/icons/salary.svg",
      data: 57984312065,
      title: "Total Salary",
    },
    {
      icon: "/icons/on-leave.svg",
      data: 16,
      title: "Employees on Leave",
    },
    {
      icon: "/icons/job.svg",
      data: 134,
      title: "Job Applicants",
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-[28px] font-[700] text-[#0F1625]">Hi Kamsi</h1>
        <p className="text-[14px] font-[400] text-[#323B49]">
          Here is your dashboard overview.
        </p>
      </div>

      {/* Cards */}
      <div className="rounded-[8px] border border-[#E4E8EC] w-full h-auto mt-5 divide-x divide-[#E4E8EC] flex py-5 px-2">
        {cards.map((card, i) => (
          <div key={i} className="px-7 w-full">
            <div className="w-[32px] h-[32px] rounded-[6px] bg-[#F0F2F5] flex justify-center items-center">
              <img src={card.icon} width={20} height={20} />
            </div>
            <div className="mt-3">
              <h1 className="text-[24px] font-[700] text-[#0F1625]">{card.title === 'Total Salary' ? formatCurrency(card.data) : card.data.toLocaleString()}</h1>
              <p className="text-[16px] font-[400] text-[#1F2937]">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
