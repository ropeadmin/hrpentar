'use-client'

import { useState } from "react";
import { Check } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react';
import { DataTable } from './table/data-table';
import { columns } from './table/columns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import BuildTemplateModal from "./build-template/build-template";
import ShareTemplate from "./share-template/share-template";
import { useGetFormQuery } from "@/store/features/form-builder/formBuilderService";
import Link from "next/link";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const FormTable = () => {
  const [openDialog, setOpenDialog] = useState(false);
	const [openAlert, setOpenAlert] = useState(false);
	const [openShareTemplate, setOpenShareTemplate] = useState(false);
  const { data: getForms, isLoading: isFormLoading } = useGetFormQuery()

  console.log(getForms, "My Forms");

  const handleDialogClose = () => {
    setOpenAlert(true); // Show AlertDialog before actually closing the Dialog
    setOpenDialog(false);
  };

  const handleShareTemplatesOpen = () => {
    setOpenAlert(false);
    setOpenShareTemplate(true)
  }

  const confirmClose = () => {
    setOpenDialog(false);
    setOpenAlert(false); // Close both after confirming
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <div className='flex items-center justify-between'>
          {/* Header Component */}
          <div className='flex items-center'>
            {/* search and status */}
            <div className='flex items-center space-x-4'>
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  id=""
                  value={""}
                  onChange={undefined}
                  className="text-n500 text-sm font-medium leading-none rounded-lg bg-white border border-n300 outline-none w-[350px] pl-10 pr-4 py-[10px]"
                  placeholder="Search form"
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
              {/* status */}
              <Select>
                <SelectTrigger className="w-[101px] border-n300 text-n700">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Active</SelectItem>
                  <SelectItem value="dark">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* butttons */}
          </div>

          <div className='flex items-center space-x-3'>
            <DialogTrigger>
              <Button variant="outline" className='border border-n900'>Build template</Button>
            </DialogTrigger>
            <Button asChild>
              <Link href="/dashboard/leave/create-form">
                <Plus className='mr-2' /> Create form
              </Link>
            </Button>
          </div> 
        </div>

        {/* table */}
        <div className="mt-6">
          <DataTable columns={columns} data={getForms?.data ?? []} />
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
            <BuildTemplateModal formData={getForms! ?? null} handleDialogClose = {handleDialogClose} wait={wait}/>
          </div>
        </DialogContent>
      </Dialog>

      {/* open confirmation */}
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent className="flex flex-col items-center">
          <AlertDialogHeader>
            <div className="w-[60px] h-[60px] rounded-full bg-g700 mx-auto flex items-center justify-center mb-4">
              <Check size={30} strokeWidth={2.5} className="text-white" />
            </div>
            <AlertDialogTitle className="text-center text-2xl text-n900 font-bold">Template created successfully</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base text-n900">
              <span className="font-bold">Full Time Employee</span> has been added as a template. You can  add employees to this templates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-x-3">
            <AlertDialogCancel className="border border-n300 px-7">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleShareTemplatesOpen}>Share template</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Share Template */}
      <Dialog open={openShareTemplate} onOpenChange={setOpenShareTemplate}>
        {/* Build Template Modal */}
        <DialogContent className='max-w-[544px]'>
          <DialogHeader>
            <DialogTitle className="text-n900 text-2xl">Share template</DialogTitle>
            <DialogDescription className="text-n900 text-sm">
              Manage the employees that can access this document.
            </DialogDescription>
          </DialogHeader>
          <div className=" py-2 ">
            <ShareTemplate />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default FormTable