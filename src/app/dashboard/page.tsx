"use client";

import { formatCurrency } from "@/helpers";
import { ButtonBase } from "@mui/material";
import React, { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tasks");

  const tabs = [
    {
      key: "tasks",
      label: "Tasks",
      borderRadius: "6px",
    },
    {
      key: "leave_requests",
      label: "Leave Requests",
      borderRadius: "6px",
    },
  ];

  const handleTabClick = (key: React.SetStateAction<string>) => {
    setActiveTab(key);
  };

  const cards = [
    {
      icon: "/icons/employees.svg",
      data: 3041,
      title: "Total Employees",
    },
    {
      icon: "/icons/salary.svg",
      data: 579843120,
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
              <h1 className="text-[24px] font-[700] text-[#0F1625]">
                {card.title === "Total Salary"
                  ? formatCurrency(card.data)
                  : card.data.toLocaleString()}
              </h1>
              <p className="text-[16px] font-[400] text-[#1F2937]">
                {card.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex gap-5 mt-5">
        <div className="rounded-[12px] border-[0.5px] border-[#D0D6DD] w-full p-5"></div>

        <div className="rounded-[12px] border-[0.5px] border-[#D0D6DD] w-full p-5">
          {" "}
        </div>

        <div className="rounded-[12px] border-[0.5px] border-[#D0D6DD] min-w-[400px] p-5">
          <p className="text-[16px] font-[700] text-[#1F2937] mb-2">Payroll</p>
          <div className="mt-2">
            <h1 className="text-[16px] font-[700] text-[#1F2937]">
              Next payday: August 25th
            </h1>
            <p className="text-[14px] font-[400] text-[#323B49] mt-1.5">
              Payroll will run automatically on payday only when all stages of
              approval has been completed.
            </p>
          </div>
          <button className="px-[14px] py-[8px] rounded-[8px] border border-[#D0D6DD] leading-none text-[14px] font-[500] text-[#1F2937] mt-5 flex items-center gap-2">
            Run late payroll
          </button>
        </div>
      </div>

      {/* Action & Chart */}
      <div className="mt-5 w-full grid grid-cols-2 gap-5">
        <div className="rounded-[12px] border-[0.5px] border-[#D0D6DD] w-full p-5">
          <p className="text-[16px] font-[700] text-[#1F2937] leading-none">
            Actions
          </p>
          <div className="text-[14px] flex items-center mt-5 gap-1 bg-[#FBFBFC] w-fit rounded-[6px]">
            {tabs.map((tab, index) => (
              <ButtonBase
                key={index}
                onClick={() => handleTabClick(tab.key)}
                className="rounded-[6px]"
              >
                <div
                  className={`py-2 px-3 cursor-pointer transform transition duration-500 ease-in-out`}
                  style={{
                    backgroundColor:
                      activeTab === tab.key ? "#F0F2F5" : "#FBFBFC",
                    color: activeTab === tab.key ? "#0F1625" : "#687588",
                    borderRadius: tab.borderRadius,
                    fontWeight: activeTab === tab.key ? "500" : "500",
                    border:
                      activeTab === tab.key
                        ? "0.5px solid #E4E8EC"
                        : "0.5px solid transparent",
                  }}
                >
                  <p className="leading-none">{tab.label}</p>
                </div>
              </ButtonBase>
            ))}
          </div>
        </div>
        <div className="rounded-[12px] border-[0.5px] border-[#D0D6DD] w-full p-5"></div>
      </div>
    </div>
  );
}
