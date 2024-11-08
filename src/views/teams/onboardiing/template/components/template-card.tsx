import { Ellipsis } from 'lucide-react'
import { HiOutlineUsers } from "react-icons/hi2";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2 } from "lucide-react"

interface ITemplateCardProps {
  id: string;
  name: string;
  handleDeleteTemplate: (templateId: string) => Promise<void>;
  isDeleteLoading: boolean;
}

const TemplateCard = ({id, name, handleDeleteTemplate, isDeleteLoading}: ITemplateCardProps) => {
  return (
    <Dialog>
      <div className='border border-n300 h-[216px] w-[260px] p-4 rounded-lg'>
        <div className='w-full h-[122px] bg-n100 rounded-md relative flex items-end justify-center'>
          <RadioGroup defaultValue="option-two" className='absolute top-3 right-3'>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="option-one" className="border border-n400" />
            </div>
          </RadioGroup>

          <div className='w-[140px] space-y-2 h-[100px] relative  rounded-t-[5px] bg-white px-5 py-[23px]'>
              <div className='h-[10px] bg-n100 w-full'></div>
              <div className='h-[10px] bg-n100 w-full'></div>
              <div className='h-[10px] bg-n100 w-[45%]'></div>

          </div>
        </div>

        <div className='mt-3'>
          <div className='flex items-center justify-between'>
            <h3 className='text-n900 text-base font-bold'>{name}</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 ">
                  <span className="sr-only">Open menu</span>
                  <Ellipsis className='text-n900' size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-3">
                <DropdownMenuItem className="text-n600 text-base font-medium">View template</DropdownMenuItem>
                <DropdownMenuItem className="text-n600 text-base font-medium">Share template</DropdownMenuItem>
                <DropdownMenuItem className="text-n600 text-base font-medium">Edit template</DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <span className="text-r800 text-base font-medium">Delete</span>
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-2 mt-1.5">
            <HiOutlineUsers strokeWidth={2} />
            <h3 className='text-sm text-n600 font-normal'>Not Shared </h3>
            {/* <Badge className='text-n600 text-xs font-bold bg-n100'>12 users</Badge> */}
          </div>
        </div>
      </div>
      <DialogContent className='top-[30%]'>
        <DialogHeader>
          <DialogTitle className="text-[20px] font-bold text-n900">Delete template?</DialogTitle>
          <DialogDescription className="text-n900 text-base">
            You are about to delete Employee Information Form. Once deleted, users assigned to this form may lose their onboarding process.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-4'>
          <Button variant={"outline"} className="border border-n300">Cancel</Button>
          <Button 
            type="submit" 
            className="bg-r800" 
            onClick={() => handleDeleteTemplate(id)}
            > { isDeleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> } Delete template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TemplateCard