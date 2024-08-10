"use client"
import Assets from '@/constants/assets.constant';
import { getFileFromBase64 } from '@/helpers/upload.helper';
import useAppTheme from '@/hooks/theme.hook';
import { Slider } from '@mui/material';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { TitleAppModal } from '../Modals';


interface AppImageCropperProps {
  file: any;
  setPhoto: any;
  handlePictureModalSave: any;
  open: boolean;
  onClose: () => void;
  uploadingPersonaAvatar: any;
}

export function AppImageCropperFC({
  file,
  onClose,
  open,
  setPhoto,
  handlePictureModalSave,
  uploadingPersonaAvatar,
}: AppImageCropperProps) {
  const [slideValue, setSlideValue] = useState<any>(10);
  const editorRef = useRef<any>();
  const [oldPreview, setOldPreview] = useState<any>();
  const [imageFile, setImageFile] = useState(file);

  // Ensure that the `AvatarEditor` is ready before calling `onCrop`
  const isEditorReady = useRef(false);

  const onCrop = () => {
    if (!isEditorReady.current) {
      return;
    }

    const canvas = editorRef.current.getImage();
    const preview = canvas.toDataURL();
    setImageFile((file: any) => ({
      ...file,
      preview: preview || file?.preview,
    }));
  };

  useEffect(() => {
    if (open) {
      setOldPreview(() =>
        file && file.preview ? file.preview : Assets.NoUserImage,
      );
      setImageFile(file);
      onCrop();
    }
  }, [open, file]);

  // Use this callback to signal that the `AvatarEditor` is ready
  const handleEditorLoad = () => {
    isEditorReady.current = true;
    onCrop();
  };

  const handleSave = async () => {
    const preview = imageFile?.preview;
    const imgFile = await getFileFromBase64(preview as string);
    const croppedImgFile = Object.assign(imgFile, {
      preview,
    });

    handlePictureModalSave(croppedImgFile);
  };

  return (
    <>
      <TitleAppModal title='Crop Photo' open={open} onClose={onClose}>
        <div className='w-full overflow-hidden'>
          <div className='flex justify-evenly items-center w-full'>
            <div className='w-fit h-fit overflow-hidden rounded-xl space-y-3 pb-3 avater-container flex flex-col justify-center items-center'>
              {useMemo(
                () => (
                  <AvatarEditor
                    ref={editorRef}
                    image={oldPreview}
                    width={250}
                    height={250}
                    borderRadius={500}
                    scale={slideValue / 10}
                    onImageReady={handleEditorLoad}
                    onMouseUp={onCrop}
                    disableHiDPIScaling={true}
                  // disableBoundaryChecks={true}
                  />
                ),
                [oldPreview, slideValue, editorRef],
              )}
              <Slider
                min={10}
                max={50}
                sx={{
                  margin: '0 auto',
                  width: '80%',
                  color: '#F88379',
                }}
                size='medium'
                defaultValue={slideValue}
                value={slideValue}
                onChange={(e: any) => setSlideValue(e.target.value)}
                onMouseUp={onCrop}
              />
            </div>
            <div className='max-sm:hidden flex flex-col justify-center items-center h-full'>
              <img
                className='w-[140px] h-[140px] rounded-[50%] object-cover'
                src={imageFile?.preview || Assets.NoUserImage}
                alt='Preview'
              />

              <span className='mt-2'>Preview</span>
            </div>
          </div>

          <div className='flex w-[86%] mx-auto justify-between gap-[3%] mt-[30px]'>
            <button onClick={onClose} className="flex w-full text-center justify-center items-center space-x-2 bg-[#384a620c] text-odi font-[500] rounded-[10px] px-4 py-4">
              <span className="text-sm">Cancel</span>
            </button>
            <button onClick={handleSave} className="flex w-full text-center justify-center items-center space-x-2 bg-odi text-white transition-all duration-500 font-[500] rounded-[10px] px-4 py-4">
              <span className="text-sm">{uploadingPersonaAvatar ? 'Saving Image...' : 'Save'}</span>
            </button>
          </div>
        </div>
      </TitleAppModal>
    </>
  );
}

export function AppBannerCropperFC({
  file,
  onClose,
  open,
  setPhoto,
  handlePictureModalSave,
  uploadingPersonaAvatar,
}: AppImageCropperProps) {
  const { isMobile } = useAppTheme();
  const [slideValue, setSlideValue] = useState<any>(10);
  const editorRef = useRef<any>();
  const [oldPreview, setOldPreview] = useState<any>();
  const [imageFile, setImageFile] = useState(file);

  // Ensure that the `AvatarEditor` is ready before calling `onCrop`
  const isEditorReady = useRef(false);

  const onCrop = () => {
    if (!isEditorReady.current) {
      return;
    }

    const canvas = editorRef.current.getImage();
    const preview = canvas.toDataURL();
    setImageFile((file: any) => ({
      ...file,
      preview: preview || file?.preview,
    }));
  };

  useEffect(() => {
    if (open) {
      setOldPreview(() =>
        file && file.preview ? file.preview : Assets.NoUserImage,
      );
      setImageFile(file);
      onCrop();
    }
  }, [open, file]);

  // Use this callback to signal that the `AvatarEditor` is ready
  const handleEditorLoad = () => {
    isEditorReady.current = true;
    onCrop();
  };

  const handleSave = async () => {
    const preview = imageFile?.preview;
    const imgFile = await getFileFromBase64(preview as string);
    const croppedImgFile = Object.assign(imgFile, {
      preview,
    });

    handlePictureModalSave(croppedImgFile);
  };

  return (
    <>
      <TitleAppModal title='Crop Photo' open={open} onClose={onClose}>
        <div className='w-full overflow-hidden'>
          <div className='flex justify-evenly items-center w-full'>
            <div className='w-fit h-fit overflow-hidden rounded-xl space-y-3 pb-3 avater-container flex flex-col justify-center items-center'>
              {useMemo(
                () => (
                  <AvatarEditor
                    ref={editorRef}
                    image={oldPreview}
                    width={isMobile ? 300 : 600}
                    height={isMobile ? 120 : 150}
                    borderRadius={20}
                    scale={slideValue / 10}
                    onMouseUp={onCrop}
                    disableHiDPIScaling={true}
                    onImageReady={handleEditorLoad}
                  // disableBoundaryChecks={true}
                  />
                ),
                [oldPreview, slideValue, editorRef],
              )}
              <Slider
                min={10}
                max={50}
                sx={{
                  margin: '0 auto',
                  width: '80%',
                  color: '#F88379',
                }}
                size='medium'
                defaultValue={slideValue}
                value={slideValue}
                onChange={(e: any) => setSlideValue(e.target.value)}
                onMouseUp={onCrop}
              />
            </div>
          </div>

          <div className='flex w-[86%] mx-auto justify-between gap-[3%] mt-[30px]'>
            <button onClick={onClose} className="flex w-full text-center justify-center items-center space-x-2 bg-[#384a620c] text-odi font-[500] rounded-[10px] px-4 py-4">
              <span className="text-sm">Cancel</span>
            </button>
            <button onClick={handleSave} className="flex w-full text-center justify-center items-center space-x-2 bg-odi text-white transition-all duration-500 font-[500] rounded-[10px] px-4 py-4">
              <span className="text-sm">{uploadingPersonaAvatar ? 'Saving Image...' : 'Save'}</span>
            </button>
          </div>
        </div>
      </TitleAppModal>
    </>
  );
}

export default AppImageCropperProps;
