import { Plus, Upload } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Link from 'next/link';
import Departments from '@/views/teams/department/department';

const Department = () => {
  return (
    <Dialog>
      <div className="h-full">
        <div>
          <h1 className="text-[28px] font-[700] text-[#0F1625]">Departments</h1>
          <p className="text-[14px] font-[400] text-[#323B49]">
            Manage department here.
          </p>
        </div>

        {/*  */}
        <Departments />
      </div>

      {/* Modal Content for adding Employee */}
      <DialogContent className="max-w-[568px] top-[40%]">
        <div className="w-full">
          {/*  */}
          <div className="w-full flex justify-between items-center">
            <div>
              <h4 className="text-xl text-n900 font-bold">Add employee</h4>
              <p className="text-n900 text-base font-normal">
                How would you like to add your employees
              </p>
            </div>
          </div>

          {/*  */}
          <div className="w-full mt-8 flex items-center justify-between">
            <div className="w-[242px] h-[212px] p-4 bg-n75 hover:bg-r200/60 border border-n300 hover:border-r600 rounded-lg flex items-center">
              <Link href={'/dashboard/teams/onboarding/form_builder'}>
                <div className="space-y-4">
                  <Plus
                    className="mr-2 h-11 w-11 text-n900"
                    strokeWidth={0.8}
                  />
                  <div className="space-y-1">
                    <h4 className="text-xl text-n900 font-bold">
                      Single employee
                    </h4>
                    <p className="text-n900 text-base font-normal">
                      Add individual employee by filling in their details
                      manually
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="w-[242px] h-[212px] p-4 bg-n75 hover:bg-r200/60 border border-n300 hover:border-r600 rounded-lg flex items-center">
              <Link href={''}>
                <div className="space-y-4">
                  <div className="">
                    <Upload
                      className="mr-2 h-11 w-11 text-n900"
                      strokeWidth={0.8}
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl text-n900 font-bold">Bulk upload</h4>
                    <p className="text-n900 text-base font-normal">
                      Upload bulk employees using a template file
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Department;
