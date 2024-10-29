import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import Table from "./Table";
import { Key } from "react";

const BranchTable = ({
  branches,
  onSwitch,
  onEdit,
  onMakeHeadOffice,
  onDeactivate,
  onActivate,
  onDelete,
  anchorEl,
  selectedBranch,
  setSelectedBranch,
  setAnchorEl,
  branchMenuOpen,
  handleOpen,
  handleClose,
}: any) => {
  return (
    <Table
      head={
        <>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
              <input
                className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[5px] border-[0.5px] border-[#D0D6DD] outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right"
                type="checkbox"
                value=""
                id=""
                checked={false}
              />
            </div>
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Branch name
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Address
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Branch ID
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Departments
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Team members
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Status
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          ></th>
        </>
      }
      body={
        branches &&
        branches?.map((branch: any, i: any) => {
          return (
            <>
              <tr key={i} className="bg-white border-b border-[#F1F5F9]">
                <td className="px-3 py-4 whitespace-nowrap">
                  <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                    <input
                      className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[5px] border-[0.5px] border-[#D0D6DD] outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right"
                      type="checkbox"
                      value=""
                      id=""
                      checked={false}
                    />
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                <div className="flex gap-2 items-center">
                  <p>{branch?.name}</p>
                  {branch?.main === true && <div className="rounded-full px-[8px] py-[2px] bg-[#F9F5FF] border-[#E9D7FE] border"><p className='leading-none text-[12px] font-[700] text-[#A056FF]'>Main</p></div>}
                </div>
              </td>
                <td className="px-3 py-4">{branch?.address}</td>
                <td className="px-3 py-4">{branch?.branchId}</td>
                <td className="px-3 py-4">{branch?.department || "-----"}</td>
                <td className="px-3 py-4">{branch?.member || "-----"}</td>
                <td className="px-3 py-4">
                  <div
                    className={`py-[8px] px-[8px] rounded-[8px] text-[12px] font-[700] leading-none w-fit ${
                      branch.status === "ACTIVE"
                        ? "bg-[#F3FBF7] text-[#0BA259]"
                        : branch.status === "Deactivated"
                        ? "bg-[#FFF3F3] text-[#EF0000]"
                        : "bg-[#F0F2F5] text-[#0F1625]"
                    }`}
                  >
                    {branch.status}
                  </div>
                </td>
                <td className="px-3 py-4">
                  <IconButton onClick={(event) => handleOpen(event, i)}>
                    <img
                      src="/icons/hamburgerTable.svg"
                      className="rounded-full w-[15px] h-[15px]"
                    />
                  </IconButton>
                </td>
              </tr>

              {/* Menu Dropdown */}
              <BranchMenu
                open={branchMenuOpen[i]}
                anchorEl={anchorEl}
                handleClose={handleClose}
                status={branch?.status}
                branch={branches[selectedBranch]} // Pass the selected branch data
                onSwitch={onSwitch}
                onEdit={() => onEdit(branch)}
                onMakeHeadOffice={() => onMakeHeadOffice(branch)}
                onDeactivate={() => onDeactivate(branch)}
                onActivate={() => onActivate(branch)}
                onDelete={() => onDelete(branch)} // Use arrow function to pass it as a reference
              />
            </>
          );
        })
      }
    />
  );
};

export const BranchMenu = ({
  anchorEl,
  open,
  handleClose,
  onSwitch,
  onEdit,
  onMakeHeadOffice,
  onDeactivate,
  onActivate,
  onDelete,
  branch,
  status,
}: {
  anchorEl: any;
  open: boolean;
  handleClose: () => void;
  onSwitch: () => void | any;
  onEdit: () => void | any;
  onMakeHeadOffice: () => void | any;
  onDeactivate: () => void | any;
  onActivate: () => void | any;
  onDelete: () => void | any;
  branch?: any;
  status?: any;
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="branch-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: "12px",
          overflow: "visible",
          boxShadow: "0px 12px 12px 0px rgba(0, 0, 0, 0.05)",
          mt: 1.5,
          ml: 2.2,
          width: "auto", // Ensure the width adjusts to content
          maxWidth: "300px", // Optional: to limit how wide the menu can grow
          padding: "8px 12px", // Adjust padding for better content fitting
          whiteSpace: "nowrap", // Prevent content from wrapping to the next line
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
    >
      {/* <BranchMenuItem onClick={onSwitch} title="Switch to" /> */}
      <BranchMenuItem onClick={onEdit} title="Edit branch" />
      <BranchMenuItem onClick={onMakeHeadOffice} title="Make head office" />
      {/* <BranchMenuItem
        onClick={status === "Deactivated" ? onActivate : onDeactivate}
        title={
          status === "Deactivated" ? "Activate branch" : "Deactivate branch"
        }
      /> */}
      <BranchMenuItem onClick={onDelete} title="Delete branch" color="red" />
    </Menu>
  );
};

export const BranchMenuItem = ({
  onClick,
  icon,
  title,
  color,
}: {
  color?: string;
  title?: string;
  icon?: React.ReactNode;
  onClick?: any;
}) => {
  return (
    <MenuItem sx={{ borderRadius: "10px" }} onClick={onClick}>
      <div className="w-full h-[31px] flex justify-start items-center gap-[8px]">
        {/* {icon} */}
        <span
          className={"font-[500] text-sm text-[#323B49]"}
          style={{
            color,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </span>
      </div>
    </MenuItem>
  );
};

export default BranchTable;
