'use client'

import { useState } from 'react'

// ** Component
import Tabs from '@/components/custom-navigation/Tabs/Tabs'
import SectionsSetting from './sections-setting/sections-setting';
import { ComponentsSetting } from './components-setting/components-setting';
import { FieldConfig, InputField } from '@/app/dashboard/teams/onboarding/[create-form]/page';

export type CustomSettingProps = {
  onFieldTypeChange: (fieldType: string) => void;
  fieldSettings: Record<string, any>
  fieldId: string | null; // Receive fieldId as a prop
  onSettingsUpdate: (fieldId: string, newSettings: Record<string, any>) => void;
  selectedField: InputField | null | undefined
};

const CustomSetting = ({ onFieldTypeChange, fieldSettings, onSettingsUpdate, fieldId, selectedField}: CustomSettingProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Components', component: <ComponentsSetting fieldId={fieldId} onFieldTypeChange={onFieldTypeChange} fieldSettings={fieldSettings} onSettingsUpdate={onSettingsUpdate} selectedField={selectedField} /> },
    { label: 'Sections', component: <SectionsSetting /> },
  ];
  
  return (
    <div>
      {/* Tabs */}
      <div className="border-b border-n400">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="w-[142.25px]" />      
      </div>

      {/* Contents */}
      <div className="mt-4 w-full overflow-y-scroll">
        <div className="flex flex-col my-2 gap-[10px]">
          {tabs[activeTab].component} 
        </div>
      </div>
    </div>
  )
}

export default CustomSetting