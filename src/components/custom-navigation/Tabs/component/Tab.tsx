'use client';

import { FC } from 'react';
import Image, { StaticImageData } from 'next/image';

// ** Third Party Components
import { ButtonBase } from '@mui/material';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface TabComponentProps {
  active: boolean;
  onClick: () => void;
  icon?: StaticImageData; // Assuming your icon is a ReactNode, you can adjust this type accordingly
  label: string;
  className: ClassNameValue;
}

const TabComponent: FC<TabComponentProps> = ({
  active,
  onClick,
  icon,
  label,
  className,
}) => {
  return (
    <ButtonBase>
      <div
        className={twMerge(
          'space-x-2 max-w-full whitespace-nowrap border-b-[2px] py-2 px-4 transform ease-in-out duration-500 delay-150 cursor-pointer flex items-center justify-center',
          className
        )}
        onClick={onClick}
        style={{
          borderColor: `${active ? '#0F1625' : 'transparent'}`,
          color: `${active ? '#232323' : '#8C8C8C'}`,
        }}
      >
        {icon && (
          <Image
            src={icon}
            alt="my image"
            width={24}
            height={24}
            style={{
              filter: `${active ? 'invert(95%) sepia(0%) saturate(847%) hue-rotate(135deg) brightness(85%) contrast(102%)' : ''}`,
            }}
          />
        )}
        <p
          className={`font-normal text-base ${active ? 'text-n900' : 'text-n500'}`}
        >
          {label}
        </p>
      </div>
    </ButtonBase>
  );
};

export default TabComponent;
