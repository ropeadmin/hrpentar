import { AppButtonProps, CloseAppButtonProps, AuthButtonProps, OutlinedButtonProps } from '@/utils/types/types'
import React from 'react';
import Image from "next/image";
import Assets from '@/constants/assets.constant';
import { Loader } from 'rsuite';

export function AuthButton({ content, type, isDisabled, isLoading }: AuthButtonProps) {
    return (
        <button
            type={type}
            className={`w-full rounded-[5px] py-4 ${isDisabled ? 'bg-[#00000052]' : 'bg-[#111827]'} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} text-white font-[600] md:text-[1vw] text-[4vw]`}
            disabled={isDisabled}>
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <Loader size="xs" content="Loading..." />
                </span>
            ) : (
                content
            )}
        </button>
    )
}


export function AppButton({ content, onClickButton, isRounded, isLoading, isDisabled }: any) {
    return (
        <button
            onClick={onClickButton}
            className={`w-full ${isDisabled ? 'bg-[#00000052]' : 'bg-[#111827]'} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${isRounded ? 'rounded-full' : 'rounded-[12px]'} py-3 bg-[#111827] px-10 cursor-pointer text-white font-[400] md:text-[1vw] text-[4vw]`}
            disabled={isDisabled}>
            {isLoading ? (
               <span className="flex items-center justify-center">
               <Loader size="xs" content="Loading..." />
           </span>
            ) : (
                content
            )}
        </button>
    )
}

export function OutlinedAppButton({ content, onClickButton, isRounded }: OutlinedButtonProps) {
    return (
        <button
            onClick={onClickButton}
            className={`w-full ${isRounded ? 'rounded-full' : 'rounded-[5px]'} py-3 bg-white border border-[#979797] px-10 cursor-pointer text-[#737373] font-[400] text-[1vw]`}>
            {content}
        </button>
    )
}

export function OutlinedAppButton2({ content, onClickButton, isRounded }: OutlinedButtonProps) {
    return (
        <button
            onClick={onClickButton}
            className={`w-full ${isRounded ? 'rounded-full' : 'rounded-[5px]'} py-3 bg-transparent border border-[#979797] px-14 cursor-pointer text-[#737373] font-[400] text-[1vw]`}>
            {content}
        </button>
    )
}

export function ContentOutlinedButton({ content, onClickButton, isRounded }: OutlinedButtonProps) {
    return (
        <button
            onClick={onClickButton}
            className={`w-full ${isRounded ? 'rounded-full' : 'rounded-[10px]'} text-start py-[20px] bg-white border border-[#CECECE] px-6 cursor-pointer text-[#1E1E1E] font-[500] text-[1vw]`}>
            {content}
        </button>
    )
}



export function CloseAppButtonModal({ content, onClickButtonClose }: CloseAppButtonProps) {
    return (
        <button
            onClick={onClickButtonClose}
            className="w-full rounded-[5px] py-4 bg-[#F9F9FA] text-[#F07E6E] font-[600] text-[1vw]">
            {content}
        </button>
    )
}



