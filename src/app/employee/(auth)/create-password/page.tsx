'use client';

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MyTextField from '@/app/components/Fields/MyTextField';
import { FadeIn } from '@/app/components/Transitions/Transitions';
import PasswordToolTip from '@/app/components/ToolTip/Password';
import Slider from 'react-slick';
import { slides } from '@/utils/dummy';
import { useCreatePasswordMutation } from '@/store/features/employee/employeeService';
import { toast } from 'react-toastify';
import { HTTP_STATUS } from '@/constants/index.constant';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Example password tooltip structure
const initialPasswordTooltip = [
  { title: '8 characters', passed: false },
  { title: 'Uppercase', passed: false },
  { title: 'Lowercase', passed: false },
  { title: 'Special character', passed: false },
];

export default function CreatePassword() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordTooltip, setPasswordTooltip] = useState(
    initialPasswordTooltip
  );
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [createPassword, { isLoading: isCreatePasswordLoading }] =
    useCreatePasswordMutation();

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email')!;
  const token = searchParams.get('token');

  // Function to handle password input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate password complexity
    if (name === 'password') {
      validatePassword(value);
    }
  };
  // Function to validate password and update the tooltip
  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const tooltipUpdates = [
      { title: '8 characters', passed: password.length >= 8 },
      { title: 'Uppercase', passed: /[A-Z]/.test(password) },
      { title: 'Lowercase', passed: /[a-z]/.test(password) },
      {
        title: 'Special character',
        passed: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
    ];
    setPasswordTooltip(tooltipUpdates);
    setIsPasswordValid(
      password.length >= minLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasSpecialChar
    );
  };

  // Testimonials Carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
    arrows: false, // No arrows
    appendDots: (dots: any) => (
      <div className="w-full text-center pb-2">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <button className="w-8 h-8 rounded-full bg-white opacity-50"></button>
    ),
  };

  // Handle Create Password
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(email, token);
    const data = {
      email,
      password: formData.password,
    };

    try {
      await createPassword(data)
        .unwrap()
        .then((res) => {
          res?.status === HTTP_STATUS.SUCCESS &&
            router.push('/employee/create-password-success');
        });
    } catch (error: any) {
      toast.error(error?.data?.data?.message || 'Failed to create password');
    }
  };

  return (
    <div className="bg-white h-screen flex p-4 overflowHidden">
      <div
        className="relative p-[32px] rounded-[16px] flex-grow min-h-full min-w-[47vw] max-w-[47vw] w-[47vw] overflow-hidden bg-[url('/images/mactayhq.svg')]"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="">
          <Image
            src="/pentaHR.svg"
            alt="pentar logo"
            width={150}
            height={150}
          />
        </div>

        <div className="absolute bottom-7 left-7 right-7 h-auto auth-glass p-5">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index}>
                <div>
                  <p className="text-white text-base font-medium leading-tight">
                    {slide.text}
                  </p>
                  <div className="mt-5">
                    <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">
                      {slide.author}
                    </div>
                    <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">
                      {slide.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="bg-white flex flex-col justify-center items-center mx-auto w-full min-h-full">
        <form className="w-[55%]" onSubmit={handleSubmit}>
          <div className="mb-2 text-left">
            <h1 className="text-[#0f1625] text-[28px] font-bold leading-tight">
              Hello, Olayemi Adewale
            </h1>
          </div>
          <div className="mb-7 text-left">
            <span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
              Your admin has invited you as an employee to PentaHR’s portal.
              Please setup your password to continue.
            </span>
          </div>
          <div className="mb-4">
            <MyTextField
              id="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              type="password"
              onChange={handleChange}
            />
            {formData.password.length > 0 && (
              <FadeIn>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {passwordTooltip.map(({ title, passed }, index) => (
                    <PasswordToolTip
                      key={index}
                      title={title}
                      passed={passed}
                    />
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
          <MyTextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            type="password"
            onChange={handleChange}
          />
          <div className="flex items-start gap-2 mt-8 mb-12">
            <input type="checkbox" className="mt-1" />
            <div className="flex-grow">
              <span className="text-[#313a48] text-base font-normal leading-tight">
                I have read and agreed to PentaHR’s{' '}
              </span>
              <span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] underline leading-tight">
                Terms of Use
              </span>
              <span className="text-[#313a48] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                {' '}
                and{' '}
              </span>
              <span className="text-[#0f1625] text-base font-medium font-['Cabinet Grotesk'] underline leading-tight">
                Privacy Policy
              </span>
            </div>
          </div>
          <Button
            type="submit"
            className="bg-[#0f1625] text-white w-full transition-all duration-150 py-[14px] rounded-[8px] text-base font-medium leading-none"
          >
            {isCreatePasswordLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Set Password & Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
