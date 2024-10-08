"use client";
import MyTextField from "@/app/components/Fields/MyTextField";
import { AppModal } from "@/app/components/Modals";
import CreateCompanyStepper from "@/app/components/Stepper/CreateCompanyStepper";
import BranchTable from "@/app/components/Table/BranchTable";
import CompanyTable from "@/app/components/Table/CompanyTable";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useAppTheme from "@/hooks/theme.hook";
import useRequest from "@/services/request.service";
import { ButtonBase, IconButton, MenuItem, Stepper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useDispatch } from "react-redux";

export default function Branches() {
  const { isMobile } = useAppTheme();
  const [activeTab, setActiveTab] = useState("companies");
  const [company, setCompany] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [successModal, setSuccessModal] = useState(false);
  const [switchCompanyModal, setSwitchCompanyModal] = useState(false);
  const [switchCompanyConfirmModal, setSwitchCompanyConfirmModal] =
    useState(false);
  const [deactivateCompanyModal, setDeactivateCompanyModal] =
    useState(false);
    const [deleteCompanyModal, setDeleteCompanyModal] =
    useState(false)
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { makeRequest, isLoading } = useRequest();
  const [country, setCountry] = useState("");

  const tabs = [
    {
      key: "companies",
      label: "Companies",
      borderRadius: "6px",
    },
    {
      key: "organization_chart",
      label: "Organization chart",
      borderRadius: "6px",
    },
  ];

  const handleTabClick = (key: React.SetStateAction<string>) => {
    setActiveTab(key);
  };

  const branches = [
    {
      prefix: "MAC",
      branchName: "Lekki Phase 1",
      address: "5 Prince Adelowo Adedeji",
      branchId: 198076,
      department: 14,
      member: 574,
      status: "Active",
    },
    {
      prefix: "ROP",
      branchName: "Ikoyi",
      address: "5 Prince Adelowo Adedeji",
      branchId: 209715,
      department: 37,
      member: 18,
      status: "Active",
    },
    {
      prefix: "RBE",
      branchName: "Victoria Island",
      address: "5 Prince Adelowo Adedeji",
      branchId: 100248,
      department: 2,
      member: 197,
      status: "Deactivated",
    },
  ];

  const [formData, setFormData] = useState({
    businessName: "",
    registrationNumber: "",
    size: "",
    businessType: "",
    subsidiary: "",
    subsidiaryDetails: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const payload = {
    businessName: formData.businessName,
    registrationNumber: formData.registrationNumber,
    size: formData.size,
    country: country,
    businessType: formData.businessType,
    subsidiary: formData.subsidiaryDetails,
    main: false,
    // address: {
    //     "country": "Nigeria",
    //     "state": "Osun",
    //     "address": "Iwo",
    //     "city": "Iwo",
    //     "postalCode": "21333"
    // },
    // director: {
    //     name: "Naheem",
    //     email: "naheemadedokun@gmail.com",
    //     country: "Nigeria",
    //     idCard: ["https://alpharides.s3.us-east-1.amazonaws.com/66e2b9e9ba5ee534ab474d9c/Screenshot-2024-08-25-at-03.19.17.png"],
    //     position: "Director",
    //     signature: "https://alpharides.s3.us-east-1.amazonaws.com/66e2b9e9ba5ee534ab474d9c/Screenshot-2024-08-25-at-03.19.17.png"
    // }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    catchAsync(
      async () => {
        const res = await makeRequest({
          method: "POST",
          url: API.createBusiness,
          data: payload,
        });

        const { data } = res;

        // Move to step 3 on success
        if (data?.status === "SUCCESS") {
          setCurrentStep(3);
          router.push("/auth/onboarding/step2");
        }
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

  const companySize = [
    "10 - 50",
    "51 - 100",
    "100 - 200",
    "200 - 500",
    "501 - above",
  ];

  const businessTypes = [
    "Limited Liability Company",
    "Private Company",
    "Sole Proprietorship",
    "Small-Medium Enterprise",
    "NGOs (Governmental)",
  ];

  const subsidiary = ["Yes", "No"];

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Cote d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  return (
    <div>
      <div>
        <h1 className="text-[28px] font-[700] text-[#0F1625]">MacTay’s branches</h1>
        <p className="text-[14px] font-[400] text-[#323B49]">
          Manage companies, branches and organization chart.
        </p>
      </div>

      <div className="text-[14px] flex items-center mt-5 gap-1 bg-[#FBFBFC] w-fit rounded-[6px] mt-5">
        {tabs.map((tab, index) => (
          <ButtonBase
            key={index}
            onClick={() => handleTabClick(tab.key)}
            className="rounded-[6px]"
          >
            <div
              className={`py-2 px-3 cursor-pointer transform transition duration-500 ease-in-out`}
              style={{
                backgroundColor: activeTab === tab.key ? "#F0F2F5" : "#FBFBFC",
                color: activeTab === tab.key ? "#0F1625" : "#687588",
                borderRadius: tab.borderRadius,
                fontWeight: activeTab === tab.key ? "500" : "500",
                // border:
                //   activeTab === tab.key
                //     ? "0.5px solid #E4E8EC"
                //     : "0.5px solid transparent",
              }}
            >
              <p className="leading-none">{tab.label}</p>
            </div>
          </ButtonBase>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center mt-7">
          <div className="relative">
            <input
              type="text"
              id=""
              value={""}
              onChange={undefined}
              className="text-[#687588] text-[14px] font-[500] leading-none rounded-[8px] bg-white border border-[#D0D6DD] outline-none w-[350px] pl-10 pr-4 py-[8px]"
              placeholder="Search branch name"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M14.583 14.5835L18.333 18.3335"
                  stroke="#A0AEC0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.666 9.16675C16.666 5.02461 13.3082 1.66675 9.16601 1.66675C5.02388 1.66675 1.66602 5.02461 1.66602 9.16675C1.66602 13.3089 5.02388 16.6667 9.16601 16.6667C13.3082 16.6667 16.666 13.3089 16.666 9.16675Z"
                  stroke="#A0AEC0"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="px-[14px] py-[8px] rounded-[8px] flex items-center gap-2 border border-[#D0D6DD]">
            <p className="leading-none text-[#1F2937] text-[16px] font-[500]">
              Status
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
            >
              <path
                d="M1 1.5L5.29289 5.79289C5.62623 6.12623 5.79289 6.29289 6 6.29289C6.20711 6.29289 6.37377 6.12623 6.70711 5.79289L11 1.5"
                stroke="#1F2937"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div
          className="px-[14px] py-[8px] rounded-[8px] bg-[#0F1625] flex gap-2 items-center cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 1.3335V14.6668"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.33301 8H14.6663"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="text-white text-[16px] font-[500] leading-none">
            Create branch
          </p>
        </div>
      </div>

      {/* table */}
      <div className="mt-7">
        <BranchTable branches={branches} />
      </div>

      {/* Modals */}
      <AppModal
        open={showModal}
        handleClose={() => setShowModal(false)}
        style={{
          backgroundColor: "#ffffff",
          padding: `${isMobile ? "20px 20px" : "20px 20px"}`,
          position: "relative",
          maxHeight: `${isMobile ? "auto" : "90vh"}`,
          minHeight: `${isMobile ? "auto" : "auto"}`,
          height: `${isMobile ? "auto" : "auto"}`,
          width: `${isMobile ? "85%" : "544px"}`,
        }}
      >
        <div className="flex justify-between items-start w-full">
          <div className="">
            <h1 className="text-[#0F1625] text-[4.2vw] sm:text-[20px] font-[700]">
              Create company
            </h1>
            <p className="text-[#0F1625] text-[3.5vw] sm:text-[16px] font-[400]">
              Provide details below to add a new company to your workspace
            </p>
          </div>

          <div className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]">
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        {/* Stepper */}
        <div className="w-full">
          <CreateCompanyStepper currentStep={currentStep} />
        </div>

        {/* Form */}
        <form
          className="w-[100%] overflow-auto remove-scroll-bar"
          onSubmit={handleSubmit}
        >
          {currentStep === 1 && (
            <div className="space-y-5 overflow-auto remove-scroll-bar h-[50vh]">
              <MyTextField
                id="companyName"
                name="businessName"
                label="Company name"
                placeholder="Enter Company name"
                value={formData.businessName}
                type="text"
                onChange={handleChange}
              />
              <MyTextField
                id="businessRegistrationNumber"
                name="registrationNumber"
                label="Business registration number"
                placeholder="Enter business registration number"
                value={formData.registrationNumber}
                type="text"
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-5">
                <MyTextField
                  id="companySize"
                  name="size"
                  label="Company size"
                  placeholder=""
                  type="text"
                  value={formData.size}
                  onChange={handleChange}
                  select
                  required
                >
                  {companySize.map((size, i) => (
                    <MenuItem key={i} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </MyTextField>
                <MyTextField
                  id="companyPrefix"
                  name="companyPrefix"
                  label="Company prefix"
                  placeholder="MAC"
                  value={formData.businessName}
                  type="text"
                  onChange={handleChange}
                />

                <MyTextField
                  id="businessType"
                  name="businessType"
                  label="Business type"
                  placeholder=""
                  type="text"
                  value={formData.businessType}
                  onChange={handleChange}
                  select
                  required
                >
                  {businessTypes.map((businessType, i) => (
                    <MenuItem key={i} value={businessType}>
                      {businessType}
                    </MenuItem>
                  ))}
                </MyTextField>
                <MyTextField
                  id="industryType"
                  name="industryType"
                  label="Industry type"
                  placeholder=""
                  type="text"
                  value={formData.subsidiary}
                  onChange={handleChange}
                  select
                  required
                >
                  {subsidiary.map((subsidiary, i) => (
                    <MenuItem key={i} value={subsidiary}>
                      {subsidiary}
                    </MenuItem>
                  ))}
                </MyTextField>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-5 overflow-auto remove-scroll-bar">
              <div className="flex gap-4">
                <MyTextField
                  id="country"
                  name="country"
                  label="Country"
                  placeholder=""
                  type="text"
                  value={formData.size}
                  onChange={handleChange}
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
                  name="state"
                  label="State"
                  placeholder=""
                  type="text"
                  value={formData.size}
                  onChange={handleChange}
                  select
                  required
                >
                  {companySize.map((size, i) => (
                    <MenuItem key={i} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </MyTextField>
              </div>
              <MyTextField
                id="address"
                name="address"
                label="Address"
                placeholder="5, Prince Adelowo Adedeji St, Peninsula, Lagos"
                value={formData.businessName}
                type="text"
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-5">
                <MyTextField
                  id="city"
                  name="city"
                  label="City"
                  placeholder=""
                  type="text"
                  value={formData.size}
                  onChange={handleChange}
                  select
                  required
                >
                  {companySize.map((size, i) => (
                    <MenuItem key={i} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </MyTextField>
                <MyTextField
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  placeholder="106104"
                  value={formData.businessName}
                  type="number"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-5 overflow-auto remove-scroll-bar h-[55vh]">
              <MyTextField
                id="directorName"
                name="directorName"
                label="Director’s name"
                placeholder="Babatunde Rotimi"
                value={formData.businessName}
                type="text"
                onChange={handleChange}
              />
              <MyTextField
                id="email"
                name="email"
                label="Email address"
                placeholder="babatunderotimi@mactay.com"
                value={formData.businessName}
                type="email"
                onChange={handleChange}
              />
              <div className="flex gap-4">
                <MyTextField
                  id="position"
                  name="position"
                  label="Position in company"
                  placeholder=""
                  type="text"
                  value={formData.size}
                  onChange={handleChange}
                  required
                />
                <MyTextField
                  id="country"
                  name="country"
                  label="Country"
                  placeholder=""
                  type="text"
                  value={formData.size}
                  onChange={handleChange}
                  select
                  required
                >
                  {countries.map((country, i) => (
                    <MenuItem key={i} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </MyTextField>
              </div>

              <div>
                <h3 className="text-[3.5vw] sm:text-[14px] font-[500] mb-[5px] text-[#0F1625]">
                  Upload Director’s ID (National ID)
                </h3>
                <div className="w-full rounded-[8px] border border-[#D0D6DD] flex justify-center items-center gap-2 py-[10px] cursor-pointer">
                  <img src="/icons/upload.svg" width={20} height={20} />
                  Upload file
                </div>
                <p className="mt-[7px] text-[12px] font-[700] text-[#1F2937]">
                  PDF, PNG, JPG (max. 800 x 400px).
                </p>
              </div>
              <div>
                <h3 className="text-[3.5vw] sm:text-[14px] font-[500] mb-[5px] text-[#0F1625]">
                  Upload Director’s signature
                </h3>
                <div className="w-full rounded-[8px] border border-[#D0D6DD] flex justify-center items-center gap-2 py-[10px] cursor-pointer">
                  <img src="/icons/upload.svg" width={20} height={20} />
                  Upload file
                </div>
                <p className="mt-[7px] text-[12px] font-[700] text-[#1F2937]">
                  PDF, PNG, JPG. File must not be above 125kb.
                </p>
              </div>
            </div>
          )}
        </form>
        <button
          type="button"
          className="text-white bg-[#0f1625] min-w-full py-[14px] rounded-[8px] text-base font-medium mt-5 leading-none"
        >
          {currentStep === 3 ? "Create company" : "Save & continue"}
        </button>
      </AppModal>

      {/* Success */}
      <AppModal
        open={successModal}
        handleClose={() => setSuccessModal(false)}
        style={{
          backgroundColor: "#ffffff",
          padding: `${isMobile ? "20px 20px" : "30px 35px"}`,
          position: "relative",
          maxHeight: `${isMobile ? "auto" : "90vh"}`,
          minHeight: `${isMobile ? "auto" : "auto"}`,
          height: `${isMobile ? "auto" : "auto"}`,
          width: `${isMobile ? "85%" : "512px"}`,
        }}
      >
        <div className="w-full flex justify-end">
          <div
            className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]"
            onClick={() => setSuccessModal(false)}
          >
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <img src="/icons/modalSuccessIcon.svg" width={50} height={50} />
          <div className="mt-7 text-center">
            <h1 className="text-[#0F1625] text-[24px] font-[700] leading-none">
              Company created successfully
            </h1>
            <p className="text-[#0F1625] text-[16px] font-[400] mt-2 leading-tight">
              <span className="font-[700]">Rope Africa</span> has been added to
              your list of companies. Kindly switch companies to gain access and
              complete KYC in settings.{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 w-full mt-3">
          <button
            type="button"
            className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={() => setSuccessModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#0f1625] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
          >
            Switch company
          </button>
        </div>
      </AppModal>

      {/* Switch Company */}
      <AppModal
        open={switchCompanyModal}
        handleClose={() => setSwitchCompanyModal(false)}
        style={{
          backgroundColor: "#ffffff",
          padding: `${isMobile ? "20px 20px" : "30px 32px"}`,
          position: "relative",
          maxHeight: `${isMobile ? "auto" : "90vh"}`,
          minHeight: `${isMobile ? "auto" : "auto"}`,
          height: `${isMobile ? "auto" : "auto"}`,
          width: `${isMobile ? "85%" : "544px"}`,
        }}
      >
        <div className="flex justify-between items-start w-full">
          <div className="">
            <h1 className="text-[#0F1625] text-[4.2vw] sm:text-[20px] font-[700]">
              Switch company
            </h1>
            <p className="text-[#0F1625] text-[3.5vw] sm:text-[16px] font-[400]">
              Select the company you want to switch to
            </p>
          </div>

          <div className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]">
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <MyTextField
          id="switchCompany"
          name="switchCompany"
          label="Switch company"
          placeholder=""
          type="text"
          value={formData.size}
          onChange={handleChange}
          select
          required
        >
          {countries.map((country, i) => (
            <MenuItem key={i} value={country}>
              {country}
            </MenuItem>
          ))}
        </MyTextField>
        <div className="flex items-center justify-end gap-3 w-full mt-3">
          <button
            type="button"
            className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={() => setSuccessModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#0f1625] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
          >
            Continue
          </button>
        </div>
      </AppModal>

      {/* Switch Company Confirmation */}
      <AppModal
        open={switchCompanyConfirmModal}
        handleClose={() => setSwitchCompanyConfirmModal(false)}
        style={{
          backgroundColor: "#ffffff",
          padding: `${isMobile ? "20px 20px" : "30px 32px"}`,
          position: "relative",
          maxHeight: `${isMobile ? "auto" : "90vh"}`,
          minHeight: `${isMobile ? "auto" : "auto"}`,
          height: `${isMobile ? "auto" : "auto"}`,
          width: `${isMobile ? "85%" : "544px"}`,
        }}
      >
        <div className="flex justify-between items-start w-full">
          <div className="">
            <h1 className="text-[#0F1625] text-[4.2vw] sm:text-[20px] font-[700]">
              Switch company
            </h1>
          </div>

          <div className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]">
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <p className="text-[16px] font-[400] text-[#0F1625]">
          You are about to make a switch from{" "}
          <span className="font-[700]">MacTay Consulting</span> to{" "}
          <span className="font-[700]">Rope Africa</span>. Click “Switch
          company” to confirm this action.
        </p>

        <div className="flex items-center justify-end gap-3 w-full mt-3">
          <button
            type="button"
            className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={() => setSuccessModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#0f1625] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
          >
            Switch company
          </button>
        </div>
      </AppModal>

      {/* Deactivate Company */}
      <AppModal
        open={deactivateCompanyModal}
        handleClose={() => setDeactivateCompanyModal(false)}
        style={{
          backgroundColor: "#ffffff",
          padding: `${isMobile ? "20px 20px" : "30px 32px"}`,
          position: "relative",
          maxHeight: `${isMobile ? "auto" : "90vh"}`,
          minHeight: `${isMobile ? "auto" : "auto"}`,
          height: `${isMobile ? "auto" : "auto"}`,
          width: `${isMobile ? "85%" : "544px"}`,
        }}
      >
        <div className="flex justify-between items-start w-full">
          <div className="">
            <h1 className="text-[#0F1625] text-[4.2vw] sm:text-[20px] font-[700]">
              Deactivate company
            </h1>
          </div>

          <div className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]">
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <p className="text-[16px] font-[400] text-[#0F1625]">
          You are about to deactivate <span className="font-[700]">Robertson Energy</span> from
          your companies. Once deactivated, this company would no longer be
          active
        </p>

        <div className="flex items-center justify-end gap-3 w-full mt-3">
          <button
            type="button"
            className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={() => setSuccessModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#EF0000] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
          >
            Deactivate company
          </button>
        </div>
      </AppModal>


       {/* Delete Company */}
       <AppModal
        open={deleteCompanyModal}
        handleClose={() => setDeleteCompanyModal(false)}
        style={{
          backgroundColor: "#ffffff",
          padding: `${isMobile ? "20px 20px" : "30px 32px"}`,
          position: "relative",
          maxHeight: `${isMobile ? "auto" : "90vh"}`,
          minHeight: `${isMobile ? "auto" : "auto"}`,
          height: `${isMobile ? "auto" : "auto"}`,
          width: `${isMobile ? "85%" : "544px"}`,
        }}
      >
        <div className="flex justify-between items-start w-full">
          <div className="">
            <h1 className="text-[#0F1625] text-[4.2vw] sm:text-[20px] font-[700]">
              Delete company
            </h1>
          </div>

          <div className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]">
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <p className="text-[16px] font-[400] text-[#0F1625]">
        You are about to delete <span className="font-[700]">Robertson Energy</span> from your companies. Once deleted, all data would be wiped and no longer accessible. This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-3 w-full mt-3">
          <button
            type="button"
            className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={() => setSuccessModal(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#EF0000] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
          >
            Delete company
          </button>
        </div>
      </AppModal>
    </div>
  );
}
