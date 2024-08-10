"use client"

import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { RxDashboard } from "react-icons/rx";
import { GrTransaction } from "react-icons/gr";
import { BsCashCoin } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";
import { PiHandshake } from "react-icons/pi";

type Params = {
  '*': string | string[];
};



const BottomNavBarMobile = () => {
  const navigate = useRouter();
  const pathname = usePathname();
  const params = useParams<Params>(); // Specify the type Params for useParams

  const currentPath = params['*'];
  const subpath = Array.isArray(currentPath) ? currentPath[0].split('/')[0] : currentPath?.split('/')[0];

  const isActive = (paths: string[]) => {
    if (typeof subpath === 'string') {
      return paths.includes(subpath);
    }
    return false;
  };


  const links = [
    {
      label: 'Dashboard',
      icon: <RxDashboard style={{ fontSize: 24, color: "#275f6a" }} />,
      value: '/dashboard',
    },
    {
      label: 'Transactions',
      icon: <GrTransaction style={{ fontSize: 24, color: "#275f6a" }} />,
      value: '/dashboard/transactions',
    },
    {
      label: 'Raffle',
      icon: <BsCashCoin style={{ fontSize: 24, color: "#275f6a" }} />,
      value: '/dashboard/raffle',
    },
    {
      label: 'Referrals',
      icon: <PiHandshake style={{ fontSize: 32, color: "#275f6a" }} />,
      value: '/dashboard/referrals',
    },
    {
      label: 'Leaderboard',
      icon: <GoTrophy style={{ fontSize: 24, color: "#275f6a" }} />,
      value: '/dashboard/leaderboard',
    },
    // {
    //   label: 'Settings',
    //   icon: <CiSettings style={{ fontSize: 30, color: "#275f6a" }} />,
    //   value: '/dashboard/settings',
    // },
  ];

  // const currentLinkIndex = useMemo(() => links.findIndex((l) => isActive(l.paths)), [subpath]);
  const [value, setValue] = useState('/dashboard'); // Initialize the state with an empty string

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== value) { // Check if the new value is different
      setValue(newValue); // Update the value state
      navigate.push(newValue); // Navigate to the new value (path)
    }
  };

  useEffect(() => {
    setValue(pathname);
  }, [pathname]);

  return (
    <>
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          p: 0,
          // px: 1,
          zIndex: '10',
          width: 'fit-content',
        }}
        elevation={3}
      >
        <BottomNavigation
          value={value} 
          onChange={handleChange}
          sx={{
            width: '100vw',
            display: 'flex',
          }}
        >
          {links.map((item, i) => (
            <BottomNavigationAction
              key={i}
              sx={{
                minWidth: '20px',
              }}
              icon={item?.icon}
              value={item?.value}
              label={<span className="font-satoshi text-[3vw] text-[#275f6a] whitespace-nowrap">{item?.label}</span>}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default BottomNavBarMobile;
