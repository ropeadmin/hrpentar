"use client"

import React, { useState } from 'react';
import SearchField from '../Fields/SearchField';
import { formatDate } from '@/helpers/date.helper';
import { usePagination } from '@/helpers';
import ReactPaginate from 'react-paginate';

interface TableProps {
    searchQuery: string;
    filteredTransactions: any[];
    handleSearchInputChange: any;
    header: string;
    isLoading: boolean;
}

const Table = (
    {
        searchQuery,
        filteredTransactions,
        handleSearchInputChange,
        header,
        isLoading,
    }: TableProps) => {
    const [perPage] = useState<number>(5);

    // Pagination
    const { displayedData: displayedTransactions, handlePageChange: handlePageChangeTransactions } = usePagination(
        filteredTransactions?.slice().reverse() || [],
        0,
        5
    );

    return (
        <>
            <div className="relative overflow-auto sm:rounded-lg w-full min-w-full">
                <div className="flex justify-between items-center px-5 bg-[#F9FAFB] xl h-auto py-3 rounded-t-lg">
                    <h1 className="text-odi md:text-[1.5vw] text-[4vw] font-[600]">{header}</h1>
                    <div className="flex items-center space-x-5">
                        <SearchField
                            id="search"
                            type="text"
                            placeholder="Search Transactions..."
                            value={searchQuery}
                            onInputChange={handleSearchInputChange}
                        />
                        {/* <div className="bg-white text-gray-900 md:text-[14px] text-[2.5vw] rounded-[12px] outline-none px-4 py-3 space-x-2 flex items-center">
                            <Image
                                src={Assets.filter}
                                alt="search"
                                width={20}
                                height={20}
                            />
                            <p className='hidden md:block'>Filter</p>
                        </div> */}
                    </div>
                </div>
                <table className="w-full text-sm text-left text-odi-lite">
                    <thead className="text-xs text-odi bg-white">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                #Ref
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Amount made
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedTransactions?.map((transaction, i) => (
                            <tr
                                key={i}
                                className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                            >
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    R{transaction?.id}
                                </th>
                                <td className="px-6 py-4">
                                    {transaction?.summary}
                                </td>
                                <td className="px-6 py-4">
                                    ₦{transaction?.amount.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDate(transaction?.created)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`py-[6px] px-[12px] rounded-[8px] inline-flex
                                        ${transaction?.status === 'Success' ? 'bg-[#ECFFE9]' :
                                            transaction?.status === 'Pending' ? 'bg-[#FFF5E9]' :
                                                'bg-[#FFE9E9]'}`}>
                                        <p
                                            className={`leading-tight text-[13px] 
                                        ${transaction?.status === 'Success' ? 'text-[#31AA06]' :
                                                    transaction?.status === 'Pending' ? 'text-[#E07D08]' :
                                                        'text-[#FA0F0F]'}`}>
                                            {transaction?.status}
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {displayedTransactions?.length > 0 && (
                    <div className="mt-5 w-full min-w-full">
                        <ReactPaginate
                            pageCount={Math.ceil(filteredTransactions?.length / perPage)} // Total number of pages
                            onPageChange={handlePageChangeTransactions} // Handle page change event
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                )}
            </div>

        </>
    );
}


export default Table;