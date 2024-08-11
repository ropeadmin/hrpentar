import React from 'react'

interface PlanCard {
    header: string;
    title: string;
    features: string[];
};

export default function PlanCard({ header, title, features }: PlanCard) {
    return (
        <div className="border border-[#E4E8EC] rounded-[16px] w-full h-[500px] flex flex-col justify-between p-5">
            <div>
                <h1 className='text-[#0f1625] sm:text-2xl font-bold'>{header}</h1>
                <p className='text-[#0f1625] text-[12px] font-normal mt-1.5'>{title}</p>

                {/* Features */}
                <div className='grid grid-cols-1 gap-3 mt-9'>
                    {features?.map((item: any, i: any) => (
                        <div key={i} className='flex items-center gap-3'>
                            <img src='/icons/plan-card-check.svg' width={20} height={20} />
                            <p className='text-[#0f1625] text-[15px] font-normal'>{item}</p>
                        </div>
                    ))}
                </div>
            </div>

            <button className="text-white bg-[#0f1625] w-full py-3 rounded-[8px] text-base font-medium">
                Select Plan
            </button>
        </div>
    )
}
