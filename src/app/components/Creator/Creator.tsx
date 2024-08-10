import Image from "next/image";
import React from "react";

export default function Creator({ product }: any) {
  return (
    <div className="h-auto p-[20px]">
      <div className="flex flex-col text-center items-center space-y-3 ">
        <div className={`w-[70px] h-[70px] rounded-full bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url('https://images.pexels.com/photos/4127494/pexels-photo-4127494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')` }} />
        {/* <Image
          src={product.imagePath}
          alt=""
          className="w-20 h-20"
          height={500}
          width={500}
        /> */}
        <div className="text-center space-y-5">
          <div>
            <h1 className="text-[#111] md:text-[18px] text-[4.5vw] font-[700] poppins">
              {product.name}
            </h1>
            <p className="text-[#999] md:text-[14px] text-[3vw] font-medium poppins">
              {product.title}
            </p>
          </div>
          <p className="text-center text-[#666] md:text-[15px] text-[3.5vw] font-[400] poppins">
            {product.text}
          </p>
        </div>
      </div>
    </div>
  );
}
