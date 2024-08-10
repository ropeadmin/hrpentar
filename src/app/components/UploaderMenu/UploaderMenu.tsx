import Assets from "@/constants/assets.constant";
import { Menu, MenuItem } from "@mui/material";
import Image from "next/image";
import BannerUploader from "../BannerUploader/BannerUploader";
import GalleryUploader from "../GalleryUploader/GalleryUploader";

// Image uploader menu for Profile Pics
export const ImageUploaderMenu = ({
    anchorEl,
    open,
    handleClose,
    handlePictureModalSave,
    uploadingPersonaAvatar,
    removePhoto,
}: {
    anchorEl: any;
    open: boolean;
    handleClose: any;
    handlePictureModalSave: any;
    uploadingPersonaAvatar: any;
    removePhoto: any;
}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            id='self-persona-menu'
            open={open}
            onClose={handleClose}
            onClick={() => { }}
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '16px',
                    overflow: 'visible',
                    boxShadow: '0px 4px 14px rgba(56, 74, 98, 0.14)',
                    // mt: 1.5,
                    ml: -1,
                    width: 'auto',
                    padding: '0px 10px 0px 10px',
                    mt: 3,
                },
            }}
            anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
        >
            {/* <MenuItemItem
          color='#999'
          onClick={() => {}}
          icon={<img src={Assets.takePhoto} alt='' width={21} />}
          title='Take Photo'
        /> */}
            <GalleryUploader
                handlePictureModalSave={handlePictureModalSave}
                setPhoto={''}
                uploadingPersonaAvatar={uploadingPersonaAvatar}
            />
            <MenuItemItem
                onClick={removePhoto}
                color='#EA4335'
                icon={Assets.trashRed}
                title='Delete Image'
            />
        </Menu>
    );
};

// Image uploader menu for cover banner
export const ImageUploaderMenuBanner = ({
    anchorEl,
    open,
    handleClose,
    handlePictureModalSave,
    uploadingPersonaAvatar,
    removePhoto,
}: {
    anchorEl: any;
    open: boolean;
    handleClose: any;
    handlePictureModalSave: any;
    uploadingPersonaAvatar: any;
    removePhoto: any;
}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            id='self-persona-menu'
            open={open}
            onClose={handleClose}
            onClick={() => { }}
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '16px',
                    overflow: 'visible',
                    boxShadow: '0px 4px 14px rgba(56, 74, 98, 0.14)',
                    // mt: 1.5,
                    ml: -1,
                    width: 'auto',
                    padding: '0px 10px 0px 10px',
                    mt: 3,
                },
            }}
            anchorOrigin={{ horizontal: 'right', vertical: 'center' }}
        >
            {/* <MenuItemItem
          color='#999'
          onClick={() => {}}
          icon={<img src={Assets.takePhoto} alt='' width={21} />}
          title='Take Photo'
        /> */}
            <BannerUploader
                handlePictureModalSave={handlePictureModalSave}
                setPhoto={''}
                uploadingPersonaAvatar={uploadingPersonaAvatar}
            />
            <MenuItemItem
                onClick={() => removePhoto('banner')}
                color='#EA4335'
                icon={Assets.trashRed}
                title='Delete Image'
            />
        </Menu>
    );
};


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