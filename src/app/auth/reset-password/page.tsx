"use client"

import MyTextField from "@/app/components/Fields/MyTextField";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import { profileLoginAction } from "@/store/profile.slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function ResetPassword() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { makeRequest, isLoading } = useRequest();
    const [formData, setFormData] = useState({
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        catchAsync(
            async () => {
                const res = await makeRequest({
                    method: 'POST',
                    url: API.resetPassword,
                    data: formData,
                });

                const {data} = res.data;
                localStorage.setItem('user-email', formData.email);

                router.push('/auth/password-link');
            },
            (error: any) => {
                const response = error?.response;
                if (response) {
                    enqueueSnackbar(response?.data?.message || 'An error occurred during login', {
                        variant: 'rope_snackbar',
                        autoHideDuration: 5000,
                        error: true
                    });
                } else {
                    enqueueSnackbar("A network error occurred!", {
                        variant: 'rope_snackbar',
                        autoHideDuration: 5000,
                        error: true
                    });
                }
            }
        );
    };

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
                    <p className="text-white text-base font-medium font-['Cabinet Grotesk'] leading-tight">"PentaHR has revolutionized our HR processes. The intuitive interface and comprehensive features have significantly reduced administrative tasks, allowing us to focus more on employee engagement and development. It's a game-changer for any HR team!”</p>
                    <div className="mt-5">
                        <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">Kolawole Immanuel</div>
                        <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">Payroll Specialist - Mactay Consulting</div>
                    </div>
                </div>
            </div>

            <div className='bg-white flex flex-col justify-center items-center mx-auto w-full min-h-screen px-28'>

                <form className="w-[90%]" onSubmit={handleSubmit}>
                    <div className="mb-10">
                        <h1 className="text-[#0f1625] text-[28px] text-start font-bold font-['Cabinet Grotesk'] leading-loose">Forgot your password</h1>
                        <div className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">Enter your email address and we’ll send you password reset instructions.</div>
                    </div>
                    <div className="space-y-5">
                        <MyTextField
                            id="email"
                            name="email"
                            label="Work Email"
                            placeholder="Work email address"
                            value={formData.email}
                            type="email"
                            onChange={handleChange}
                        />
                    </div>

                    <button type='submit' className="text-white bg-[#0f1625] w-full py-4 rounded-[8px] text-base font-medium mt-10">
                        {isLoading ? 'Sending...' : 'Send reset link'}
                    </button>
                </form>

                <div className="flex justify-end mt-4">
                    <Link
                        href={"/auth/signin"}
                        className="text-[#ef0000] text-sm font-[500] hover:underline underline-offset-4"
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        </div>


    );
}
