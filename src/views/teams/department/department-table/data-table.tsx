import { useState } from "react"

//** Third Party */
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,

} from "@tanstack/react-table"

// ** Icons
import { ChevronLeftIcon, Search, ChevronRightIcon, MoveLeft, MoveRight } from "lucide-react"
import { IoMdArrowDropdown, IoMdFastforward } from "react-icons/io";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
// ** Component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })

  return (
    <div className="">
      {/* <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl text-n500 -mt-2">Post Engagements</h3>
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block md:w-[240px]">
            <Input
              placeholder="Search..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm h-9 border border-n500 focus-visible:ring-0"
            />
            <Search size={18} className="text-n500 absolute right-3 top-2 " />
          </div>
          <div className="dropdown dropdown-end">
            <Button variant={"outline"} className="flex items-center border border-n500 bg-transparent h-9 ">
              <span>Bulk Action</span>
              <IoMdArrowDropdown size={20} />
            </Button>
            <ul className="p-3 mt-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li className="text-left text-n500">Delete</li>
            </ul>
          </div>
        </div>
      </div> */}
      <div className="py-1 px-0 bg-white rounded-xl overflow-x-scroll w-full">
        <Table className="overflow-x-scroll">
          <TableHeader className="bg-n100/60 h-11">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-0 text-n900 text-base font-bold capitalize">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className=""
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">             
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="w-full px-4">
        <div className="flex items-center justify-between space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`text-n700 text-base font-bold ${!table.getCanPreviousPage() && "cursor-wait"}`}
          >
            <FaArrowLeftLong size={15} className="mr-2"/>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`text-n700 text-base font-bold ${!table.getCanNextPage() && "cursor-not-allowed"}`}
          >
            Next
            <FaArrowRightLong size={15} className={`ml-2`}/>
          </Button>
        </div>
      </div>
      {/* {
        data && data.length > 0 && (
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex rounded-full bg-b300 disabled:opacity-50 group disabled:bg-n100 dark:disabled:bg-n100 hover:bg-blue-700"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IoMdFastforward  className="rotate-180 h-4 w-4 text-n300 disabled:text-n500 group-disabled:text-n500/70" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 rounded-full bg-b300 disabled:bg-n100 hover:bg-blue-700 group"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4 text-n300 group-disabled:text-n500/70" /> 
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0 rounded-full bg-b300 disabled:bg-n100 hover:bg-blue-700 group"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4 text-n300 group-disabled:text-n500/70" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex rounded-full bg-b300 disabled:bg-n100 hover:bg-blue-700 group"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IoMdFastforward className="h-4 w-4 text-n300 group-disabled:text-n500/70" />
              </Button>
            </div>
            <div className="flex space-x-1 w-[100px] items-center justify-center text-sm font-medium">
              <span>Page</span> <span className="font-bold">{" "}{table.getState().pagination.pageIndex + 1}</span> <span> of </span>{" "}<p className="font-bold">{`${" "} ${table.getPageCount()}`}</p> 
            </div>
            <span className="flex items-center gap-1">
              <span className="-mt-2">.</span> Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded-md w-16 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-inset"
              />
            </span>
          </div>
        )
      } */}

    </div>
  )
}