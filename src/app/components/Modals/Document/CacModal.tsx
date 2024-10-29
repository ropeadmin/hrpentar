import useAppTheme from "@/hooks/theme.hook";
import React from "react";
import { AppModal } from "..";
import { IconButton, MenuItem } from "@mui/material";
import MyTextField from "../../Fields/MyTextField";

export default function CacModal({ modal, closeModal }: any) {
  const { isMobile } = useAppTheme();

  const documents = [
    {
      title: "Certificate of incorporation",
      completed: true,
    },
    {
      title: "Memorandum & Article of Association",
      completed: false,
    },
  ];

  const businessEntity = ["Yes", "No"];

  const uploadedFiles = [
    {
      name: "Certificate of incorporation _001.pdf",
      size: "256",
      icon: "/icons/pdf-icon.svg",
    },
    {
      name: "Memorandum & Article of Association",
      size: "125",
      icon: "/icons/pdf-icon.svg",
    },
  ];

  return (
    <AppModal
      open={modal}
      handleClose={closeModal}
      style={{
        backgroundColor: "#ffffff",
        padding: `${isMobile ? "20px 20px" : "20px 20px"}`,
        position: "relative",
        maxHeight: `${isMobile ? "auto" : "90vh"}`,
        minHeight: `${isMobile ? "auto" : "auto"}`,
        height: `${isMobile ? "auto" : "auto"}`,
        width: `${isMobile ? "85%" : "546px"}`,
      }}
    >
      <div className="flex justify-between items-start w-full">
        <div className="">
          <h1 className="text-[#0F1625] text-[4.5vw] sm:text-[24px] font-[700]">
            CAC document upload
          </h1>
          <p className="text-[#0F1625] text-[3.5vw] sm:text-[14px] font-[400]">
            Upload the documents below for verification
          </p>
        </div>

        <div
          className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]"
          onClick={closeModal}
        >
          <IconButton>
            <img src="/icons/cancelModal.svg" width={10} height={10} />
          </IconButton>
        </div>
      </div>

      <div className="overflow-auto mt-1.5 remove-scroll-bar w-full">
        {/* Document Stepper */}
        <div className="flex gap-5 w-full">
          {documents.map((item, i) => (
            <div key={i} className="rounded-[8px] p-[16px] border border-[#D0D6DD] flex justify-center items-center">
              <p
                className="leading-none text-[14px] font-[500]"
                style={{ color: item.completed ? "#0F1625" : "#A0AEC0" }}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full mt-5">
          <MyTextField
            id="businessEntity"
            name="businessEntity"
            label="Is your business a non-Nigerian Entity?"
            placeholder=""
            type="text"
            value={""}
            onChange={undefined}
            select
            required
          >
            {businessEntity.map((businessEntity, i) => (
              <MenuItem key={i} value={businessEntity}>
                {businessEntity}
              </MenuItem>
            ))}
          </MyTextField>
        </div>

        {/* Upload Zone */}
        <div className="mt-7 w-full bg-[#FBFBFC] border-[0.5px] border-dashed border-[#A0AEC0] rounded-[8px] py-[30px] flex flex-col justify-center items-center">
          
        </div>

        {/* Uploaded Files */}
        <div className="grid grid-cols-1 gap-3 w-full mt-5">
          {uploadedFiles.map((file, i) => (
            <div key={i} className="flex justify-between items-center w-full rounded-[8px] border border-[#D0D6DD] py-[12px] px-[16px]">
              <div className="flex items-center gap-[12px]">
                <img src={file.icon} width={40} height={40} />
                <p className="text-[14px] font-[500] text-[#0F1625]">
                  {file.name} ({file.size})
                </p>
              </div>
              <IconButton>
                <img src="/icons/delete.svg" width={18} height={18} />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 mt-3 w-full">
        <button
          type="button"
          className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="text-white bg-[#0f1625] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
        >
          Continue
        </button>
      </div>
    </AppModal>
  );
}
