'use client'

import React, { useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FormField } from "@/components/custom-inputs/custom-inputs"
import { fieldConfigurations } from "./configuration/field-configurations"
import { DynamicFormField } from "./configuration/dynamic-form-field"

// ** Icon
import { Type, Mail, Phone, ChevronDown, Link2, Calendar, CalendarDays } from 'lucide-react';
import { CustomSettingProps } from "../custom-settings"

// Define the form schema with Zod
const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  category: z.string().nonempty({ message: "Please select a category" }),
})

export const fieldTypeOptions = [
  { label: "Text Box", value: "textarea", icon: <Type size={16} color="#0F1625" strokeWidth={1.5} /> },
  { label: "Email", value: "email", icon: <Mail size={18} color="#0F1625" strokeWidth={1.2} /> },
  { label: "Dropdown", value: "dropdown", icon: <ChevronDown color="#0F1625" size={18} strokeWidth={1.5}/> },
  { label: "Phone number", value: "phone", icon: <Phone size={16} color="#0F1625" strokeWidth={1.5}/> },
  { label: "Website", value: "website", icon: <Link2 style={{transform: "rotate(145deg)"}} size={18} color="#0F1625" strokeWidth={1.5}/> },
  { label: "Date", value: "date", icon: <CalendarDays size={18} color="#0F1625" strokeWidth={1.3}/> },
];

// Infer the type from the schema
type FormData = z.infer<typeof FormSchema>


export function ComponentsSetting({ onFieldTypeChange, fieldSettings, onSettingsUpdate, fieldId, selectedField }: CustomSettingProps) {
  const [selectedFieldType, setSelectedFieldType] = useState<string | null>(null)

  const formMethods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  const { handleSubmit, register, setValue } = formMethods

  const handleFieldTypeChange = (value: string) => {
    setSelectedFieldType(value)
    setValue("category", value)
    onFieldTypeChange(value)
  }
  

  // Update the onSubmit function to use FormData type
  const onSubmit = (data: FormData) => {
    console.log("Form data:", data)
  }

  // Get the selected field configuration
  const selectedFieldConfig =
  selectedFieldType && selectedFieldType in fieldConfigurations
    ? fieldConfigurations[selectedFieldType as keyof typeof fieldConfigurations]
    : null;

  // console.log(selectedFieldConfig)

    // UseEffect to set the form field when the selectedField changes
    useEffect(() => {
      if (selectedField) {
        setValue("category", selectedField.type); // Set the current value
        // Additional logic to set other fields as necessary
        setSelectedFieldType(selectedField.type);
      }
    }, [selectedField, setValue]);

    console.log(selectedFieldConfig, "Current Setting Config")

  return (
    <div className="px-4">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            name="category"
            label="Field type"
            type="select"
            value={selectedField?.type}
            options={fieldTypeOptions}
            placeholder="Select a field type"
            required
            onValueChange={handleFieldTypeChange}
          />

          {/* ===== Divider ======= */}
          <hr className="h-[1px] bg-black  mx-auto  mt-10" />

          <div className="mt-8">
            {/* Dynamically Render Settings Based on Selected Field Type */}
            {selectedFieldConfig && (
              <>
                <h3 className="text-base text-n900 font-bold ">Setting</h3>

                <div className="mt-7">
                  {/* <h3>Settings for {selectedFieldConfig.label}</h3> */}
                  {/* Apply layout dynamically */}
                  <div
                    className={
                      selectedFieldConfig.layout
                    }
                  >
                    <DynamicFormField 
                      settings={selectedFieldConfig.settings} 
                      register={register} 
                      fieldSettings={fieldSettings}
                      onSettingsUpdate={onSettingsUpdate}
                      fieldId={fieldId}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
        
      </FormProvider>

      
    </div>
   
  )
}
