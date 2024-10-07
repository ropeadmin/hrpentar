"use client";
import CompanyTable from "@/app/components/Table/CompanyTable";
import { ButtonBase } from "@mui/material";
import React, { useState } from "react";

export default function Company() {
  const [activeTab, setActiveTab] = useState("tasks");
  const [company, setCompany] = useState(null);

  const tabs = [
    {
      key: "companies",
      label: "Companies",
      borderRadius: "6px",
    },
    {
      key: "organization_chart",
      label: "Organization chart",
      borderRadius: "6px",
    },
  ];

  const handleTabClick = (key: React.SetStateAction<string>) => {
    setActiveTab(key);
  };

  const companies = [
    {
      prefix: "MAC",
      companyName: "MacTay Consulting",
      industry: "Consulting",
      businessType: "Private",
      branch: 16,
      status: "Active",
    },
    {
      prefix: "ROP",
      companyName: "Rope Africa",
      industry: "Technology",
      businessType: "Private",
      branch: 1,
      status: "Active",
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-[28px] font-[700] text-[#0F1625]">Company</h1>
        <p className="text-[14px] font-[400] text-[#323B49]">
          Manage companies, branches and organization chart.
        </p>
      </div>

      <div className="text-[14px] flex items-center mt-5 gap-1 bg-[#FBFBFC] w-fit rounded-[6px] mt-5">
        {tabs.map((tab, index) => (
          <ButtonBase
            key={index}
            onClick={() => handleTabClick(tab.key)}
            className="rounded-[6px]"
          >
            <div
              className={`py-2 px-3 cursor-pointer transform transition duration-500 ease-in-out`}
              style={{
                backgroundColor: activeTab === tab.key ? "#F0F2F5" : "#FBFBFC",
                color: activeTab === tab.key ? "#0F1625" : "#687588",
                borderRadius: tab.borderRadius,
                fontWeight: activeTab === tab.key ? "500" : "500",
                // border:
                //   activeTab === tab.key
                //     ? "0.5px solid #E4E8EC"
                //     : "0.5px solid transparent",
              }}
            >
              <p className="leading-none">{tab.label}</p>
            </div>
          </ButtonBase>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mt-7">
          <div className="relative">
            <input
              type="text"
              id=""
              value={""}
              onChange={undefined}
              className="text-[#687588] text-[14px] font-[500] leading-none rounded-[8px] bg-white border border-[#D0D6DD] outline-none w-[350px] pl-10 pr-4 py-[8px]"
              placeholder="Search company name"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M14.583 14.5835L18.333 18.3335"
                  stroke="#A0AEC0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.666 9.16675C16.666 5.02461 13.3082 1.66675 9.16601 1.66675C5.02388 1.66675 1.66602 5.02461 1.66602 9.16675C1.66602 13.3089 5.02388 16.6667 9.16601 16.6667C13.3082 16.6667 16.666 13.3089 16.666 9.16675Z"
                  stroke="#A0AEC0"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="px-[14px] py-[8px] rounded-[8px] flex items-center gap-2 border border-[#D0D6DD]">
            <p className="leading-none text-[#1F2937] text-[16px] font-[500]">
              Status
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path
                d="M1 1.5L5.29289 5.79289C5.62623 6.12623 5.79289 6.29289 6 6.29289C6.20711 6.29289 6.37377 6.12623 6.70711 5.79289L11 1.5"
                stroke="#1F2937"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="px-[14px] py-[8px] rounded-[8px] bg-[#0F1625] flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 1.3335V14.6668"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.33301 8H14.6663"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="text-white text-[16px] font-[500] leading-none">Create company</p>
        </div>
      </div>

      {/* table */}
      <div className="mt-7">
            <CompanyTable companies={companies} />
          </div>
      {/* {company ? (
          <div className="mt-5">
            <CompanyTable companies={companies} />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center text-center h-[300px]">
            <img src="/icons/no-employee.svg" alt="" width={30} />
            <div className="mt-4">
              <h1 className="text-[20px] font-[700] text-[#1F2937]">
                -----
              </h1>
              <p className="text-[16px] font-[400] text-[#323B49]">
                -------------
              </p>
            </div>
          </div>
        )} */}
    </div>
  );
}
