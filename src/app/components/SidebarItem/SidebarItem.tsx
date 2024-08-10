'use client';
import { MenuItem } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { SideBarItemLink } from '@/utils/types/types';

interface SideBarItemProps {
  link: SideBarItemLink;
  active: boolean;
}

const SidebarItem = ({ link, active }: SideBarItemProps) => {
  const { name, to, icon } = link;

  return (
    <MenuItem>
      <Link className="w-full" href={to}>
          <div className={`flex items-center gap-[8px] px-3 py-4  w-full rounded-[12px] ${active ? 'bg-[#fcf0ef]' : 'bg-transparent'} ${active ? 'hover:bg-none' : 'hover:bg-cream-light'}`}>
            <Image src={icon} alt='' width={20} height={20} />
            <p className={`w-full font-[500] text-[1vw] ${active ? "text-primaryColor" : "text-odi-lite"}`}>{name}</p>
          </div>
      </Link>
    </MenuItem>
  );
};

export default SidebarItem;
