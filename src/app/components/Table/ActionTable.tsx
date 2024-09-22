import { Checkbox, IconButton } from "@mui/material";
import Table from "./Table";

const ActionTableTask = ({ lead, handleOpenExportMenu }: any) => {
  return (
    <Table
      head={
        <>
          <th scope="col" className="bg-header">
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
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Leads
          </th>
          <th
            scope="col"
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Member Connected with
          </th>
          <th
            scope="col"
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Date
          </th>
          <th
            scope="col"
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Export
          </th>
          <th
            scope="col"
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Menu
          </th>
        </>
      }
      body={[].map((item, i) => {
        // const receiversPersona =
        //   item?.receiver || item?.leadCapture;
        // const persona = item?.member;
        // const isSelected = selectedConnections.includes(
        //   item?._id,
        // );
        // const handleSelected = (e) => {
        //   handleSelection(e.target.checked, item?._id);
        // };

        return (
          <>
            <tr key={i} className="bg-white border-b border-[#F1F5F9]">
              <td scope="row" className="px-6 py-4 text-[1.1vw] font-[700]">
                <Checkbox
                  checked={false}
                  //   onClick={handleSelected}
                  sx={{
                    color: "#C9C9C9",
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                  }}
                />
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap"
                // onClick={() => handleLead(item._id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-[48px] h-[48px] rounded-full">
                    {/* <img
                                      src={
                                        receiversPersona?.profilePx
                                          ? receiversPersona?.profilePx
                                          : Assets.NoUserImage
                                      }
                                      alt=''
                                      className='w-full h-full rounded-full object-cover'
                                    /> */}
                  </div>
                  <div className="flex flex-col items-center justify-center mt-1">
                    <div className="flex flex-col space-y-1">
                      {/* <h3 className='text-[16px] font-[700] text-[#0F172A]'>
                                        {receiversPersona.name
                                          ? receiversPersona.name
                                          : '-----'}
                                      </h3>
                                      <span className='text-[12px] font-[500] text-[#616161]'>
                                        {receiversPersona?.jobTitle
                                          ? receiversPersona?.jobTitle
                                          : '---'}
                                      </span> */}
                    </div>
                  </div>
                </div>
              </td>
              <td
                className="px-6 py-4"
                // onClick={() => handleLead(item._id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-[48px] h-[48px] rounded-full">
                    {/* <img
                                      src={
                                        persona?.profilePx
                                          ? persona?.profilePx
                                          : Assets.NoUserImage
                                      }
                                      alt=''
                                      className='w-full h-full rounded-full object-cover'
                                    /> */}
                  </div>
                  <div className="flex flex-col items-center justify-center mt-1">
                    <div className="flex flex-col">
                      {/* <h3 className='text-[14px] text-[#0F172A] font-[500]'>
                                        {persona?.fullName
                                          ? persona?.fullName
                                          : '-----'}
                                      </h3> */}
                    </div>
                  </div>
                </div>
              </td>
              {/* <td
                                className='px-6 py-4 text-[14px] text-[#616161] font-[400]'
                                onClick={() => handleLead(item._id)}
                              >
                                {moment(item?.createdAt).format(appDateFormat)}
                              </td> */}
              <td className="px-6 py-4">
                <div
                  className="cursor-pointer"
                  //   onClick={(event) => handleOpen(event, item)}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="48" height="48" rx="12" fill="#EAF6EE" />
                    <path
                      d="M27.7506 17.25C27.7506 17.0511 27.8297 16.8603 27.9703 16.7197C28.111 16.579 28.3017 16.5 28.5006 16.5H30.0006V15C30.0006 14.8011 30.0797 14.6103 30.2203 14.4697C30.361 14.329 30.5517 14.25 30.7506 14.25C30.9495 14.25 31.1403 14.329 31.281 14.4697C31.4216 14.6103 31.5006 14.8011 31.5006 15V16.5H33.0006C33.1995 16.5 33.3903 16.579 33.531 16.7197C33.6716 16.8603 33.7506 17.0511 33.7506 17.25C33.7506 17.4489 33.6716 17.6397 33.531 17.7803C33.3903 17.921 33.1995 18 33.0006 18H31.5006V19.5C31.5006 19.6989 31.4216 19.8897 31.281 20.0303C31.1403 20.171 30.9495 20.25 30.7506 20.25C30.5517 20.25 30.361 20.171 30.2203 20.0303C30.0797 19.8897 30.0006 19.6989 30.0006 19.5V18H28.5006C28.3017 18 28.111 17.921 27.9703 17.7803C27.8297 17.6397 27.7506 17.4489 27.7506 17.25ZM33.6156 22.3763C33.9583 24.413 33.6448 26.506 32.7203 28.353C31.7959 30.2 30.3085 31.7054 28.4727 32.6518C26.6369 33.5983 24.5479 33.9369 22.5071 33.6187C20.4664 33.3005 18.5796 32.342 17.1191 30.8815C15.6587 29.421 14.7002 27.5342 14.382 25.4935C14.0637 23.4528 14.4023 21.3637 15.3488 19.5279C16.2953 17.6922 17.8007 16.2047 19.6477 15.2803C21.4946 14.3559 23.5876 14.0424 25.6244 14.385C25.8191 14.4194 25.9923 14.5294 26.1064 14.6908C26.2204 14.8523 26.2661 15.0523 26.2335 15.2473C26.2009 15.4423 26.0926 15.6165 25.9322 15.7321C25.7717 15.8477 25.5722 15.8952 25.3769 15.8644C24.1939 15.6654 22.9817 15.7265 21.8248 16.0436C20.6678 16.3607 19.5939 16.9261 18.6776 17.7005C17.7614 18.4748 17.0249 19.4395 16.5194 20.5275C16.0139 21.6154 15.7516 22.8004 15.7506 24C15.7489 26.0196 16.4911 27.969 17.8356 29.4759C18.6721 28.2638 19.8483 27.3261 21.2163 26.7806C20.4814 26.2019 19.9452 25.4085 19.6822 24.5109C19.4192 23.6132 19.4424 22.6559 19.7487 21.7721C20.055 20.8883 20.629 20.1218 21.3911 19.5794C22.1531 19.037 23.0653 18.7455 24.0006 18.7455C24.936 18.7455 25.8482 19.037 26.6102 19.5794C27.3722 20.1218 27.9463 20.8883 28.2526 21.7721C28.5589 22.6559 28.5821 23.6132 28.3191 24.5109C28.056 25.4085 27.5198 26.2019 26.785 26.7806C28.153 27.3261 29.3292 28.2638 30.1656 29.4759C31.5102 27.969 32.2524 26.0196 32.2506 24C32.2507 23.5389 32.2124 23.0786 32.1363 22.6238C32.119 22.5262 32.1213 22.4262 32.1429 22.3295C32.1645 22.2328 32.2051 22.1414 32.2622 22.0604C32.3194 21.9795 32.392 21.9107 32.4759 21.858C32.5598 21.8053 32.6533 21.7698 32.751 21.7534C32.8488 21.7371 32.9488 21.7403 33.0452 21.7628C33.1417 21.7853 33.2328 21.8267 33.3132 21.8846C33.3936 21.9425 33.4617 22.0158 33.5136 22.1002C33.5655 22.1846 33.6002 22.2784 33.6156 22.3763ZM24.0006 26.25C24.594 26.25 25.174 26.0741 25.6673 25.7444C26.1607 25.4148 26.5452 24.9462 26.7723 24.3981C26.9993 23.8499 27.0587 23.2467 26.943 22.6647C26.8272 22.0828 26.5415 21.5482 26.122 21.1287C25.7024 20.7091 25.1678 20.4234 24.5859 20.3077C24.004 20.1919 23.4008 20.2513 22.8526 20.4784C22.3044 20.7054 21.8359 21.09 21.5062 21.5833C21.1766 22.0766 21.0006 22.6567 21.0006 23.25C21.0006 24.0457 21.3167 24.8087 21.8793 25.3713C22.4419 25.9339 23.205 26.25 24.0006 26.25ZM24.0006 32.25C25.8319 32.2519 27.6112 31.6414 29.0556 30.5156C28.5131 29.6671 27.7656 28.9688 26.8822 28.4851C25.9988 28.0014 25.0078 27.7478 24.0006 27.7478C22.9935 27.7478 22.0025 28.0014 21.1191 28.4851C20.2356 28.9688 19.4882 29.6671 18.9456 30.5156C20.39 31.6414 22.1694 32.2519 24.0006 32.25Z"
                      fill="#5CB67F"
                    />
                  </svg>
                </div>
              </td>
              <td className="px-6 py-4">
                <IconButton
                //   onClick={(event) =>
                //     handleOpenLeadsBondl(i, event)
                //   }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="5"
                    height="18"
                    viewBox="0 0 5 18"
                    fill="none"
                  >
                    <path
                      d="M2.5 10C3.05228 10 3.5 9.55228 3.5 9C3.5 8.44772 3.05228 8 2.5 8C1.94772 8 1.5 8.44772 1.5 9C1.5 9.55228 1.94772 10 2.5 10Z"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 17C3.05228 17 3.5 16.5523 3.5 16C3.5 15.4477 3.05228 15 2.5 15C1.94772 15 1.5 15.4477 1.5 16C1.5 16.5523 1.94772 17 2.5 17Z"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 3C3.05228 3 3.5 2.55228 3.5 2C3.5 1.44772 3.05228 1 2.5 1C1.94772 1 1.5 1.44772 1.5 2C1.5 2.55228 1.94772 3 2.5 3Z"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>
              </td>
            </tr>
          </>
        );
      })}
    />
  );
};

