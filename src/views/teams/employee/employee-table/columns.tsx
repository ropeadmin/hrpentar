import { ColumnDef } from "@tanstack/react-table"

// ** Component
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreVertical } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmployeeType } from "@/types/employee.type";

// ** Type
// import { Post } from "@/types/types";

// const useFormBuilderDeletion = () => {
//   const [deleteForm, { isLoading, error }] = useDeleteFormMutation();

//   const handleDelete =  async (formId: string) => {
//     await deleteForm(formId)
//     .unwrap()
//     .then((res) => {
//       toast.success('Form deleted successfully')
//     })
//   };

//   return { handleDelete, isLoading, error };
// };


export const columns: ColumnDef<EmployeeType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="checkbox h-5 w-5 border rounded-md border-n300"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="checkbox h-5 w-5 border rounded-md border-n300"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Employee name",
    cell: ({ row }) => {
      const empData = row.original
      const firstname: string = empData.first_name || "--"
      const lastName: string = empData.last_name || "--"
      const email: string = empData.email || "--"


      // const image = postData.image || ""
      return (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-slate-600 rounded-full">

          </div>
          <div>
            <h3 className="text-base text-n900 font-medium">{`${firstname} ${lastName}`}</h3>
            <p className="text-sm text-n600 font-normal">{email}</p>
          </div>
        </div>
       
      )
    },
  },
  {
    id: "employee_id",
    header: "Employee ID",
    cell: ({ row }) => {
      const empData = row.original
      const emp_id = empData.employe_id || "--"
      // const image = postData.image || ""
      return <div className="">
        <p className="text-n900 text-base font-normal">{emp_id}</p>
      </div>
    },
  },
  {
    id: "title",
    header: "Job title",
    cell: ({ row }) => {
      const empData = row.original
      const emp_job_title = empData.job.title || "--"
      // const image = postData.image || ""
      return <div className="">
        <p className="text-n900 text-base font-normal">{emp_job_title}</p>
      </div>
    },
  },
  {
    id: "type",
    header: "Employment type",
    cell: ({ row }) => {
      const empData = row.original
      const emp_type = empData.job.type || "--"
      // const image = postData.image || ""
      return <div className="">
        <p className="text-n900 text-base font-normal">{emp_type}</p>
      </div>
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Onboarding progress",
    cell: ({ row }) => {
      const status = row.original.job.status === 'pending' ? 'pending' : 'active';

      return (
        <div className="dropdown dropdown-end">
          <Badge variant={status} className='text-xs font-medium capitalize'>{status}</Badge>
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    size: 20,
    minSize: 20,
    cell: ({ row }) => {
      // const id = row.original._id
      
      // const { handleDelete, isLoading } = useFormBuilderDeletion()
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="space-y-1 py-3 px-2">
              <DropdownMenuItem className="text-n600 text-base font-medium">Nudge Employee</DropdownMenuItem>
              <DropdownMenuItem className="text-n600 text-base font-medium">Review Onboarding</DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <span className="text-r800 text-base font-medium">Exit Employee</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="top-[30%]">
            <DialogHeader>
              <DialogTitle className="text-[20px] font-bold text-n900">Delete employee?</DialogTitle>
              <DialogDescription className="text-n900 text-base">
                You are about to delete Omotayo record from the list of employees. This action cannot be undone.              
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mt-4'>
              <Button variant={"outline"} className="border border-n300">Cancel</Button>
              <Button type="submit" className="bg-r800">Delete employee</Button>

              {/* <Button type="submit" className="bg-r800" onClick={() => handleDelete(id)}>Delete form</Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
]