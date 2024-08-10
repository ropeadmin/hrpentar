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

const OrderHistoryTable = (
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
                            placeholder="Search orders..."
                            value={searchQuery}
                            onInputChange={handleSearchInputChange}
                        />
                        {/* <div className="bg-white text-gray-900 text-[1vw] rounded-[12px] outline-none px-4 py-3 space-x-2 flex items-center">
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
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-[#151515] bg-white">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Order ID
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Ordered On
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
                            {displayedOrder?.map((order) => (
                                order?.items?.map((item: any, i: any) => (
                                    <tr
                                        key={i}
                                        className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                    >
                                        <td className="px-6 py-4">
                                            #{item?.id || '-----'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.category_name || '-----'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`py-[6px] px-[12px] rounded-[8px] inline-flex
                                    ${order?.status === 'delivered' ? 'bg-[#ECFFE9]' :
                                                    order?.status === 'in-cart' ? 'bg-[#FFF5E9]' :
                                                        'bg-[#FFE9E9]'}`}>
                                                <p
                                                    className={`leading-tight text-[13px] 
                                    ${order?.status === 'delivered' ? 'text-[#31AA06]' :
                                                            order?.status === 'in-cart' ? 'text-[#E07D08]' :
                                                                'text-[#FA0F0F]'}`}>
                                                    {order?.status}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(item?.created)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item?.quantity || '-----'}
                                        </td>
                                        <td className="px-6 py-4">
                                            ₦{item?.amount?.toLocaleString() || '-----'}
                                        </td>
                                    </tr>
                                ))
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


export default OrderHistoryTable;
