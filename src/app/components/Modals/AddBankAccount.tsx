import Assets from "@/constants/assets.constant";
import { IconButton, MenuItem } from "@mui/material";
import Image from "next/image";
import React from "react";
import MyTextField from "../Fields/MyTextField";
import TextField from "../Fields/TextField";
import useAppTheme from "@/hooks/theme.hook";

interface AddBankAccountModalProps {
    onClose: () => void;
}

export default function AddBankAccountModal({ onClose }: AddBankAccountModalProps) {
    const {isMobile} = useAppTheme();
    const bankName = [
        'First Bank',
        'GT Bank',
        'Access Bank',
        'OPAY Digital',
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
            <div className="z-50 flex flex-col items-center justify-center bg-white md:px-7 px-5 py-7 md:pb-16 pb-7 rounded-[8px] md:w-[650px] w-[90%] relative">
                <div className="absolute top-3 left-3" onClick={onClose}>
                    {!isMobile ? (
                        <div className="w-[41px] h-[36px] cursor-pointer flex justify-center items-center bg-[#F0F0F0] rounded-[4px]">
                        <Image
                            src={Assets.closeIconWithBg}
                            alt="close-icon"
                            width={25}
                            height={25}
                        />
                    </div>
                    ) : (
                        <IconButton>
                        <Image
                            src={Assets.closeIconWithBg}
                            alt="close-icon"
                            width={25}
                            height={25}
                        />
                        </IconButton>
                    )}
                </div>

                <h1 className="text-black md:text-[24px] text-[4vw] font-bold roboto md:w-full text-center mx-auto">
                    Add new bank information
                </h1>

                <div className="mt-10 flex flex-col space-y-14 w-full md:px-10">
                    <div className="flex flex-col space-y-4">
                        <MyTextField
                            id='bankName'
                            name='bankName'
                            label='Bank name'
                            placeholder='Select bank'
                            type='text'
                            value={''}
                            error={''}
                            onChange={undefined}
                            select
                        >
                            {bankName.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </MyTextField>
                        <MyTextField
                            label={"Account name"}
                            placeholder={"Enter Account name"}
                            value={undefined}
                            id={"accountName"}
                            type={"text"}
                            require={true}
                            isPassword={false}
                            withBackground={false}
                            onInputChange={undefined}
                            readOnly={false}
                        />
                        <MyTextField
                            label={"Account number"}
                            placeholder={"Enter Account number"}
                            value={undefined}
                            id={"accountNumber"}
                            type={"number"}
                            require={true}
                            isPassword={false}
                            withBackground={false}
                            onInputChange={undefined}
                            readOnly={false}
                        />
                    </div>
                    <button className="text-white bg-primaryColor w-full py-4 rounded-[8px] md:text-[16px] text-[4vw] font-medium poppins mt-10">
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
