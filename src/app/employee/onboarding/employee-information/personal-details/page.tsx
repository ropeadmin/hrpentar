"use client";

import Layout from "../../../component/employeelayout";
import { useRef, useState } from "react";
import Image from "next/image";
import MyTextField from "@/app/components/Fields/MyTextField";
import SelectGroup from "@/app/components/Fields/SelectGroup";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PersonalDetails: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const [personalDetailsForm, setPersonalDetailsForm] = useState({
    first_name: "",
    last_name: "",
  });

  // Function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalDetailsForm({
      ...personalDetailsForm,
      [name]: value,
    });
  };

  return (
    <Layout>
      <div className="max-w-[1200px] relative h-full">
        <div className="mt-7">
          <div>
            <h1 className="text-[#0f1625] text-[28px] font-bold font-['Cabinet Grotesk'] leading-loose">
              Personal details
            </h1>
          </div>
          <div>
            <span className="text-[#323B49] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
              This information is needed to collect basic, address, and
              education details.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-6">
          <div className="w-[123px] border border-[#D0D6DD] rounded-lg relative h-10">
            <div className="w-full">
              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                className="opacity-0 w-full h-full z-[10] cursor-pointer absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            {selectedFile ? (
              <div className="flex items-center gap-2 mt-2 justify-center">
                <span
                  className="text-[#EF0000] font-bold text-base font-['Cabinet Grotesk'] leading-tight"
                  onClick={handleRemoveFile}
                >
                  Remove File
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2 justify-center">
                <Image
                  src="/icons/uploadicon.svg"
                  alt=""
                  width={13}
                  height={13}
                />
                <span className="text-[#323B49] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                  Upload CV
                </span>
              </div>
            )}
          </div>
          <div>
            <span className="text-[#0F1625S] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
              or fill in your information manually.
            </span>
          </div>
        </div>
        <div>
          {/* PERSONAL DETAILS */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="mt-8">
                  <h1 className="text-[#0f1625] text-[18px] font-semibold font-['Cabinet Grotesk'] leading-loose">
                    Personal details
                  </h1>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <MyTextField
                    id="first_name"
                    name="first_name"
                    label="First name"
                    placeholder="Enter first name"
                    type="text"
                    onChange={handleChange}
                  />
                  <MyTextField
                    id="last_name"
                    name="last_name"
                    label="Last name"
                    placeholder="Enter last name"
                    type="text"
                    onChange={handleChange}
                  />
                  <MyTextField
                    id="middle_name"
                    name="middle_name"
                    label="Middle name"
                    placeholder="Enter middle name"
                    type="text"
                    onChange={handleChange}
                  />
                  <MyTextField
                    id="date_of_birth"
                    name="date_of_birth"
                    label="Date of birth"
                    placeholder=""
                    type="date"
                    onChange={handleChange}
                  />
                  <MyTextField
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="Enter email address"
                    type="text"
                    onChange={handleChange}
                  />
                  <MyTextField
                    id="phone_number"
                    name="phone_number"
                    label="Phone number"
                    placeholder="Enter phone number"
                    type="text"
                    onChange={handleChange}
                  />
                  <SelectGroup
                    id="gender"
                    name="gender"
                    label="Gender"
                    placeholder="Select your gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                  />
                  <SelectGroup
                    id="marital_status"
                    name="marital_status"
                    label="Marital Status"
                    placeholder="Select marital status"
                    options={[
                      { value: "married", label: "Married" },
                      { value: "divorced", label: "Divorced" },
                    ]}
                  />
                  <SelectGroup
                    id="religion"
                    name="religion"
                    label="Religion"
                    placeholder="Select religion"
                    options={[
                      { value: "christian", label: "Christian" },
                      { value: "muslim", label: "Muslim" },
                      { value: "trad", label: "Traditional Worshipper" },
                    ]}
                  />
                  <SelectGroup
                    id="nationality"
                    name="nationality"
                    label="Nationality"
                    placeholder="Select nationality"
                    options={[
                      { value: "nigerian", label: "Nigerian" },
                      { value: "korean", label: "Korean" },
                      { value: "ghanian", label: "Ghanian" },
                    ]}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* ADDRESS SECTION */}
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="">
                  <h1 className="text-[#0f1625] text-[18px] font-semibold font-['Cabinet Grotesk'] leading-loose">
                    Address
                  </h1>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-4">
                  <MyTextField
                    id="address"
                    name="address"
                    label="Address"
                    placeholder="Enter address"
                    type="text"
                    onChange={handleChange}
                  />
                  <MyTextField
                    id="city"
                    name="city"
                    label="City"
                    placeholder="Enter city"
                    type="text"
                    onChange={handleChange}
                  />
                  <SelectGroup
                    id="state"
                    name="state"
                    label="State"
                    placeholder="Select your state"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                  />
                  <SelectGroup
                    id="country"
                    name="country"
                    label="Country"
                    placeholder="Select your country"
                    options={[
                      { value: "ng", label: "Nigeria" },
                      { value: "sa", label: "South Africa" },
                    ]}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* EDUCATIONAL BACKGROUND */}
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="">
                  <h1 className="text-[#0f1625] text-[18px] font-semibold font-['Cabinet Grotesk'] leading-loose">
                    Educational Background
                  </h1>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4">
                  <SelectGroup
                    id="educational_level"
                    name="educational_level"
                    label="Highest Level of Education Attained"
                    placeholder="Select your highest education attained"
                    options={[
                      { value: "hnd", label: "Higher National Diploma" },
                      { value: "bsc", label: "Bachelor" },
                      { value: "msc", label: "Masters" },
                      { value: "msc", label: "Phd" },
                    ]}
                  />
                </div>
                {/* FILE UPLOADS */}
                <div className="grid grid-cols-2 gap-4 mt-[24px]">
                  <div>
                    <div className="">
                      <h1 className="text-[#0f1625] text-[16px] font-semibold font-['Cabinet Grotesk'] leading-loose">
                        Upload an evidence of your highest level of education
                      </h1>
                    </div>
                    <div className="w-full border border-[#D0D6DD] rounded-lg relative h-10 mt-[20px]">
                      <div className="w-full">
                        <input
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          type="file"
                          accept=".jpg, .jpeg, .png, .pdf"
                          className="opacity-0 w-full h-full z-[10] cursor-pointer absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        />
                      </div>
                      {selectedFile ? (
                        <div className="flex items-center gap-2 mt-2 justify-center">
                          <span
                            className="text-[#EF0000] font-bold text-base font-['Cabinet Grotesk'] leading-tight"
                            onClick={handleRemoveFile}
                          >
                            Remove File
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-2 justify-center">
                          <Image
                            src="/icons/uploadicon.svg"
                            alt=""
                            width={13}
                            height={13}
                          />
                          <span className="text-[#323B49] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                            Upload file
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="">
                      <h1 className="text-[#0f1625] text-[12px] font-semibold font-['Cabinet Grotesk'] leading-loose">
                        PDF, PNG, JPG. File must not be above 125kb.
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="">
                      <h1 className="text-[#0f1625] text-[16px] font-semibold font-['Cabinet Grotesk'] leading-loose">
                        Upload other relevant certificate
                      </h1>
                    </div>
                    <div className="w-full border border-[#D0D6DD] rounded-lg relative h-10 mt-[20px]">
                      <div className="w-full">
                        <input
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          type="file"
                          accept=".jpg, .jpeg, .png, .pdf"
                          className="opacity-0 w-full h-full z-[10] cursor-pointer absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        />
                      </div>
                      {selectedFile ? (
                        <div className="flex items-center gap-2 mt-2 justify-center">
                          <span
                            className="text-[#EF0000] font-bold text-base font-['Cabinet Grotesk'] leading-tight"
                            onClick={handleRemoveFile}
                          >
                            Remove File
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 mt-2 justify-center">
                          <Image
                            src="/icons/uploadicon.svg"
                            alt=""
                            width={13}
                            height={13}
                          />
                          <span className="text-[#323B49] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                            Upload file
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="">
                      <h1 className="text-[#0f1625] text-[12px] font-semibold font-['Cabinet Grotesk'] leading-loose">
                        PDF, PNG, JPG. File must not be above 125kb.
                      </h1>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </Layout>
  );
};

export default PersonalDetails;
