'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import { FadeIn } from './components/Transitions/Transitions';

export default function Home() {
  const navigate = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate.replace('/auth/signin');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <FadeIn>
      <SplashScreen />
    </FadeIn>
    // <EmployeeSignIn/>
  );
}
