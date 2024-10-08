"use client";

import MyTextField from "@/app/components/Fields/MyTextField";
import Stepper from "@/app/components/Stepper/Stepper";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/accountRequest.service";
import { MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveCompany } from "@/store/company.slice";

export default function Step1() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { makeRequest, isLoading } = useRequest();
  const [currentStep, setCurrentStep] = useState(1);
  const [country, setCountry] = useState("");
  const [formData, setFormData] = useState<any>({
    businessName: "",
    registrationNumber: "",
    size: "",
    businessType: "",
    subsidiary: "",
    subsidiaryDetails: "",
    country: ""
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
    country: formData.country,
    businessType: formData.businessType,
    subsidiary: formData.subsidiaryDetails,
    main: false,
    address: {
        "country": "Nigeria",
        "state": "Osun",
        "address": "Iwo",
        "city": "Iwo",
        "postalCode": "21333"
    },
    director: {
        name: "Naheem",
        email: "naheemadedokun@gmail.com",
        country: "Nigeria",
        idCard: ["https://alpharides.s3.us-east-1.amazonaws.com/66e2b9e9ba5ee534ab474d9c/Screenshot-2024-08-25-at-03.19.17.png"],
        position: "Director",
        signature: "https://alpharides.s3.us-east-1.amazonaws.com/66e2b9e9ba5ee534ab474d9c/Screenshot-2024-08-25-at-03.19.17.png"
    }
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

        if (formData.subsidiary === "No") {
          setFormData({
            subsidiaryDetails: "",
          })
        }

        // Move to step 3 on success
        if (data?.status === 'SUCCESS') {
          // setCurrentStep(3);
          dispatch(saveCompany(data));
          router.push('/dashboard/welcome')
          // router.push('/auth/onboarding/step2')
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
    <div className="bg-[#fff] h-screen flex p-4 overflowHidden">
    <div
      className="relative p-[32px] rounded-[16px] flex-grow min-h-full min-w-[47vw] max-w-[47vw] w-[47vw] overflow-hidden bg-[url('/images/auth-1.jpeg')]"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="">
        <img src="/pentaHR.svg" width={150} height={150} />
      </div>


        <div className="absolute bottom-7 left-7 right-7 h-auto auth-glass p-5">
          <p className="text-white text-base font-medium font-['Cabinet Grotesk'] leading-tight">
            &quot;PentaHR has revolutionized our HR processes. The intuitive
            interface and comprehensive features have significantly reduced
            administrative tasks, allowing us to focus more on employee
            engagement and development. It&apos;s a game-changer for any HR
            team!&quot;
          </p>
          <div className="mt-5">
            <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">
              Kolawole Immanuel
            </div>
            <div className="text-white text-sm font-medium font-['Cabinet Grotesk'] leading-[18px]">
              Payroll Specialist - Mactay Consulting
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col justify-center items-center mx-auto w-full min-h-screen px-16 py-10">
        <form className="w-[100%]" onSubmit={handleSubmit}>
          <div className="flex items-center mx-auto w-full">
            <Stepper currentStep={currentStep} />
          </div>
          <div className="my-7">
            <h1 className="text-[#0f1625] text-[28px] text-start font-bold font-['Cabinet Grotesk'] leading-loose">
              Tell us about your company
            </h1>
            <div>
              <span className="text-[#313a48] text-base font-normal font-['Cabinet Grotesk'] leading-tight">
                Please provide details about your business below.
              </span>
            </div>
          </div>
          <div className="space-y-5 overflow-auto h-[300px] remove-scroll-bar">
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
                  id="country"
                  name="country"
                  label="Country"
                  placeholder=""
                  type="text"
                  value={formData.country}
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
                id="subsidiary"
                name="subsidiary"
                label="Do you have a subsidiary company?"
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
            {formData.subsidiary === "Yes" && (
              <MyTextField
                id="subsidiaryDetail"
                name="subsidiaryDetails"
                label="Please enter subsidiary company (details will be required after onboarding)"
                placeholder=""
                value={formData.subsidiaryDetails}
                type="text"
                onChange={handleChange}
              />
            )}
          </div>

          <button
            type="submit"
            className="text-white bg-[#0f1625] w-full py-4 rounded-[8px] text-base font-medium mt-10"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
