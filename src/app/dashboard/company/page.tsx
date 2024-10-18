"use client";
import MyTextField from "@/app/components/Fields/MyTextField";
import { AppModal } from "@/app/components/Modals";
import CreateCompanyStepper from "@/app/components/Stepper/CreateCompanyStepper";
import CompanyTable from "@/app/components/Table/CompanyTable";
import API from "@/constants/api.constant";
import { catchAsync } from "@/helpers/api.helper";
import useAppTheme from "@/hooks/theme.hook";
import useAccountRequest from "@/services/accountRequest.service";
import { ButtonBase, IconButton, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useUploadsService from "@/services/uploads.service";
import { useDropzone } from "react-dropzone";
import { Bounce, toast } from "react-toastify";
import { matchesQuery } from "@/helpers";

export default function Company() {
  const { isMobile } = useAppTheme();
  const [activeTab, setActiveTab] = useState("companies");
  const [company, setCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [switchCompanyModal, setSwitchCompanyModal] = useState(false);
  const [switchCompanyConfirmModal, setSwitchCompanyConfirmModal] =
    useState(false);
  const [deactivateCompanyModal, setDeactivateCompanyModal] = useState(false);
  const [activateCompanyModal, setActivateCompanyModal] = useState(false);
  const [deleteCompanyModal, setDeleteCompanyModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {
    makeRequest: createBusinessRequest,
    isLoading: isLoadingCreateBusiness,
  } = useAccountRequest();
  const { makeRequest: businessRequest, isLoading: isLoadingBusiness } =
    useAccountRequest();
  const {
    makeRequest: businessDeleteRequest,
    isLoading: isLoadingBusinessDelete,
  } = useAccountRequest();
  const {
    makeRequest: businessDeactivateRequest,
    isLoading: isLoadingBusinessDeactivate,
  } = useAccountRequest();
  const {
    makeRequest: businessActivateRequest,
    isLoading: isLoadingBusinessActivate,
  } = useAccountRequest();
  const [country, setCountry] = useState("");
  const [business, setBusiness] = useState<any>([]);
  const {
    uploadFiles,
    imageUploadState: { isLoading: IsLoadingUpload },
  } = useUploadsService();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [selectedCompany2, setSelectedCompany2] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleStatusSelect = (status: string) => {
    setStatus(status);
    setIsOpen(false); // Close the dropdown after selection
  };

  const handleCompanyDeleteModal = (company: any) => {
    setSelectedCompany2(company);
    setDeleteCompanyModal(true); // Open the delete modal
  };

  const handleCloseDeleteModal = () => {
    setSelectedCompany(null);
    setDeleteCompanyModal(false);
  };

  // Deactivate Modal
  const handleCompanyDeactivateModal = (company: any) => {
    setSelectedCompany2(company);
    setDeactivateCompanyModal(true); // Open the Deactivate modal
  };

  const handleCloseDeactivateModal = () => {
    setSelectedCompany(null);
    setDeactivateCompanyModal(false);
  };

  // Activate Modal
  const handleCompanyActivateModal = (company: any) => {
    setSelectedCompany2(company);
    setActivateCompanyModal(true); // Open the Deactivate modal
  };

  const handleCloseActivateModal = () => {
    setSelectedCompany(null);
    setActivateCompanyModal(false);
  };

  // On Branch View
  const handleBranchNavigation = (company: any) => {
    localStorage.setItem("company-details", JSON.stringify(company)); // Store as string
    const formattedBusinessName = company?.businessName
      .toLowerCase() // Convert to lowercase
      .replace(/\s+/g, "-"); // Replace spaces with dashes

    router.push(`/dashboard/company/${company?._id}/branches`);
  };

  // Close Success Modal
  const handleCloseSuccessModal = () => {
    setSuccessModal(false);
    setCurrentStep(1);
    setFormData({
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
  };

  // Switch business after creation
  const handleOpenSwitch = () => {
    setSuccessModal(false);
    setSwitchCompanyModal(true);
    setCurrentStep(1);
    setFormData({
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
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "businessName") {
      // Update both businessName and companyPrefix
      setFormData({
        ...formData,
        businessName: value,
        companyPrefix: value.slice(0, 3).toUpperCase(),
      });
    } else if (name === "address" || name === "postalCode") {
      // If updating address-related fields (address or postalCode)
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value, // Update the specific field inside the address object
        },
      });
    } else if (["directorName", "email", "position"].includes(name)) {
      // If updating fields inside the director object
      setFormData({
        ...formData,
        director: {
          ...formData.director,
          [name === "directorName" ? "name" : name]: value, // Dynamically update director.name, director.email, or director.position
        },
      });
    } else {
      // For other form fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const payload = {
    businessName: formData.businessName,
    registrationNumber: formData.registrationNumber,
    size: formData.size,
    country: formData.address.country,
    businessType: formData.businessType,
    industryType: formData.industryType,
    subsidiary: "Just a test sub",
    main: false,
    address: {
      country: formData.address.country,
      state: formData.address.state,
      address: formData.address.address,
      city: formData.address.city,
      postalCode: formData.address.postalCode,
    },
    director: {
      name: formData.director.name,
      email: formData.director.email,
      country: formData.address.country,
      idCard: [
        "https://alpharides.s3.us-east-1.amazonaws.com/66e2b9e9ba5ee534ab474d9c/Screenshot-2024-08-25-at-03.19.17.png",
      ],
      position: formData.director.position,
      signature:
        "https://alpharides.s3.us-east-1.amazonaws.com/66e2b9e9ba5ee534ab474d9c/Screenshot-2024-08-25-at-03.19.17.png",
    },
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (currentStep < 3) {
      // Proceed to the next step
      nextStep();
    } else {
      // Submit final form data
      catchAsync(
        async () => {
          const res = await createBusinessRequest({
            method: "POST",
            url: API.createBusiness,
            data: payload, // Submit collected form data
          });

          const { data } = res;

          if (data?.status === "SUCCESS") {
            setShowModal(false);
            setSuccessModal(true);
            getBusiness();
          }
        },
        (error: any) => {
          // Handle error response
          enqueueSnackbar(
            error?.response?.data?.message || "An error occurred",
            { variant: "error" }
          );
        }
      );
    }
  };

  // Get Business
  const getBusiness = async () => {
    catchAsync(
      async () => {
        const res = await businessRequest({
          method: "GET",
          url: API.createBusiness,
        });

        const { data } = res?.data;
        setBusiness(data);
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

  useEffect(() => {
    getBusiness();
  }, []);

  // Delete Business
  const deleteBusiness = async () => {
    catchAsync(
      async () => {
        const res = await businessDeleteRequest({
          method: "DELETE",
          url: `${API.createBusiness}?id=${selectedCompany2?._id}`,
        });

        const { data } = res?.data;
        toast.success("Company deleted successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        getBusiness();
        setDeleteCompanyModal(false);
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

  // Deactivate Business
  const deactivateBusiness = async () => {
    catchAsync(
      async () => {
        const res = await businessDeactivateRequest({
          method: "PATCH",
          url: `${API.createBusiness}/activation?id=${selectedCompany2?._id}`,
          data: { status: "Deactivated" },
        });

        const { data } = res?.data;
        toast.success("Company deactivated successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        getBusiness();
        setDeactivateCompanyModal(false);
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

  // Activate Business
  const activateBusiness = async () => {
    catchAsync(
      async () => {
        const res = await businessActivateRequest({
          method: "PATCH",
          url: `${API.createBusiness}/activation?id=${selectedCompany2?._id}`,
          data: { status: "Active" },
        });

        const { data } = res?.data;
        toast.success("Company activated successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        getBusiness();
        setActivateCompanyModal(false);
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

  // Search Company

  // Function to handle the search input change
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // Main filtering logic
  const filteredCompanies = business?.filter((company: any) => {
    const searchQueryLower = searchQuery.toLowerCase();

    // Define all searchable fields in an array
    const fieldsToSearch = [
      company.businessName,
      // company._id,
      // company.registrationNumber,
      // company.status,
      // company.prefix,
      // company.businessType,
      // company.industryType,
      // company.director?.name,
      // company.director?.email,
      // company.director?.position,
      // company.size,
      // company.address?.country,
      // company.address?.state,
      // company.address?.city,
      // company.createdAt,
    ];

    // Return true if any field matches the query
    return fieldsToSearch.some((field) =>
      matchesQuery(field, searchQueryLower)
    );
  });

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

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Luxembourg",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
  ];

  const industryTypes = [
    "Finance",
    "Technology",
  ];

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

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

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
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

  const [businessMenuOpen, setBusinessMenuOpen] = useState<Array<boolean>>([]);
  const [anchorElTip, setAnchorElTip] = useState(null);

  const handleOpen = (event: any, id: number) => {
    event.preventDefault(); // Prevent the default action (e.g., following a link)
    event.stopPropagation(); // Stop the event from propagating further

    // Set the anchor element to the current target
    setAnchorElTip(event.currentTarget);

    // Set the specific UserMenu state to open for the clicked user row
    setBusinessMenuOpen((prevBusinessMenuOpen) => {
      const updatedUserMenuOpen = [...prevBusinessMenuOpen];
      updatedUserMenuOpen[id] = true;
      return updatedUserMenuOpen;
    });
  };

  const handleClose = () => {
    setBusinessMenuOpen(Array(business.length).fill(false));
    setAnchorElTip(null);
  };

  return (
    <div>
      <div>
        <h1 className="text-[28px] font-[700] text-[#0F1625]">Company</h1>
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
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="text-[#687588] text-[14px] font-[500] leading-none rounded-[8px] bg-white border border-[#D0D6DD] outline-none w-[350px] pl-10 pr-4 py-[8px]"
              placeholder="Search company name"
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

          <div className="relative inline-block">
            {/* Button */}
            <div
              className="px-[14px] py-[8px] rounded-[8px] flex items-center gap-2 border border-[#D0D6DD] cursor-pointer"
              onClick={toggleDropdown}
            >
              <p className="leading-none text-[#1F2937] text-[16px] font-[500]">
                {status ? status : "Status"}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                className={`${isOpen ? "rotate-180" : ""} transition-transform`}
              >
                <path
                  d="M1 1.5L5.29289 5.79289C5.62623 6.12623 5.79289 6.29289 6 6.29289C6.20711 6.29289 6.37377 6.12623 6.70711 5.79289L11 1.5"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div
                className="absolute z-10 mt-2 w-[150px] bg-white rounded-[12px] shadow-lg"
                style={{
                  border: "0.5px solid #D0D6DD",
                  boxShadow: "0px 12px 12px 0px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStatusSelect("Active")}
                >
                  Active
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleStatusSelect("Deactivated")}
                >
                  Deactivated
                </div>
              </div>
            )}
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
            Create company
          </p>
        </div>
      </div>

      {/* table */}
      <div className="mt-7">
        <CompanyTable
          anchorEl={anchorElTip}
          businessMenuOpen={businessMenuOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setAnchorEl={setAnchorEl}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          companies={filteredCompanies}
          onSwitch={() => setSwitchCompanyModal(true)}
          onView={handleBranchNavigation}
          onDeactivate={handleCompanyDeactivateModal}
          onActivate={handleCompanyActivateModal}
          onDelete={handleCompanyDeleteModal}
        />
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

          <div
            className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]"
            onClick={() => setShowModal(false)}
          >
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
                name="businessRegistrationNumber"
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
                  label="Company Prefix"
                  placeholder="Prefix"
                  value={formData.companyPrefix}
                  type="text"
                  readOnly
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
                  value={formData.industryType}
                  onChange={handleChange}
                  select
                  required
                >
                  {industryTypes.map((industry, i) => (
                    <MenuItem key={i} value={industry}>
                      {industry}
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

                {/* State Dropdown */}
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
              </div>
              <MyTextField
                id="address"
                name="address"
                label="Address"
                placeholder="5, Prince Adelowo Adedeji St, Peninsula, Lagos"
                value={formData.address.address}
                type="text"
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-5">
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
                  id="postalCode"
                  name="postalCode"
                  label="Postal code"
                  placeholder="106104"
                  value={formData.address.postalCode}
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
                value={formData.director.name}
                type="text"
                onChange={handleChange}
              />
              <MyTextField
                id="email"
                name="email"
                label="Email address"
                placeholder="babatunderotimi@mactay.com"
                value={formData.director.email}
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
                  value={formData.director.position}
                  onChange={handleChange}
                  required
                />
                <MyTextField
                  id="country"
                  name="country"
                  label="Country"
                  placeholder=""
                  type="text"
                  value={formData.address.country}
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

          <div className="flex justify-between mt-10">
            {currentStep > 1 && (
              <button
                type="button"
                className="text-[#0f1625] py-[10px] px-[14px] border rounded-[8px] text-base font-medium leading-none"
                onClick={previousStep}
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="text-white bg-[#0f1625] py-[10px] px-[14px] rounded-[8px] text-base font-medium leading-none"
            >
              {currentStep === 3 ? "Create Company" : "Save & Continue"}
            </button>
          </div>
        </form>
      </AppModal>

      {/* Success */}
      <AppModal
        open={successModal}
        handleClose={handleCloseSuccessModal}
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
            onClick={handleCloseSuccessModal}
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
              <span className="font-[700]">{formData.businessName}</span> has
              been added to your list of companies. Kindly switch companies to
              gain access and complete KYC in settings.{" "}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 w-full mt-3">
          <button
            type="button"
            className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={handleCloseSuccessModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#0f1625] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={handleOpenSwitch}
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

          <div
            className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]"
            onClick={() => setSwitchCompanyModal(false)}
          >
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
            onClick={() => setSwitchCompanyModal(false)}
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
        handleClose={handleCloseDeactivateModal}
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

          <div
            className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]"
            onClick={handleCloseDeactivateModal}
          >
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <p className="text-[16px] font-[400] text-[#0F1625]">
          You are about to deactivate{" "}
          <span className="font-[700]">
            {selectedCompany2?.businessName || "-----"}
          </span>{" "}
          from your companies. Once deactivated, this company would no longer be
          active
        </p>

        <div className="flex items-center justify-end gap-3 w-full mt-3">
          <button
            type="button"
            className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={handleCloseDeactivateModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#EF0000] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={deactivateBusiness}
          >
            {isLoadingBusinessDeactivate ? "Please wait..." : "Deactivate company"}
          </button>
        </div>
      </AppModal>

      {/* Activate Company */}
      <AppModal
        open={activateCompanyModal}
        handleClose={handleCloseActivateModal}
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
              Activate company
            </h1>
          </div>

          <div
            className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]"
            onClick={handleCloseActivateModal}
          >
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <p className="text-[16px] font-[400] text-[#0F1625]">
          You are about to Activate{" "}
          <span className="font-[700]">
            {selectedCompany2?.businessName || "-----"}
          </span>{" "}
          . Once Activated, this company would be visible
        </p>

        <div className="flex items-center justify-end gap-3 w-full mt-3">
          <button
            type="button"
            className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={handleCloseActivateModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#0BA259] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={activateBusiness}
          >
            {isLoadingBusinessActivate ? "Please wait..." : "Activate company"}
          </button>
        </div>
      </AppModal>

      {/* Delete Company */}
      <AppModal
        open={deleteCompanyModal}
        handleClose={handleCloseDeleteModal}
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

          <div
            className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]"
            onClick={handleCloseDeleteModal}
          >
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <p className="text-[16px] font-[400] text-[#0F1625]">
          You are about to delete{" "}
          <span className="font-[700]">
            {selectedCompany2?.businessName || "-----"}
          </span>{" "}
          from your companies. Once deleted, all data would be wiped and no
          longer accessible. This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-3 w-full mt-3">
          <button
            type="button"
            className="text-[#1F2937] border border-[#D0D6DD] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={handleCloseDeleteModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-[#EF0000] py-[10px] px-[16px] rounded-[8px] text-base font-medium leading-none"
            onClick={deleteBusiness}
          >
            {isLoadingBusinessDelete ? "Please wait..." : "Delete company"}
          </button>
        </div>
      </AppModal>
    </div>
  );
}
