'use client';

import { ChangeEvent, FC, useState } from 'react';
// import Image from "next/image";
import API from '@/constants/api.constant';
import useRequest from '@/services/request.service';
import { catchAsync } from '@/helpers/api.helper';
import MyTextField from '@/app/components/Fields/MyTextField';
import SelectGroup from '@/app/components/Fields/SelectGroup';
import { useSnackbar } from 'notistack';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ContactDetails: FC = () => {
  const [personalDetailsForm, setPersonalDetailsForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const { makeRequest, isLoading } = useRequest();
  const { enqueueSnackbar } = useSnackbar();

  // Function to handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalDetailsForm({
      ...personalDetailsForm,
      [name]: value,
    });
  };

  // Validate Form
  const isFormValid = () => {
    return (
      personalDetailsForm.first_name &&
      personalDetailsForm.last_name &&
      personalDetailsForm.email
    );
  };

  const handleSubmit = async () => {
    // Check if all properties in personalDetailsForm are filled
    const isFormValid = Object.values(personalDetailsForm).every(
      (value) => value.trim() !== ''
    );

    if (!isFormValid) {
      enqueueSnackbar('Please fill all fields!', {
        variant: 'rope_snackbar',
        autoHideDuration: 5000,
        error: true,
      });
      return;
    }

    await catchAsync(
      async () => {
        const res = await makeRequest({
          method: 'POST',
          url: API.register,
          data: personalDetailsForm,
        });

        // Stop execution here and return response data just to let the save and continue state be as it is in figma
        return res.data;
      },
      (error: any) => {
        const response = error?.response;
        if (response) {
          enqueueSnackbar(
            response?.data?.data?.message || 'An error occurred during sign up',
            {
              variant: 'rope_snackbar',
              autoHideDuration: 5000,
              error: true,
            }
          );
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
    <div className="max-w-[1200px] relative h-100vh">
      <div className="mt-7">
        <div>
          <h1 className="text-[#0f1625] text-[28px] font-bold font-['Cabinet Grotesk'] leading-loose">
            Contact details
          </h1>
        </div>
        <div>
          <span className="text-[#323B49] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
            This information is needed in case of emergency, please make sure to
            fill the correct details.
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
                  Emergency contact
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
                  id="phone_number"
                  name="phone_number"
                  label="Phone number"
                  placeholder="Enter phone number"
                  type="text"
                  onChange={handleChange}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* ADDRESS SECTION */}
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="">
                <h1 className="text-[#0f1625] text-[18px] font-semibold font-['Cabinet Grotesk'] leading-loose">
                  Next of Kin
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
                  id="phone_number"
                  name="phone_number"
                  label="Phone number"
                  placeholder="Enter phone number"
                  type="text"
                  onChange={handleChange}
                />
                <SelectGroup
                  id="marital_status"
                  name="marital_status"
                  label="Marital Status"
                  placeholder="Select marital status"
                  options={[
                    { value: 'married', label: 'Married' },
                    { value: 'divorced', label: 'Divorced' },
                  ]}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="absolute bottom-0 right-0 w-[290px] flex items-center justify-end gap-4 p-4">
        <div>
          <button className="rounded-[8px] border text-[#1F2937] py-4 border-[#D0D6DD99] bg-transparent w-[105px] text-center">
            Cancel
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              handleSubmit();
            }}
            className={`${
              !isFormValid()
                ? 'bg-[#f0f2f5] text-[#a0aec0]'
                : 'bg-[#0f1625] text-white'
            } transition-all w-[169px] duration-150 py-[16px] px-5 rounded-[8px] text-base font-medium ${
              isLoading || !isFormValid() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? 'Please wait...' : 'Save & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
