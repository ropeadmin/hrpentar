import { ALLOWED_IMAGE_UPLOAD_FORMATS } from '@/constants/index.constant';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { getFileMetadata } from '../helpers/upload.helper';

const useImageUploaderService = () => {
  const formRef = useRef<any>();
  const fileInput = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();

  const [currentlyAttachedPhoto, setCurrentlyAttachedPhoto] = useState<any>({ preview: '' });
  const handleCropperModalClose = () => {
    setCurrentlyAttachedPhoto({ preview: '' });
  };

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    if (!ALLOWED_IMAGE_UPLOAD_FORMATS.includes(file?.type))
      return enqueueSnackbar('Allowed formats include .jpeg, .png', {
        error: true,
      });
    const preview = await getFileMetadata(file);
    const attachment = Object.assign(file, {
      preview,
    });

    setCurrentlyAttachedPhoto(attachment);
    resetFileInputForm();
  };

  const resetFileInputForm = () => {
    formRef.current.reset();
  };
  const attachPhoto = () => {
    fileInput.current.click();
  };

  return {
    formRef,
    fileInput,
    currentlyAttachedPhoto,
    handleCropperModalClose,
    handleFileChange,
    resetFileInputForm,
    attachPhoto,
  };
};

export default useImageUploaderService;
