"use client"

import { obfuscateEmail } from "@/helpers";
// import useAuthRedirect from "@/hooks/authredirect.hook";
import React, { useEffect, useState } from "react";

export default function VerifyEmail() {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const storedEmail = localStorage.getItem('register-user-email');

        if (storedEmail) {
            setEmail(obfuscateEmail(storedEmail));
        }
    }, []);

    return (
        <div className="bg-[#fff] h-screen flex p-4 overflowHidden">
        <div
          className="relative p-[32px] rounded-[16px] flex-grow min-h-full min-w-[47vw] max-w-[47vw] w-[47vw] overflow-hidden bg-[url('/images/auth-1.jpeg')]"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="">
            <img src="/pentaHR.svg" width={150} height={150} />
          </div>
  

                <div className="absolute bottom-7 left-7 right-7 h-auto auth-glass p-5">
                    <p className="text-white text-base font-medium font-['Cabinet Grotesk'] leading-tight">&quot;PentaHR has revolutionized our HR processes. The intuitive interface and comprehensive features have significantly reduced administrative tasks, allowing us to focus more on employee engagement and development. It&apos;s a game-changer for any HR team!&quot;</p>
                    <div className="mt-5">
                        <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">Kolawole Immanuel</div>
                        <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">Payroll Specialist - Mactay Consulting</div>
                    </div>
                </div>
            </div>

            <div className='bg-white mx-auto w-full min-h-screen px-28 flex flex-col justify-center items-center'>

                <div className="w-full flex flex-col justify-center items-start text-start">
                    <img src='/icons/email.svg' width={100} height={100} />
                    <div className="mt-7">
                        <h1 className="text-[#0f1625] text-[32px]  font-bold font-['Cabinet Grotesk'] leading-loose">Verify email</h1>
                        <div className=""><span className="text-[#313a48] text-base font-medium font-['Cabinet Grotesk'] leading-tight">An email has been sent to </span><span className="text-[#0f1625] text-base font-bold font-['Cabinet Grotesk'] leading-tight">{email || '*******'}</span><span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] leading-tight"> </span><span className="text-[#313a48] text-base font-medium font-['Cabinet Grotesk'] leading-tight">with a link to verify your account.</span></div>
                        <div className="text-[#313a48] mt-7 text-base font-medium font-['Cabinet Grotesk'] leading-tight">Check your email for the verification, if you did not get the mail please check your spam.</div>
                        <div className="text-[#313a48] mt-10 text-base font-medium font-['Cabinet Grotesk'] leading-tight">Didn’t get a mail?</div>
                    </div>
                    <button className="text-[#0f1625] border w-fit px-7 py-3 rounded-[8px] text-base font-medium mt-7">
                        Resend mail
                    </button>
                </div>
            </div>
        </div>


    );
}
