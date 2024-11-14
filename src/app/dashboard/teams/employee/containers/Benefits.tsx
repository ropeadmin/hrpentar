"use client"
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const Benefits = () => {
     const [showBenefits, setShowBenefits] = useState(true);
     const [isCalculateEnabled, setIsCalculateEnabled] = useState(false);

      const handleBenefitsToggle = () => {
    setShowBenefits(!showBenefits);
  };

  const renderBenefitsSection = () => {
    return (
      <div className="mt-8 border rounded-lg">
        <button
          type="button"
          onClick={handleBenefitsToggle}
          className="w-full px-6 py-4 flex items-center justify-between text-left border-b"
        >
          <span className="text-lg font-semibold">Benefits & Allowances</span>
          <ChevronDown className={`w-5 h-5 transform transition-transform ${showBenefits ? 'rotate-180' : ''}`} />
        </button>
        
        {showBenefits && (
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-6">
              Select and configure benefits and allowances for the selected paygrade (Entry level 1).
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic earnings */}
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="w-4 h-4" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Basic earnings</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value="15%" 
                        className="w-16 p-2 border rounded-md text-right"
                      />
                      <select className="p-2 border rounded-md">
                        <option>Monthly</option>
                        <option>Annually</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Max. percentage: 20%</p>
                </div>
              </div>

              {/* Housing */}
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="w-4 h-4" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Housing</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value="20%" 
                        className="w-16 p-2 border rounded-md text-right"
                      />
                      <select className="p-2 border rounded-md">
                        <option>Annually</option>
                        <option>Monthly</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Max. percentage: 12%</p>
                </div>
              </div>

              {/* Health Insurance */}
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="w-4 h-4" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Health Insurance</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value="8%" 
                        className="w-16 p-2 border rounded-md text-right"
                      />
                      <select className="p-2 border rounded-md">
                        <option>Annually</option>
                        <option>Monthly</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Max. percentage: 12%</p>
                </div>
              </div>

              {/* Transport allowance */}
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="w-4 h-4" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Transport allowance</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value="4%" 
                        className="w-16 p-2 border rounded-md text-right"
                      />
                      <select className="p-2 border rounded-md">
                        <option>Monthly</option>
                        <option>Annually</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Max. percentage: 8%</p>
                </div>
              </div>

              {/* Leave allowance */}
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="w-4 h-4" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Leave allowance</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value="6%" 
                        className="w-16 p-2 border rounded-md text-right"
                      />
                      <select className="p-2 border rounded-md">
                        <option>Annually</option>
                        <option>Monthly</option>
                        <option>Fixed</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Max. percentage: 12%</p>
                </div>
              </div>

              {/* 13th month allowance */}
              <div className="flex items-center space-x-4">
                <input type="checkbox" className="w-4 h-4" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">13th month allowance</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        value="0%" 
                        className="w-16 p-2 border rounded-md text-right"
                      />
                      <select className="p-2 border rounded-md">
                        <option>Fixed</option>
                        <option>Monthly</option>
                        <option>Annually</option>
                      </select>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Max. percentage: 20%</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 text-red-600 hover:text-red-700 font-medium flex items-center"
            >
              + Add new allowance
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderButtons = () => {
    const baseButtonClasses = "py-[10px] px-[14px] rounded-[8px] text-base font-medium leading-none";
    const primaryButtonClasses = `${baseButtonClasses} bg-[#0f1625] text-white hover:bg-[#1a2435]`;
    const secondaryButtonClasses = `${baseButtonClasses} text-[#0f1625] border`;
    const disabledButtonClasses = `${baseButtonClasses} bg-gray-100 text-gray-400 cursor-not-allowed`;

    return (
      <div className="flex justify-end gap-4 mt-10 w-full">
        <button
          type="button"
          className={secondaryButtonClasses}
          onClick={() => console.log('Cancel')}
        >
          Cancel
        </button>

        <button
          type="button"
          className={secondaryButtonClasses}
          onClick={() => console.log('Save and Continue')}
        >
          Save and Continue
        </button>

        <button
          type="button"
          onClick={() => console.log('Calculate salary')}
          disabled={!isCalculateEnabled}
          className={isCalculateEnabled ? primaryButtonClasses : disabledButtonClasses}
        >
          Calculate salary
        </button>
      </div>
    );
  };

  return (
    <div className=''>Benefits</div>
  )
}

export default Benefits