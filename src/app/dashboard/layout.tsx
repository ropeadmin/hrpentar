import { cookies } from "next/headers"
import { AppSidebar } from "@/layouts/app-sidebar/app-sidebar";
import DashboardNavbar from "@/layouts/navbar/dashboard-navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (

    <>
      <SidebarProvider defaultOpen={defaultOpen} className="flex w-full h-full relative">
        <AppSidebar />
        <div className="absolute right-0 left-0 z-10">
          <DashboardNavbar />
        </div>
        <main className="px-7 pt-[5.7rem] pb-24 bg-white w-full h-[100vh] overflow-y-auto">
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>

    {/* <div className="flex w-full h-full">
      <Sidebar />

      <div className="flex flex-col overflow-x-hidden w-full relative">
        <div className="absolute right-0 left-0 z-10">
          <DashboardNavbar />
        </div>

        <div className="px-7 pt-[5.7rem] pb-24 bg-white w-full h-[100vh] overflow-y-auto">{children}</div>
      </div>
    </div> */}
    </>

  );
}