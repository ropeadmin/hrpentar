"use client"
import Assets from '@/constants/assets.constant';
import useImageUploaderService from '@/services/imageuploader.service';
import { MenuItem } from '@mui/material';
import Image from 'next/image';
import { AppImageCropperFC } from '../AppImageCropper/AppImageCropper';


const GalleryUploader = ({
  setPhoto,
  handlePictureModalSave,
  uploadingPersonaAvatar,
}: {
  setPhoto?: any;
  handlePictureModalSave: any;
  uploadingPersonaAvatar: any;
}) => {
  const {
    formRef,
    fileInput,
    currentlyAttachedPhoto,
    handleCropperModalClose,
    handleFileChange,
    resetFileInputForm,
    attachPhoto,
  } = useImageUploaderService();

  return (
    <>
      <div className=''>
        <form ref={formRef} className=''>
          <MenuItemItem
            onClick={attachPhoto}
            icon={Assets.chooseFromGallery}
            title='Gallery'
          />

          <input
            type='file'
            name='profilePhoto'
            id='profilePhoto'
            className='hidden'
            accept='image/*'
            ref={fileInput}
            onChange={handleFileChange}
          />
        </form>
      </div>

      <AppImageCropperFC
        file={currentlyAttachedPhoto}
        setPhoto={setPhoto}
        open={!!currentlyAttachedPhoto?.name}
        onClose={handleCropperModalClose}
        handlePictureModalSave={handlePictureModalSave}
        uploadingPersonaAvatar={uploadingPersonaAvatar}
      />
    </>
  );
};

export default GalleryUploader;

export const MenuItemItem = ({
  onClick,
  icon,
  title,
  color,
}: {
  icon: any;
  title: string;
  onClick: any;
  color?: string;
  [key: string]: any;
}) => {
  return (
    <MenuItem sx={{ borderRadius: '10px' }} onClick={onClick}>
      <div className='w-full h-[31px] flex justify-start items-center gap-[8px]'>
      <Image src={icon} alt='' width={20} height={20} />

        <span className={'font-[500] text-sm text-black2'} style={{ color }}>
          {title}
        </span>
      </div>
    </MenuItem>
  );
};
