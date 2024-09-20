"use client";
import React, { useState } from "react";
import { getSubPathName } from "@/utils";
import useGlobalState from "@/hooks/globalstate.hook";
import useAppTheme from "@/hooks/theme.hook";
import { MdClose } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { profileLogoutAction } from "@/store/profile.slice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ButtonBase, IconButton } from "@mui/material";

export default function DashboardNavbar() {
  const router = useRouter();
  const subpath = getSubPathName();
  const { profile, logout, isAuthenticated } = useGlobalState();
  const { isMobile } = useAppTheme();
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "Home",
      href: "/dashboard",
    },
    {
      id: 2,
      link: "View store",
      href: "/dashboard/store",
    },
    {
      id: 3,
      link: "Transactions",
      href: "/dashboard/transaction",
    },
    {
      id: 4,
      link: "Order history",
      href: "/dashboard/order-history",
    },
    {
      id: 5,
      link: "Notifications",
      href: "/dashboard/notification",
    },
    {
      id: 5,
      link: "Settings",
      href: "/dashboard/settings",
    },
  ];

  const fullName = profile?.user?.full_name || "-------";
  const avatar = profile?.user?.avatar;

  return (
    <>
      <div className="min-h-[72px] max-h-[72px] bg-white border-b-[0.5px] border-[#d0d6dd97] sm:px-7 px-5 flex items-center justify-between relative">
        <div className="flex justify-between items-center w-full">
          {/* <h1>Hello</h1> */}
          
          <div className="divide-x divide-[#d0d6dd89] grid grid-cols-2 w-fit">
            {/* Search Bar & Notification */}
            <div className="flex gap-8 items-center pr-2.5 wfit">
              <div className="relative">
                <input
                  type="text"
                  id=""
                  value={""}
                  onChange={undefined}
                  className="text-[#687588] text-[14px] font-[500] leading-none rounded-[8px] bg-[#F9FAFB] border border-[#F0F2F5] outline-none w-[350px] pl-10 pr-4 py-[10px]"
                  placeholder="Search people, teams, business..."
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

              <ButtonBase
                sx={{
                  borderRadius: "8px",
                  "&:active": {
                    backgroundColor: "#FEF0F0", // Change to your desired color
                  },
                }}
              >
                <div className="w-[40px] h-[40px] rounded-[8px] bg-[#F9FAFB] flex justify-center items-center">
                  <img
                    src="/icons/bell.svg"
                    alt="Notification-bell"
                    className="relative"
                    width={20}
                    height={20}
                  />
                  <img
                    src="/icons/red-dot.svg"
                    className="absolute right-[10px] top-2"
                    width={10}
                    height={10}
                  />
                </div>
              </ButtonBase>
            </div>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-5 w-fit">
              <div className="flex gap-2 items-center">
                <div className="w-[40px] h-[40px] bg-[#F9FAFB] rounded-full flex justify-center items-center">
                  <p className="text-[18px] font-[700] text-[#687588] leading-none">
                    KB
                  </p>
                </div>
                <div>
                  <h1 className="text-[16px] font-[700] text-[#1F2937]">
                    Kamsi Bentley
                  </h1>
                  <p className="text-[12px] font-[500] text-[#687588] leading-none">
                    Super Admin
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12.0002 15.0099C11.8102 15.0099 11.6202 14.9399 11.4702 14.7899L7.94016 11.2599C7.65016 10.9699 7.65016 10.4899 7.94016 10.1999C8.23016 9.90992 8.71016 9.90992 9.00016 10.1999L12.0002 13.1999L15.0002 10.1999C15.2902 9.90992 15.7702 9.90992 16.0602 10.1999C16.3502 10.4899 16.3502 10.9699 16.0602 11.2599L12.5302 14.7899C12.3802 14.9399 12.1902 15.0099 12.0002 15.0099Z"
                  fill="#1F2937"
                />
              </svg>
            </div>
          </div>
        </div>

        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer z-10 md:hidden"
        >
          {nav ? <MdClose size={25} /> : <HiOutlineMenuAlt3 size={25} />}
        </div>
      </div>

      {nav && isMobile && (
        <div className="w-[50vw] h-[60vh] bg-[#fff] absolute right-5 top-14 bottom-5 rounded-[20px] z-50 shadow-md p-4">
          <div className="mt-5 flex flex-col">
            {links.map(({ id, link, href }) => (
              <div
                key={id}
                className="px-4 cursor-pointer text-black py-5 text-[3.7vw]"
                onClick={() => router.push(href)}
              >
                {link}
              </div>
            ))}
            <div
              onClick={logout}
              className="px-4 cursor-pointer text-[#ff0000] py-4 text-[3.7vw] bg-[#ff353521] rounded-[14px]"
            >
              <p className="leading-tight">Logout</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
