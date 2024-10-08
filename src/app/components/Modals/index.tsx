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
          className={`bg-white w-[85%] h-fit rounded-[12px] sm:w-[500px] md:w-[711px] md:px-[28px] px-5 sm:px-[40px] flex flex-col gap-[23px] shadow-lg text-black2 justify-start items-start ${className}`}
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

export const TitleAppModal = ({
  open,
  children,
  title,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  [key: string]: any;
}) => {
  return (
    <AppModal
      open={open}
      sx={{
        zIndex: 999,
      }}
    >
      <div className='w-full'>
        <div className='flex justify-between items-center sm:h-[66px] w-full sm:mt-[20px]'>
          <IconButton onClick={onClose}>
            <img src='/icons.close-icon.svg' alt='close' />
          </IconButton>
          <span className='sm:text-[20px] text-[4vw] font-[700]'>{title}</span>
          <span className='w-[50px]'>
            {/* <IconButton>
                <img src={Assets.TrashIcon} alt="close" />
              </IconButton> */}
          </span>
        </div>

        <div className='AppModal__grad' />
      </div>
      <div className='w-full'>
        {children}
        <div className='h-[30px]' />
      </div>
    </AppModal>
  );
};