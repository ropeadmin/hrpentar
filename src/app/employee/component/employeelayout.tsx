"use client";

import Sidebar from "./Sidebar/Sidebar";
import DashboardNavbar from "@/layout/navbar/dashboard-navbar";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-full relative">
      <Sidebar />

      <div className="flex flex-col overflow-x-hidden w-full relative">
        {/* <div className="absolute right-0 left-0 z-10">
          <DashboardNavbar />
        </div> */}

        {/* Contents */}
        <div className="px-7 pt-[5.7rem] pb-24 bg-white w-full h-[100vh] overflow-y-auto relative">
          {children}
        </div>
      </div>
    </div>
  );
}
