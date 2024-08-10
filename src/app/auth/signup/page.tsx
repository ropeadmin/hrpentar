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

export default function SignUp() {
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
        <form className="w-[100%]" onSubmit={handleSubmit}>
          <div className="mb-10">
            <h1 className="text-[#0f1625] text-[28px] text-start font-bold font-['Cabinet Grotesk'] leading-loose">Create account</h1>
            <div><span className="text-[#313a48] text-base font-normal font-['Cabinet Grotesk'] leading-tight">By creating a PentaHR account, you are agreeing to our </span><span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] underline leading-tight">Terms of Use</span><span className="text-[#313a48] text-base font-normal font-['Cabinet Grotesk'] leading-tight"> <br />and </span><span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] underline leading-tight">Privacy Policy</span></div>
          </div>
          <div className="space-y-5">
            <div className="space-x-5 flex">
              <MyTextField
                id="firstName"
                name="firstName"
                label="First name"
                placeholder="Enter first name"
                value={formData.email}
                type="text"
                disabled={false}
                onChange={handleChange}
                autoComplete
              />
              <MyTextField
                id="lastName"
                name="lastName"
                label="Last name"
                placeholder="Enter last name"
                value={formData.password}
                type="password"
                disabled={false}
                onChange={handleChange}
                autoComplete
              />
            </div>
            <MyTextField
              id="email"
              name="email"
              label="Work Email"
              placeholder="Work email address"
              value={formData.email}
              type="email"
              disabled={false}
              onChange={handleChange}
              autoComplete
            />
            <MyTextField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone number"
              placeholder="Enter phone number"
              value={formData.email}
              type="tel"
              disabled={false}
              onChange={handleChange}
              autoComplete
            />
            <div className="flex space-x-5">
              <MyTextField
                id="password"
                name="password"
                label="Password"
                placeholder="Enter Password"
                value={formData.password}
                type="password"
                disabled={false}
                onChange={handleChange}
                autoComplete
              />
              <MyTextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                placeholder="Enter Password"
                value={formData.password}
                type="password"
                disabled={false}
                onChange={handleChange}
                autoComplete
              />
            </div>
          </div>

          <button type='submit' className="text-[#a0aec0] bg-[#f0f2f5] w-full py-4 rounded-[8px] text-base font-medium mt-10">
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="font-[400] leading-tight flex justify-center items-center space-x-2 mt-7">
          <p className="text-[#677488] text-sm">Already have an account?</p>
          <span>
            <Link className="text-[#ef0000] hover:underline underline-offset-2 text-sm" href={"/auth/signin"}>
              Login here
            </Link>
          </span>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
