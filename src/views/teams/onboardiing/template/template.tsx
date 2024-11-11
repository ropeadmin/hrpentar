import { useState } from 'react'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TemplateCard from './components/template-card';
import { useDeleteTemplateMutation, useGetTemplateQuery } from '@/store/features/template/templateService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import BuildTemplateModal from '../form-builder/form-table/build-template/build-template';
import { toast } from 'react-toastify';
import { useGetFormQuery } from '@/store/features/form-builder/formBuilderService';

const Template = ({template}: {template : any}) => {
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const { data: fetchTemplateData, isLoading:  isTemplateLoading } = useGetTemplateQuery()
  const [deleteTemplate, { isLoading: isDeleteLoading, error }] = useDeleteTemplateMutation();
  const { data: getForms, isLoading: isFormLoading } = useGetFormQuery()

  const handleDeleteTemplate = async (templateId: string) => {
    await deleteTemplate([templateId])
    .unwrap()
    .then((res) => {
      toast.success('Template deleted successfully')
    })
  } 

  const handleCloseTemplateDialog = () => setOpenTemplateDialog(false);

  return (
    <Dialog open={openTemplateDialog} onOpenChange={setOpenTemplateDialog}>
      <div className='flex items-center justify-between'>
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
          <Button className='mt-5 rounded-lg'>
            <Plus className="mr-2 h-5 w-5" /> Create template
          </Button>
        </DialogTrigger>
      </div>

      {/*  */}
      <div className='mt-10 flex items-center space-x-5'>
        {
          fetchTemplateData?.data.map((item, index: number) => (
            <TemplateCard id={item._id} name={item.name} handleDeleteTemplate={handleDeleteTemplate} isDeleteLoading={isDeleteLoading} key={index}  />
          ))
        }
        {/* <TemplateCard />
        <TemplateCard />
        <TemplateCard /> */}
      </div>
       {/* Build Template Modal */}
       <DialogContent className='max-w-[544px]'>
          <DialogHeader>
            <DialogTitle className="text-n900 text-2xl">Build onboarding template</DialogTitle>
            <DialogDescription className="text-n900 text-sm">
              Setup new template.
            </DialogDescription>
          </DialogHeader>
          <div className=" py-2 ">
            <BuildTemplateModal formData={getForms?.data ?? []} handleDialogClose = {handleCloseTemplateDialog} />
          </div>
        </DialogContent>
    </Dialog>
  )
}

export default Template