'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Assets from '@/constants/assets.constant';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import useAppTheme from '@/hooks/theme.hook';


export default function Navbar() {
  const router = useRouter();

  const links = [
    {
      id: 1,
      link: "Earn",
    },
    {
      id: 2,
      link: "Refer",
    },
    {
      id: 3,
      link: "Transactions",
    },
    {
      id: 4,
      link: "Leaders",
    },
    {
      id: 5,
      link: "contact",
    },
  ];

  return (
    <div style={{ padding: '8px 32px 8px 20px' }} className="navbar">
      <div className="flex space-x-2.5 items-center">
        <Image src={Assets.logo} alt="Logo" width={50} height={50} />
        <p className="leading-tight text-[20px] font-[500] text-odi">xForge</p>
      </div>
      <ul className="text-white flex items-center space-x-6">
        {links.map(({ id, link }) => (
          <li key={id} className="navbar-text">{link}</li>
        ))}
      </ul>
      <div className="flex items-center space-x-5 justify-center">
        <button className="text-odi rounded-full font-[500] py-3 px-5" onClick={() => router.push('/login')}>Sign In</button>
        <button className="rounded-full bg-[#F7C143] text-odi font-[500] py-3 px-5" onClick={() => router.push('/signup')}>Sign Up</button>
      </div>

    </div>
  );
}
