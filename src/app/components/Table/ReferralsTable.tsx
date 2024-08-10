"use client"

import Assets from '@/constants/assets.constant';
import React, { useState } from 'react';
import SearchField from '../Fields/SearchField';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePagination } from '@/helpers';
import { formatDate, formatDateTime } from '@/helpers/date.helper';
import ReactPaginate from 'react-paginate';

const ReferralsTable = (
    {
        searchQuery,
        filteredReferrals,
        handleSearchInputChange,
        header,
        isLoading,
    }: any) => {
    const [perPage] = useState<number>(5);

    // Pagination
    const { displayedData: displayedReferrals, handlePageChange: handlePageChangeReferrals } = usePagination(
        filteredReferrals?.slice().reverse() || [],
        0,
        5
    );


    return (
        <>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <div className="flex justify-between items-center px-5 bg-[#F9FAFB] w-full h-auto py-3 rounded-t-lg">
                    <h1 className="text-[#212429] text-[1.5vw] font-[600]">{header}</h1>
                    <div>
                        <SearchField
                            id="search"
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onInputChange={handleSearchInputChange}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-[#151515] bg-white">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Referral ID
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Date & Time
                            </th>
                            {/* <th scope="col" className="px-6 py-4">
                                Status
                            </th> */}
                            {/* <th scope="col" className="px-6 py-4">
                                Referred via
                            </th> */}
                            <th scope="col" className="px-6 py-4">
                                Rate type
                            </th>
                            {/* <th scope="col" className="px-6 py-4">
                                Rate
                            </th> */}
                            <th scope="col" className="px-6 py-4">
                                Commission
                            </th>
                        </tr>
                    </thead>
                    {filteredReferrals?.length === 0 ? (
                        <div className="min-w-full h-[300px] flex flex-col items-center justify-center space-y-7 mx-auto">
                            {/* <Image src={Assets.notFound} alt="" width={200} height={200} /> */}
                            <p>No results found</p>
                        </div>
                    ) : (
                        <tbody>
                            {displayedReferrals?.map((referral: any, i: any) => (
                                <tr
                                    key={i}
                                    className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-white"}
                                >
                                    <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                                        {referral?._id}
                                    </th>
                                    <th scope="row" className="px-6 py-4 flex flex-col space-y-1">
                                        <div className="flex flex-col space-y-1 leading-tight text-[12px]">
                                            <p>{formatDate(referral?.createdAt)}</p>
                                            <p>{formatDateTime(referral?.createdAt)}</p>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        Naira
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className={`leading-tight text-[#5a9d7b]`}>
                                            {`₦${referral?.earned_commission.toLocaleString()}`}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}

                </table>

                {displayedReferrals?.length > 0 && (
                    <div className="mt-5">
                        <ReactPaginate
                            pageCount={Math.ceil(filteredReferrals?.length / perPage)} // Total number of pages
                            onPageChange={handlePageChangeReferrals} // Handle page change event
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


export default ReferralsTable;
