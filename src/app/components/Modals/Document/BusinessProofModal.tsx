import useAppTheme from "@/hooks/theme.hook";
import React from "react";
import { AppModal } from "..";
import { IconButton, MenuItem } from "@mui/material";
import MyTextField from "../../Fields/MyTextField";

export default function BusinessProofModal({
  modal,
  closeModal,
  uploadedBusinessDocumentName,
  uploadedBusinessDocument,
  root,
  rootInput,
  isDragActive,
  deleteBusinessDocumentFile,
  handleDocuments,
  isLoadingDocument,
}: any) {
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

  const businessProof = ["Utility bill"];

  const uploadedFiles = [
    {
      name: "Utility bill_002.pdf",
      size: "256",
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
            Business address proof
          </h1>
          <p className="text-[#0F1625] text-[3.5vw] sm:text-[14px] font-[400]">
            Select any of the option below for verification
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

      <div className="overflow-auto remove-scroll-bar w-full">
        {/* <div className="w-full">
          <MyTextField
            id="businessProof"
            name="businessProof"
            label="Select proof of address"
            placeholder=""
            type="text"
            value={""}
            onChange={undefined}
            select
            required
          >
            {businessProof.map((businessProof, i) => (
              <MenuItem key={i} value={businessProof}>
                {businessProof}
              </MenuItem>
            ))}
          </MyTextField>
        </div> */}

        {/* Upload Zone */}
        <div
          {...root}
          className="mt-7 w-full bg-[#FBFBFC] border-[0.5px] border-dashed border-[#A0AEC0] rounded-[8px] py-[30px] flex flex-col justify-center items-center"
        >
          <input {...rootInput} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
          >
            <path
              d="M11.4993 1.00016L11.4993 14.3335M11.4993 1.00016C10.5657 1.00016 8.82139 3.65923 8.16602 4.3335M11.4993 1.00016C12.433 1.00016 14.1773 3.65923 14.8327 4.3335"
              stroke="#0F1625"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22.1663 17C22.1663 20.3093 21.4757 21 18.1663 21H4.83301C1.52367 21 0.833008 20.3093 0.833008 17"
              stroke="#0F1625"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="text-[14px] font-[400] text-[#0F1625] mt-3">
            <span className="font-[700] text-[#EF0000]">Click to upload</span>{" "}
            or drag and drop image.
          </p>
          <p className="text-[12px] font-[400] text-[#323B49]">
            SVG, PNG, JPG (max. 800 x 400px)
          </p>
        </div>

        {/* Uploaded Files */}
        {uploadedBusinessDocument && (
          <div className="flex justify-between items-center w-full rounded-[8px] border border-[#D0D6DD] py-[12px] px-[16px] mt-5">
            <div className="flex items-center gap-[12px]">
              <img
                src={
                  uploadedBusinessDocumentName.includes("png")
                    ? "/icons/png-icon.svg"
                    : uploadedBusinessDocumentName.includes("pdf")
                    ? "/icons/pdf-icon.svg"
                    : "/icons/pdf-icon.svg"
                }
                width={40}
                height={40}
              />
              <p className="text-[14px] font-[500] text-[#0F1625]">
                {uploadedBusinessDocumentName}
              </p>
            </div>
            <IconButton
              onClick={() =>
                deleteBusinessDocumentFile(uploadedBusinessDocumentName)
              }
            >
              <img src="/icons/delete.svg" width={18} height={18} />
            </IconButton>
          </div>
        )}
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
          onClick={() =>
            handleDocuments({
              type: "business-proof",
              name: "Business Proof",
              description: "desc",
              documentUrl: [uploadedBusinessDocument],
            })
          }
        >
          {isLoadingDocument ? "Please wait..." : "Upload document"}
        </button>
      </div>
    </AppModal>
  );
}
