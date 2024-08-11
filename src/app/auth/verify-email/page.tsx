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

export default function VerifyEmail() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { makeRequest, isLoading } = useRequest();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
                const loginRes = await makeRequest({
                    method: 'POST',
                    url: API.login,
                    data: formData,
                });

                const loginData = loginRes.data;

                if (loginData?.token) {
                    localStorage.setItem('auth-token', loginData.token);

                    const sessionRes = await makeRequest({
                        method: 'GET',
                        url: '',
                        headers: {
                            Authorization: `Bearer ${loginData.token}`,
                        },
                    });

                    const sessionData = sessionRes.data;

                    // Combine login data and session data
                    const combinedData = {
                        ...loginData,
                        ...sessionData,
                    };


                    dispatch(profileLoginAction(combinedData));

                    enqueueSnackbar("Account Accessed Successfully!", {
                        variant: 'rope_snackbar',
                        autoHideDuration: 5000,
                    });

                    router.push('/dashboard');
                    setFormData({
                        email: '',
                        password: '',
                    });
                } else {
                    enqueueSnackbar('Login failed. No token received!', {
                        variant: 'rope_snackbar',
                        autoHideDuration: 5000,
                        error: true
                    });
                }
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

            <div className='bg-white mx-auto w-full min-h-screen px-28 flex flex-col justify-center items-center'>

                <div className="w-full flex flex-col justify-center items-start text-start">
                    <img src='/icons/email.svg' width={100} height={100} />
                    <div className="mt-7">
                        <h1 className="text-[#0f1625] text-[32px]  font-bold font-['Cabinet Grotesk'] leading-loose">Verify email</h1>
                        <div className=""><span className="text-[#313a48] text-base font-medium font-['Cabinet Grotesk'] leading-tight">An email has been sent to </span><span className="text-[#0f1625] text-base font-bold font-['Cabinet Grotesk'] leading-tight">kams********@mactay.com</span><span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] leading-tight"> </span><span className="text-[#313a48] text-base font-medium font-['Cabinet Grotesk'] leading-tight">with a link to verify your account.</span></div>
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
