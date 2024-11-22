import useAppTheme from "@/hooks/theme.hook";
import React from "react";
import { AppModal } from "..";
import { IconButton, MenuItem } from "@mui/material";
import MyTextField from "../../Fields/MyTextField";

export default function CacModal({
  modal,
  uploadedCacDocumentName,
  uploadedCacDocumentName2,
  uploadedCacDocument,
  uploadedCacDocument2,
  closeModal,
  root,
  rootInput,
  root2,
  rootInput2,
  isDragActive,
  isDragActive2,
  deleteCacDocumentFile,
  deleteCacDocument2File,
  handleDocuments,
  isLoadingDocument
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

  const businessEntity = ["Yes", "No"];

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

      <div className="overflow-auto mt-1.5 remove-scroll-bar w-full pt-3">
        {/* Document Stepper */}
        <div className="flex gap-5 w-full">
          {documents.map((item, i) => (
            <div
              key={i}
              className="rounded-[8px] relative p-[16px] border border-[#D0D6DD] flex justify-center items-center"
            >
              <p
                className="leading-none text-[14px] font-[500]"
                style={{ color: (uploadedCacDocumentName !== "" || uploadedCacDocumentName2 !== "") ? "#0F1625" : "#A0AEC0" }}
              >
                {item.title}
              </p>
              <div className="w-[16px] h-[16px] absolute -right-2 -top-2 rounded-full bg-[#1F2937] flex justify-center items-center"><p className="leading-none text-[12px] font-[700] text-white">{i + 1}</p></div>
            </div>
          ))}
        </div>

        {/* <div className="w-full mt-5">
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
        </div> */}

        {/* Upload Zone */}
        {uploadedCacDocumentName !== "" ? (
          <div  {...root2} className="mt-7 w-full bg-[#FBFBFC] border-[0.5px] border-dashed border-[#A0AEC0] rounded-[8px] py-[30px] flex flex-col justify-center items-center">
          <input {...rootInput2} />
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
        ) : (
          <div  {...root} className="mt-7 w-full bg-[#FBFBFC] border-[0.5px] border-dashed border-[#A0AEC0] rounded-[8px] py-[30px] flex flex-col justify-center items-center">
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
        )}
        

        {/* Uploaded Files */}
        <div className="grid grid-cols-1 gap-3 w-full mt-5">
          {uploadedCacDocumentName !== "" && (
            <div className="flex justify-between items-center w-full rounded-[8px] border border-[#D0D6DD] py-[12px] px-[16px]">
              <div className="flex items-center gap-[12px]">
                <img
                  src={
                    uploadedCacDocumentName.includes("png")
                      ? "/icons/png-icon.svg"
                      : uploadedCacDocumentName.includes("pdf")
                      ? "/icons/pdf-icon.svg"
                      : "/icons/pdf-icon.svg"
                  }
                  width={40}
                  height={40}
                />
                <p className="text-[14px] font-[500] text-[#0F1625]">
                  {uploadedCacDocumentName}
                </p>
              </div>
              <IconButton onClick={() => deleteCacDocumentFile(uploadedCacDocumentName)}>
                <img src="/icons/delete.svg" width={18} height={18} />
              </IconButton>
            </div>
          )}

          {uploadedCacDocumentName2 !== "" && (
            <div className="flex justify-between items-center w-full rounded-[8px] border border-[#D0D6DD] py-[12px] px-[16px]">
              <div className="flex items-center gap-[12px]">
                <img
                  src={
                    uploadedCacDocumentName2.includes("png")
                      ? "/icons/png-icon.svg"
                      : uploadedCacDocumentName2.includes("pdf")
                      ? "/icons/pdf-icon.svg"
                      : "/icons/pdf-icon.svg"
                  }
                  width={40}
                  height={40}
                />
                <p className="text-[14px] font-[500] text-[#0F1625]">
                  {uploadedCacDocumentName2}
                </p>
              </div>
              <IconButton onClick={() => deleteCacDocument2File(uploadedCacDocumentName2)}>
                <img src="/icons/delete.svg" width={18} height={18} />
              </IconButton>
            </div>
          )}
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
          onClick={() =>
            handleDocuments({
              type: 'cac',
              name: 'cac documents',
              description: 'desc',
              documentUrl: [uploadedCacDocument, uploadedCacDocument2],
            })
          }
        >
          {isLoadingDocument ? 'Please wait...' : 'Continue'}
        </button>
      </div>
    </AppModal>
  );
}
