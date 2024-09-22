import { Checkbox, IconButton } from "@mui/material";
import Table from "./Table";
import { Key } from "react";

const ActionTableTask = ({ tasks }: any) => {
  return (
    <Table
      head={
        <>
          <th scope="col" className="bg-header px-3 py-2">
            <Checkbox
              checked={false}
              //   onChange={handleSelectAll}
              sx={{
                color: "#C9C9C9",
                "& .MuiSvgIcon-root": { fontSize: 20 },
              }}
            />
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-2 text-[16px] font-[700] text-[#0F1625]"
          >
            Task name
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-2 text-[16px] font-[700] text-[#0F1625]"
          >
            Due date
          </th>
          <th
            scope="col"
            className="bg-header px-3 py-2 text-[16px] font-[700] text-[#0F1625]"
          >
            Priority
          </th>
        </>
      }
      body={tasks.map((task: any, i: Key | null | undefined) => {
        return (
          <>
            <tr key={i} className="bg-white border-b border-[#F1F5F9]">
              <td scope="row" className="pl-3  py-2 text-[1.1vw] font-[700]">
                <Checkbox
                  checked={false}
                  //   onClick={handleSelected}
                  sx={{
                    color: "#C9C9C9",
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                  }}
                />
              </td>
              <td className="px-3 py-2 whitespace-nowrap">{task.name}</td>
              <td className="px-3 py-2">{task.dueDate}</td>
              <td className="px-3 py-2">
                <div
                  className={`py-[8px] px-[8px] rounded-[8px] text-[12px] font-[700] leading-none w-fit ${
                    task.priority === "High"
                      ? "bg-[#FFF3F3] text-[#EF0000]"
                      : task.priority === "Medium"
                      ? "bg-[#FFFAE9] text-[#E4B60B]"
                      : "bg-[#F0F8FE] text-[#1395F6]"
                  }`}
                >
                  {task.priority}
                </div>
              </td>
            </tr>
          </>
        );
      })}
    />
  );
};

export default ActionTableTask;
