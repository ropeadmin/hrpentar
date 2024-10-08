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
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmModal, setConfirmModal] =
    useState(true);
  const [deactivateCompanyModal, setDeactivateCompanyModal] = useState(false);
  const [deleteCompanyModal, setDeleteCompanyModal] = useState(false);
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
        <h1 className="text-[28px] font-[700] text-[#0F1625]">
          MacTay’s branches
        </h1>
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
          height: `${isMobile ? "auto" : "auto"}`,
          width: `${isMobile ? "85%" : "544px"}`,
        }}
      >
        <div className="flex justify-between items-start w-full">
          <div className="">
            <h1 className="text-[#0F1625] text-[4.2vw] sm:text-[20px] font-[700]">
              Create branch
            </h1>
            <p className="text-[#0F1625] text-[3.5vw] sm:text-[16px] font-[400]">
              Provide details below to add a new branch to MacTay
            </p>
          </div>

          <div className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]">
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        {/* Form */}
        <form
          className="w-[100%] overflow-auto remove-scroll-bar"
          onSubmit={handleSubmit}
        >
          <div className="space-y-5">
              <MyTextField
                id="branchName"
                name="branchName"
                label="Branch name"
                placeholder="Surulere"
                value={formData.businessName}
                type="text"
                onChange={handleChange}
              />
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
                  id="lga"
                  name="lga"
                  label="LGA"
                  placeholder="Surulere"
                  value={formData.businessName}
                  type="text"
                  onChange={handleChange}
                />
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
        </form>
        <button
          type="button"
          className="text-white bg-[#0f1625] min-w-full py-[14px] rounded-[8px] text-base font-medium mt-3 leading-none"
        >
          Create branch
        </button>
      </AppModal>


{/* Edit branch */}
      <AppModal
        open={editModal}
        handleClose={() => setEditModal(false)}
        style={{
          backgroundColor: "#ffffff",
          padding: `${isMobile ? "20px 20px" : "20px 20px"}`,
          position: "relative",
          height: `${isMobile ? "auto" : "auto"}`,
          width: `${isMobile ? "85%" : "544px"}`,
        }}
      >
        <div className="flex justify-between items-start w-full">
          <div className="">
            <h1 className="text-[#0F1625] text-[4.2vw] sm:text-[20px] font-[700]">
              Edit Lekki branch
            </h1>
            <p className="text-[#0F1625] text-[3.5vw] sm:text-[16px] font-[400]">
              Fill details below to update branch details.
            </p>
          </div>

          <div className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]">
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        {/* Form */}
        <form
          className="w-[100%] overflow-auto remove-scroll-bar"
          onSubmit={handleSubmit}
        >
          <div className="space-y-5">
              <MyTextField
                id="branchName"
                name="branchName"
                label="Branch name"
                placeholder="Surulere"
                value={formData.businessName}
                type="text"
                onChange={handleChange}
              />
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
                  id="lga"
                  name="lga"
                  label="LGA"
                  placeholder="Surulere"
                  value={formData.businessName}
                  type="text"
                  onChange={handleChange}
                />
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
        </form>
        <button
          type="button"
          className="text-white bg-[#0f1625] min-w-full py-[14px] rounded-[8px] text-base font-medium mt-3 leading-none"
        >
          Save changes
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
              Branch created successfully
            </h1>
            <p className="text-[#0F1625] text-[16px] font-[400] mt-2 leading-tight">
            <span className="font-[700]">Surulere</span> has been added to your list of branches for <span className="font-[700]">MacTay</span>. You can now add employees to this branch.
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
            Add Employees
          </button>
        </div>
      </AppModal>

      {/* Switch Company Confirmation */}
      <AppModal
        open={confirmModal}
        handleClose={() => setConfirmModal(false)}
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
              Make head office
            </h1>
          </div>

          <div className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]">
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <p className="text-[16px] font-[400] text-[#0F1625]">
          You are about to make a <span className='font-[700]'>Lekki Phase 1</span> the head office for <span className="font-[700]">MacTay Consulting</span>. Click “Make head office” to confirm this action.
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
            Make head office
          </button>
        </div>
      </AppModal>
    </div>
  );
}
