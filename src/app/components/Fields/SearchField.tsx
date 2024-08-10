import { SearchFieldProps } from '@/utils/types/types';
import React from 'react';
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchField({ placeholder, value, id, type, onInputChange }: SearchFieldProps) {
  return (
    <div>
      <div className="relative">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onInputChange}
          className="bg-white text-odi md:text-[14px] text-[3vw] rounded-[12px] outline-none md:w-[300px] w-full px-4 py-3"
          placeholder={placeholder}
          autoComplete="off"
        />
        {/* <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
          <IconContext.Provider value={{ color: "#495057", size: "20px" }}>
            <div>
              <AiOutlineSearch />
            </div>
          </IconContext.Provider>
        </div> */}
      </div>
    </div>
  )
}
