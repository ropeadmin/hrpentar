"use client";
import MyTextField from "@/app/components/Fields/MyTextField";
import CacModal from "@/app/components/Modals/Document/CacModal";
import useUploadsService from "@/services/uploads.service";
import { ButtonBase, IconButton, MenuItem } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [companyInfo, setCompanyInfo] = useState<boolean>(false);
  const [companyAddress, setCompanyAddress] = useState<boolean>(false);
  const [companyDirector, setCompanyDirector] = useState<boolean>(false);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [cacDocumentModal, setCacDocumentModal] = useState<boolean>(false);
  const {
    uploadFiles,
    imageUploadState: { isLoading: IsLoadingUpload },
  } = useUploadsService();

  const handleCompanyInfo = () => {
    setCompanyInfo(!companyInfo);
  };

  const handleCompanyAddress = () => {
    setCompanyAddress(!companyAddress);
  };

  const handleCompanyDirector = () => {
    setCompanyDirector(!companyDirector);
  };

  const [formData, setFormData] = useState({
    businessName: "",
    registrationNumber: "",
    size: "",
    businessType: "",
    subsidiary: "",
    subsidiaryDetails: "",
    companyPrefix: "",
    industryType: "",
    address: {
      country: "",
      state: "",
      address: "",
      city: "",
      postalCode: "",
    },
    director: {
      name: "",
      email: "",
      country: "",
      idCard: [""],
      position: "",
      signature: "",
    },
  });

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedCountry = event.target.value;

    setFormData({
      ...formData,
      address: {
        ...formData.address,
        country: selectedCountry,
        state: "", // Reset state when country changes
        city: "", // Reset city when country changes
        address: formData.address.address, // Keep the existing address
      },
    });

    // Set states and reset cities
    setStates(
      stateCityMap[selectedCountry]
        ? Object.keys(stateCityMap[selectedCountry])
        : []
    );
    setCities([]);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedState = event.target.value;

    setFormData({
      ...formData,
      address: {
        ...formData.address,
        state: selectedState,
        city: "", // Reset city when state changes
        address: formData.address.address, // Keep the existing address
      },
    });

    // Set cities
    const selectedCountry = formData.address.country;
    if (selectedCountry) {
      setCities(stateCityMap[selectedCountry][selectedState] || []);
    }
  };

  const tabs = [
    {
      key: "profile",
      label: "Profile",
      borderRadius: "6px",
    },
    {
      key: "company",
      label: "Company",
      borderRadius: "6px",
    },
    {
      key: "documents",
      label: "Documents",
      borderRadius: "6px",
    },
    {
      key: "users",
      label: "Users",
      borderRadius: "6px",
    },
    {
      key: "Plans",
      label: "Plans",
      borderRadius: "6px",
    },
    {
      key: "billings",
      label: "Billings",
      borderRadius: "6px",
    },
    {
      key: "notifications",
      label: "Notifications",
      borderRadius: "6px",
    },
    {
      key: "security",
      label: "Security",
      borderRadius: "6px",
    },
    {
      key: "integrations",
      label: "Integrations",
      borderRadius: "6px",
    },
  ];

  const handleTabClick = (key: React.SetStateAction<string>) => {
    setActiveTab(key);
  };

  const colors = [
    "#08B8F7",
    "#0085FF",
    "#615EF0",
    "#543682",
    "#FFDD55",
    "#E29B38",
    "#10782D",
    "#FF543E",
    "#DC1B21",
  ];

  const thumbnail = [
    {
      image: "/images/t1.png",
    },
    {
      image: "/images/t2.png",
    },
  ];

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

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Luxembourg",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
  ];

  const industryTypes = ["Finance", "Technology"];

  const stateCityMap: any = {
    Nigeria: {
      Lagos: ["Ikeja", "Victoria Island", "Lekki"],
      Abuja: ["Garki", "Wuse", "Maitama"],
      Kano: ["Kano City", "Tarauni", "Nassarawa"],
      Kaduna: ["Kaduna South", "Kaduna North", "Giwa"],
      Rivers: ["Port Harcourt", "Obio-Akpor", "Ikwerre"],
    },
    USA: {
      California: ["Los Angeles", "San Francisco", "San Diego"],
      NewYork: ["New York City", "Buffalo", "Rochester"],
      Texas: ["Houston", "Dallas", "Austin"],
      Florida: ["Miami", "Orlando", "Tampa"],
      Washington: ["Seattle", "Spokane", "Tacoma"],
    },
    // Add more countries and their states with cities here...
  };

  // File Upload
  const onDrop = useCallback((acceptedFiles: any) => {
    // Call the uploadFiles function when files are dropped or selected
    uploadFiles(
      acceptedFiles,
      (data) => {
        console.log("Upload successful", data);
      },
      (error) => {
        console.log("Upload failed", error);
      }
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
  });

  const documents = [
    {
      header: "CAC Documents",
      title:
        "Certificate of incorporation, Memorandum & Article of Association",
      action: () => setCacDocumentModal(true),
    },
    {
      header: "Tax Documents",
      title: "Tax identification",
      action: () => {},
    },
    {
      header: "Pension Documents",
      title: "Pension registration",
      action: () => {},
    },
    {
      header: "NHIS Documents",
      title: "Health insurance",
      action: () => {},
    },
    {
      header: "Business Proof of Address",
      title: "Utility bills or lease agreement",
      action: () => {},
    },
    {
      header: "NSITF Documents",
      title: "Nigerian Social Insurance Trust Fund",
      action: () => {},
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-[28px] font-[700] text-[#0F1625]">Settings</h1>
      </div>

      {/* Tab */}
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

      {/* Tab Content */}
      {activeTab === "profile" && (
        <>
          <div className="mt-5">
            <h1 className="text-[18px] font-[700] text-[#0F1625]">
              My profile
            </h1>
            <p className="text-[#0F1625] font-[400] text-[14px]">
              Update your personal details.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-[24px] mt-7">
              <div className="rounded-full w-[72px] h-[72px]">
                <img
                  src="/images/pfp-test.png"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div className="flex items-center gap-[16px]">
                <button className="flex items-center gap-2 text-[14px] font-[500] text-[#1F2937] border border-[#D0D6DD] rounded-[8px] py-[10px] px-[16px]">
                  <img src="/icons/pic.svg" width={18} height={18} />
                  <span className="leading-none">Change picture</span>
                </button>
                <div className="rounded-[8px] border border-[#EF0000] flex justify-center items-center p-[10px]">
                  <img src="/icons/delete.svg" width={15} height={15} />
                </div>
              </div>
            </div>
            <p className="text-[14px] font-[400] text-[#0F1625] mt-3">
              This will be displayed on your profile.
            </p>
          </div>

          {/* Form */}
          <div className="mt-7">
            <form className="grid grid-cols-2 gap-5">
              <MyTextField
                id="firstName"
                name="firstName"
                label="First name"
                placeholder="Kamsi"
                value={""}
                type="text"
                onChange={() => {}}
              />
              <MyTextField
                id="lastName"
                name="lastName"
                label="Last name"
                placeholder="Bentley"
                value={""}
                type="text"
                onChange={() => {}}
              />
              <MyTextField
                id="phoneNumber"
                name="phoneNumber"
                label="Phone number"
                placeholder="0809 1728 283"
                value={""}
                type="tel"
                onChange={() => {}}
              />
              <MyTextField
                id="email"
                name="email"
                label="Email address"
                placeholder="kamsibentley@macaty.com"
                value={""}
                type="text"
                onChange={() => {}}
              />
              <MyTextField
                id="role"
                name="role"
                label="Role"
                placeholder="HR Manager"
                value={""}
                type="text"
                onChange={() => {}}
              />
            </form>
          </div>

          {/* Buttons */}
          <div className="w-full mt-12 flex justify-between items-center">
            <button className="bg-[#FFF3F3] rounded-[8px] leading-none py-[10px] px-[16px] text-[16px] font-[500] text-[#EF0000]">
              Delete account
            </button>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
                onClick={() => {}}
              >
                Cancel
              </button>
              <button
                type="button"
                className="text-white bg-[#0f1625] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
              >
                Save changes
              </button>
            </div>
          </div>
        </>
      )}

      {/* Companies */}
      {activeTab === "company" && (
        <>
          <div className="mt-5">
            <h1 className="text-[18px] font-[700] text-[#0F1625]">
              Appearance
            </h1>
            <p className="text-[#0F1625] font-[400] text-[14px]">
              Update your company logo and details.
            </p>
          </div>

          {/* Content */}
          <div className="mt-5 border-t border-[#E4E8EC] w-full pt-7">
            <div className="grid grid-cols-2 gap-y-[52px] gap-x-[131px]">
              {/* Grid-1 */}
              <div className="mt-5">
                <h1 className="text-[18px] font-[700] text-[#0F1625]">
                  Company logo
                </h1>
                <p className="text-[#0F1625] font-[400] text-[14px]">
                  Update your company logo here
                </p>
              </div>
              <div className="flex items-center gap-[32px]">
                <div className="rounded-full w-[80px] h-[80px] shadow flex justify-center items-center">
                  <p className="text-[24px] font-[700] text-[#A0AEC0]">Logo</p>
                </div>
                <div>
                  <button className="flex items-center gap-2 text-[14px] font-[500] text-[#1F2937] border border-[#D0D6DD] rounded-[8px] py-[10px] px-[16px]">
                    <img src="/icons/upload.svg" width={18} height={18} />
                    <span className="leading-none">Upload logo</span>
                  </button>
                  <p className="text-[12px] font-[400] leading-none text-[#323B49] mt-[14px]">
                    SVG, PNG, JPG (max. 800 x 400px)
                  </p>
                </div>
              </div>

              {/* Grid 2 */}
              <div className="mt-5">
                <h1 className="text-[18px] font-[700] text-[#0F1625]">
                  Brand color
                </h1>
                <p className="text-[#0F1625] font-[400] text-[14px]">
                  Select or customize your company’s color
                </p>
              </div>
              <div className="flex flex-col items-start gap-[20px]">
                <div className="flex gap-2">
                  {colors.map((color) => (
                    <div
                      className="w-[24px] h-[24px] rounded-full cursor-pointer"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-[10px]">
                  <p className="text-[16px] font-[500] leading-none text-[#323B49]">
                    Custom color
                  </p>
                  <button className="flex items-center gap-2 text-[14px] font-[500] text-[#1F2937] border border-[#D0D6DD] rounded-[8px] py-[10px] px-[16px]">
                    <div className="rounded-full w-[20px] h-[20px] bg-[#10782D] p-1.5">
                      <div className="w-full h-full rounded-full bg-[#10782D]" />
                    </div>
                    <span className="leading-none">#000000</span>
                  </button>
                </div>
              </div>

              {/* grid 3 */}
              <div className="mt-5">
                <h1 className="text-[18px] font-[700] text-[#0F1625]">
                  Company domain
                </h1>
                <p className="text-[#0F1625] font-[400] text-[14px]">
                  Update your company logo here
                </p>
              </div>
              <div className="flex flex-col items-start gap-[10px]">
                <div className="flex rounded-[8px] border border-[#D0D6DD] w-full divide-x">
                  <input
                    type="text"
                    id=""
                    value={""}
                    onChange={undefined}
                    className="text-[#687588] text-[16px] font-[400] leading-none rounded-l-[8px] outline-none w-[200px] pl-4 pr-4 py-[12px]"
                    placeholder="Company name"
                  />
                  <div className="rounded-r-[8px] flex justify-center items-center px-[16px]">
                    <p className="text-[#1F2937] text-[16px] font-[500] leading-none">
                      .pentahr.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 16.875C6.20304 16.875 3.125 13.797 3.125 10C3.125 6.20304 6.20304 3.125 10 3.125C13.797 3.125 16.875 6.20304 16.875 10C16.875 13.797 13.797 16.875 10 16.875ZM1.875 10C1.875 14.4873 5.51269 18.125 10 18.125C14.4873 18.125 18.125 14.4873 18.125 10C18.125 5.51269 14.4873 1.875 10 1.875C5.51269 1.875 1.875 5.51269 1.875 10Z"
                      fill="#323B49"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10 13.9583C10.3452 13.9583 10.625 13.6785 10.625 13.3333V10C10.625 9.65482 10.3452 9.375 10 9.375C9.65482 9.375 9.375 9.65482 9.375 10V13.3333C9.375 13.6785 9.65482 13.9583 10 13.9583Z"
                      fill="#323B49"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.375 6.66667C9.375 7.01184 9.65482 7.29167 10 7.29167H10.0083C10.3535 7.29167 10.6333 7.01184 10.6333 6.66667C10.6333 6.32149 10.3535 6.04167 10.0083 6.04167H10C9.65482 6.04167 9.375 6.32149 9.375 6.66667Z"
                      fill="#323B49"
                    />
                  </svg>
                  <p className="text-[12px] font-[500] leading-none text-[#323B49]">
                    We will create a unique company URL for you once your
                    subscription is active.
                  </p>
                </div>
              </div>

              {/* Grid 4 */}
              <div className="mt-5">
                <h1 className="text-[18px] font-[700] text-[#0F1625]">
                  Customize log in interface image
                </h1>
                <p className="text-[#0F1625] font-[400] text-[14px]">
                  Upload your company’s image to personalize your account
                </p>
                <button className="flex items-center gap-2 mt-[12px] text-[14px] font-[500] text-[#1F2937] border border-[#D0D6DD] rounded-[8px] py-[10px] px-[16px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M11.7284 3.23771C12.3494 2.56491 12.6599 2.2285 12.9898 2.03228C13.7859 1.5588 14.7662 1.54408 15.5756 1.99344C15.9111 2.17967 16.2311 2.5066 16.8712 3.16047C17.5113 3.81434 17.8313 4.14127 18.0136 4.48394C18.4535 5.31077 18.4391 6.31216 17.9756 7.12542C17.7835 7.46247 17.4542 7.77965 16.7956 8.41401L8.95918 15.9618C7.71106 17.1639 7.08699 17.765 6.30704 18.0696C5.52709 18.3743 4.66966 18.3518 2.9548 18.307L2.72147 18.3009C2.19941 18.2872 1.93838 18.2804 1.78665 18.1082C1.63491 17.936 1.65563 17.6701 1.69706 17.1383L1.71956 16.8496C1.83617 15.3528 1.89447 14.6044 2.18675 13.9317C2.47903 13.259 2.98319 12.7127 3.99151 11.6203L11.7284 3.23771Z"
                      stroke="#1F2937"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.834 3.33301L16.6673 9.16634"
                      stroke="#1F2937"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.667 18.333L18.3337 18.333"
                      stroke="#1F2937"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span className="leading-none">Edit thumbnail</span>
                </button>
              </div>
              <div className="flex gap-[16px]">
                {thumbnail.map((item, i) => (
                  <div key={i} className="w-full h-[200px] rounded-[8px]">
                    <img
                      src={item.image}
                      className="w-full h-full object-contain rounded-[8px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drop down */}
          <div className="divide-y divide-[#E4E8EC] mt-7">
            <div className="pb-[32px]">
              <div className="flex justify-between items-center py-[32px]">
                <div>
                  <h1 className="text-[18px] font-[700] text-[#0F1625]">
                    Basic company information
                  </h1>
                  <p className="text-[#0F1625] font-[400] text-[14px]">
                    Update your company details
                  </p>
                </div>
                <IconButton onClick={handleCompanyInfo}>
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

              {/* Company Info */}
              {companyInfo && (
                <div className="w-full grid grid-cols-2 gap-[24px]">
                  <MyTextField
                    id="companyName"
                    name="businessName"
                    label="Company name"
                    placeholder="Enter Company name"
                    value={""}
                    type="text"
                    onChange={undefined}
                    required
                  />
                  <MyTextField
                    id="companySize"
                    name="size"
                    label="Company size"
                    placeholder=""
                    type="text"
                    value={""}
                    onChange={undefined}
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
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="Enter email address"
                    value={formData.director.email}
                    type="email"
                    onChange={undefined}
                    required
                  />
                  <MyTextField
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Official phone number"
                    placeholder="Enter phone number"
                    value={formData.director.email}
                    type="tel"
                    onChange={undefined}
                  />
                  <MyTextField
                    id="companyWebsite"
                    name="companyWebsite"
                    label="Company website"
                    placeholder="Enter company website"
                    value={formData.director.email}
                    type="text"
                    onChange={undefined}
                    required
                  />
                  <MyTextField
                    id="industryType"
                    name="industryType"
                    label="Industry type"
                    placeholder=""
                    type="text"
                    value={formData.industryType}
                    onChange={undefined}
                    select
                    required
                  >
                    {industryTypes.map((industry, i) => (
                      <MenuItem key={i} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </MyTextField>
                  <MyTextField
                    id="businessType"
                    name="businessType"
                    label="Business type"
                    placeholder=""
                    type="text"
                    value={formData.businessType}
                    onChange={undefined}
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
                    id="businessRegistrationNumber"
                    name="businessRegistrationNumber"
                    label="Business registration number"
                    placeholder="Enter business registration number"
                    value={formData.registrationNumber}
                    type="text"
                    onChange={undefined}
                    required
                  />
                  <MyTextField
                    id="businessRegistrationDate"
                    name="businessRegistrationDate"
                    label="Business registration date"
                    placeholder="Enter business registration number"
                    value={formData.registrationNumber}
                    type="date"
                    onChange={undefined}
                    required
                  />
                  <MyTextField
                    id="tin"
                    name="tin"
                    label="Tax identification number (TIN)"
                    placeholder="Enter tax identification number"
                    value={formData.registrationNumber}
                    type="text"
                    onChange={undefined}
                    required
                  />
                </div>
              )}
            </div>

            <div className="pb-[32px]">
              <div className="flex justify-between items-center py-[32px]">
                <div>
                  <h1 className="text-[18px] font-[700] text-[#0F1625]">
                    Company address
                  </h1>
                  <p className="text-[#0F1625] font-[400] text-[14px]">
                    Update your company address
                  </p>
                </div>
                <IconButton onClick={handleCompanyAddress}>
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
              {companyAddress && (
                <div className="w-full grid grid-cols-2 gap-[24px]">
                  <MyTextField
                    id="country"
                    name="country"
                    label="Country"
                    select
                    value={formData.address.country}
                    onChange={handleCountryChange}
                    required
                    placeholder="Select Country"
                  >
                    {Object.keys(stateCityMap).map((country, i) => (
                      <MenuItem key={i} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </MyTextField>
                  <MyTextField
                    id="state"
                    name="state"
                    label="State"
                    select
                    value={formData.address.state}
                    onChange={handleStateChange}
                    required
                    placeholder="Select State"
                    disabled={!states.length}
                  >
                    {states.map((state, i) => (
                      <MenuItem key={i} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </MyTextField>
                  <MyTextField
                    id="city"
                    name="city"
                    label="City"
                    select
                    value={formData.address.city}
                    onChange={(e: { target: { value: any } }) =>
                      setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value },
                      })
                    }
                    required
                    placeholder="Select City"
                    disabled={!cities.length}
                  >
                    {cities.map((city, i) => (
                      <MenuItem key={i} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </MyTextField>
                  <MyTextField
                    id="address"
                    name="address"
                    label="Address"
                    placeholder="5, Prince Adelowo Adedeji St, Peninsula, Lagos"
                    value={formData.address.address}
                    type="text"
                    onChange={undefined}
                    required
                  />
                  <MyTextField
                    id="postalCode"
                    name="postalCode"
                    label="Postal code"
                    placeholder="106104"
                    value={formData.address.postalCode}
                    type="number"
                    onChange={undefined}
                    required
                  />
                </div>
              )}
            </div>

            <div className="pb-[32px]">
              <div className="flex justify-between items-center py-[32px]">
                <div>
                  <h1 className="text-[18px] font-[700] text-[#0F1625]">
                    Company directors
                  </h1>
                  <p className="text-[#0F1625] font-[400] text-[14px]">
                    Update your company directors details
                  </p>
                </div>
                <IconButton onClick={handleCompanyDirector}>
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

              {/* Company Director Dropdown */}
              {companyDirector && (
                <div className="w-full grid grid-cols-2 gap-[24px]">
                  <MyTextField
                    id="directorName"
                    name="directorName"
                    label="Director’s name"
                    placeholder="Babatunde Rotimi"
                    value={formData.director.name}
                    type="text"
                    onChange={undefined}
                    required
                  />
                  <MyTextField
                    id="email"
                    name="email"
                    label="Email address"
                    placeholder="babatunderotimi@mactay.com"
                    value={formData.director.email}
                    type="email"
                    onChange={undefined}
                    required
                  />
                  <MyTextField
                    id="position"
                    name="position"
                    label="Position in company"
                    placeholder=""
                    type="text"
                    value={formData.director.position}
                    onChange={undefined}
                    required
                  />
                  <MyTextField
                    id="country"
                    name="country"
                    label="Country"
                    placeholder=""
                    type="text"
                    value={formData.address.country}
                    onChange={undefined}
                    select
                    required
                  >
                    {countries.map((country, i) => (
                      <MenuItem key={i} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </MyTextField>
                  <div>
                    <h3 className="text-[3.5vw] sm:text-[14px] font-[500] mb-[5px] text-[#0F1625]">
                      Upload Director’s ID (National ID)
                    </h3>
                    <div
                      {...getRootProps()}
                      className={`w-full rounded-[8px] border border-[#D0D6DD] flex justify-center items-center gap-2 py-[10px] cursor-pointer ${
                        isDragActive ? "bg-gray-100" : ""
                      }`}
                    >
                      <input {...getInputProps()} />
                      <img
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
                    <h3 className="text-[3.5vw] sm:text-[14px] font-[500] mb-[5px] text-[#0F1625]">
                      Upload Director’s signature
                    </h3>
                    <div
                      {...getRootProps()}
                      className={`w-full rounded-[8px] border border-[#D0D6DD] flex justify-center items-center gap-2 py-[10px] cursor-pointer ${
                        isDragActive ? "bg-gray-100" : ""
                      }`}
                    >
                      <input {...getInputProps()} />
                      <img
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
                      PDF, PNG, JPG. File must not be above 125kb.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="flex items-center gap-2 transition-all duration-300 ease-in-out hover:bg-[#ef00000d] text-[14px] font-[500] text-[#EF0000] rounded-[8px] py-[10px] px-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 1.33301V14.6663"
                stroke="#EF0000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.33334 8H14.6667"
                stroke="#EF0000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="leading-none">Add director</span>
          </button>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 mt-12">
            <button
              type="button"
              className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
              onClick={() => {}}
            >
              Cancel
            </button>
            <button
              type="button"
              className="text-white bg-[#0f1625] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            >
              Save changes
            </button>
          </div>
        </>
      )}

      {/* Documents Tab Content*/}
      {activeTab === "documents" && (
        <div>
          <div className="mt-5">
            <h1 className="text-[18px] font-[700] text-[#0F1625]">
              Document upload
            </h1>
            <p className="text-[#0F1625] font-[400] text-[14px]">
              Provide the documents below to complete your company’s
              verification.
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-[28px]">
            {documents.map((item, i) => (
              <div className="w-full rounded-[12px] border border-[#D0D6DD] p-5 flex items-center gap-[16px]">
                <div className="bg-[#F0F2F5] rounded-[8px] p-[12px] flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="34"
                    viewBox="0 0 30 34"
                    fill="none"
                  >
                    <path
                      d="M15.8824 0.333496C22.5375 0.333496 25.865 0.333496 27.9325 2.28612C30 4.23874 30 7.38144 30 13.6668V20.3335C30 26.6189 30 29.7616 27.9325 31.7142C25.865 33.6668 22.5375 33.6668 15.8824 33.6668H14.1176C7.46252 33.6668 4.13496 33.6668 2.06748 31.7142C-4.20739e-07 29.7616 -2.90686e-07 26.6189 2.18279e-10 20.3335L3.08775e-07 13.6668C5.99679e-07 7.38143 8.41477e-07 4.23874 2.06748 2.28612C4.13496 0.333496 7.46253 0.333496 14.1177 0.333496L15.8824 0.333496Z"
                      fill="#D0D6DD"
                    />
                    <path
                      d="M8.3335 8.66699H21.6668"
                      stroke="#687588"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M8.3335 17H21.6668"
                      stroke="#687588"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M8.3335 25.3335H15.0002"
                      stroke="#687588"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <h1 className="text-[16px] font-[700] text-[#0F1625]">
                    {item.header}
                  </h1>
                  <p className="text-[12px] font-[400] text-[#0F1625]">
                    {item.title}
                  </p>

                  <button onClick={item.action} className="flex items-center gap-2 text-[14px] font-[500] text-[#1F2937] border border-[#D0D6DD] rounded-[8px] py-[8px] px-[14px] mt-2">
                    <img src="/icons/upload.svg" width={15} height={15} />
                    <span className="leading-none">Upload</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Document Modals */}
      <CacModal
        modal={cacDocumentModal}
        closeModal={() => setCacDocumentModal(false)}
      />
    </div>
  );
}
