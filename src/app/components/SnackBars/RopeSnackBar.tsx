import Assets from '@/constants/assets.constant';
import Image from 'next/image';
import { CustomContentProps, SnackbarContent } from 'notistack';
import { forwardRef } from 'react';

interface RopeSuccessSnackBarProps extends CustomContentProps {
  allowDownload: boolean;
  error: boolean;
  info: boolean;
}

const RopeSnackBar = forwardRef<HTMLDivElement, RopeSuccessSnackBarProps>(
  (props, ref) => {
    const {
      // You have access to notistack props and options 👇🏼
      // id,
      message,
      // as well as your own custom props 👇🏼
      // allowDownload,
      error,
      info,
      // ...other
    } = props;

    return (
      <SnackbarContent ref={ref} role='alert'>
        <div className='snackbars_success bg-white h-[119px] w-[468px] rounded-[16px] mt-[10px]'>
          <div className='relative flex items-center w-full h-full gap-[20px] px-[20px]'>
            <div className=''>
              <Image src='/pentaHR-logo-mark.svg' alt='' width={50} height={50} />
            </div>

            <div className='flex flex-col gap-[4px]'>
              <span className='font-[600] text-odi'>PentaHR</span>
              <span className='max-xs:text-[3.6vw] text-odi-lite text-base font-normal'>
                {message}
              </span>
            </div>

            <Image
              className='absolute -top-[20px] sm:-top-[14px] right-12 w-[70px] h-[70px]'
              src={
                info
                  ? Assets.InfoIcon
                  : error
                    ? Assets.SnackBarFail
                    : Assets.SnackBarSuccess
              }
              alt={error ? 'failure' : 'success'}
              width={70}
              height={70}
            />
          </div>
        </div>
      </SnackbarContent>
    );
  },
);

RopeSnackBar.displayName = 'RopeSnackbar';

export default RopeSnackBar;
