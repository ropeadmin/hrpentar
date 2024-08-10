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
    filteredData: any[];
    handleSearchInputChange: any;
    header: string;
    isLoading: boolean;
}

const DesignAndSaleTable = (
    {
        searchQuery,
        filteredData,
        handleSearchInputChange,
        header,
        isLoading,
    }: TableProps) => {
    const [perPage] = useState<number>(5);

    // Pagination
    const { displayedData: displayedData, handlePageChange: handlePageChangeData } = usePagination(
        filteredData?.slice().reverse() || [],
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
                            placeholder="Search Designs..."
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
                                Thumbnail
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Merch Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-4">
                            Order Count
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Unit Sold
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Amount Made
                            </th>
                        </tr>
                    </thead>
                    {filteredData?.length === 0 ? (
                        <div className="min-w-full h-[300px] flex flex-col items-center justify-center space-y-7 mx-auto">
                            {/* <Image src={''} alt="" width={200} height={200} /> */}
                            <p>No results found</p>
                        </div>
                    ) : (
                        <tbody>
                            {displayedData?.map((sale, i) => (
                                <tr
                                    key={i}
                                    className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                >
                                    <td className="px-6 py-4">
                                        <img src={JSON.parse(sale.preview_file)[0]} className="rounded h-12 w-12" />
                                    </td>
                                    <td className="px-6 py-4">
                                        {sale?.products.name}
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {sale?.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {sale?.order_item_count}
                                    </td>
                                    <td className="px-6 py-4">
                                        {sale.quantity_count}
                                    </td>
                                    <td className="px-6 py-4">
                                        ₦{sale?.amount?.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}

                </table>

                {displayedData?.length > 0 && (
                    <div className="mt-5 w-full min-w-full">
                        <ReactPaginate
                            pageCount={Math.ceil(filteredData?.length / perPage)} // Total number of pages
                            onPageChange={handlePageChangeData} // Handle page change event
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


export default DesignAndSaleTable;
