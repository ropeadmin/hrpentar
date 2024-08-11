import Stepper from '@/app/components/Steppper/Stepper'
import React from 'react'

export default function Step3() {
    return (
        <div className='flex flex-col justify-center items-center h-screen gap-20 relative'>
            <div><img src='/pentaHR-logo-dark.svg' width={150} className='absolute top-10 left-[50px]' /></div>
            
            <div className="flex items-center mx-auto w-[750px]">
                <Stepper />
            </div>

            <div className='w-[550px]'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-[#0f1625] text-[28px] font-bold'>Free Plan</h1>
                    <h1 className='text-[#0f1625] font-bold text-2xl leading-none'>₦0<span className='text-sm font-normal'>/month</span></h1>
                </div>
                <p className='text-[#313a48] text-base font-normal leading-tight mt-2'>7 days free trial. Your account would be deactivated if subscription is not upgraded after the free trial.</p>

                <div className='divide-y mt-10'>
                    <div className='pb-7'>
                        <p className='text-[#0f1625] text-[16px] font-medium'>Selects seats</p>
                        <div className='rounded-lg border border-[#D0D6DD] px-5 py-[16px] flex items-center justify-between p-2 mt-2'>
                            <div>
                                <p className='text-[#0F1625] text-lg font-[600] leading-snug'>Seats</p>
                                <p className='text-[#313a48] text-sm font-normal mt-1.5'>Limited to 5 users</p>
                            </div>
                            <div className='border border-[#D0D6DD] rounded-lg flex items-center'>
                                <div className='h-[40px] w-[40px] flex justify-center items-center cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="2" viewBox="0 0 12 2" fill="none">
                                        <path d="M11.3332 1L0.666504 1" stroke="#687588" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <div className='h-[40px] px-4 flex justify-center items-center'>
                                    <p className='text-[#1F2937] text-[18px] font-medium'>5</p>
                                </div>
                                <div className='h-[40px] w-[40px] flex justify-center items-center cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M6 0.666687V11.3334" stroke="#687588" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M0.666504 6H11.3332" stroke="#687588" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center py-7">
                        <p className='text-[#0F1625] text-base font-medium leading-tight'>3 seats</p>
                        <p className='text-[#0F1625] text-base font-medium leading-tight'>₦0</p>
                    </div>

                    <div className="flex justify-between items-center pt-7">
                        <h1 className='text-[#0F1625] text-xl font-bold leading-normal'>Total</h1>
                        <h1 className='text-[#0F1625] text-xl font-bold leading-normal'>₦0.00</h1>
                    </div>
                </div>

                <button type='submit' className="text-white bg-[#0f1625] w-full py-4 rounded-[8px] text-base font-medium mt-14">
                    Subscribe
                </button>
            </div>
        </div>
    )
}
