import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react'

interface IEmptyStateProps {
  title: string;
  description: string;
  children: ReactNode;
  imgPath: string;
  className?: string;
}

const EmptyState = ({title, description, children, imgPath, className} : IEmptyStateProps) => {
  return (
    <div className={cn("flex flex-col justify-center items-center text-center", className)}>
      <Image src={imgPath} alt="" width={30} height={30} />
      <div className="mt-4">
        <h1 className="text-[20px] font-[700] text-[#1F2937]">
          {title}
        </h1>
        <p className="text-[16px] font-[400] text-[#323B49] mt-2">
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}

export default EmptyState