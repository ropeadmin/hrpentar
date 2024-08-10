import Assets from "@/constants/assets.constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <nav className="p-8 z-50 border-b border-[#D0D0D0]">
      <div className="w-full flex justify-between items-center">
        <Link href={"/"}>
          <div>
            <Image
              src={Assets.logo}
              alt="logo"
              width={200}
              height={200}
            />
          </div>
        </Link>

        <div className="hidden md:block">
          <ul className="flex space-x-12 text-odi-lite font-[500] text-[18px] poppins leading-tight whitespace-nowrap">
            <li>
              <Link href="/" className="text-primaryColor">
                Home
              </Link>
            </li>
            <li>
              <Link href="">About</Link>
            </li>
            <li>
              <Link href="">What we offer </Link>
            </li>
            <li>
              <Link href="">Reviews</Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:block">
          <div className="flex justify-center space-x-4 font-[500] poppins">
            <Link href="/login">
              <button className=" text-primaryColor px-10 py-3 rounded-[8px] border border-primaryColor">
                Sign in
              </button>
            </Link>

            <Link href="/signup">
              <button className="text-white px-10 py-3 rounded-[8px] bg-primaryColor">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
