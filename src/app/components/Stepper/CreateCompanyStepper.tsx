import React from 'react';

export default function CreateCompanyStepper({ currentStep }: any) {
    return (
        <div className="flex items-center mx-auto w-full">
            <div className={`flex items-center w-full ${currentStep >= 1 ? 'completed' : ''}`}>
                <div className={`w-[18px] h-[18px] shrink-0 mx-[-1px] ${currentStep >= 1 ? 'bg-[#0BA259]' : 'bg-gray-300'} p-1.5 flex items-center justify-center rounded-full`}>
                    {currentStep >= 1 ? (
                        <img src='/icons/whiteCheck.svg' width={25} height={25} />
                    ) : (
                        <span className="text-[12px] text-[#687588] font-bold leading-none">1</span>
                    )}
                </div>
                <p className="text-[14px] ml-2 whitespace-nowrap max-lg:hidden">Basic details</p>
                <div className={`w-full h-[1px] rounded-full mx-4 ${currentStep >= 1 ? 'bg-[#0BA259]' : 'bg-gray-300'}`}></div>
            </div>
            <div className={`flex items-center w-full ${currentStep >= 2 ? 'completed' : ''}`}>
                <div className={`w-[18px] h-[18px] shrink-0 mx-[-1px] ${currentStep >= 2 ? 'bg-[#0BA259]' : 'bg-gray-300'} p-1.5 flex items-center justify-center rounded-full`}>
                    {currentStep >= 2 ? (
                         <svg xmlns="http://www.w3.org/2000/svg" className="w-full fill-white" viewBox="0 0 24 24">
                         <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                     </svg>
                    ) : (
                        <span className="text-[12px] text-[#687588] font-bold leading-none">2</span>
                    )}
                </div>
                <p className="text-[14px] ml-2 whitespace-nowrap max-lg:hidden">Address details</p>
                <div className={`w-full h-[1px] rounded-full mx-4 ${currentStep >= 2 ? 'bg-[#0BA259]' : 'bg-gray-300'}`}></div>
            </div>
            <div className={`flex items-center w-max ${currentStep >= 3 ? 'completed' : ''}`}>
                <div className={`w-[18px] h-[18px] shrink-0 mx-[-1px] ${currentStep >= 3 ? 'bg-[#0BA259]' : 'border-[#687588] border-[1.5px]'} p-1.5 flex items-center justify-center rounded-full`}>
                    <span className={`text-[12px] ${currentStep >= 3 ? 'text-white' : 'text-[#687588]'} font-bold leading-none`}>3</span>
                </div>
                <p className="text-base ml-2 whitespace-nowrap max-lg:hidden">Directors details</p>
            </div>
        </div>
    );
}
