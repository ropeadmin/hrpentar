'use client';

import useGlobalState from '@/hooks/globalstate.hook';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import { FadeIn } from './components/Transitions/Transitions';
import EmployeeSignIn from './employee/(auth)/signin/page';

export default function Home() {

  return (
    <EmployeeSignIn/>
  );
}