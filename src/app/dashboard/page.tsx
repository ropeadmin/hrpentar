"use client";

import { formatCurrency } from "@/helpers";
import { ButtonBase } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import ActionTableTask from "../components/Table/ActionTable";
import { FadeIn } from "../components/Transitions/Transitions";
import LineChart from "../components/charts/Line";

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

  const tasks = [
    {
      name: "Onboard new hires",
      dueDate: "Today",
      priority: "High",
    },
    {
      name: "Announce mid year appraisal",
      dueDate: "Aug 20, 2024",
      priority: "Low",
    },
    {
      name: "Follow up new hires",
      dueDate: "Aug 25, 2024",
      priority: "Medium",
    },
  ];

  const leaveRequests = [
    {
      avatar:
        "https://s3-alpha-sig.figma.com/img/9a4a/2ff5/e782e82e9a472a15f979453db483bd46?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=icXujdj74aqTAFQQHk-gYCNp0MkWj6fubWNdPZjhoKgA0QBNhX9hWVM9uL-LtL~To48ctObeX7~hi4cZL5-nqXsCAhXY5~TUq-jWgGsGyaWHYdNa5PCuWSoax8vhEPZaQmEbTPR7dhp9vuLTzNf4FYI41z-et26gENUnyVgu5e7YJMqKhaKeCGSnOljx7sQR2TBeD1w-vAeXs2pIOXLemd23CbmqoCAfW9hofxGqsUH948SLaoetaDVYWaj25zA5CUlEJAtYTsKVT94YApnqvJH6vS2nqBEkp119P~bqmxnAszCvcjjCPDxRFE6WRkRrYdvrMHDzGkWsBA6m3F-LWw__",
      name: "Oluwadamilare Oludare",
      lapse: "2 weeks leave",
      type: "Casual",
    },
    {
      avatar:
        "https://s3-alpha-sig.figma.com/img/1f57/b58c/d445363432703e3bfdc5827ba793a2ce?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jcIvQzFm53mG8hEhZNFQbQraKFOLHhLIT8SU7KMfJwkjFnvJwBBvFVRlFeH3n0BxRXNdfqvnSwbglj5ukH0rblrQh7voymQ0o1BoeA0TUTK88u6T2VrUGYMorVQxsBmCvtU1B96lEw3ABPEIhE1UPiaC98HvPngZ7K7V5CTmbH~rh0gQNzA7zThkE4JHNhnTSqbEDUEC6aen0V---YbokKvjMfWavRK14R6BfZxyXQKPrqiVu8o8KW-i~vVKJqSJyN5FN3M6sVZGT~5zqTtqWEE7u3QR12DZZU7PffMpS9Q~RRv0STpm9C208nng4knIPQDaWl3k1ttSBYsOjUMfTw__",
      name: "David Tonbara",
      lapse: "3 days sick leave",
      type: "Sick",
    },
    {
      avatar:
        "https://s3-alpha-sig.figma.com/img/d25a/df46/fb73f9dcb520e182bb476bbfc07ca265?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M~iGbXO6eJ3w2IPwHbbuKOMDf7y3x82zCQ-cHBMDsyvRbiQ1QpnGdclggrAu546lPfn6e2olWTN3BiX7kfqBynK2r2KWBnxyCg2Zbvs5-KVQGmbCKiZ195cTHUZ9jMK0NdIcUkqSJXM-oP8OdZAXYaXIBX59Js64Cpr4D8NRkNiiXV6YVPlWlOaTtK2Tr-xTd1vUmN0oN8Gt6DFmggTMCxnWhk~iNW7KqFyVo7w~NxLLhj8UFs4bNvy4eHi8v6XiDs8uquU-QSnLsljX-KcogcgU2bUQfRip5r1WzzebRUumxDvHmVU4hQELtaVrr~nRXpR-mcbcp5lIyGcNNavmIw__",
      name: "Rebecca Ogan",
      lapse: "3 months maternity leave",
      type: "Maternity",
    },
  ];


  const dummyData = [
    { _id: 'Jan', count: Math.floor(Math.random() * 101) }, // Random between 0 and 100
    { _id: 'Feb', count: Math.floor(Math.random() * 101) },
    { _id: 'Mar', count: Math.floor(Math.random() * 101) },
    { _id: 'Apr', count: Math.floor(Math.random() * 101) },
    { _id: 'May', count: Math.floor(Math.random() * 101) },
    { _id: 'Jun', count: Math.floor(Math.random() * 101) },
    { _id: 'Jul', count: Math.floor(Math.random() * 101) },
    { _id: 'Aug', count: Math.floor(Math.random() * 101) },
    { _id: 'Sep', count: Math.floor(Math.random() * 101) },
    { _id: 'Oct', count: Math.floor(Math.random() * 101) },
    { _id: 'Nov', count: Math.floor(Math.random() * 101) },
    { _id: 'Dec', count: Math.floor(Math.random() * 101) },
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
          <div className="flex items-center justify-between">
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

            <Link
              href=""
              className="text-[14px] font-[500] leading-none text-[#EF0000] py-2 px-3 rounded-[6px] hover:bg-[#ef000007] transform transition duration-500 ease-in-out"
            >
              View all
            </Link>
          </div>

          {/* Table */}
          <div className="mt-5">
            {activeTab === "tasks" && (
              <FadeIn>
                <ActionTableTask tasks={tasks} />
              </FadeIn>
            )}
            {activeTab === "leave_requests" && (
              <FadeIn>
                <div className="w-full space-y-4">
                  {leaveRequests.map((leave, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={leave.avatar}
                          alt=""
                          className="w-[32px] h-[32px] rounded-full object-cover"
                        />
                        <p className="text-[#0F1625] text-[14px] font-[700]">
                          {leave.name}{" "}
                          <span className="font-[400]">
                            raised a {leave.lapse}.
                          </span>
                        </p>
                      </div>
                      <div className="bg-[#F0F2F5] p-[8px] rounded-full leading-none text-[12px] font-[700] text-[#0F1625]">
                        {leave.type}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </div>
        <div className="rounded-[12px] border-[0.5px] border-[#D0D6DD] w-full p-5">
          <p className="text-[16px] font-[700] text-[#1F2937] leading-none">
            Team Performance Analytics
          </p>
          <div className="mt-5 flex justify-between items-center">
            <div className="text-[#1F2937] text-[28px] font-[700] leading-none">
              78.8%{" "}
              <span className="text-[12px] font-[400]">
                Avg. &nbsp;&nbsp;
                <span className="text-[#0BA259]">+6%</span>&nbsp;than last year
              </span>
            </div>

            <button className="px-[14px] py-[8px] rounded-[8px] border border-[#D0D6DD] leading-none text-[14px] font-[500] text-[#1F2937] flex items-center gap-2">
              <span>Product team</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M1 1L4.29289 4.29289C4.62623 4.62623 4.79289 4.79289 5 4.79289C5.20711 4.79289 5.37377 4.62623 5.70711 4.29289L9 1"
                  stroke="#0F1625"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Chart */}
          <div className="mt-7">
            <LineChart data={dummyData}/>
          </div>
        </div>
      </div>
    </div>
  );
}
