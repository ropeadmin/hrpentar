'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { SettingsIcon, Info, ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/ui/collapsible"
import Image from "next/image"
import Link from "next/link"
import useCompanyState from "@/hooks/companystate.hook"

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/dashboard.svg"
    },
    
  },
  {
    title: "Company",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/company.svg"
    },
  },
  {
    title: "Teams",
    url: "#",
    icon: {
      size: 40,
      path: "/icons/people.svg"
    },    subItems: [
      {
        name: "Onboarding",
        url: "/dashboard/administration",
      },
      {
        name: "Analytics",
        url: "/dashboard/leave",
      },
      {
        name: "Employee",
        url: "/dashboard/administration",
      },
      {
        name: "Department",
        url: "/dashboard/administration",
      },
      {
        name: "Managers",
        url: "/dashboard/administration",
      },
      {
        name: "Requests",
        url: "/dashboard/administration",
      }
    ],
  },
  {
    title: "Payroll",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/payroll.svg"
    },  
  },
  {
    title: "Leave",
    url: "#",
    icon: {
      size: 20,
      path: "/icons/dashboard.svg"
    },  
  },
]

const footerItems = [
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
  {
    title: "Help",
    url: "#",
    icon: Info,
  }
]
export function AppSidebar() {
  const { company } = useCompanyState();

  return (
    <Sidebar className="!bg-[#0F1625] px-4 z-[999]">
      <SidebarHeader>
        <Link
          href="/"
          className="w-full flex justify-start items-center relative  pt-4"
        >
          <Image src="/pentaHR.svg" alt="logo" width={100} height={100} />
        </Link>

        <div className="bg-[#182434] rounded-[10px] w-full px-[10px] pt-[5px] flex justify-between items-center mb-1 mt-3">
          <div className="flex gap-[7px] items-center">
            <img
              src="/icons/logomark.svg"
              alt="company-logo"
              width={36}
              height={36}
            />
            <div className="">
              <h1 className="font-[500] text-[13px] text-white">
                {company?.data?.businessName}
              </h1>
              <p className="text-[11px] font-[400] text-white">
                {company?.data?.address.city}
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
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="py-3 ">
         
            {items.map((item, index) =>(
               <Collapsible key={index} defaultOpen className="group/collapsible space-y-2">
                <SidebarMenuItem >
                  <CollapsibleTrigger asChild className="">
                    <SidebarMenuButton asChild className="pointer-events-autohover:bg-n800 data-[state=open]:hover:bg-n800 hover:bg-n800 active:bg-n800">
                      <div className="flex items-center justify-between">
                      <a href={item.url} >
                        <div className="flex items-center gap-[10px]">
                          <Image src={item.icon.path} alt="" width={30} height={item.icon.size} className="" />
                          <p
                            className={`w-full font-[400] text-sm text-white $`}
                          >
                            {item.title}
                          </p>
                        </div>
                       
                      </a>
                      {
                        item.subItems && <ChevronDown className="text-white" strokeWidth={1.5} />
                      }
                      </div>
                      
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {
                      item.subItems && item.subItems.map((subItem, index) => (
                        <SidebarMenuSub key={index}  className="py-2 hover:bg-[#182434] border-none rounded-[5px] cursor-pointer">
                          <Link href={"/dashboard/leave"}>
                            <SidebarMenuSubItem  className="text-white text-sm font-normal pl-4">{subItem.name}</SidebarMenuSubItem>
                          </Link>
                        </SidebarMenuSub>
                      ))
                    }
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton >
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

      </SidebarFooter>
    </Sidebar>
  )
}
