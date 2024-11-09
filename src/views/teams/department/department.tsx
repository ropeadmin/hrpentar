'use client'

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateDepartment from './create-department/create-department';
import { DepartmentType } from '@/types/dept.type';
import { DataTable } from './department-table/data-table';
import { columns } from './department-table/columns';

const data: DepartmentType[] = [
  {
    _id: "m5gr84i9",
    name: "Finance",
    head_of_dept: "Paul Umar",
    members_count: 5,
    teams_count: 36,
    status: "active",
  },
  {
    _id: "3u1reuv4",
    name: "Finance",
    head_of_dept: "Paul Umar",
    members_count: 5,
    teams_count: 36,
    status: "active",
  },
  {
    _id: "derv1ws0",
    name: "Finance",
    head_of_dept: "Paul Umar",
    members_count: 5,
    teams_count: 36,
    status: "active",
  },
  {
    _id: "5kma53ae",
    name: "Finance",
    head_of_dept: "Paul Umar",
    members_count: 5,
    teams_count: 36,
    status: "active",
  },
  {
    _id: "bhqecj4p",
    name: "Finance",
    head_of_dept: "Paul Umar",
    members_count: 5,
    teams_count: 36,
    status: "active",
  },
]
 

const Departments = () => {
  return (
    <Dialog>
      <div className='flex items-center justify-between mb-6 mt-8'>
        {/* Header Component */}
        <div className="relative">
          <input
            type="text"
            id=""
            value={""}
            onChange={undefined}
            className="text-n500 text-sm font-medium leading-none rounded-lg bg-white border border-n300 outline-none w-[350px] pl-10 pr-4 py-[10px]"
            placeholder="Search template"
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
        {/* butttons */}
        <DialogTrigger>
          <Button className=' rounded-lg'>
            <Plus className="mr-2 h-5 w-5" /> Create template
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create department</DialogTitle>
        </DialogHeader>
        {/* Form */}
        <CreateDepartment />
      </DialogContent>

      {/*  */}
      <DataTable columns={columns} data={data}/>
    </Dialog>
  )
}

export default Departments