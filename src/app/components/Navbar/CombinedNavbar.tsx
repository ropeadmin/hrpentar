"use client"

import Assets from "@/constants/assets.constant";
import useGlobalState from "@/hooks/globalstate.hook";
import { IconButton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const CombinedNavbar = () => {
    const [nav, setNav] = useState(false);
    const router = useRouter();
    const { isAuthenticated, profile, logout } = useGlobalState();

    // Scroll Animation
    const [scrollPosition, setScrollPosition] = useState<number>(0);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                setScrollPosition(window.scrollY);
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        setIsScrolled(scrollPosition >= 150);
    }, [scrollPosition]);

    const links = [
        {
            id: 1,
            link: "Home",
            path: "/",
        },
        {
            id: 2,
            link: "About",
            path: ""
        },
        {
            id: 3,
            link: "What we offer",
            path: ""
        },
        {
            id: 4,
            link: "Reviews",
            path: ""
        },
    ];

    return (
        <div className={
            isScrolled
                ? 'sticky top-0 z-50 w-full bg-[#fff] md:px-[80px] px-5 py-[20px] flex items-center justify-between border-b border-[#f0f0f082] animate-fade-in-down'
                : 'relative w-full bg-[#fff] md:px-[80px] px-5 py-[20px] flex items-center justify-between border-b border-[#f0f0f08c] animate-fade-in-up'
        }>
            <Link href="/">
                <img src='/merchstore.svg' alt="" width={170} />
            </Link>


            <div className="flex items-center">
                {!isAuthenticated && (
                    <div className="flex gap-2.5 mr-7">
                        <Link href='/login' className="flex items-center space-x-2 bg-[#384a620c] text-odi font-[500] rounded-[10px] px-4 py-4">
                            <span className="text-sm">Sign In</span>
                        </Link>
                        <Link href='/signup' className="flex items-center space-x-2 bg-odi hover:bg-[#384a620c] text-white hover:text-odi transition-all duration-500 font-[500] rounded-[10px] px-4 py-4">
                            <span className="text-sm">Create Your Merch Store Account</span>
                        </Link>
                    </div>
                )}

                {isAuthenticated && (
                    <div className="c-logged__in items-center mr-2 md:mr-10">
                        <div className="c-user relative">
                            <div className="c-user__header items-center cursor-pointer flex">
                                <div className="c-user__avatar w-9 h-9">
                                    <img src={profile?.user?.avatar} alt="user photo" className="w-full h-full object-cover" />
                                </div>
                                <div className="c-user__name ml-1.5 font-[500] text-red-light font-15">
                                    {profile?.user?.full_name.split(" ")[0]}
                                </div>
                            </div>
                            <div className="c-user__dropdown">
                                <div className="dropdown-content h-full">
                                    <div className="user-area py-3">
                                        <div className="mb-4">
                                            <h4 className="font-[600] text-blue-dark p-5 pb-3 pt-2 text-base">My Account</h4>
                                            <div>
                                                <Link
                                                    href="/dashboard/settings"
                                                    className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                                >
                                                    My Profile
                                                </Link>
                                            </div>

                                            <div>
                                                <Link
                                                    href="/dashboard/settings"
                                                    className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                                >
                                                    Account Settings
                                                </Link>
                                            </div>

                                            <div>
                                                <Link
                                                    href="/dashboard/order-history"
                                                    className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                                >
                                                    Order History
                                                </Link>
                                            </div>
                                        </div>

                                        {profile?.user?.merchStore?.id && (
                                            <>
                                                <hr className="border-cream" />

                                                <div className="mt-1">
                                                    <h4 className="font-[600] text-blue-dark p-5 pb-3 text-base">My Store</h4>
                                                    <div>
                                                        <Link
                                                            href="/dashboard/store"
                                                            className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                                        >
                                                            View My Store
                                                        </Link>
                                                    </div>

                                                    <div>
                                                        <Link
                                                            href="/dashboard/transactions"
                                                            className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                                        >
                                                            Transactions
                                                        </Link>
                                                    </div>

                                                    <div>
                                                        <Link
                                                            href="/dashboard/transactions"
                                                            className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                                        >
                                                            Payments
                                                        </Link>
                                                    </div>

                                                    {/* <div>
                                                        <Link
                                                            href="/dashboard/settings"
                                                            className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                                        >
                                                            Design Uploads
                                                        </Link>
                                                    </div> */}
                                                </div>
                                            </>
                                        )}
                                        {!profile?.user?.merchStore?.id && (
                                            <>
                                                <hr className="border-cream" />
                                                <div className="mt-1">
                                                    <div>
                                                        <Link
                                                            href="/create-store"
                                                            className="text-blue-dark font-normal text-base dropdown-link block py-2 px-8 mb-1.5"
                                                        >
                                                            Create Store
                                                        </Link>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="dropdown-spacing"></div>

                                    <div className="logout-area">
                                        <button
                                            className="text-blue-dark no-outline w-full py-5 px-8 font-normal text-base block mb-2 text-left"
                                            onClick={logout}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <IconButton>
                    <Link href="/cart" className="c-cart__icon flex-shrink-0 relative">
                        <img
                            src="data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28.2202 10.7466L25.3669 19.76C25.1536 20.4 24.5936 20.8267 23.9269 20.8267H12.9136C12.2736 20.8267 11.6602 20.4266 11.4469 19.8399L7.26024 8.55999H4.8069C4.22023 8.55999 3.74023 8.08 3.74023 7.49333C3.74023 6.90666 4.22023 6.42666 4.8069 6.42666H7.98023C8.43357 6.42666 8.83357 6.71998 8.99357 7.14665L13.3402 18.6666H23.4736L25.7402 11.4666H13.1802C12.5936 11.4666 12.1136 10.9866 12.1136 10.4C12.1136 9.8133 12.5936 9.3333 13.1802 9.3333H27.2069C27.5536 9.3333 27.8736 9.51996 28.0602 9.78662C28.2736 10.0533 28.3269 10.4266 28.2202 10.7466ZM13.4469 22.2133C12.9936 22.2133 12.5402 22.4 12.2202 22.72C11.9002 23.04 11.7136 23.4933 11.7136 23.9466C11.7136 24.4 11.9002 24.8533 12.2202 25.1733C12.5402 25.4933 12.9936 25.68 13.4469 25.68C13.9002 25.68 14.3536 25.4933 14.6736 25.1733C14.9936 24.8533 15.1802 24.4 15.1802 23.9466C15.1802 23.4933 14.9936 23.04 14.6736 22.72C14.3536 22.4 13.9002 22.2133 13.4469 22.2133ZM23.0202 22.2133C22.5669 22.2133 22.1136 22.4 21.7936 22.72C21.4736 23.04 21.2869 23.4933 21.2869 23.9466C21.2869 24.4 21.4736 24.8533 21.7936 25.1733C22.1136 25.4933 22.5669 25.68 23.0202 25.68C23.4736 25.68 23.9269 25.4933 24.2469 25.1733C24.5669 24.8533 24.7536 24.4 24.7536 23.9466C24.7536 23.4933 24.5669 23.04 24.2469 22.72C23.9269 22.4 23.4736 22.2133 23.0202 22.2133Z' fill='%23384A62'/%3E%3C/svg%3E%0A"
                            alt="cart"
                        />
                        {/* {cartData?.length > 0 && (
              <span className="absolute c-cart__size font-sf--bold font-15 text-white bg-red-light">
                {cartData.length}
              </span>
            )} */}
                    </Link>
                </IconButton>
            </div>









            <div className="flex items-center space-x-7 md:hidden">
                <IconButton
                    onClick={() => setNav(!nav)}
                    className="z-20"
                >
                    {nav ? <MdClose size={25} style={{ color: '#000' }} /> : <HiOutlineMenuAlt3 size={25} style={{ color: '#000' }} />}
                </IconButton>
            </div>


            {nav && (
                <ul className="flex flex-col justify-center items-center absolute z-10 top-0 left-0 w-full h-screen bg-white text-odi">
                    {links.map(({ id, link, path }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-[5vw]"
                        >
                            <Link onClick={() => setNav(!nav)} href={path}>
                                {link}
                            </Link>
                        </li>
                    ))}
                    {isAuthenticated && (
                        <button
                            // onClick={logout}
                            type="button"
                            className="text-white bg-[#D77F81] font-medium rounded-[4px] leading-tight w-[60%] mt-7 text-[4vw] px-12 py-4 transform transition-all duration-300 ease-in-out"
                        >
                            <span>Logout</span>
                        </button>
                    )}
                </ul>
            )}
        </div>
    );
};

export default CombinedNavbar;