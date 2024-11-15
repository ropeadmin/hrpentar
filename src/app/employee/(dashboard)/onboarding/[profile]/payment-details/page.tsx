"use client";

// import Layout from "../../../component/employeelayout";
import { useState } from "react";
// import Image from "next/image";
import API from "@/constants/api.constant";
import useRequest from "@/services/request.service";
import { catchAsync } from "@/helpers/api.helper";
import MyTextField from "@/app/components/Fields/MyTextField";
import SelectGroup from "@/app/components/Fields/SelectGroup";
import { useSnackbar } from "notistack";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PaymentDetails: React.FC = () => {
  const [personalDetailsForm, setPersonalDetailsForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const { makeRequest, isLoading } = useRequest();
  const { enqueueSnackbar } = useSnackbar();

  // Function to handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      enqueueSnackbar("Please fill all fields!", {
        variant: "rope_snackbar",
        autoHideDuration: 5000,
        error: true,
      });
      return;
    }

    await catchAsync(
      async () => {
        const res = await makeRequest({
          method: "POST",
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
            response?.data?.data?.message || "An error occurred during sign up",
            {
              variant: "rope_snackbar",
              autoHideDuration: 5000,
              error: true,
            }
          );
        } else {
          enqueueSnackbar("A network error occurred!", {
            variant: "rope_snackbar",
            autoHideDuration: 5000,
            error: true,
          });
        }
      }
    );
  };

  return (
    <div className="max-w-[1200px] relative h-full">
      <div className="mt-7">
        <div>
          <h1 className="text-[#0f1625] text-[28px] font-bold font-['Cabinet Grotesk'] leading-loose">
            Payment details
          </h1>
        </div>
        <div>
          <span className="text-[#323B49] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
            This information will be used as your salary account, please make
            sure to fill the correct details.
          </span>
        </div>
      </div>
      <div>
        {/* ACCOUNT DETAILS */}
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="mt-8">
                <h1 className="text-[#0f1625] text-[18px] font-semibold font-['Cabinet Grotesk'] leading-loose">
                  Payment details
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <MyTextField
                  id="account_number"
                  name="account_number"
                  label="Account number"
                  placeholder="Enter account number"
                  type="text"
                  onChange={handleChange}
                />
                <MyTextField
                  id="account_name"
                  name="account_name"
                  label="Account name"
                  placeholder="Enter account name"
                  type="text"
                  onChange={handleChange}
                />
                <MyTextField
                  id="bank_name"
                  name="bank_name"
                  label="Bank name"
                  placeholder="Enter bank name"
                  type="text"
                  onChange={handleChange}
                />
                <SelectGroup
                  id="payment_method"
                  name="payment_method"
                  label="Payment Method"
                  placeholder="Select payment methods"
                  options={[
                    { value: "bank", label: "Bank Transfer" },
                    { value: "crypto", label: "Crypto" },
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
                  Tax & Pension details
                </h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <MyTextField
                  id="pendion_number"
                  name="pension_number"
                  label="Pension number"
                  placeholder="Enter pension number"
                  type="text"
                  onChange={handleChange}
                />
                <MyTextField
                  id="tax_id"
                  name="pax_id"
                  label="Tax ID number"
                  placeholder="Enter Tax ID name"
                  type="text"
                  onChange={handleChange}
                />
                <SelectGroup
                  id="pension_provider"
                  name="pension_provider"
                  label="Pendion provider"
                  placeholder="Select pension provider"
                  options={[
                    { value: "mansard", label: "Mansard" },
                    { value: "stanbic", label: "Stanbic IBTC" },
                  ]}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PaymentDetails;
