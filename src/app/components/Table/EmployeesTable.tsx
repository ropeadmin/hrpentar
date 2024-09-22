import { Checkbox, IconButton } from "@mui/material";
import Table from "./Table";
import { Key } from "react";

const EmployeesTable = ({ employees }: any) => {
  return (
    <Table
      head={
        <>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Employee name
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Employee ID
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Email
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Role
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-4 text-[16px] font-[700] text-[#0F1625]"
          >
            Status
          </th>
        </>
      }
      body={employees.map((employee: any, i: Key | null | undefined) => {
        return (
          <>
            <tr key={i} className="bg-white border-b border-[#F1F5F9]">
              <td className="px-3 py-4 whitespace-nowrap">{employee.name}</td>
              <td className="px-3 py-4">{employee.id}</td>
              <td className="px-3 py-4">{employee.email}</td>
              <td className="px-3 py-4">{employee.role}</td>
              <td className="px-3 py-4">
                <div
                  className={`py-[8px] px-[8px] rounded-[8px] text-[12px] font-[700] leading-none w-fit ${
                    employee.status === "Active"
                      ? "bg-[#F3FBF7] text-[#0BA259]"
                      : employee.status === "On leave"
                      ? "bg-[#F0F8FE] text-[#1395F6]"
                      : employee.status === "Onboarding"
                      ? "bg-[#F6F0FE] text-[#9747FF]"
                      : "bg-[#F0F2F5] text-[#0F1625]"
                  }`}
                >
                  {employee.status}
                </div>
              </td>
            </tr>
          </>
        );
      })}
    />
  );
};

export default EmployeesTable;
