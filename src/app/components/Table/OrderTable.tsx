"use client"

import Assets from '@/constants/assets.constant';
import React, { useState } from 'react';
import SearchField from '../Fields/SearchField';
import Image from 'next/image';
import { formatDate, formatDateTime } from '@/helpers/date.helper';
import { usePagination } from '@/helpers';
import ReactPaginate from 'react-paginate';

interface TableProps {
    searchQuery: string;
    filteredOrder: any[];
    handleSearchInputChange: any;
    header: string;
    isLoading: boolean;
}

const OrderTable = (
    {
        searchQuery,
        filteredOrder,
        handleSearchInputChange,
        header,
        isLoading,
    }: TableProps) => {
    const [perPage] = useState<number>(5);

    // Pagination
    const { displayedData: displayedOrder, handlePageChange: handlePageChangeOrder } = usePagination(
        filteredOrder?.slice().reverse() || [],
        0,
        5
    );

    return (
        <>
            <div className="relative overflow-x-auto sm:rounded-lg w-full min-w-full">
                <div className="flex justify-between items-center px-5 bg-[#F9FAFB] w-full min-w-[120vw] md:min-w-full h-auto py-3 rounded-t-lg">
                    <h1 className="text-[#212429] md:text-[1.5vw] text-[4vw] font-[600]">{header}</h1>
                    <div className="flex items-center space-x-5">
                        <SearchField
                            id="search"
                            type="text"
                            placeholder="Search Transactions"
                            value={searchQuery}
                            onInputChange={handleSearchInputChange}
                        />
                        <div className="bg-white text-gray-900 text-[1vw] rounded-[12px] outline-none px-4 py-3 space-x-2 flex items-center">
                            <Image
                                src={Assets.filter}
                                alt="search"
                                width={20}
                                height={20}
                            />
                            <p className='hidden md:block'>Filter</p>
                        </div>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-[#151515] bg-white">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Order Date
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Price Per Unit
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Total Price
                            </th>
                        </tr>
                    </thead>
                    {filteredOrder?.length === 0 ? (
                        <div className="min-w-full h-[300px] flex flex-col items-center justify-center space-y-7 mx-auto">
                            {/* <Image src={''} alt="" width={200} height={200} /> */}
                            <p>No results found</p>
                        </div>
                    ) : (
                        <tbody>
                            {displayedOrder?.map((order, i) => (
                                <tr
                                    key={i}
                                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                    <td className="px-6 py-4">
                                    <div className="flex flex-col space-y-1 leading-tight text-[12px]">
                                            <p>{order?.time}</p>
                                            <p>{order?.date}</p>
                                        </div> 
                                        {/* <div className="flex flex-col space-y-1 leading-tight text-[12px]">
                                            <p>{formatDate(order?.createdAt)}</p>
                                            <p>{formatDateTime(order?.createdAt)}</p>
                                        </div> */}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`py-[6px] px-[12px] rounded-[8px] inline-flex
                                        ${order?.status === 'Success' ? 'bg-[#ECFFE9]' :
                                                order?.status === 'Pending' ? 'bg-[#FFF5E9]' :
                                                    'bg-[#FFE9E9]'}`}>
                                            <p
                                                className={`leading-tight text-[13px] 
                                        ${order?.status === 'Success' ? 'text-[#31AA06]' :
                                                        order?.status === 'Pending' ? 'text-[#E07D08]' :
                                                            'text-[#FA0F0F]'}`}>
                                                {order?.status}
                                            </p>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {order?.customer}
                                    </th>
                                    <td className="px-6 py-4">
                                        ₦{order?.unitAmount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {order?.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p
                                            className={`leading-tight text-[13px] 
                                        ${order?.status === 'Success' ? 'text-[#31AA06]' :
                                                    order?.status === 'Pending' ? 'text-[#E07D08]' :
                                                        'text-[#FA0F0F]'}`}>
                                            ₦{order?.totalAmount.toLocaleString()}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}

                </table>

                {displayedOrder?.length > 0 && (
                    <div className="mt-5 w-full min-w-full">
                        <ReactPaginate
                            pageCount={Math.ceil(filteredOrder?.length / perPage)} // Total number of pages
                            onPageChange={handlePageChangeOrder} // Handle page change event
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


export default OrderTable;
