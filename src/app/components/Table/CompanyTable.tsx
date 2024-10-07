import { Checkbox, IconButton } from "@mui/material";
import Table from "./Table";
import { Key } from "react";

const CompanyTable = ({ companies }: any) => {
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
            Company name
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Company prefix
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Industry
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Business type
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Branches
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
          >
          </th>
        </>
      }
      body={companies.map((company: any, i: Key | null | undefined) => {
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
                {company.companyName}
              </td>
              <td className="px-3 py-4">{company.prefix}</td>
              <td className="px-3 py-4">{company.industry}</td>
              <td className="px-3 py-4">{company.businessType}</td>
              <td className="px-3 py-4">{company.branch}</td>
              <td className="px-3 py-4">
                <div
                  className={`py-[8px] px-[8px] rounded-[8px] text-[12px] font-[700] leading-none w-fit ${
                    company.status === "Active"
                      ? "bg-[#F3FBF7] text-[#0BA259]"
                      : company.status === "On leave"
                      ? "bg-[#F0F8FE] text-[#1395F6]"
                      : company.status === "Onboarding"
                      ? "bg-[#F6F0FE] text-[#9747FF]"
                      : "bg-[#F0F2F5] text-[#0F1625]"
                  }`}
                >
                  {company.status}
                </div>
              </td>
              <td className="px-3 py-4">
                <IconButton>
                    <img src='/icons/hamburgerTable.svg' className="rounded-full w-[15px] h-[15px]"/>
                </IconButton>
              </td>
            </tr>
          </>
        );
      })}
    />
  );
};

export default CompanyTable;