export default ActionTableTask;

export const ActionTableLeave = ({ lead, handleOpenExportMenu }: any) => {
  return (
    <Table
      head={
        <>
          <th scope="col" className="bg-header">
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
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Leads
          </th>
          <th
            scope="col"
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Member Connected with
          </th>
          <th
            scope="col"
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Date
          </th>
          <th
            scope="col"
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Export
          </th>
          <th
            scope="col"
            className="bg-header text-[16px] font-[700] text-[#94A3B8]"
          >
            Menu
          </th>
        </>
      }
      body={[].map((item, i) => {
        // const receiversPersona =
        //   item?.receiver || item?.leadCapture;
        // const persona = item?.member;
        // const isSelected = selectedConnections.includes(
        //   item?._id,
        // );
        // const handleSelected = (e) => {
        //   handleSelection(e.target.checked, item?._id);
        // };

        return (
          <>
            <tr key={i} className="bg-white border-b border-[#F1F5F9]">
              <td scope="row" className="px-6 py-4 text-[1.1vw] font-[700]">
                <Checkbox
                  checked={false}
                  //   onClick={handleSelected}
                  sx={{
                    color: "#C9C9C9",
                    "& .MuiSvgIcon-root": { fontSize: 20 },
                  }}
                />
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap"
                // onClick={() => handleLead(item._id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-[48px] h-[48px] rounded-full">
                    {/* <img
                                      src={
                                        receiversPersona?.profilePx
                                          ? receiversPersona?.profilePx
                                          : Assets.NoUserImage
                                      }
                                      alt=''
                                      className='w-full h-full rounded-full object-cover'
                                    /> */}
                  </div>
                  <div className="flex flex-col items-center justify-center mt-1">
                    <div className="flex flex-col space-y-1">
                      {/* <h3 className='text-[16px] font-[700] text-[#0F172A]'>
                                        {receiversPersona.name
                                          ? receiversPersona.name
                                          : '-----'}
                                      </h3>
                                      <span className='text-[12px] font-[500] text-[#616161]'>
                                        {receiversPersona?.jobTitle
                                          ? receiversPersona?.jobTitle
                                          : '---'}
                                      </span> */}
                    </div>
                  </div>
                </div>
              </td>
              <td
                className="px-6 py-4"
                // onClick={() => handleLead(item._id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-[48px] h-[48px] rounded-full">
                    {/* <img
                                      src={
                                        persona?.profilePx
                                          ? persona?.profilePx
                                          : Assets.NoUserImage
                                      }
                                      alt=''
                                      className='w-full h-full rounded-full object-cover'
                                    /> */}
                  </div>
                  <div className="flex flex-col items-center justify-center mt-1">
                    <div className="flex flex-col">
                      {/* <h3 className='text-[14px] text-[#0F172A] font-[500]'>
                                        {persona?.fullName
                                          ? persona?.fullName
                                          : '-----'}
                                      </h3> */}
                    </div>
                  </div>
                </div>
              </td>
              {/* <td
                                className='px-6 py-4 text-[14px] text-[#616161] font-[400]'
                                onClick={() => handleLead(item._id)}
                              >
                                {moment(item?.createdAt).format(appDateFormat)}
                              </td> */}
              <td className="px-6 py-4">
                <div
                  className="cursor-pointer"
                  //   onClick={(event) => handleOpen(event, item)}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="48" height="48" rx="12" fill="#EAF6EE" />
                    <path
                      d="M27.7506 17.25C27.7506 17.0511 27.8297 16.8603 27.9703 16.7197C28.111 16.579 28.3017 16.5 28.5006 16.5H30.0006V15C30.0006 14.8011 30.0797 14.6103 30.2203 14.4697C30.361 14.329 30.5517 14.25 30.7506 14.25C30.9495 14.25 31.1403 14.329 31.281 14.4697C31.4216 14.6103 31.5006 14.8011 31.5006 15V16.5H33.0006C33.1995 16.5 33.3903 16.579 33.531 16.7197C33.6716 16.8603 33.7506 17.0511 33.7506 17.25C33.7506 17.4489 33.6716 17.6397 33.531 17.7803C33.3903 17.921 33.1995 18 33.0006 18H31.5006V19.5C31.5006 19.6989 31.4216 19.8897 31.281 20.0303C31.1403 20.171 30.9495 20.25 30.7506 20.25C30.5517 20.25 30.361 20.171 30.2203 20.0303C30.0797 19.8897 30.0006 19.6989 30.0006 19.5V18H28.5006C28.3017 18 28.111 17.921 27.9703 17.7803C27.8297 17.6397 27.7506 17.4489 27.7506 17.25ZM33.6156 22.3763C33.9583 24.413 33.6448 26.506 32.7203 28.353C31.7959 30.2 30.3085 31.7054 28.4727 32.6518C26.6369 33.5983 24.5479 33.9369 22.5071 33.6187C20.4664 33.3005 18.5796 32.342 17.1191 30.8815C15.6587 29.421 14.7002 27.5342 14.382 25.4935C14.0637 23.4528 14.4023 21.3637 15.3488 19.5279C16.2953 17.6922 17.8007 16.2047 19.6477 15.2803C21.4946 14.3559 23.5876 14.0424 25.6244 14.385C25.8191 14.4194 25.9923 14.5294 26.1064 14.6908C26.2204 14.8523 26.2661 15.0523 26.2335 15.2473C26.2009 15.4423 26.0926 15.6165 25.9322 15.7321C25.7717 15.8477 25.5722 15.8952 25.3769 15.8644C24.1939 15.6654 22.9817 15.7265 21.8248 16.0436C20.6678 16.3607 19.5939 16.9261 18.6776 17.7005C17.7614 18.4748 17.0249 19.4395 16.5194 20.5275C16.0139 21.6154 15.7516 22.8004 15.7506 24C15.7489 26.0196 16.4911 27.969 17.8356 29.4759C18.6721 28.2638 19.8483 27.3261 21.2163 26.7806C20.4814 26.2019 19.9452 25.4085 19.6822 24.5109C19.4192 23.6132 19.4424 22.6559 19.7487 21.7721C20.055 20.8883 20.629 20.1218 21.3911 19.5794C22.1531 19.037 23.0653 18.7455 24.0006 18.7455C24.936 18.7455 25.8482 19.037 26.6102 19.5794C27.3722 20.1218 27.9463 20.8883 28.2526 21.7721C28.5589 22.6559 28.5821 23.6132 28.3191 24.5109C28.056 25.4085 27.5198 26.2019 26.785 26.7806C28.153 27.3261 29.3292 28.2638 30.1656 29.4759C31.5102 27.969 32.2524 26.0196 32.2506 24C32.2507 23.5389 32.2124 23.0786 32.1363 22.6238C32.119 22.5262 32.1213 22.4262 32.1429 22.3295C32.1645 22.2328 32.2051 22.1414 32.2622 22.0604C32.3194 21.9795 32.392 21.9107 32.4759 21.858C32.5598 21.8053 32.6533 21.7698 32.751 21.7534C32.8488 21.7371 32.9488 21.7403 33.0452 21.7628C33.1417 21.7853 33.2328 21.8267 33.3132 21.8846C33.3936 21.9425 33.4617 22.0158 33.5136 22.1002C33.5655 22.1846 33.6002 22.2784 33.6156 22.3763ZM24.0006 26.25C24.594 26.25 25.174 26.0741 25.6673 25.7444C26.1607 25.4148 26.5452 24.9462 26.7723 24.3981C26.9993 23.8499 27.0587 23.2467 26.943 22.6647C26.8272 22.0828 26.5415 21.5482 26.122 21.1287C25.7024 20.7091 25.1678 20.4234 24.5859 20.3077C24.004 20.1919 23.4008 20.2513 22.8526 20.4784C22.3044 20.7054 21.8359 21.09 21.5062 21.5833C21.1766 22.0766 21.0006 22.6567 21.0006 23.25C21.0006 24.0457 21.3167 24.8087 21.8793 25.3713C22.4419 25.9339 23.205 26.25 24.0006 26.25ZM24.0006 32.25C25.8319 32.2519 27.6112 31.6414 29.0556 30.5156C28.5131 29.6671 27.7656 28.9688 26.8822 28.4851C25.9988 28.0014 25.0078 27.7478 24.0006 27.7478C22.9935 27.7478 22.0025 28.0014 21.1191 28.4851C20.2356 28.9688 19.4882 29.6671 18.9456 30.5156C20.39 31.6414 22.1694 32.2519 24.0006 32.25Z"
                      fill="#5CB67F"
                    />
                  </svg>
                </div>
              </td>
              <td className="px-6 py-4">
                <IconButton
                //   onClick={(event) =>
                //     handleOpenLeadsBondl(i, event)
                //   }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="5"
                    height="18"
                    viewBox="0 0 5 18"
                    fill="none"
                  >
                    <path
                      d="M2.5 10C3.05228 10 3.5 9.55228 3.5 9C3.5 8.44772 3.05228 8 2.5 8C1.94772 8 1.5 8.44772 1.5 9C1.5 9.55228 1.94772 10 2.5 10Z"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 17C3.05228 17 3.5 16.5523 3.5 16C3.5 15.4477 3.05228 15 2.5 15C1.94772 15 1.5 15.4477 1.5 16C1.5 16.5523 1.94772 17 2.5 17Z"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.5 3C3.05228 3 3.5 2.55228 3.5 2C3.5 1.44772 3.05228 1 2.5 1C1.94772 1 1.5 1.44772 1.5 2C1.5 2.55228 1.94772 3 2.5 3Z"
                      stroke="#94A3B8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>
              </td>
            </tr>
          </>
        );
      })}
    />
  );
};
