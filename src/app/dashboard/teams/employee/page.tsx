"use client";
import React, { useEffect, useState } from "react";
import CreateEmployeeStepper from "@/app/components/Stepper/CreateEmployeeStepper";
import MyTextField from "@/app/components/Fields/MyTextField";
import { Box, Chip, IconButton, MenuItem } from "@mui/material";
import Image from "next/image";
import { AlertTriangle, ChevronDown, Plus } from "lucide-react";
import { useDropzone } from "react-dropzone";
import useUploadsService from "@/services/uploads.service";
import { FormData } from "@/app/dashboard/teams/employee/types/types";
import {
  branchs,
  cities,
  countries,
  dayOffs,
  departments,
  educations,
  employeeDocuments,
  employeeDocumentsTemplate,
  employeePaymentFrequencies,
  employeePaymentMethods,
  employeePaymentTemplates,
  employeeStatus,
  employments,
  genders,
  jobCadres,
  jobTitles,
  nationalities,
  relationships,
  religions,
  reportTos,
  roles,
  states,
  status,
  workHours,
} from "@/lib/employeeData";

const Employee = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [employeeAddress, setEmployeeAddress] = useState<boolean>(false);
  const [educationDetails, setEducationDetails] = useState<boolean>(false);
  const [uploadedAvatar, setUploadedAvatar] = useState("");
  const [uploadedAvatarName, setUploadedAvatarName] = useState("");
  const {
    uploadFiles,
    imageUploadState: { isLoading: IsLoadingUpload },
  } = useUploadsService();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    gender: "",
    maritalStatus: "",
    religion: "",
    nationality: "",
    countryOfResidence: "",
    address: {
      country: "",
      state: "",
      address: "",
      city: "",
      postalCode: "",
    },
    education: {
      educationLevel: "",
      evidentOfEducation: "",
      certificate: "",
    },
    contract: {
      contractFirstName: "",
      contractLastName: "",
      phoneNumber: "",
      nextOfKin: {
        firstName: "",
        lastName: "",
        phone: "",
        relationship: "",
      },
    },
    jobDetails: {
      employmentType: "",
      department: "",
      employeeId: "",
      workEmail: "",
      jobTitle: "",
      jobCadre: "",
      reportTo: "",
      role: "",
      offDays: [],
      workHourPerDay: "",
      branch: "",
      startDate: "",
      exitDate: "",
      status: "",
    },
    paymentDetails: {
      accountNumber: "",
      accountName: "",
      bankName: "",
      paymentMethod: [],
    },
    salary: {
      paymentFrequency: "",
      paygradeTemplate: "",
      grossSalary: "₦1,000,000.00 - 2,000,000.00",
      netSalary: "",
      benefits: {
        basicEarnings: {
          percentage: "0",
          frequency: "Monthly",
          maxPercentage: "20",
        },
        housing: {
          percentage: "0",
          frequency: "Annually",
          maxPercentage: "12",
        },
        healthInsurance: {
          percentage: "0",
          frequency: "Annually",
          maxPercentage: "12",
        },
        transportAllowance: {
          percentage: "0",
          frequency: "Monthly",
          maxPercentage: "8",
        },
        leaveAllowance: {
          percentage: "0",
          frequency: "Annually",
          maxPercentage: "12",
        },
        thirteenthMonth: {
          percentage: "0",
          frequency: "Fixed",
          maxPercentage: "20",
        },
      },
    },
    document: {
      template: "",
    },
    assets: []
  });

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showBenefitsSection, setShowBenefitsSection] = useState(false);
  const [error, setError] = useState("");
  const [isCalculateEnabled, setIsCalculateEnabled] = useState(false);

  // Check if initial fields are filled
  useEffect(() => {
    if (formData.salary.paymentFrequency && formData.salary.paygradeTemplate) {
      setShowAdditionalFields(true);
    } else {
      setShowAdditionalFields(false);
    }
  }, [formData.salary.paymentFrequency, formData.salary.paygradeTemplate]);

  // Validate net salary and enable/disable calculate button
  useEffect(() => {
    const validateSalaryForm = () => {
      // Check if primary fields are filled
      if (
        !formData.salary.paymentFrequency ||
        !formData.salary.paygradeTemplate
      ) {
        setIsCalculateEnabled(false);
        setShowAdditionalFields(false);
        setShowBenefitsSection(false);
        return;
      }

      setShowAdditionalFields(true);

      // If netSalary is empty, disable calculate button and hide sections
      if (!formData.salary.netSalary) {
        setIsCalculateEnabled(false);
        setError("");
        setShowBenefitsSection(false);
        return;
      }

      // Parse the gross salary range
      const grossRange = formData.salary.grossSalary
        .replace("₦", "")
        .split("-")
        .map((val) => parseFloat(val.replace(/[, ]/g, "")));

      const [minGross, maxGross] = grossRange;

      // Validate net salary amount
      const netAmount = parseFloat(
        formData.salary.netSalary.replace(/[₦,]/g, "")
      );

      if (isNaN(netAmount) || netAmount <= 0) {
        setError("Please enter a valid salary amount");
        setIsCalculateEnabled(false);
        setShowBenefitsSection(false);
      } else if (netAmount > maxGross) {
        setError(
          "The net amount inputted is higher than the limit set for the selected paygrade. Please choose a different paygrade template or create a new one in payroll settings."
        );
        setIsCalculateEnabled(false);
        setShowBenefitsSection(false);
      } else if (netAmount < minGross) {
        setError(
          "The net amount inputted is lower than the minimum limit set for the selected paygrade."
        );
        setIsCalculateEnabled(false);
        setShowBenefitsSection(false);
      } else {
        // Only show benefits section when net salary is within range
        setError("");
        setIsCalculateEnabled(true);
        setShowBenefitsSection(true);
      }
    };

    validateSalaryForm();
  }, [
    formData.salary.paymentFrequency,
    formData.salary.paygradeTemplate,
    formData.salary.netSalary,
    formData.salary.grossSalary,
  ]);

  const handleBenefitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const benefitId = e.target.id as keyof typeof formData.salary.benefits;

    setFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        benefits: {
          ...prev.salary.benefits,
          [benefitId]: {
            ...prev.salary.benefits[benefitId],
            percentage: e.target.checked
              ? prev.salary.benefits[benefitId].maxPercentage
              : "0",
          },
        },
      },
    }));
  };

  const handleBenefitPercentageChange = (
    benefitId: keyof typeof formData.salary.benefits,
    value: string
  ) => {
    // Optional: Add validation to ensure value doesn't exceed maxPercentage
    const maxPercentage = Number(
      formData.salary.benefits[benefitId].maxPercentage
    );
    const newValue =
      Number(value) > maxPercentage ? String(maxPercentage) : value;

    setFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        benefits: {
          ...prev.salary.benefits,
          [benefitId]: {
            ...prev.salary.benefits[benefitId],
            percentage: newValue,
          },
        },
      },
    }));
  };

  const handleBenefitFrequencyChange = (
    benefitId: keyof typeof formData.salary.benefits,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        benefits: {
          ...prev.salary.benefits,
          [benefitId]: {
            ...prev.salary.benefits[benefitId],
            frequency: value,
          },
        },
      },
    }));
  };

  const handleAddNewAllowance = () => {
    // Implement logic for adding new allowance
    // You might want to open a modal or form to collect new allowance details
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleEmployeeAddress = () => {
    setEmployeeAddress(!employeeAddress);
  };

  const handleEducationDetails = () => {
    setEducationDetails(!educationDetails);
  };

  // File Upload
  // Generalized file upload handler
  const handleFileUpload = async (
    files: File[],
    uploadFunction: any,
    onSuccess: (data: any) => Promise<void>
  ) => {
    try {
      // Upload the files using the provided upload function and success callback
      await uploadFiles(files, onSuccess);
    } catch (error) {
      console.log("File upload failed:", error);
    }
  };

  // onSuccess callback for regular file upload
  const onFileUploadSuccess = async (uploadedData: any) => {
    const uploadedFile = uploadedData?.data[0]?.location;
    const uploadedFileName = uploadedData?.data[0]?.fileName;

    // Update the regular file state
    setUploadedAvatar(uploadedFile);
    setUploadedAvatarName(uploadedFileName);
  };

  // Dropzone for regular files
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) =>
      handleFileUpload(acceptedFiles, uploadFiles, onFileUploadSuccess),
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      let currentLevel: any = updatedFormData;

      // Traverse each key except the last one to reach the correct level
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];

        // Initialize nested object if it doesn't exist
        if (!currentLevel[key]) {
          currentLevel[key] = {};
        }

        currentLevel = currentLevel[key];
      }
      currentLevel[keys[keys.length - 1]] = value;

      return updatedFormData;
    });
  };

 const handleSalaryCalculation = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    
    // Validate all required fields are filled
    if (
      !formData.salary.paymentFrequency ||
      !formData.salary.paygradeTemplate ||
      !formData.salary.netSalary
    ) {
      setError("Please fill all required fields");
      return;
    }

    // salary calculation logic here
    
    // After successful calculation:
    nextStep(); // This will move to the next step (documents)
  };

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If we're on the salary calculation step, don't proceed automatically
    if (currentStep === 4) {
      return;
    }
    
    // For all other steps
    console.log(formData);
    if (currentStep < 6) {
      nextStep();
    } else {
      // Handle final form submission
      console.log('Form submitted:', formData);
      // Add your submission logic here
    }
  };

  const handleOffDaysChange = (event: { target: { value: any } }) => {
    const value = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      jobDetails: {
        ...prevData.jobDetails,
        offDays: typeof value === "string" ? value.split(",") : value,
      },
    }));
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-3xl font-bold text-gray-900">Add employee</h2>
      <p className="text-lg text-gray-500 mb-4">
        Please provide employee details below.
      </p>
      <div className="flex-1 flex flex-col xl:flex-row gap-6 p-4">
        {/* Stepper on the left */}
        <div className="w-full xl:w-1/5 flex flex-col gap-8">
          <CreateEmployeeStepper currentStep={currentStep} />
        </div>
        {/* form at the right */}
        <div className="w-full xl:w-10/12 md:mx-auto md:flex md:pl-8">
          <div className="w-full max-w-4xl">
            {/* Form */}
            <form
              className="w-[100%] overflow-auto remove-scroll-bar"
              onSubmit={currentStep === 4 ? handleSalaryCalculation : handleSubmit}
            >
              {/* step 1  */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h1 className="text-xl font-semibold">Personal details</h1>
                  <div className="space-y-6 overflow-auto remove-scroll-bar h-100%">
                    <div className="grid grid-cols-2 gap-5">
                      <MyTextField
                        id="firstName"
                        name="firstName"
                        label="First name"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                      />

                      <MyTextField
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                      />

                      <MyTextField
                        id="middleName"
                        name="middleName"
                        label="Middle name"
                        placeholder="Enter your middle name"
                        value={formData.middleName}
                        onChange={handleChange}
                        type="text"
                      />

                      <MyTextField
                        id="dateOfBirth"
                        name="dateOfBirth"
                        label="Date of birth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        placeholder={""}
                      />
                      <MyTextField
                        id="email"
                        name="email"
                        label="Email address"
                        placeholder="work@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                      />

                      <MyTextField
                        id="phone"
                        name="phone"
                        label="Phone number"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        type="text"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <MyTextField
                        id="gender"
                        name="gender"
                        label="Gender"
                        placeholder=""
                        type="text"
                        value={formData.gender}
                        onChange={handleChange}
                        select
                        required
                      >
                        {genders.map((gender, i) => (
                          <MenuItem key={i} value={gender}>
                            {gender}
                          </MenuItem>
                        ))}
                      </MyTextField>

                      <MyTextField
                        id="maritalStatus"
                        name="maritalStatus"
                        label="Marital status"
                        placeholder=""
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        type="text"
                        select
                        required
                      >
                        {status.map((statu, i) => (
                          <MenuItem key={i} value={statu}>
                            {statu}
                          </MenuItem>
                        ))}
                      </MyTextField>

                      <MyTextField
                        id="religion"
                        name="religion"
                        label="Religion"
                        placeholder=""
                        type="text"
                        value={formData.religion}
                        onChange={handleChange}
                        select
                        required
                      >
                        {religions.map((religion, i) => (
                          <MenuItem key={i} value={religion}>
                            {religion}
                          </MenuItem>
                        ))}
                      </MyTextField>

                      <MyTextField
                        id="nationality"
                        name="nationality"
                        label="Nationality"
                        placeholder=""
                        type="text"
                        value={formData.nationality}
                        onChange={handleChange}
                        select
                        required
                      >
                        {nationalities.map((nationality, i) => (
                          <MenuItem key={i} value={nationality}>
                            {nationality}
                          </MenuItem>
                        ))}
                      </MyTextField>
                    </div>
                    <div className="w-full border border-gray-100 my-14"></div>
                  </div>

                  {/* address  */}
                  <div className="pb-[32px]">
                    <div className="flex justify-between items-center py-[32px]">
                      <div>
                        <h1 className="text-[18px] font-[700] text-[#0F1625]">
                          Address
                        </h1>
                      </div>
                      <IconButton onClick={handleEmployeeAddress}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                        >
                          <path
                            d="M1 6.5L5.29289 2.20711C5.62623 1.87377 5.79289 1.70711 6 1.70711C6.20711 1.70711 6.37377 1.87377 6.70711 2.20711L11 6.5"
                            stroke="#0F1625"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </IconButton>
                    </div>

                    {/* Company Address Dropdown */}
                    {employeeAddress && (
                      <div className="space-y-6">
                        <div className="flex flex-col space-y-6 overflow-auto remove-scroll-bar h-auto">
                          <div className="grid grid-cols-2 gap-5">
                            <MyTextField
                              id="country"
                              name="address.country"
                              label="Country of residence"
                              placeholder="Country"
                              value={formData.address.country}
                              onChange={handleChange}
                              type="text"
                              select
                              required
                            >
                              {countries.map((country, i) => (
                                <MenuItem key={i} value={country}>
                                  {country}
                                </MenuItem>
                              ))}
                            </MyTextField>
                            <MyTextField
                              id="state"
                              name="address.state"
                              label="State"
                              placeholder=""
                              value={formData.address.state}
                              onChange={handleChange}
                              type="text"
                              select
                              required
                            >
                              {states.map((state, i) => (
                                <MenuItem key={i} value={state}>
                                  {state}
                                </MenuItem>
                              ))}
                            </MyTextField>
                          </div>
                          <div className="w-full">
                            <MyTextField
                              id="address"
                              name="address.address"
                              label="Address"
                              placeholder="No 9b Ikeja Lagos state"
                              type="text"
                              value={formData.address.address}
                              onChange={handleChange}
                            ></MyTextField>
                          </div>

                          <div className="grid grid-cols-2 gap-5">
                            <MyTextField
                              id="city"
                              name="address.city"
                              label="City"
                              placeholder=""
                              type="text"
                              value={formData.address.city}
                              onChange={handleChange}
                              select
                              required
                            >
                              {cities.map((city, i) => (
                                <MenuItem key={i} value={city}>
                                  {city}
                                </MenuItem>
                              ))}
                            </MyTextField>
                            <MyTextField
                              id="postalCode"
                              name="address.postalCode"
                              label="Postal code"
                              placeholder="Postal code here"
                              value={formData.address.postalCode}
                              onChange={handleChange}
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="w-full border border-gray-100 my-14"></div>

                  {/* education  */}
                  <div className="pb-[32px]">
                    <div className="flex justify-between items-center py-[32px]">
                      <div>
                        <h1 className="text-[18px] font-[700] text-[#0F1625]">
                          Education details
                        </h1>
                      </div>
                      <IconButton onClick={handleEducationDetails}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="8"
                          viewBox="0 0 12 8"
                          fill="none"
                        >
                          <path
                            d="M1 6.5L5.29289 2.20711C5.62623 1.87377 5.79289 1.70711 6 1.70711C6.20711 1.70711 6.37377 1.87377 6.70711 2.20711L11 6.5"
                            stroke="#0F1625"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </IconButton>
                    </div>

                    {/* education Dropdown */}
                    {educationDetails && (
                      <div className="space-y-6">
                        <div className="flex flex-col space-y-6 overflow-auto remove-scroll-bar h-auto">
                          <div className="w-full">
                            <MyTextField
                              id="educationLevel"
                              name="education.educationLevel"
                              label="Highest level of education"
                              placeholder=""
                              type="text"
                              value={formData.education.educationLevel}
                              onChange={handleChange}
                              select
                              required
                            >
                              {educations.map((education, i) => (
                                <MenuItem key={i} value={education}>
                                  {education}
                                </MenuItem>
                              ))}
                            </MyTextField>
                          </div>

                          <div className="grid grid-cols-2 gap-5">
                            <div>
                              <h3 className="text-[3.5vw] sm:text-[14px] font-semibold mb-[5px] text-[#0F1625]">
                                Upload an evidence of your highest level of
                                education
                              </h3>
                              <div
                                {...getRootProps()}
                                className={`w-full rounded-[8px] border border-[#D0D6DD] flex justify-center items-center gap-2 py-[10px] cursor-pointer ${
                                  isDragActive ? "bg-gray-100" : ""
                                }`}
                              >
                                <input {...getInputProps()} />
                                <Image
                                  src="/icons/upload.svg"
                                  width={20}
                                  height={20}
                                  alt="upload"
                                />
                                {isDragActive ? (
                                  <p>Drop the files here ...</p>
                                ) : (
                                  <p>Upload file</p>
                                )}
                              </div>
                              <p className="mt-[7px] text-[12px] font-[700] text-[#1F2937]">
                                PDF, PNG, JPG (max. 800 x 400px).
                              </p>
                            </div>

                            <div>
                              <h3 className="text-[3.5vw] sm:text-[14px] font-semibold mb-[5px] text-[#0F1625]">
                                Upload other relevant certicate
                              </h3>
                              <div
                                {...getRootProps()}
                                className={`w-full rounded-[8px] border border-[#D0D6DD] flex justify-center items-center gap-2 py-[10px] cursor-pointer ${
                                  isDragActive ? "bg-gray-100" : ""
                                }`}
                              >
                                <input {...getInputProps()} />
                                <Image
                                  src="/icons/upload.svg"
                                  width={20}
                                  height={20}
                                  alt="upload"
                                />
                                {isDragActive ? (
                                  <p>Drop the files here ...</p>
                                ) : (
                                  <p>Upload file</p>
                                )}
                              </div>
                              <p className="mt-[7px] text-[12px] font-[700] text-[#1F2937]">
                                PDF, PNG, JPG (max. 800 x 400px).
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 1 && (
                <div className="space-y-5 overflow-auto remove-scroll-bar">
                  {/* contract details  */}
                  <div className="mt-4">
                    {/* emergency contact  */}
                    <h1 className="py-5 text-xl font-semibold">
                      Emergency contract
                    </h1>
                    <div className="space-y-6 overflow-auto remove-scroll-bar h-auto">
                      <div className="grid grid-cols-2 gap-5">
                        <MyTextField
                          id="contractFirstName"
                          name="contract.contractFirstName"
                          label="First name"
                          placeholder="Enter first name"
                          value={formData.contract.contractFirstName}
                          onChange={handleChange}
                          type="text"
                          required
                        />

                        <MyTextField
                          id="contractLastName"
                          name="contract.contractLastName"
                          label="Last name"
                          placeholder="Enter last name"
                          value={formData.contract.contractLastName}
                          onChange={handleChange}
                          type="text"
                        />

                        <MyTextField
                          id="phoneNumber"
                          name="contract.phoneNumber"
                          label="Phone number"
                          placeholder="+194 23461 23"
                          value={formData.contract.phoneNumber}
                          onChange={handleChange}
                          type="text"
                        />
                      </div>
                    </div>

                    {/* next of kin  */}
                    <h1 className="py-5 text-xl font-semibold">Next of kin</h1>
                    <div className="space-y-6 overflow-auto remove-scroll-bar h-auto">
                      <div className="grid grid-cols-2 gap-5">
                        <MyTextField
                          id="nextOfKin.firstName"
                          name="contract.nextOfKin.firstName"
                          label="First name"
                          placeholder="Enter next of kin first name"
                          value={formData.contract.nextOfKin.firstName}
                          onChange={handleChange}
                          type="text"
                        />

                        <MyTextField
                          id="nextOfKin.lastName"
                          name="contract.nextOfKin.lastName"
                          label="Last name"
                          placeholder="Enter last name"
                          value={formData.contract.nextOfKin.lastName}
                          onChange={handleChange}
                          type="text"
                        />

                        <MyTextField
                          id="nextOfKin.phone"
                          name="contract.nextOfKin.phone"
                          label="Phone number"
                          placeholder="Phone number"
                          value={formData.contract.nextOfKin.phone}
                          onChange={handleChange}
                          type="text"
                        />

                        <MyTextField
                          id="nextOfKin.relationship"
                          name="contract.nextOfKin.relationship"
                          label="Relationship"
                          placeholder=""
                          value={formData.contract.nextOfKin.relationship}
                          onChange={handleChange}
                          type="text"
                          select
                          required
                        >
                          {relationships.map((relationship, i) => (
                            <MenuItem key={i} value={relationship}>
                              {relationship}
                            </MenuItem>
                          ))}
                        </MyTextField>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 2 && (
                <div className="space-y-8 overflow-auto remove-scroll-bar">
                  <h1 className="text-xl font-semibold">Job details</h1>
                  <div className="space-y-8 overflow-auto remove-scroll-bar h-auto">
                    <div className="grid grid-cols-2 gap-5">
                      <MyTextField
                        id="employmentType"
                        name="jobDetails.employmentType"
                        label="Employment type"
                        placeholder=""
                        type="text"
                        value={formData.jobDetails.employmentType}
                        onChange={handleChange}
                        select
                        required
                      >
                        {employments.map((employment, i) => (
                          <MenuItem key={i} value={employment}>
                            {employment}
                          </MenuItem>
                        ))}
                      </MyTextField>
                      <MyTextField
                        id="department"
                        name="jobDetails.department"
                        label="Department"
                        placeholder=""
                        value={formData.jobDetails.department}
                        onChange={handleChange}
                        type="text"
                        select
                        required
                      >
                        {departments.map((department, i) => (
                          <MenuItem key={i} value={department}>
                            {department}
                          </MenuItem>
                        ))}
                      </MyTextField>

                      <MyTextField
                        id="employeeId"
                        name="jobDetails.employeeId"
                        label="Employee ID"
                        placeholder=""
                        type="text"
                        value={formData.jobDetails.employeeId}
                        onChange={handleChange}
                        required
                      />
                      <MyTextField
                        id="workEmail"
                        name="jobDetails.workEmail"
                        label="Work email address"
                        placeholder="work@gmail.com"
                        value={formData.jobDetails.workEmail}
                        onChange={handleChange}
                        type="text"
                        required
                      />

                      <MyTextField
                        id="jobTitle"
                        name="jobDetails.jobTitle"
                        label="Job title"
                        placeholder=""
                        type="text"
                        value={formData.jobDetails.jobTitle}
                        onChange={handleChange}
                        select
                        required
                      >
                        {jobTitles.map((jobTitle, i) => (
                          <MenuItem key={i} value={jobTitle}>
                            {jobTitle}
                          </MenuItem>
                        ))}
                      </MyTextField>
                      <MyTextField
                        id="jobCadre"
                        name="jobDetails.jobCadre"
                        label="Job cadre"
                        placeholder=""
                        value={formData.jobDetails.jobCadre}
                        onChange={handleChange}
                        type="text"
                        select
                        required
                      >
                        {jobCadres.map((jobCadre, i) => (
                          <MenuItem key={i} value={jobCadre}>
                            {jobCadre}
                          </MenuItem>
                        ))}
                      </MyTextField>

                      <MyTextField
                        id="reportTo"
                        name="jobDetails.reportTo"
                        label="Reports to"
                        placeholder=""
                        type="text"
                        value={formData.jobDetails.reportTo}
                        onChange={handleChange}
                        select
                        required
                      >
                        {reportTos.map((reportTo, i) => (
                          <MenuItem key={i} value={reportTo}>
                            {reportTo}
                          </MenuItem>
                        ))}
                      </MyTextField>
                      <MyTextField
                        id="role"
                        name="jobDetails.role"
                        label="Role"
                        placeholder=""
                        value={formData.jobDetails.role}
                        onChange={handleChange}
                        type="text"
                        select
                        required
                      >
                        {roles.map((role, i) => (
                          <MenuItem key={i} value={role}>
                            {role}
                          </MenuItem>
                        ))}
                      </MyTextField>

                      <MyTextField
                        id="offDays"
                        name="jobDetails.offDays"
                        label="Off days"
                        placeholder=""
                        select
                        value={formData.jobDetails.offDays || []}
                        onChange={handleOffDaysChange}
                        SelectProps={{
                          multiple: true,
                          renderValue: (selected: any[]) => (
                            <Box
                              sx={{
                                display: "flex",
                                gap: 0.5,
                                flexWrap: "wrap",
                              }}
                            >
                              {selected.map(
                                (
                                  value:
                                    | boolean
                                    | React.ReactElement<
                                        any,
                                        | string
                                        | React.JSXElementConstructor<any>
                                      >
                                    | Iterable<React.ReactNode>
                                    | Promise<React.AwaitedReactNode>
                                    | React.Key
                                    | null
                                    | undefined
                                ) => (
                                  <Chip key={value} label={value} />
                                )
                              )}
                            </Box>
                          ),
                        }}
                        fullWidth
                      >
                        {dayOffs.map((dayOff, index) => (
                          <MenuItem key={index} value={dayOff}>
                            {dayOff}
                          </MenuItem>
                        ))}
                      </MyTextField>

                      <MyTextField
                        id="workHourPerDay"
                        name="jobDetails.workHourPerDay"
                        label="Daily work hours per day"
                        placeholder=""
                        value={formData.jobDetails.workHourPerDay}
                        onChange={handleChange}
                        type="text"
                        select
                        required
                      >
                        {workHours.map((workHour, i) => (
                          <MenuItem key={i} value={workHour}>
                            {workHour}
                          </MenuItem>
                        ))}
                      </MyTextField>

                      <MyTextField
                        id="branch"
                        name="jobDetails.branch"
                        label="Branch"
                        placeholder=""
                        type="text"
                        value={formData.jobDetails.branch}
                        onChange={handleChange}
                        select
                        required
                      >
                        {branchs.map((branch, i) => (
                          <MenuItem key={i} value={branch}>
                            {branch}
                          </MenuItem>
                        ))}
                      </MyTextField>

                      <MyTextField
                        id="startDate"
                        name="jobDetails.startDate"
                        label="Start date"
                        placeholder=""
                        value={formData.jobDetails.startDate}
                        onChange={handleChange}
                        type="date"
                        required
                      />

                      <MyTextField
                        id="exitDate"
                        name="jobDetails.exitDate"
                        label="Exit date"
                        placeholder=""
                        value={formData.jobDetails.exitDate}
                        onChange={handleChange}
                        type="date"
                        required
                      />
                      <MyTextField
                        id="status"
                        name="jobDetails.status"
                        label="Status"
                        placeholder=""
                        type="text"
                        value={formData.jobDetails.status}
                        onChange={handleChange}
                        select
                        required
                      >
                        {employeeStatus.map((employeeStatu, i) => (
                          <MenuItem key={i} value={employeeStatu}>
                            {employeeStatu}
                          </MenuItem>
                        ))}
                      </MyTextField>
                    </div>
                  </div>

                  <div className="w-full border border-gray-100 my-14"></div>
                </div>
              )}

              {/* Step 4 */}
              {currentStep === 3 && (
                <div className="space-y-8 overflow-auto remove-scroll-bar">
                  <h1 className="text-xl font-semibold">Payment details</h1>
                  <div className="space-y-8 overflow-auto remove-scroll-bar h-auto">
                    <div className="grid grid-cols-2 gap-5">
                      <MyTextField
                        id="accountNumber"
                        name="paymentDetails.accountNumber"
                        label="Account number"
                        placeholder="Enter account number"
                        type="text"
                        value={formData.paymentDetails.accountNumber}
                        onChange={handleChange}
                        required
                      />
                      <MyTextField
                        id="accountName"
                        name="paymentDetails.accountName"
                        label="Account name"
                        placeholder="Enter account name"
                        value={formData.paymentDetails.accountName}
                        onChange={handleChange}
                        type="text"
                        required
                      />

                      <MyTextField
                        id="bankName"
                        name="paymentDetails.bankName"
                        label="Bank name"
                        placeholder="Enter bank name"
                        type="text"
                        value={formData.paymentDetails.bankName}
                        onChange={handleChange}
                        required
                      />
                      <MyTextField
                        id="paymentMethod"
                        name="paymentDetails.paymentMethod"
                        label="Payment methods"
                        placeholder=""
                        value={formData.paymentDetails.paymentMethod}
                        onChange={handleChange}
                        type="text"
                        select
                        required
                      >
                        {employeePaymentMethods.map(
                          (employeePaymentMethod, i) => (
                            <MenuItem key={i} value={employeePaymentMethod}>
                              {employeePaymentMethod}
                            </MenuItem>
                          )
                        )}
                      </MyTextField>
                    </div>

                    <div className="w-full border border-gray-100 my-14"></div>
                  </div>
                </div>
              )}

              {/* Step 5 */}
              {currentStep === 4 && (
                <div className="space-y-8 overflow-auto remove-scroll-bar">
                  <h1 className="text-xl font-semibold">Salary</h1>
                  <div className="space-y-8 overflow-auto remove-scroll-bar h-auto">
                    <div className="grid grid-cols-2 gap-5">
                      <MyTextField
                        id="paymentFrequency"
                        name="salary.paymentFrequency"
                        label="Select payment frequency"
                        placeholder=""
                        type="text"
                        value={formData.salary.paymentFrequency}
                        onChange={handleChange}
                        select
                        required
                      >
                        {employeePaymentFrequencies.map(
                          (employeePaymentFrequency, i) => (
                            <MenuItem key={i} value={employeePaymentFrequency}>
                              {employeePaymentFrequency}
                            </MenuItem>
                          )
                        )}
                      </MyTextField>

                      <MyTextField
                        id="paygradeTemplate"
                        name="salary.paygradeTemplate"
                        label="Select paygrade template"
                        placeholder=""
                        value={formData.salary.paygradeTemplate}
                        onChange={handleChange}
                        type="text"
                        select
                        required
                      >
                        {employeePaymentTemplates.map(
                          (employeePaymentTemplate, i) => (
                            <MenuItem key={i} value={employeePaymentTemplate}>
                              {employeePaymentTemplate}
                            </MenuItem>
                          )
                        )}
                      </MyTextField>

                      {/* next step after filling the above forms  */}
                      {showAdditionalFields && (
                        <>
                          <MyTextField
                            id="grossSalary"
                            name="salary.grossSalary"
                            label="Annual gross salary"
                            placeholder=""
                            type="text"
                            value={formData.salary.grossSalary}
                            onChange={handleChange}
                            readOnly
                            disabled
                          />
                          <MyTextField
                            id="netSalary"
                            name="salary.netSalary"
                            label="Net salary amount"
                            placeholder=""
                            value={formData.salary.netSalary}
                            onChange={handleChange}
                            type="text"
                            required
                          />
                        </>
                      )}
                    </div>
                    <div className="w-full">
                      {error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
                          <div className="flex items-start">
                            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                            <div className="ml-3">
                              <p className="text-sm text-red-800">{error}</p>
                              <a
                                href="/payroll-configuration"
                                className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                              >
                                Go to payroll configuration
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {showBenefitsSection && (
                        <div className="space-y-4 mt-8">
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium">
                              Benefits & Allowances
                            </h2>
                            <button
                              type="button"
                              onClick={() => {
                                /* Toggle expansion logic */
                              }}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </button>
                          </div>

                          <p className="text-sm text-gray-600">
                            Select and configure benefits and allowances for the
                            selected paygrade (
                            {formData.salary.paygradeTemplate}).
                          </p>

                          <div className="grid grid-cols-2 gap-6 space-y-4">
                            {/* Basic Earnings */}
                            <div className="flex items-center gap-4">
                              <input
                                type="checkbox"
                                id="basicEarnings"
                                checked={
                                  formData.salary.benefits.basicEarnings
                                    .percentage !== "0"
                                }
                                onChange={handleBenefitChange}
                                className={`rounded border-gray-300 ${
                                  formData.salary.benefits.basicEarnings
                                    .percentage !== "0"
                                    ? "accent-red-500 checked:border-red-500"
                                    : ""
                                }`}
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor="basicEarnings"
                                  className="text-sm font-medium"
                                >
                                  Basic earnings
                                </label>
                                <p className="text-xs text-gray-500">
                                  Max. percentage:{" "}
                                  {
                                    formData.salary.benefits.basicEarnings
                                      .maxPercentage
                                  }
                                  %
                                </p>
                              </div>
                              <input
                                type="text"
                                value={
                                  formData.salary.benefits.basicEarnings
                                    .percentage
                                }
                                onChange={(e) =>
                                  handleBenefitPercentageChange(
                                    "basicEarnings",
                                    e.target.value
                                  )
                                }
                                className="w-16 p-2 border rounded"
                              />
                              <select
                                value={
                                  formData.salary.benefits.basicEarnings
                                    .frequency
                                }
                                onChange={(e) =>
                                  handleBenefitFrequencyChange(
                                    "basicEarnings",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              >
                                <option value="Monthly">Monthly</option>
                                <option value="Annually">Annually</option>
                              </select>
                            </div>

                            {/* Housing */}
                            <div className="flex items-center gap-4">
                              <input
                                type="checkbox"
                                id="housing"
                                checked={
                                  formData.salary.benefits.housing
                                    .percentage !== "0"
                                }
                                onChange={handleBenefitChange}
                                className={`rounded border-gray-300 ${
                                  formData.salary.benefits.housing
                                    .percentage !== "0"
                                    ? "accent-red-500 border-red-500"
                                    : ""
                                }`}
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor="housing"
                                  className="text-sm font-medium"
                                >
                                  Housing
                                </label>
                                <p className="text-xs text-gray-500">
                                  Max. percentage:{" "}
                                  {
                                    formData.salary.benefits.housing
                                      .maxPercentage
                                  }
                                  %
                                </p>
                              </div>
                              <input
                                type="text"
                                value={
                                  formData.salary.benefits.housing.percentage
                                }
                                onChange={(e) =>
                                  handleBenefitPercentageChange(
                                    "housing",
                                    e.target.value
                                  )
                                }
                                className="w-16 p-2 border rounded"
                              />
                              <select
                                value={
                                  formData.salary.benefits.housing.frequency
                                }
                                onChange={(e) =>
                                  handleBenefitFrequencyChange(
                                    "housing",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              >
                                <option value="Monthly">Monthly</option>
                                <option value="Annually">Annually</option>
                              </select>
                            </div>

                            {/* Health Insurance */}
                            <div className="flex items-center gap-4">
                              <input
                                type="checkbox"
                                id="healthInsurance"
                                checked={
                                  formData.salary.benefits.healthInsurance
                                    .percentage !== "0"
                                }
                                onChange={handleBenefitChange}
                                className={`rounded border-gray-300 ${
                                  formData.salary.benefits.healthInsurance
                                    .percentage !== "0"
                                    ? "accent-red-500 border-red-500"
                                    : ""
                                }`}
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor="healthInsurance"
                                  className="text-sm font-medium"
                                >
                                  Health insurance
                                </label>
                                <p className="text-xs text-gray-500">
                                  Max. percentage:{" "}
                                  {
                                    formData.salary.benefits.healthInsurance
                                      .maxPercentage
                                  }
                                  %
                                </p>
                              </div>
                              <input
                                type="text"
                                value={
                                  formData.salary.benefits.healthInsurance
                                    .percentage
                                }
                                onChange={(e) =>
                                  handleBenefitPercentageChange(
                                    "healthInsurance",
                                    e.target.value
                                  )
                                }
                                className="w-16 p-2 border rounded"
                              />
                              <select
                                value={
                                  formData.salary.benefits.healthInsurance
                                    .frequency
                                }
                                onChange={(e) =>
                                  handleBenefitFrequencyChange(
                                    "healthInsurance",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              >
                                <option value="Monthly">Monthly</option>
                                <option value="Annually">Annually</option>
                              </select>
                            </div>

                            {/* Transport Allowance */}
                            <div className="flex items-center gap-4">
                              <input
                                type="checkbox"
                                id="transportAllowance"
                                checked={
                                  formData.salary.benefits.transportAllowance
                                    .percentage !== "0"
                                }
                                onChange={handleBenefitChange}
                                className={`rounded border-gray-300 ${
                                  formData.salary.benefits.transportAllowance
                                    .percentage !== "0"
                                    ? "accent-red-500 border-red-500"
                                    : ""
                                }`}
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor="transportAllowance"
                                  className="text-sm font-medium"
                                >
                                  Transport allowance
                                </label>
                                <p className="text-xs text-gray-500">
                                  Max. percentage:{" "}
                                  {
                                    formData.salary.benefits.transportAllowance
                                      .maxPercentage
                                  }
                                  %
                                </p>
                              </div>
                              <input
                                type="text"
                                value={
                                  formData.salary.benefits.transportAllowance
                                    .percentage
                                }
                                onChange={(e) =>
                                  handleBenefitPercentageChange(
                                    "transportAllowance",
                                    e.target.value
                                  )
                                }
                                className="w-16 p-2 border rounded"
                              />
                              <select
                                value={
                                  formData.salary.benefits.transportAllowance
                                    .frequency
                                }
                                onChange={(e) =>
                                  handleBenefitFrequencyChange(
                                    "transportAllowance",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              >
                                <option value="Monthly">Monthly</option>
                                <option value="Annually">Annually</option>
                              </select>
                            </div>

                            {/* Leave Allowance */}
                            <div className="flex items-center gap-4">
                              <input
                                type="checkbox"
                                id="leaveAllowance"
                                checked={
                                  formData.salary.benefits.leaveAllowance
                                    .percentage !== "0"
                                }
                                onChange={handleBenefitChange}
                                className={`rounded border-gray-300 ${
                                  formData.salary.benefits.leaveAllowance
                                    .percentage !== "0"
                                    ? "accent-red-500 border-red-500"
                                    : ""
                                }`}
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor="leaveAllowance"
                                  className="text-sm font-medium"
                                >
                                  Leave allowance
                                </label>
                                <p className="text-xs text-gray-500">
                                  Max. percentage:{" "}
                                  {
                                    formData.salary.benefits.leaveAllowance
                                      .maxPercentage
                                  }
                                  %
                                </p>
                              </div>
                              <input
                                type="text"
                                value={
                                  formData.salary.benefits.leaveAllowance
                                    .percentage
                                }
                                onChange={(e) =>
                                  handleBenefitPercentageChange(
                                    "leaveAllowance",
                                    e.target.value
                                  )
                                }
                                className="w-16 p-2 border rounded"
                              />
                              <select
                                value={
                                  formData.salary.benefits.leaveAllowance
                                    .frequency
                                }
                                onChange={(e) =>
                                  handleBenefitFrequencyChange(
                                    "leaveAllowance",
                                    e.target.value
                                  )
                                }
                                className="p-2 border rounded"
                              >
                                <option value="Monthly">Monthly</option>
                                <option value="Annually">Annually</option>
                              </select>
                            </div>

                            {/* 13th Month */}
                            <div className="flex items-center gap-4">
                              <input
                                type="checkbox"
                                id="thirteenthMonth"
                                checked={
                                  formData.salary.benefits.thirteenthMonth
                                    .percentage !== "0"
                                }
                                onChange={handleBenefitChange}
                                className={`rounded border-gray-300 ${
                                  formData.salary.benefits.thirteenthMonth
                                    .percentage !== "0"
                                    ? "accent-red-500 border-red-500"
                                    : ""
                                }`}
                              />
                              <div className="flex-1">
                                <label
                                  htmlFor="thirteenthMonth"
                                  className="text-sm font-medium"
                                >
                                  13th month allowance
                                </label>
                                <p className="text-xs text-gray-500">
                                  Max. percentage:{" "}
                                  {
                                    formData.salary.benefits.thirteenthMonth
                                      .maxPercentage
                                  }
                                  %
                                </p>
                              </div>
                              <input
                                type="text"
                                value={
                                  formData.salary.benefits.thirteenthMonth
                                    .percentage
                                }
                                onChange={(e) =>
                                  handleBenefitPercentageChange(
                                    "thirteenthMonth",
                                    e.target.value
                                  )
                                }
                                className="w-16 p-2 border rounded"
                              />
                              <select
                                value={
                                  formData.salary.benefits.thirteenthMonth
                                    .frequency
                                }
                                disabled={true}
                                className="p-2 border rounded bg-gray-50"
                              >
                                <option value="Fixed">Fixed</option>
                              </select>
                            </div>

                            <button
                              type="button"
                              className="flex items-center gap-2 text-red-600 font-medium text-[16px] mt-4"
                              onClick={handleAddNewAllowance}
                            >
                              <Plus className="w-4 h-4" />
                              Add new allowance
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6 */}
              {currentStep === 5 && (
                <div className="overflow-auto remove-scroll-bar">
                  <div className="py-6">
                    <h1 className="text-xl font-semibold">Document</h1>
                    <p className="">
                      Choose the documents and template you would like assign to
                      the employee
                    </p>
                  </div>
                  <div className="space-y-8 overflow-auto remove-scroll-bar h-auto">
                    <div className="w-ful">
                      <MyTextField
                        id="template"
                        name="document.template"
                        label="Select template"
                        placeholder=""
                        value={formData.document.template}
                        onChange={handleChange}
                        type="text"
                        select
                      >
                        <MenuItem>Select template</MenuItem>
                        {employeeDocumentsTemplate.map(
                          (employeeDocumentTemplate, i) => (
                            <MenuItem key={i} value={employeeDocumentTemplate}>
                              {employeeDocumentTemplate}
                            </MenuItem>
                          )
                        )}
                      </MyTextField>
                    </div>

                    {/* Document Checkboxes */}
                    <div className="mb-8">
                      <h2 className="text-lg font-medium mb-4">
                        Assign company documents
                      </h2>
                      <p className="text-sm text-gray-600 mb-6">
                        Select needed documents to aid this employee&apos;s
                        onboarding workflow.
                      </p>

                      <div className="grid grid-cols-2 gap-y-4">
                        {employeeDocuments.map((document, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`doc-${index}`}
                              name="documents"
                              value={document}
                              className="form-checkbox h-3 w-3 accent-red-600"
                            />
                            <label
                              htmlFor={`doc-${index}`}
                              className="ml-3 text-sm text-gray-800"
                            >
                              {document}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full border border-gray-100 my-14"></div>
                  </div>
                </div>
              )}

              {/* Step 7 */}
              {currentStep === 6 && (
                <div className="overflow-auto remove-scroll-bar">
                  <div className="space-y-8 overflow-auto remove-scroll-bar h-auto">
                    <div className="mb-8">
                      <h2 className="text-lg font-medium mb-4">
                        Assign assets
                      </h2>
                      <p className="text-sm text-gray-600 mb-6">
                        Select the options below to assign assets to employee
                      </p>
                      <div className="grid grid-cols-2 gap-y-4">
                        {[
                          "Employee Handbook",
                          "Code of Conduct",
                          "Confidentiality/Non-Disclosure Agreement (NDA)",
                          "IT and Equipment Policy",
                          "Intellectual Property Agreement",
                        ].map((document, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`doc-${index}`}
                              name="documents"
                              value={document}
                              className="form-checkbox h-3 w-3 accent-red-600 bg-red-600"
                            />
                            <label
                              htmlFor={`doc-${index}`}
                              className="ml-3 text-sm text-gray-800"
                            >
                              {document}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full border border-gray-100 my-14"></div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 mt-10 w-full">
                {currentStep > 0 && (
                  <button
                    type="button"
                    className="text-[#0f1625] py-[10px] px-[14px] border rounded-[8px] text-base font-medium leading-none"
                    onClick={previousStep}
                  >
                    Back
                  </button>
                )}

                <div className="flex justify-end">
                  {currentStep === 4 ? ( // Step 5
                    <button
                      type="submit"
                      className={`py-[10px] px-[14px] rounded-[8px] text-base font-medium leading-none ${
                        isCalculateEnabled
                          ? "bg-[#0f1625] text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!isCalculateEnabled}
                    >
                      Calculate Salary
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="text-white bg-[#0f1625] py-[10px] px-[14px] rounded-[8px] text-base font-medium leading-none"
                    >
                      {currentStep === 6
                        ? "Create Employee"
                        : "Save & Continue"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
