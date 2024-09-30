"use client"

import { obfuscateEmail } from "@/helpers";
import useAuthRedirect from "@/hooks/authredirect.hook";
import React, { useEffect, useState } from "react";

export default function ResetPasswordLink() {
    useAuthRedirect();
    const [email, setEmail] = useState('');

    useEffect(() => {
      const storedEmail = localStorage.getItem('user-email');
      
      if (storedEmail) {
        setEmail(obfuscateEmail(storedEmail));
      }
    }, []);

    return (
        <div className="bg-[#fff] min-h-screen flex p-4">
            <div
                className="relative rounded-[16px] flex-grow h-full w-full overflow-hidden bg-[url('/images/auth-1.jpeg')] min-h-screen p-7"
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <img src='/pentaHR.svg' width={150} height={150} />

                <div className="absolute bottom-7 left-7 right-7 h-auto auth-glass p-5">
                    <p className="text-white text-base font-medium font-['Cabinet Grotesk'] leading-tight">&quot;PentaHR has revolutionized our HR processes. The intuitive interface and comprehensive features have significantly reduced administrative tasks, allowing us to focus more on employee engagement and development. It&apos;s a game-changer for any HR team!&quot;</p>
                    <div className="mt-5">
                        <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">Kolawole Immanuel</div>
                        <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">Payroll Specialist - Mactay Consulting</div>
                    </div>
                </div>
            </div>

            <div className='bg-white mx-auto w-full min-h-screen px-28 flex flex-col justify-center items-center'>

                <div className="w-full flex flex-col justify-center items-center text-center">
                    <img src='/icons/success-icon.svg' width={70} height={70} />
                    <div className="mt-7">
                        <h1 className="text-[#0f1625] text-[28px]  font-bold font-['Cabinet Grotesk'] leading-loose">Password reset link sent</h1>
                        <div className="text-center"><span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">A password reset link has been sent to </span><span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] leading-tight">{email}. <br /></span><span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">Please check your email to continue. </span><span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] leading-tight"> </span></div>
                    </div>
                </div>
            </div>
        </div>


    );
}
