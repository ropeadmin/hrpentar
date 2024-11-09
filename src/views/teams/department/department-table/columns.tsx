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
import { FormDataTableType } from "@/store/features/form-builder/type";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDeleteFormMutation } from "@/store/features/form-builder/formBuilderService";
import { toast } from "react-toastify";
import { DepartmentType } from "@/types/dept.type";

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


export const columns: ColumnDef<DepartmentType>[] = [
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
    header: "Department name",
    cell: ({ row }) => {
      const deptData = row.original
      const name: string = deptData.name || "--"
      // const image = postData.image || ""
      return <div className="flex items-center space-x-4">
        <p className="text-n900 text-base font-normal">{name}</p>
      </div>
    },
  },
  {
    id: "head_of_dept",
    accessorKey: "head_of_dept",
    header: "Head of department",
    cell: ({ row }) => {
      const deptData = row.original
      const head_of_dept = deptData.head_of_dept || "--"
      // const image = postData.image || ""
      return <div className="flex items-center space-x-4">
        <p className="text-n900 text-base font-normal">{head_of_dept}</p>
      </div>
    },
  },
  {
    accessorKey: "teams_count",
    header: "Team",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("teams_count")}</div>
    ),
  },
  {
    accessorKey: "members_count",
    header: "Members",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("members_count")}</div>
    ),
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status === 'pending' ? 'pending' : 'active';

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
            <DropdownMenuContent>
              <DropdownMenuItem className="text-n600 text-base font-medium">Edit form</DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <span className="text-r800 text-base font-medium">Delete form</span>
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="top-[30%]">
            <DialogHeader>
              <DialogTitle className="text-[20px] font-bold text-n900">Delete form?</DialogTitle>
              <DialogDescription className="text-n900 text-base">
                You are about to delete Employee Information Form. Once deleted, users assigned to this form may lose their onboarding process.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='mt-4'>
              <Button variant={"outline"} className="border border-n300">Cancel</Button>
              <Button type="submit" className="bg-r800">Delete form</Button>

              {/* <Button type="submit" className="bg-r800" onClick={() => handleDelete(id)}>Delete form</Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    },
  },
]