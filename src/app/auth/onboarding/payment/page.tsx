import MyTextField from '@/app/components/Fields/MyTextField'
import Stepper from '@/app/components/Stepper/Stepper'
import { FormControlLabel, Radio } from '@mui/material'
import React from 'react'

export default function Payment() {
    return (
        <div className='flex flex-col justify-center items-center h-auto py-[100px] gap-20 relative px-[80px]'>
            <img src='/pentaHR-logo-dark.svg' width={150} className='absolute top-10 left-[80px]' />

            <div className='flex divide-x mt-7'>
                <div className='w-full pr-32'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-[#0f1625] text-[28px] font-bold'>Standard Plan</h1>
                        <h1 className='text-[#0f1625] font-bold text-2xl leading-none'>₦500<span className='text-sm font-normal'>/month</span></h1>
                    </div>
                    <p className='text-[#313a48] text-base font-normal leading-tight mt-2'>7 days free trial. Your account would be deactivated if subscription is not upgraded after the free trial.</p>

                    <div className='flex gap-10 mt-10'>
                        <div className='flex items-center'>
                            <FormControlLabel
                                value='annual'
                                control={<Radio checked={true} sx={{
                                    // Style the radio button itself
                                    color: 'primary.main',
                                    '&.Mui-checked': {
                                        color: '#ef0000', // Style when checked
                                    },
                                }} />}
                                label='Annual'
                                sx={{
                                    // Style the label
                                    color: '#313a48',
                                    '& .MuiFormControlLabel-label': {
                                        fontWeight: '400', // Style the label text
                                    },
                                }}
                            />
                            <div className='flex items-center justify-center bg-[#F0F8FE] rounded-lg px-3 py-2'>
                                <p className='text-[#1395F6] text-xs font-medium leading-none'>Save 20%</p>
                            </div>
                        </div>
                        <div className=''>
                            <FormControlLabel
                                value='monthly'
                                control={<Radio checked={false} sx={{
                                    // Style the radio button itself
                                    color: '#a0aec0',
                                    '&.Mui-checked': {
                                        color: '#ef0000', // Style when checked
                                    },
                                }} />}
                                label='Monthly'
                                sx={{
                                    // Style the label
                                    color: '#313a48',
                                    '& .MuiFormControlLabel-label': {
                                        fontWeight: '400', // Style the label text
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className='divide-y mt-10'>
                        <div className='pb-7'>
                            <p className='text-[#0f1625] text-[16px] font-medium'>Selects seats</p>
                            <div className='rounded-lg border border-[#D0D6DD] px-5 py-[16px] flex items-center justify-between p-2 mt-2'>
                                <div>
                                    <p className='text-[#0F1625] text-lg font-[600] leading-snug'>Seats</p>
                                    <p className='text-[#313a48] text-sm font-normal mt-1.5'>Starting at 5 users</p>
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

                        <div className="py-7 space-y-3">
                            <div className='flex justify-between items-center'>
                                <p className='text-[#0F1625] text-base font-medium leading-tight'>25 seats</p>
                                <div className='flex items-center gap-2'>
                                    <p className='text-[#a0aec0] text-sm font-normal line-through leading-none'>₦12,000</p>
                                    <p className='text-[#0F1625] text-base font-medium leading-none'>₦12,000</p>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-[#677488] text-sm font-normal leading-none'><span className='line-through'>₦500</span> ₦480 x 25 seats x 12 months</p>
                                <div className='flex items-center justify-center bg-[#F0F8FE] rounded-lg px-3 py-2'>
                                    <p className='text-[#1395F6] text-xs font-medium leading-none'>Save 20%</p>
                                </div>
                            </div>
                        </div>

                        <div className="py-7 space-y-5">
                            <div className="flex justify-between items-center">
                                <p className='text-[#0F1625] text-base font-medium leading-tight'>Discount (-20%)</p>
                                <p className='text-[#0F1625] text-base font-medium leading-tight'>-₦2,000</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className='text-[#0F1625] text-base font-medium leading-tight'>VAT (7.5%)</p>
                                <p className='text-[#0F1625] text-base font-medium leading-tight'>-₦2,000</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-7">
                            <h1 className='text-[#0F1625] text-xl font-bold leading-normal'>Total</h1>
                            <h1 className='text-[#0F1625] text-xl font-bold leading-normal'>₦8,000.00</h1>
                        </div>
                    </div>

                    <div className='mt-14'>
                        <p className='text-xs font-normal text-[#313a48] leading-normal'>By confirming your subscription, you  agree to allow us charge your card for this and future subscriptions in accordance with our <span className='font-medium underline cursor-pointer'>Terms of Use</span> and <span className='font-medium underline cursor-pointer'>Privacy policy</span>. You can always cancel subscription at any time.</p>
                        <p className='text-[#313a48] text-xs font-medium mt-7'>© 2024 PentaHR. All rights reserved.</p>
                    </div>
                </div>

                <div className='w-full pl-20'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-[#0f1625] text-[28px] font-bold'>Payment method</h1>
                    </div>
                    <p className='text-[#313a48] text-base font-normal leading-tight mt-2'>7 days free trial. Your account would be deactivated if subscription is not upgraded after the free trial.</p>

                
                    <div className='divide-y mt-10'>
                    <div className='flex gap-4 mt-10 pb-7'>
                        <div className='border border-[#D0D6DD] px-[16px] py-[7px] rounded-lg'>
                            <FormControlLabel
                                value='Credit/Debit card'
                                control={<Radio checked={true} sx={{
                                    // Style the radio button itself
                                    color: 'primary.main',
                                    '&.Mui-checked': {
                                        color: '#ef0000', // Style when checked
                                    },
                                }} />}
                                label='Credit/Debit card'
                                sx={{
                                    // Style the label
                                    color: '#313a48',
                                    '& .MuiFormControlLabel-label': {
                                        fontWeight: '400', // Style the label text
                                        fontSize: '15px'
                                    },
                                }}
                            />
                        </div>
                        <div className='border border-[#D0D6DD] px-[16px] py-[7px] rounded-lg'>
                            <FormControlLabel
                                value='flutterwave'
                                control={<Radio checked={false} sx={{
                                    // Style the radio button itself
                                    color: '#a0aec0',
                                    '&.Mui-checked': {
                                        color: '#ef0000', // Style when checked
                                    },
                                }} />}
                                label='Flutterwave'
                                sx={{
                                    // Style the label
                                    color: '#313a48',
                                    '& .MuiFormControlLabel-label': {
                                        fontWeight: '400', // Style the label text
                                        fontSize: '15px'
                                    },
                                }}
                            />
                        </div>

                        <div className='border border-[#D0D6DD] px-[16px] py-[7px] rounded-lg'>
                            <FormControlLabel
                                value='paystack'
                                control={<Radio checked={false} sx={{
                                    // Style the radio button itself
                                    color: '#a0aec0',
                                    '&.Mui-checked': {
                                        color: '#ef0000', // Style when checked
                                    },
                                }} />}
                                label='Paystack'
                                sx={{
                                    // Style the label
                                    color: '#313a48',
                                    '& .MuiFormControlLabel-label': {
                                        fontWeight: '400', // Style the label text
                                        fontSize: '15px'
                                    },
                                }}
                            />
                        </div>
                    </div>


                        <div className="pt-7">
                            <form className="w-full">
                                <div className="space-y-5">
                                    <MyTextField
                                        id="cardholderName"
                                        name="cardholderName"
                                        label="Cardholder name"
                                        placeholder="Enter cardholder name"
                                        value={''}
                                        type="text"
                                    />
                                    <MyTextField
                                        id="cardNumber"
                                        name="cardNumber"
                                        label="Card number"
                                        placeholder="0000 0000 0000 0000"
                                        value={''}
                                        type="number"
                                    />
                                    <div className='flex gap-5'>
                                        <MyTextField
                                            id="expiryDate"
                                            name="expiryDate"
                                            label="Expiry date"
                                            placeholder="mm/yy"
                                            value={''}
                                            type="number"
                                        />
                                        <MyTextField
                                            id="cvv"
                                            name="cvv"
                                            label="CVV"
                                            placeholder="123"
                                            value={''}
                                            type="number"
                                        />
                                    </div>
                                </div>

                                <button type='submit' className="text-white bg-[#0f1625] w-full py-4 rounded-[8px] text-base font-medium mt-14">
                                    Proceed with payment
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
