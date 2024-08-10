'use client';

import React from 'react';
import SidebarItem from '../SidebarItem/SidebarItem';
import Image from 'next/image';
import './Sidebar.scss';
import { IconButton } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import { SideBarItemLink } from '@/utils/types/types';
import { useDispatch } from 'react-redux';
import { profileLogoutAction } from '@/store/profile.slice';
import Link from 'next/link';
import useGlobalState from '@/hooks/globalstate.hook';

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname;
  const subpath = currentPath?.split('/')[2];
  const isActive = (paths: string[]) => paths.includes(subpath ?? '');
  const { logout } = useGlobalState();

  const links: SideBarItemLink[] = [
    {
      name: "Home",
      icon: currentPath === "/dashboard" ? Assets.homeActive : Assets.home,
      to: "/dashboard",
      paths: [""],
    },
    {
      name: "View store",
      icon: currentPath === "/dashboard/store" ? Assets.storeActive : Assets.store,
      to: "/dashboard/store",
      paths: ["store"],
    },
    {
      name: "Transactions",
      icon: currentPath === "/dashboard/transactions" ? Assets.transactionActive : Assets.transaction,
      to: "/dashboard/transactions",
      paths: ["transactions"],
    },
    {
      name: "Order history",
      icon: currentPath === "/dashboard/order-history" ? Assets.historyActive : Assets.history,
      to: "/dashboard/order-history",
      paths: ["order-history"],
    },
    // {
    //   name: "Notifications",
    //   icon: currentPath === "/dashboard/notification" ? Assets.notificationActive : Assets.notification,
    //   to: "/dashboard/notification",
    //   paths: ["notification"],
    // },
    {
      name: "Settings",
      icon: currentPath === "/dashboard/settings" ? Assets.settingActive : Assets.setting,
      to: "/dashboard/settings",
      paths: ["settings"],
    },
  ];

  return (
    <>
      <div className="sidebar-container bg-white pb-10 px-3 z-10 border-r-[1px] border-[#F0F0F0]">
        <div className="w-full">
          <Link href="/" className="w-full flex justify-start items-center relative pb-5 pt-7">
            <Image src={Assets.logo} alt="logo" width={150} height={150} />
          </Link>

          <div className="h-auto links mt-3">
            {links.map((link, index) => (
              <SidebarItem link={link} key={index} active={isActive(link.paths)} />
            ))}
          </div>
        </div>

        <div className="sidebar-item">
          <div className="flex items-center gap-[20px] px-3 py-4 cursor-pointer rounded-[12px] hover:bg-[#e0444415]" onClick={logout}>
            <Image src={Assets.logout} alt="" width={20} height={20} />
            <span className="w-full font-[500] text-[1vw] text-odi-lite">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
