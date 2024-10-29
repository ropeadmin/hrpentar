'use client'

import Image from 'next/image';
import { ButtonHTMLAttributes, ChangeEvent, useRef } from 'react'

// ** Assets
// import { Assets } from '@/assets'

// ** Icon
import { RiDeleteBin6Line } from "react-icons/ri";

// ** Component
// import { Progress } from "@/components/ui/progress"


// ** Utils
import { cn } from '@/lib/utils';

type ImageUploadProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  files?: any[] | null;
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileDelete?: () => void;
  uploading?: boolean;
  error?: string | null;
  progressReading?: number;
  progressStatus?:  "idle" | "started" | "completed"
};


const ImageUpload = ({
  files,
  className,
  onFileChange,
  onFileDelete,
  progressReading,
  progressStatus,
  error,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  

  return (
    <div className={cn('border-[0.5px] border-dashed border-n400 rounded-lg bg-n50 relative', className)}>
     
      {files && files.length > 0   && (
          <div className='absolute -top-4 -right-4'>
            <div className='w-[34.4px] h-[34.4px] flex items-center justify-center rounded-full bg-r200 cursor-pointer' onClick={onFileDelete}>
              <RiDeleteBin6Line color="#B60101" size={20} />
            </div>
          </div>
        )}


      {
        files && files.length <= 0 ? (
          <div className='h-[188px] w-full flex items-center justify-center cursor-pointer'>
            <label className="w-full flex  flex-col items-center justify-center space-y-2">
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
              <p className="text-[14px] font-[400] text-[#0F1625] pt-4">
                <span className="font-[700] text-[#EF0000]">Click to upload</span>{" "}
                or drag and drop image.
              </p>
              <p className="text-[12px] font-[400] text-[#323B49]">
                SVG, PNG, JPG (max. 800 x 400px)
              </p>
            </label>
          </div>
        ) :  progressStatus === "started" ?  ( 
          <div className=' flex  flex-col items-center justify-center py-14 px-8'>
            {/* <Progress value={progressReading} className="w-[100%]"  /> */}
            <h3 className='mt-4 text-n800 text-sm font-normal'>Please wait ({progressReading}%)...</h3>
          </div>
        ) : progressStatus === "completed" && (
          <div className=''>
            {
              files && files.map((file: { name: string, size: number}, index: any) => (
                <div className="pt-4 pb-10 px-4" key={index}>
                  <div className="flex justify-between ">
                    <div className='flex items-center space-x-3'>
                      <div className="flex items-center justify-center w-[38.29px] h-[38.29px] rounded-full">
                        {/* <Image 
                          src={Assets.filePrimary}
                          alt='image'
                          height={100}
                          width={100}
                          className=' w-auto'
                        />  */}
                      </div>

                      <div className="">
                        {/* file name  */}
                        <h3 className='text-n700 caption-one capitalize'>{file.name}</h3>
                        {/* file size */}
                        <p className='text-n500 text-sm font-normal'>
                          {file.size < 1024
                            ? `(${Math.round(file.size)} KB)`
                            : `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                          }   
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default ImageUpload