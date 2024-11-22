import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { FormField } from '@/components/custom-inputs/custom-inputs';
import { ArrowUpDown, ChevronDown, Download, ListFilter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define the form schema with Zod
const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  category: z.string().nonempty({ message: 'Please select a category' }),
});

// Infer the type from the schema
type FormData = z.infer<typeof FormSchema>;

export const fieldDept = [];

interface IEmployeeFilterProps {
  className: string;
}

const EmployeeFilter = ({ className }: IEmployeeFilterProps) => {
  const formMethods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const { handleSubmit } = formMethods;

  // Update the onSubmit function to use FormData type
  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center space-x-3 ">
        <div className="relative">
          <input
            type="text"
            id=""
            value={''}
            onChange={undefined}
            className="text-n500 text-sm font-medium leading-none rounded-lg bg-white border border-n300 outline-none w-[350px] pl-10 pr-4 py-[10px]"
            placeholder="Search employee name, email address..."
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="border-n300/60 text-n700 text-base rounded-lg "
              variant={'outline'}
            >
              <ListFilter size={18} className="mr-1.5 -mt-[3px]" /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="space-y-1 py-6 px-6 min-w-[660px]"
            align="start"
          >
            <FormProvider {...formMethods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-n900 text-base font-bold">Filter</h3>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="department"
                    label="Department"
                    type="select"
                    placeholder="Select department"
                    options={fieldDept}
                    required
                  />
                  <FormField
                    name="role"
                    label="Role"
                    type="select"
                    placeholder="Select role"
                    options={fieldDept}
                    required
                  />
                  <FormField
                    name="type"
                    label="Employment type"
                    type="select"
                    placeholder="Select employment type"
                    options={fieldDept}
                    required
                  />
                  <FormField
                    name="status"
                    label="Status"
                    type="select"
                    placeholder="Select status"
                    options={fieldDept}
                    required
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant={'ghost'} className="text-r800">
                    Clear filter
                  </Button>
                  <div className="space-x-3">
                    <Button variant={'outline'} className="border border-n300">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className=""
                      // onClick={() => handleDeleteTemplate(id)}
                    >
                      {' '}
                      Apply filter
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="border-n300/60 text-n700 text-base text-left rounded-lg"
              variant={'outline'}
            >
              <ArrowUpDown size={18} className="mr-1.5 -mt-[3px]" /> Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="space-y-1 py-3 px-2 min-w-[70px]"
            align="end"
          >
            <DropdownMenuItem className="text-n600 text-base font-medium text-center">
              A - Z
            </DropdownMenuItem>
            <DropdownMenuItem className="text-n600 text-base font-medium">
              Z - A
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="border-n300/60 text-n700 text-base rounded-lg"
              variant={'outline'}
            >
              <Download size={18} className="mr-1.5 -mt-[3px]" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="space-y-1 py-3 px-2 min-w-[70px]"
            align="end"
          >
            <DropdownMenuItem className="text-n600 text-base font-medium text-center">
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem className="text-n600 text-base font-medium">
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="text-n600 text-base font-medium">
              XLS
            </DropdownMenuItem>
            <DropdownMenuItem className="text-n600 text-base font-medium">
              DOC
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Action */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="text-white text-base rounded-lg">
              Actions <ChevronDown className="ml-2 text-white h-9" size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-1 py-3 px-2" align="end">
            <DropdownMenuItem className="text-n600 text-base font-medium">
              Add new employee
            </DropdownMenuItem>
            <DropdownMenuItem className="text-n600 text-base font-medium">
              Bulk upload employees
            </DropdownMenuItem>
            <DropdownMenuItem className="text-n600 text-base font-medium">
              Bulk update employees
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EmployeeFilter;
