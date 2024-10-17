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
import useAccountRequest from "@/services/accountRequest.service";
import { ButtonBase, IconButton, MenuItem, Stepper } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useDispatch } from "react-redux";
import { matchesQuery } from "@/helpers";
import { Bounce, toast } from "react-toastify";

export default function Branches() {
  const { isMobile } = useAppTheme();
  const [activeTab, setActiveTab] = useState("companies");
  const [company, setCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { makeRequest: getBranchRequest, isLoading: isLoadingGetBranch } =
    useAccountRequest();
  const { makeRequest: createBranchRequest, isLoading: isLoadingCreateBranch } =
    useAccountRequest();
  const { makeRequest: deleteBranchRequest, isLoading: isLoadingDeleteBranch } =
    useAccountRequest();
  const {
    makeRequest: defaultBranchRequest,
    isLoading: isLoadingDefaultBranch,
  } = useAccountRequest();
  const { makeRequest: updateBranchRequest, isLoading: isLoadingUpdateBranch } =
    useAccountRequest();
  const [branches, setBranches] = useState<any>([]);
  const pathname = usePathname();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [storedCompany, setStoredCompany] = useState<any>(null);
  const [switchCompanyModal, setSwitchCompanyModal] = useState(false);
  const [switchCompanyConfirmModal, setSwitchCompanyConfirmModal] =
    useState(false);
  const [deactivateBranchModal, setDeactivateBranchModal] = useState(false);
  const [activateBranchModal, setActivateBranchModal] = useState(false);
  const [deleteBranchModal, setDeleteBranchModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [selectedBranch2, setSelectedBranch2] = useState<any>(null);
  const [branchMenuOpen, setBranchMenuOpen] = useState<Array<boolean>>([]);
  const [branchId, setBranchId] = useState<any>(null);

  const handleOpen = (event: any, id: number) => {
    event.preventDefault(); // Prevent the default action (e.g., following a link)
    event.stopPropagation(); // Stop the event from propagating further

    // Set the anchor element to the current target
    setAnchorEl(event.currentTarget);

    // Set the specific UserMenu state to open for the clicked user row
    setBranchMenuOpen((prevBranchMenuOpen) => {
      const updatedUserMenuOpen = [...prevBranchMenuOpen];
      updatedUserMenuOpen[id] = true;
      return updatedUserMenuOpen;
    });
  };

  const handleClose = () => {
    setBranchMenuOpen(Array(branches.length).fill(false));
    setAnchorEl(null);
  };

  useEffect(() => {
    const storedCompany = localStorage.getItem("company-details");
    if (storedCompany) {
      setCompanyDetails(JSON.parse(storedCompany)); // Parse the string back to an object
    }
  }, []);

  // Optionally, log the company details to confirm
  useEffect(() => {
    if (companyDetails) {
      setStoredCompany(companyDetails);
    }
  }, [companyDetails]);

  // Extract the ID from the pathname
  const businessId = pathname.split("/").slice(-2)[0];

  // Check if the ID is present and valid (optional)
  if (!businessId) {
    // Handle the case where the ID is missing
    console.error("ID is missing from the URL.");
    return null; // Or redirect to a default page
  }

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
    name: "",
    address: "",
    state: "",
    country: "",
    lga: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const payload = {
    business: storedCompany?._id,
    name: formData.name,
    address: formData.address,
    state: formData.state,
    country: formData.country,
    localGovernmentArea: formData.lga,
    postalCode: formData.postalCode,
  };

  const createBranch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    catchAsync(
      async () => {
        const res = await createBranchRequest({
          method: "POST",
          url: API.branch,
          data: payload,
        });

        const { data } = res;

        if (data?.status === "SUCCESS") {
          setShowModal(false);
          setSuccessModal(true);
          setBranches(data);
          getBranches();
          setFormData({
            name: "",
            address: "",
            state: "",
            country: "",
            lga: "",
            postalCode: "",
          });
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

  // Update Branch
  const handleEditBranch = (branch: any) => {
    setBranchId(branch?._id)
    setFormData({
      name: branch.name,
      address: branch.address,
      state: branch.state,
      country: branch.country,
      lga: branch.localGovernmentArea,
      postalCode: branch.postalCode,
    });
    setEditModal(true);
  };

  const updateBranch = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    catchAsync(
      async () => {
        const res = await updateBranchRequest({
          method: "PATCH",
          url: `${API.branch}/${businessId}/${branchId}`, // Use branchId to target the branch
          data: payload,
        });

        const { data } = res;

        if (data?.status === "SUCCESS") {
          setEditModal(false);
          toast.success("Branch updated successfully.", {
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
          getBranches();
        }
      },
      (error: any) => {
        const response = error?.response;
        if (response) {
          enqueueSnackbar(
            response?.data?.data?.message ||
              "An error occurred during branch update",
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

  // Get Branches
  const getBranches = async () => {
    catchAsync(
      async () => {
        const res = await getBranchRequest({
          method: "GET",
          url: `${API.branch}?business=${businessId}`,
        });

        const { data } = res?.data;
        setBranches(data);
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
    if (businessId) {
      getBranches();
    }
  }, [businessId]);

  // Delete Branch
  const deleteBranch = async () => {
    catchAsync(
      async () => {
        const res = await deleteBranchRequest({
          method: "DELETE",
          url: `${API.branch}?ids[]=${selectedBranch2?._id}`,
        });

        const { data } = res?.data;
        toast.success("Branch deleted successfully.", {
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
        getBranches();
        setDeleteBranchModal(false);
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

  // Make Head Office / Default
  const makeDefault = async (selectedBranchForDefault: { _id: any }) => {
    catchAsync(
      async () => {
        const res = await defaultBranchRequest({
          method: "POST",
          url: `${API.branch}/${businessId}/main/${selectedBranchForDefault?._id}`,
        });

        const { data } = res?.data;
        toast.success("Default branch set successfully.", {
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

  const state = ["Lagos", "Abuja"];

  const businessTypes = [
    "Limited Liability Company",
    "Private Company",
    "Sole Proprietorship",
    "Small-Medium Enterprise",
    "NGOs (Governmental)",
  ];

  const subsidiary = ["Yes", "No"];

  const countries = ["Afghanistan", "Albania"];

  const handleBranchDeleteModal = (branch: any) => {
    setSelectedBranch2(branch);
    setDeleteBranchModal(true); // Open the delete modal
  };

  const handleCloseDeleteModal = () => {
    setSelectedBranch(null);
    setDeleteBranchModal(false);
  };

  // Deactivate Modal
  const handleBranchDeactivateModal = (branch: any) => {
    setSelectedBranch2(branch);
    setDeactivateBranchModal(true); // Open the Deactivate modal
  };

  const handleCloseDeactivateModal = () => {
    setSelectedBranch(null);
    setDeactivateBranchModal(false);
  };

  // Activate Modal
  const handleBranchActivateModal = (branch: any) => {
    setSelectedBranch2(branch);
    setActivateBranchModal(true); // Open the Deactivate modal
  };

  const handleCloseActivateModal = () => {
    setSelectedBranch(null);
    setActivateBranchModal(false);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // Main filtering logic
  const filteredBranches = branches?.filter((branch: any) => {
    const searchQueryLower = searchQuery.toLowerCase();

    // Define all searchable fields in an array
    const fieldsToSearch = [branch.name];

    // Return true if any field matches the query
    return fieldsToSearch.some((field) =>
      matchesQuery(field, searchQueryLower)
    );
  });

  return (
    <div>
      <div>
        <h1 className="text-[28px] font-[700] text-[#0F1625]">
          {storedCompany?.businessName || "-----"} branches
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
              value={searchQuery}
              onChange={handleSearchInputChange}
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
        <BranchTable
          branches={filteredBranches || []}
          anchorEl={anchorEl}
          branchMenuOpen={branchMenuOpen}
          handleOpen={handleOpen}
          handleClose={handleClose}
          setAnchorEl={setAnchorEl}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          onSwitch={() => setSwitchCompanyModal(true)}
          onEdit={handleEditBranch}
          onDeactivate={handleBranchDeactivateModal}
          onActivate={handleBranchActivateModal}
          onDelete={handleBranchDeleteModal}
          onMakeHeadOffice={makeDefault}
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

          <div
            className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]"
            onClick={() => setShowModal(false)}
          >
            <IconButton>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        {/* Form */}
        <form className="w-[100%] overflow-auto remove-scroll-bar">
          <div className="space-y-5">
            <MyTextField
              id="name"
              name="name"
              label="Branch name"
              placeholder="Surulere"
              value={formData.name}
              type="text"
              onChange={handleChange}
            />
            <MyTextField
              id="address"
              name="address"
              label="Address"
              placeholder="5, Prince Adelowo Adedeji St, Peninsula, Lagos"
              value={formData.address}
              type="text"
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-5">
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
                id="state"
                name="state"
                label="State"
                placeholder=""
                type="text"
                value={formData.state}
                onChange={handleChange}
                select
                required
              >
                {state.map((size, i) => (
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
                value={formData.lga}
                type="text"
                onChange={handleChange}
              />
              <MyTextField
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                placeholder="106104"
                value={formData.postalCode}
                type="number"
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <button
          type="button"
          className="text-white bg-[#0f1625] min-w-full py-[14px] rounded-[8px] text-base font-medium mt-3 leading-none"
          onClick={createBranch}
        >
          {isLoadingCreateBranch ? "Please wait..." : "Create branch"}
        </button>
      </AppModal>

      {/* Edit Modal */}
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
              Edit {formData.name} branch
            </h1>
            <p className="text-[#0F1625] text-[3.5vw] sm:text-[16px] font-[400]">
              Update the branch details below.
            </p>
          </div>
          <div className=" bg-[#F9FAFB] rounded-full flex justify-center items-center w-[32px] h-[32px]">
            <IconButton onClick={() => setEditModal(false)}>
              <img src="/icons/cancelModal.svg" width={10} height={10} />
            </IconButton>
          </div>
        </div>

        <form className="w-[100%] overflow-auto remove-scroll-bar">
          <div className="space-y-5">
            <MyTextField
              id="name"
              name="name"
              label="Branch name"
              placeholder="Surulere"
              value={formData.name}
              type="text"
              onChange={handleChange}
            />
            <MyTextField
              id="address"
              name="address"
              label="Address"
              placeholder="5, Prince Adelowo Adedeji St, Peninsula, Lagos"
              value={formData.address}
              type="text"
              onChange={handleChange}
            />
            <div className="grid grid-cols-2 gap-5">
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
                id="state"
                name="state"
                label="State"
                placeholder=""
                type="text"
                value={formData.state}
                onChange={handleChange}
                select
                required
              >
                {state.map((size, i) => (
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
                value={formData.lga}
                type="text"
                onChange={handleChange}
              />
              <MyTextField
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                placeholder="106104"
                value={formData.postalCode}
                type="number"
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
        <button
          type="button"
          className="text-white bg-[#0f1625] min-w-full py-[14px] rounded-[8px] text-base font-medium mt-3 leading-none"
          onClick={updateBranch}
        >
          {isLoadingUpdateBranch ? "Please wait..." : "Save changes"}
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
              <span className="font-[700]">{formData.name}</span> has been added
              to your list of branches for{" "}
              <span className="font-[700]">{storedCompany?.businessName}</span>.
              You can now add employees to this branch.
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
          You are about to make a{" "}
          <span className="font-[700]">Lekki Phase 1</span> the head office for{" "}
          <span className="font-[700]">MacTay Consulting</span>. Click “Make
          head office” to confirm this action.
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
          value={""}
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
      {/* <AppModal
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
            {isLoadingBusinessDeactivate ? "Loading..." : "Deactivate company"}
          </button>
        </div>
      </AppModal> */}

      {/* Activate Company */}
      {/* <AppModal
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
            {isLoadingBusinessDeactivate ? "Loading..." : "Activate company"}
          </button>
        </div>
      </AppModal> */}

      {/* Delete Company */}
      <AppModal
        open={deleteBranchModal}
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
              Delete branch
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
          <span className="font-[700]">{selectedBranch2?.name || "-----"}</span>{" "}
          from your branches. Once deleted, all data would be wiped and no
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
            onClick={deleteBranch}
          >
            {isLoadingDeleteBranch ? "Please wait..." : "Delete branch"}
          </button>
        </div>
      </AppModal>
    </div>
  );
}
