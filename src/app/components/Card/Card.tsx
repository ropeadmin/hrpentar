import { CardProps } from '@/utils/types/types'
import React from 'react';
import Image from 'next/image';
import { IconContext } from "react-icons";
import { IoWalletSharp } from "react-icons/io5";
import { MdSavings } from "react-icons/md";

export default function Card({ bgColor, title, data, iconPath, isLoading }: CardProps) {
    return (
        <div className="rounded-[16px] md:h-[140px] h-auto w-full p-4 flex items-center space-x-5 transform transition duration-500 sm:hover:scale-105" style={{ background: `${bgColor}` }}>
            {isLoading ? (
                <div className="min-w-full h-full flex justify-center items-center mx-auto my-0">
                    Loading...
                </div>
            ) : (
                <>
                    <div className="bg-white w-[50px] h-[50px] flex justify-center items-center rounded-full">
                        <IconContext.Provider value={{ color: "#495057", size: "30px" }}>
                            <div>
                                {title === 'Wallet Balance' ? <IoWalletSharp /> : <MdSavings />}
                            </div>
                        </IconContext.Provider>
                    </div>
                    {/* <Image src={iconPath} alt="" width={50} height={50} /> */}
                    <div className="space-y-2">
                        <p className="text-[#151515] font-[600] md:text-[1vw] text-[3vw] leading-tight">{title}</p>
                        <h1 className="text-[#3A3A3A] font-[700] md:text-[1.8vw] text-[5.5vw] leading-tight">{data}</h1>
                    </div>
                </>
            )}
        </div>
    )
}
