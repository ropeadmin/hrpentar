"use client"

import MyTextField from "@/app/components/Fields/MyTextField";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { profileLoginAction } from "@/store/profile.slice";
import useGlobalState from "@/hooks/globalstate.hook";
// import useAuthRedirect from "@/hooks/authredirect.hook";

export default function NewPassword() {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const {profile} = useGlobalState();
    const searchParams = useSearchParams();
    const [decodedToken, setDecodedToken] = useState<any>(null);
    const [token, setToken] = useState<any>('');
    const [generatedToken, setGeneratedToken] = useState<any>('');
    const { makeRequest, isLoading } = useRequest();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });


    useEffect(() => {
        const encodedToken = searchParams.get('token');

        if (encodedToken) {
            setToken(encodedToken);
            try {
                // Decode the token from base64
                const decodedTokenString = atob(encodedToken);

                // Parse the decoded string as a JSON object
                const tokenObject = JSON.parse(decodedTokenString);

                // Set the token object to state
                setDecodedToken(tokenObject);

                // Generate a new token using the parsed token object
                generateToken(tokenObject);
            } catch (error) {
                console.error("Failed to decode or parse the token:", error);
            }
        }
    }, [searchParams]);


    // Generate a JWT token
    const generateToken = async (tokenObject: any) => {
        catchAsync(
            async () => {
                const res = await makeRequest({
                    method: 'POST',
                    url: API.generateToken,
                    data: { email: tokenObject.email, token: tokenObject.token },
                });

                const { data } = res.data;

                dispatch(profileLoginAction(data));
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
    
        // Check if password and confirmPassword match
        if (formData.password !== formData.confirmPassword) {
            enqueueSnackbar('Passwords do not match!', {
                variant: 'rope_snackbar',
                autoHideDuration: 5000,
                error: true,
            });
            return;
        }
    
        const token = profile?.accessToken;
    
        catchAsync(
            async () => {
                await makeRequest({
                    method: 'POST',
                    url: API.changePassword,
                    data: { password: formData.password },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                enqueueSnackbar('Password Reset Successfully!', {
                    variant: 'rope_snackbar',
                    autoHideDuration: 5000,
                });
    
                router.push('/auth/signin');
            },
            (error: any) => {
                const response = error?.response;
                if (response) {
                    enqueueSnackbar(response?.data?.message || 'An error occurred', {
                        variant: 'rope_snackbar',
                        autoHideDuration: 5000,
                        error: true,
                    });
                } else {
                    enqueueSnackbar('A network error occurred!', {
                        variant: 'rope_snackbar',
                        autoHideDuration: 5000,
                        error: true,
                    });
                }
            }
        );
    };
    
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

            <div className='bg-white flex flex-col justify-center items-center mx-auto w-full min-h-screen'>
                <div className="mb-10">
                    <h1 className="text-[#0f1625] text-[28px] text-start font-bold font-['Cabinet Grotesk'] leading-loose">Set new password</h1>
                </div>

                <form className="w-[65%]" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        <MyTextField
                            id="password"
                            name="password"
                            label="Password"
                            placeholder="Enter Password"
                            value={formData.password}
                            type="password"
                            disabled={false}
                            onChange={handleChange}
                        />
                        <MyTextField
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            placeholder="Enter Password"
                            value={formData.confirmPassword}
                            type="password"
                            disabled={false}
                            onChange={handleChange}
                        />
                    </div>

                    <button type='submit' className="text-white bg-[#0f1625] w-full py-4 rounded-[8px] text-base font-medium mt-10">
                        {isLoading ? 'Loading...' : 'Reset password'}
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
