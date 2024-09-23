import { Backdrop, IconButton } from '@mui/material';
import React, { ReactNode } from 'react';
import Assets from '../../../constants/assets.constant';
import useAppTheme from '../../../hooks/theme.hook';
import { ZoomInOut } from '../Transitions/Transitions';

export const AppModal = ({
  open,
  handleClose,
  children,
  className,
  ...others
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
  handleClose?: () => void;
  [key: string]: any;
}) => {
  const handleContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <Backdrop
      open={open}
      onClick={handleClose}
      transitionDuration={500}
      sx={{
        zIndex: 999,
      }}
    >
      <ZoomInOut
        target={open}
        className='fixed h-full top-0 left-0 w-full flex justify-center items-center'
      >
        <div
          className={`bg-white w-[85%] h-fit rounded-[20px] sm:w-[500px] md:w-[711px] md:px-[28px] px-5 sm:px-[40px] flex flex-col gap-[23px] shadow-lg text-black2 justify-start items-start ${className}`}
          {...others}
          onClick={handleContentClick}
        >
          {children}
        </div>
      </ZoomInOut>
    </Backdrop>
  );
};

export const RoundedAppModal = ({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  return (
    <Backdrop
      open={open}
      transitionDuration={500}
      sx={{
        zIndex: 999,
      }}
    >
      <ZoomInOut
        target={open}
        className='fixed h-full top-0 left-0 w-full flex justify-center items-center'
      >
        <div className='bg-white w-[80%] h-fit rounded-[20px] sm:w-[500px] md:w-[711px] px-[28px] sm:px-[40px] flex flex-col gap-[23px] shadow-lg text-black2 justify-start items-start'>
          {children}
        </div>
      </ZoomInOut>
    </Backdrop>
  );
};