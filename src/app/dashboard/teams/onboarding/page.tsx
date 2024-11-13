"use client";

import React, { useState } from 'react'
import { ButtonBase } from "@mui/material";
import Link from 'next/link';
import { FadeIn } from '@/app/components/Transitions/Transitions';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AppModal } from '@/app/components/Modals';
import FormTable from '@/views/teams/onboardiing/form-builder/form-table/form-table';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Template from '@/views/teams/onboardiing/template/template';
import { useGetFormQuery } from '@/store/features/form-builder/formBuilderService';
import { useGetTemplateQuery } from '@/store/features/template/templateService';

const tabs = [
  {
    key: "templates",
    label: "Templates",
    borderRadius: "6px",
  },
  {
    key: "formBuilder",
    label: "Form Builder",
    borderRadius: "6px",
  },
];

export default function Company() {
  const [templates, setTemplates] = useState(null);
  const [formBuilder, setFormBuilder] = useState(null);
  const [activeTab, setActiveTab] = useState("templates");
  const [openModal, setOpenModal] = useState(false);
  const [openTemplateAttentionModal, setOpenTemplateAttentionModal] = useState(false);
  const { data: getForms, isLoading: isFormLoading } = useGetFormQuery()
  const { data: fetchTemplateData, isLoading:  isTemplateLoading } = useGetTemplateQuery()

  console.log(fetchTemplateData);

  const handleTabClick = (key: React.SetStateAction<string>) => {
    setActiveTab(key);
  };

  const handleOpenFormBuilerOption = () => { 
    setOpenModal(true) 
    setOpenTemplateAttentionModal(false);
  };
  const handleClose = () => setOpenModal(false);

  const handleTemplateAttentionOpen = () => {
    setOpenTemplateAttentionModal(true);
    setOpenModal(false)
  }

  

  return (
    <div>
      <div>
        <h1 className="text-[28px] font-[700] text-[#0F1625]">Onboarding</h1>
        <p className="text-[14px] font-[400] text-[#323B49]">
          Create onboarding workflow and manage new hires.
        </p>
      </div>

      {/*  */}
      <div className="pt-5 w-full">
        <div className="flex items-center justify-between">
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

          {(templates || formBuilder) && (
            <Link
              href=""
              className="text-[14px] font-[500] leading-none text-[#EF0000] py-2 px-3 rounded-[6px] hover:bg-[#ef000007] transform transition duration-500 ease-in-out"
            >
              View all
            </Link>
          )}
        </div>

        {/* Table */}
        <div className="mt-5">
          {activeTab === "templates" && (
            <FadeIn>
              {fetchTemplateData && fetchTemplateData?.data.length > 0 ? (
                <Template template={fetchTemplateData?.data} />
              ) : (
                <div className="flex flex-col justify-center items-center text-center h-[300px] ">
                  <img src="/icons/forms.svg" alt="" width={30} />
                  <div className="mt-4">
                    <h1 className="text-[20px] font-[700] text-[#1F2937]">
                    You are yet to create a template
                    </h1>
                    <p className="text-[16px] font-[400] text-[#323B49] mt-2">
                      Setup onboarding templates for new hires.<br />
                      When you create a template it would appear here.
                    </p>
                  </div>
                  <Button className='mt-5 rounded-lg' onClick={handleTemplateAttentionOpen}>
                    <Plus className="mr-2 h-5 w-5" /> Create template
                  </Button>
                </div>
              )}
            </FadeIn>
          )}
          {activeTab === "formBuilder" && (
            <FadeIn>
              {getForms && getForms?.data?.length > 0 ? (
                <FormTable />
              ) : (
                <div className="flex flex-col justify-center items-center text-center h-[300px] ">
                  <img src="/icons/forms.svg" alt="" width={30} />
                  <div className="mt-4">
                    <h1 className="text-[20px] font-[700] text-[#1F2937]">
                      You are yet to create a form
                    </h1>
                    <p className="text-[16px] font-[400] text-[#323B49] mt-2">
                      Build forms by creating contents.<br/>
                      When you create a form it would appear here.
                    </p>
                  </div>
                  <Button className='mt-5 rounded-lg' onClick={handleOpenFormBuilerOption}>
                    <Plus className="mr-2 h-5 w-5" /> Create form
                  </Button>
                </div>
              )}
            </FadeIn>
          )}
        </div>
      </div>

      {/* Creattte Template Attention*/}
      <Dialog open={openTemplateAttentionModal} onOpenChange={setOpenTemplateAttentionModal}>
        {/* Build Template Modal */}
        <DialogContent className='max-w-[544px] top-[30%]'>
          <DialogHeader>
            <DialogTitle className="text-n900 text-2xl">Attention</DialogTitle>
            <DialogDescription className="text-n900 text-sm">
              You do not have any forms yet to create a template. Please go to form builder to create form and customize templates.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='mt-4'>
            <Button variant={"outline"} className="border border-n300">Cancel</Button>
            <Button type="submit" onClick={handleOpenFormBuilerOption}>Go to form builder</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Form Builder Option Modal */}
      <AppModal
        open={openModal}
        handleClose={handleClose}
        style={{
          background: "#FFF",
          padding: "30px",
          position: "relative",
          height: "auto",
          width: "568px",
          borderRadius: "12px",
          top: "-12%"
        }}
      >
        <div className='w-full'>
          {/*  */}
          <div className="w-full flex justify-between items-center">
            <div>
              <h4 className='text-xl text-n900 font-bold'>Create new form</h4>
              <p className='text-n900 text-base font-normal'>How would you like to build this form?</p>
            </div>
            <ButtonBase
              onClick={handleClose}
              className="rounded-full w-[32px] h-[32px]"
            >
              <div className="rounded-full w-[32px] h-[32px] bg-[#F9FAFB] flex justify-center items-center">
                <img src="/icons/close.svg" alt="Close" width={10} height={10} />
              </div>
            </ButtonBase>
          </div>

          {/*  */}
          <div className="w-full mt-8 flex items-center justify-between">
            <div className='w-[242px] h-[212px] p-4 bg-n75 hover:bg-r200/60 border border-n300 hover:border-r600 rounded-lg flex items-center'>
              <Link href={"/dashboard/teams/onboarding/form_builder"}>
                <div className='space-y-4'>
                  <Plus className="mr-2 h-11 w-11 text-n900" strokeWidth={0.8} />
                  <div className='space-y-1'>
                    <h4 className='text-xl text-n900 font-bold'>Create from scratch</h4>
                    <p className='text-n900 text-base font-normal'>Build form and questions manually</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className='w-[242px] h-[212px] p-4 bg-n75 hover:bg-r200/60 border border-n300 hover:border-r600 rounded-lg flex items-center'>
              <Link href={""}>
                <div className='space-y-4'>
                  <div className="">
                    <img src="/icons/import-form.svg" alt="import form" width={40} height={40} />
                  </div>
                  <div className='space-y-1'>
                    <h4 className='text-xl text-n900 font-bold'>Import form</h4>
                    <p className='text-n900 text-base font-normal'>Paste questions or import Google Form</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </AppModal>
    </div>
  )
}
