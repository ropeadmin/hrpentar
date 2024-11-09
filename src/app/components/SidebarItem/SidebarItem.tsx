"use client";
import { MenuItem } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { SideBarItemLink } from "@/utils/types/types";

interface SideBarItemProps {
  link: SideBarItemLink;
  active: boolean;
}

const SidebarItem = ({ link, active }: SideBarItemProps) => {
  const { name, to, icon } = link;

  return (
    <MenuItem>
      <Link className="w-full" href={to}>
        <div
          className={`flex items-center justify-between px-[10px] py-[10px]  w-full rounded-[6px] ${
            active ? "bg-[#182434]" : "bg-transparent"
          } ${active ? "hover:bg-none" : "hover:bg-cream-light"}`}
        >
          <div className="flex items-center gap-[10px]">
            <Image src={icon} alt="" width={20} height={20} />
            <p
              className={`w-full font-[400] text-sm ${
                active ? "text-white" : "text-white"
              }`}
            >
              {name}
            </p>
          </div>
          {![
            "Onboarding",
            "Dashboard",
            "Company",
            "Documents",
            "Assets",
            "Settings",
            "Help",
            "Reports",
          ].includes(name) && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="6"
              viewBox="0 0 12 6"
              fill="none"
            >
              <path
                d="M1.5 0.75L5.3636 4.6136C5.6636 4.9136 5.8136 5.0636 6 5.0636C6.1864 5.0636 6.3364 4.9136 6.6364 4.6136L10.5 0.75"
                stroke="white"
                strokeWidth="1.35"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </Link>
    </MenuItem>
  );
};

export default SidebarItem;

