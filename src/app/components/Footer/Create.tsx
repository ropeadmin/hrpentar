import React from "react";

export default function Create() {
  return (
    <>
      <div className="bg-[#fff0ef] mt-28 h-auto space-y-10 flex flex-col justify-center items-center py-14">
        <div className="text-center">
          <h1 className="text-odi md:text-[48px] text-[6vw] text-center font-bold roboto leading-tight">
            Create Your Store, it`s easy.
          </h1>
          <p className="text-odi-lite md:text-[18px] text-[4vw] font-[500] poppins">
            No credit card required
          </p>
        </div>
        <button className="text-white font-bold items-center md:px-20 px-10 py-4 text-[3vw] md:text-[14px]  rounded-md bg-primaryColor mb-14">
          Create your own merch
        </button>
      </div>
    </>
  );
}
