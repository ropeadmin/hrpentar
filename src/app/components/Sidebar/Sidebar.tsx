"use client";

import React from "react";
import SidebarItem from "../SidebarItem/SidebarItem";
import Image from "next/image";
// import "./Sidebar.scss";
import { IconButton } from "@mui/material";
import { useParams, usePathname, useRouter } from "next/navigation";
import Assets from "@/constants/assets.constant";
import { SideBarItemLink } from "@/utils/types/types";
import { useDispatch } from "react-redux";
import { profileLogoutAction } from "@/store/profile.slice";
import Link from "next/link";
import useGlobalState from "@/hooks/globalstate.hook";
import useCompanyState from "@/hooks/companystate.hook";

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname;
  const subpath = currentPath?.split("/")[2];
  const isActive = (paths: string[]) => paths.includes(subpath ?? "");
  const { company } = useCompanyState();

  const links: SideBarItemLink[] = [
    {
      name: "Dashboard",
      icon:
        currentPath === "/dashboard"
          ? "/icons/dashboard.svg"
          : "/icons/dashboard.svg",
      to: "/dashboard",
      paths: [""],
    },
    {
      name: "Company",
      icon:
        currentPath === "/dashboard/company"
          ? "/icons/company.svg"
          : "/icons/company.svg",
      to: "/dashboard/company",
      paths: ["company"],
    },
    {
      name: "People",
      icon:
        currentPath === "/dashboard/people"
          ? "/icons/people.svg"
          : "/icons/people.svg",
      to: "/dashboard/people",
      paths: ["people"],
    },
    {
      name: "Payroll",
      icon:
        currentPath === "/dashboard/payroll"
          ? "/icons/payroll.svg"
          : "/icons/payroll.svg",
      to: "/dashboard/payroll",
      paths: ["payroll"],
    },
    {
      name: "Leave",
      icon:
        currentPath === "/dashboard/leave"
          ? "/icons/leave.svg"
          : "/icons/leave.svg",
      to: "/dashboard/leave",
      paths: ["leave"],
    },
    {
      name: "Performance",
      icon:
        currentPath === "/dashboard/performance"
          ? "/icons/performance.svg"
          : "/icons/performance.svg",
      to: "/dashboard/performance",
      paths: ["performance"],
    },
    {
      name: "Time & Attendance",
      icon:
        currentPath === "/dashboard/attendance"
          ? "/icons/attendance.svg"
          : "/icons/attendance.svg",
      to: "/dashboard/attendance",
      paths: ["attendance"],
    },
    {
      name: "Benefits",
      icon:
        currentPath === "/dashboard/benefits"
          ? "/icons/benefit.svg"
          : "/icons/benefit.svg",
      to: "/dashboard/benefits",
      paths: ["benefits"],
    },
    {
      name: "Payments",
      icon:
        currentPath === "/dashboard/payments"
          ? "/icons/payment.svg"
          : "/icons/payment.svg",
      to: "/dashboard/payments",
      paths: ["payments"],
    },
    {
      name: "Recruitment",
      icon:
        currentPath === "/dashboard/recruitment"
          ? "/icons/recruitment.svg"
          : "/icons/recruitment.svg",
      to: "/dashboard/recruitment",
      paths: ["recruitment"],
    },
    {
      name: "Disciplinary",
      icon:
        currentPath === "/dashboard/disciplinary"
          ? "/icons/disciplinary.svg"
          : "/icons/disciplinary.svg",
      to: "/dashboard/disciplinary",
      paths: ["disciplinary"],
    },
    {
      name: "Documents",
      icon:
        currentPath === "/dashboard/documents"
          ? "/icons/document.svg"
          : "/icons/document.svg",
      to: "/dashboard/documents",
      paths: ["documents"],
    },
    {
      name: "Assets",
      icon:
        currentPath === "/dashboard/assets"
          ? "/icons/asset.svg"
          : "/icons/asset.svg",
      to: "/dashboard/assets",
      paths: ["assets"],
    },
    {
      name: "Reports",
      icon:
        currentPath === "/dashboard/reports"
          ? "/icons/report.svg"
          : "/icons/report.svg",
      to: "/dashboard/reports",
      paths: ["reports"],
    },
  ];

  const links2 = [
    {
      name: "Settings",
      icon:
        currentPath === "/dashboard/settings"
          ? "/icons/setting.svg"
          : "/icons/setting.svg",
      to: "/dashboard/settings",
      paths: ["settings"],
    },
    {
      name: "Help",
      icon:
        currentPath === "/dashboard/help"
          ? "/icons/help.svg"
          : "/icons/help.svg",
      to: "/dashboard/help",
      paths: ["help"],
    },
  ];

  return (
    <>
      <div className="sidebar-container bg-[#0F1625] pb-10 px-5 pt-5 z-1 remove-scroll-bar">
        <div className="w-full">
          <Link
            href="/"
            className="w-full flex justify-start items-center relative pb-5"
          >
            <Image src="/pentaHR.svg" alt="logo" width={100} height={100} />
          </Link>

          {/* Company Detail */}
          <div className="bg-[#182434] rounded-[10px] w-full px-[10px] py-[5px] flex justify-between items-center mb-4 mt-3">
            <div className="flex gap-[7px] items-center">
              <img
                src="/icons/logomark.svg"
                alt="company-logo"
                width={20}
                height={20}
              />
              <div className="">
                <h1 className="font-[500] text-[13px] text-white">
                  {company.data.businessName}
                </h1>
                <p className="text-[11px] font-[400] text-white">
                  {company.data.address.city}
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
            >
              <path
                d="M1 8.66675L5.35982 12.2999C5.66592 12.555 5.81897 12.6826 6 12.6826C6.18102 12.6826 6.33408 12.555 6.64018 12.2999L11 8.66675"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1 5.3335L5.35982 1.70032C5.66592 1.44523 5.81897 1.31768 6 1.31768C6.18102 1.31768 6.33408 1.44523 6.64018 1.70032L11 5.3335"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <div className="h-auto links mt-3">
            {links.map((link, index) => (
              <SidebarItem
                link={link}
                key={index}
                active={isActive(link.paths)}
              />
            ))}
          </div>

          {/*  Settings and Help */}
          <div className="h-auto links mt-20">
            {links2.map((link, index) => (
              <SidebarItem
                link={link}
                key={index}
                active={isActive(link.paths)}
              />
            ))}
          </div>
        </div>

        {/* <div className="sidebar-item">
          <div className="flex items-center gap-[20px] px-3 py-4 cursor-pointer rounded-[12px] hover:bg-[#e0444415]" onClick={logout}>
            <Image src={Assets.logout} alt="" width={20} height={20} />
            <span className="w-full font-[500] text-[1vw] text-odi-lite">Logout</span>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Sidebar;
