'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slides } from '@/utils/dummy';

export default function CreatePasswordSuccess() {
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

  return (
    <div className="bg-[#fff] h-screen flex p-4 overflowHidden">
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

      <div className="bg-white mx-auto w-full min-h-screen px-28 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center text-center">
          <Image
            src="/icons/success-icon.svg"
            alt="success icon"
            width={70}
            height={70}
          />
          <div className="mt-7">
            <h1 className="text-[#0f1625] text-[28px]  font-bold font-['Cabinet Grotesk'] leading-loose">
              Password Created
            </h1>
            <div className="text-center">
              <span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                Your password has been created successfully.
              </span>
            </div>
            <div className="text-center">
              <span className="text-[#0f1625] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                You can proceed to Login
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/employee/signin"
          className="text-white bg-[#0f1625] w-4/5 py-4 rounded-[8px] text-base font-medium mt-10 text-center"
        >
          Proceed to Login
        </Link>
      </div>
    </div>
  );
}
