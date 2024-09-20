import DashboardNavbar from "../components/Navbar/DashboardNavbar";
import Sidebar from "../components/Sidebar/Sidebar";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <Sidebar />

      <div className="flex flex-col overflow-x-hidden w-full relative">
        <div className="absolute right-0 left-0 z-10">
          <DashboardNavbar />
        </div>

        {/* Contents */}
        <div className="px-7 pt-[5.7rem] pb-24 bg-white w-full h-[100vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}