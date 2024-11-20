'use client'

import { ButtonBase } from "@mui/material";
import { useState } from "react";
import { DataTable } from "./employee-table/data-table";
import { columns } from "./employee-table/columns";
import { Button } from '@/components/ui/button'
import EmptyState from '@/components/ui/empty-state'
import { Plus, Upload } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'
import EmployeeFilter from "./filter-table/filter";
import { emp_data } from "@/utils/dummy";

const tabs = [
  {
    key: "all",
    label: "All",
    borderRadius: "6px",
  },
  {
    key: "newHires",
    label: "New Hires",
    borderRadius: "6px",
  },
  {
    key: "employees",
    label: "Employees",
    borderRadius: "6px",
  },
  {
    key: "exits",
    label: "Exits",
    borderRadius: "6px",
  },
];

const Employees = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [data, setData] = useState([]);


  const handleTabClick = (key: React.SetStateAction<string>) => {
    setActiveTab(key);
  };

  return (
    <Dialog>
      <div className="pt-5 w-full h-full">
        {
          data && data.length > 0 ? (
            <div className="">
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

              {/* Table */}
              <div className="mt-5">
                {activeTab === "all" && (
                  <>
                    <EmployeeFilter className="mb-8 mt-4" />
                    <DataTable columns={columns} data={data}/>
                  </>
                )}

                {activeTab === "newHires" && (
                  <DataTable columns={columns} data={[]}/>
                )}

                {activeTab === "employees" && (
                  <DataTable columns={columns} data={[]}/>
                )}

                {activeTab === "exits" && (
                  <DataTable columns={columns} data={[]}/>
                )}
              </div>
            </div>
          ) : (
            <>
              {/*  */}
              <div className="h-full flex items-center justify-center">
                <EmptyState
                  imgPath='/icons/employees.svg'
                  title='You have no employees'
                  description='When you add your employees it would appear here.'
                  className='-mt-80'
                >
                  <DialogTrigger asChild>
                    <Button className='mt-5 rounded-lg'>
                      <Plus className="mr-2 h-5 w-5" /> Add Employee
                    </Button>
                  </DialogTrigger>
                </EmptyState>
              </div>

              {/* Modal Content for adding Employee */}
              <DialogContent className='max-w-[568px] top-[40%]'>
                <div className='w-full'>
                  {/*  */}
                  <div className="w-full flex justify-between items-center">
                    <div>
                      <h4 className='text-xl text-n900 font-bold'>Add employee</h4>
                      <p className='text-n900 text-base font-normal'>How would you like to add your employees</p>
                    </div>
                  </div>

                  {/*  */}
                  <div className="w-full mt-8 flex items-center justify-between">
                    <div className='w-[242px] h-[212px] p-4 bg-n75 hover:bg-r200/60 border border-n300 hover:border-r600 rounded-lg flex items-center'>
                      <Link href={"/dashboard/teams/onboarding/form_builder"}>
                        <div className='space-y-4'>
                          <Plus className="mr-2 h-11 w-11 text-n900" strokeWidth={0.8} />
                          <div className='space-y-1'>
                            <h4 className='text-xl text-n900 font-bold'>Single employee</h4>
                            <p className='text-n900 text-base font-normal'>Add individual employee by filling in their details manually</p>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className='w-[242px] h-[212px] p-4 bg-n75 hover:bg-r200/60 border border-n300 hover:border-r600 rounded-lg flex items-center'>
                      <Link href={""}>
                        <div className='space-y-4'>
                          <div className="">
                            <Upload className="mr-2 h-11 w-11 text-n900" strokeWidth={0.8} />
                          </div>
                          <div className='space-y-1'>
                            <h4 className='text-xl text-n900 font-bold'>Bulk upload</h4>
                            <p className='text-n900 text-base font-normal'>Upload bulk employees using a template file</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </>
          )
        }
      </div>
    </Dialog>
  )
}

export default Employees