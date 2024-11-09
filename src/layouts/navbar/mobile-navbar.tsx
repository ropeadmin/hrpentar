'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Assets from '@/constants/assets.constant';
import { useRouter } from 'next/navigation';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import Link from 'next/link';
import useAppTheme from '@/hooks/theme.hook';


export default function MobileNavbar({ nav, setNav }: any) {
    const router = useRouter();

    const isMobile = useAppTheme();


    return (
        <div className="navbar px-4 py-[8px]">
            <div className="flex space-x-2.5 items-center">
                <Image src={Assets.logo} alt="Logo" width={50} height={50} />
                <p className="leading-tight text-[5vw] font-[500] text-white">xForge</p>
            </div>

            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer z-10 text-white md:hidden"
            >
                {nav ? <MdClose size={25} /> : <HiOutlineMenuAlt3 size={25} />}
            </div>
        </div>
    );
}
