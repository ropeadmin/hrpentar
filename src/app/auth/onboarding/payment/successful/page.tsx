import React from 'react'

export default function paymentSuccessful() {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center relative'>
             <img src='/pentaHR-logo-dark.svg' width={150} className='absolute top-10 left-[50px]' />

            <div className="flex flex-col justify-center items-center text-center w-[500px]">
                <img src='/icons/success-icon.svg' width={70} height={70} />
                <div className="mt-7">
                    <h1 className="text-[#0f1625] text-[28px]  font-bold font-['Cabinet Grotesk'] leading-loose">Payment successful</h1>
                    <div className="text-center"><span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">Thank you for your purchase. Your payment has been processed successfully. You can proceed to dashboard.</span></div>
                </div>
                <button className="text-white bg-[#0f1625] w-full py-4 rounded-[8px] text-base font-medium mt-14">
                    Proceed to Dashboard
                </button>
            </div>

            <p className='text-[#313a48] text-xs font-medium absolute bottom-5'>© 2024 PentaHR. All rights reserved. <span className='underline'>Terms of Use</span> <span className='underline'>Privacy Policy</span></p>
        </div>
    )
}
