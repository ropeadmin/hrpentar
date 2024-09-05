"use client"

import MyTextField from "@/app/components/Fields/MyTextField";
import Stepper from "@/app/components/Steppper/Stepper";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import { profileLoginAction } from "@/store/profile.slice";
import { MenuItem } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function Step1() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { makeRequest, isLoading } = useRequest();
    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const payload = {
        first_name: formData.firstName,
        last_name: formData.surname,
        email: formData.email,
        phone_number: formData.phone,
        password: formData.password,
        retypepassword: formData.confirmPassword,
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        catchAsync(
            async () => {
                const res = await makeRequest({
                    method: "POST",
                    url: API.register,
                    data: payload,
                });

                const { data } = res;

                dispatch(profileLoginAction(data));

                enqueueSnackbar("Account Created Successfully!", {
                    variant: 'rope_snackbar',
                    autoHideDuration: 5000
                });

                router.push('/login');
                setFormData({
                    firstName: '',
                    surname: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                });
            },
            (error: any) => {
                const res: any = error?.response;
                const data = res?.data;

                enqueueSnackbar(data?.message, {
                    variant: 'rope_snackbar',
                    autoHideDuration: 5000,
                    error: true
                });
            }
        );
    };


    const companySize = [
        {
            label: 1
        },
        {
            label: 1
        },
    ];

    return (
        <div className="bg-[#fff] min-h-screen flex p-4">
            <div
                className="relative rounded-[16px] flex-grow h-full w-full overflow-hidden bg-[url('/images/auth-3.jpeg')] min-h-screen p-7"
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

            <div className='bg-white flex flex-col justify-center items-center mx-auto w-full min-h-screen px-28'>
                <form className="w-[100%]" onSubmit={handleSubmit}>
                    <div className="flex items-center mx-auto w-full">
                        <Stepper />
                    </div>
                    <div className="my-7">
                        <h1 className="text-[#0f1625] text-[28px] text-start font-bold font-['Cabinet Grotesk'] leading-loose">Tell us about your company</h1>
                        <div><span className="text-[#313a48] text-base font-normal font-['Cabinet Grotesk'] leading-tight">Please provide details about your business below.</span></div>
                    </div>
                    <div className="space-y-5">
                        <MyTextField
                            id="companyName"
                            name="companyName"
                            label="Company name"
                            placeholder="Enter Company name"
                            value={formData.email}
                            type="text"
                            onChange={handleChange}
                        />
                        <MyTextField
                            id="businessRegistrationNumber"
                            name="businessRegistrationNumber"
                            label="Business registration number"
                            placeholder="Enter business registration number"
                            value={formData.email}
                            type="text"
                            onChange={handleChange}
                        />
                        <div className="space-x-5 flex">
                            <MyTextField
                                id='companySize'
                                name='companySize'
                                label='Company Size'
                                placeholder=''
                                type='text'
                                value={formData.email}
                                onChange={undefined}
                                select
                                required
                            >
                                {companySize.map((size, i) => (
                                    <MenuItem key={i} value={size.label}>
                                        {size.label}
                                    </MenuItem>
                                ))}
                            </MyTextField>
                            <MyTextField
                                id='country'
                                name='country'
                                label='Country'
                                placeholder=''
                                type='text'
                                value={formData.email}
                                onChange={undefined}
                                select
                                required
                            >
                                {companySize.map((size, i) => (
                                    <MenuItem key={i} value={size.label}>
                                        {size.label}
                                    </MenuItem>
                                ))}
                            </MyTextField>
                        </div>
                        <div className="flex space-x-5">
                            <MyTextField
                                id='businessType'
                                name='businessType'
                                label='Business type'
                                placeholder=''
                                type='text'
                                value={formData.email}
                                onChange={undefined}
                                select
                                required
                            >
                                {companySize.map((size, i) => (
                                    <MenuItem key={i} value={size.label}>
                                        {size.label}
                                    </MenuItem>
                                ))}
                            </MyTextField>
                            <MyTextField
                                id='subsidiary'
                                name='subsidiary'
                                label='Do you have a subsidiary company?'
                                placeholder=''
                                type='text'
                                value={formData.email}
                                onChange={undefined}
                                select
                                required
                            >
                                {companySize.map((size, i) => (
                                    <MenuItem key={i} value={size.label}>
                                        {size.label}
                                    </MenuItem>
                                ))}
                            </MyTextField>
                        </div>
                        <MyTextField
                            id="subsidiaryDetail"
                            name="subsidiaryDetail"
                            label="Please enter subsidiary company (details will be required after onboarding)"
                            placeholder=""
                            value={formData.email}
                            type="text"
                            onChange={handleChange}
                        />
                    </div>

                    <button type='submit' className="text-white bg-[#0f1625] w-full py-4 rounded-[8px] text-base font-medium mt-10">
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
}
