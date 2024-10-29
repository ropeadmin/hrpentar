'use client'

import { Button } from '@/components/ui/button'
import { v4 as uuid } from 'uuid'
// ** View
import CustomSetting from '@/views/teams/onboardiing/form-builder/custom-settings/custom-settings'
import DrawingBoard from '@/views/teams/onboardiing/form-builder/drawing-board/drawing-board'
import { ChangeEvent, useState } from 'react';
import { fieldTypeOptions } from '@/views/teams/onboardiing/form-builder/custom-settings/components-setting/components-setting'
import { fieldConfigurations } from '@/views/teams/onboardiing/form-builder/custom-settings/components-setting/configuration/field-configurations'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChevronLeft } from 'lucide-react'
import PreviewForm from './component/PreviewForm'

export type FieldConfig = {
  id: string;
  type: string; // e.g., "email", "text", "phone"
  label: string;
  icon: React.ReactNode;
  settings: {
  
  };
};

export interface InputField {
  id: string;
  type: string;
  label: string;
  value?: string;
  icon: React.ReactNode;
  settings: {
    required?: boolean;
    [key: string]: any; // Handle other dynamic settings
  };
}

interface Section {
  section_title: string;
  section_desc: string;
  inputs: InputField[]; // Array of InputField
}

export interface FormBuilderData {
  form_title: string;
  form_desc: string;
  sections: Section[]; // Array of Section
}

// Field options with icon and label


const CreateFormBuilder = () => {
  const [fields, setFields] = useState<FieldConfig[]>();
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null); // Track the selected section
  // Track the currently selected input and its section
  const [selectedFieldInfo, setSelectedFieldInfo] = useState<{
    inputId: string | null;
    selectedSectionIndex: number | null;
  }>({ inputId: null, selectedSectionIndex: null });

  const [form, setForm] = useState<FormBuilderData>({
    form_title: '',
    form_desc: '',
    sections: [
      {
        section_title: '',
        section_desc: '',
        inputs: [],
      },
    ],
  });

  // React Hook Form instance for managing form data
  const { register, handleSubmit, setValue } = useForm();

  // Add a new section
  const handleAddSection = () => {
    // Create a new section with default values
    const newSection: Section = {
      section_title: '',
      section_desc: '',
      inputs: [], // Start with no inputs
    };
  
    // Add the new section to the form's sections array
    setForm((prevForm) => ({
      ...prevForm,
      sections: [...prevForm.sections, newSection], // Append the new section
    }));
  };

  // Define the addInputToSection function with types
  const addInputToSection = (newInput: InputField) => {
    // Create a copy of the sections array
    const updatedSections = [...form.sections];

    if(selectedSectionIndex == null) return null;

    // Update the inputs array for the specific section
    updatedSections[selectedSectionIndex].inputs = [
      ...updatedSections[selectedSectionIndex].inputs,
      newInput,
    ];

    // Update the form state
    setForm((prevForm) => ({
      ...prevForm,
      sections: updatedSections,
    }));
  };


  // Add a new field to the list
  const handleFieldTypeChange = (fieldType: string) => {

    // Find the selected field type option
    const selectedOption = fieldTypeOptions.find(option => option.value === fieldType)!!;
  
    if (selectedOption) {
      // Get default settings from field configuration
      const fieldConfig = fieldConfigurations[fieldType as keyof typeof fieldConfigurations];
      
      // Initialize field settings with default values (e.g., required: null)
      const defaultSettings = fieldConfig.settings.reduce((acc, setting) => {
        acc[setting.name] = null; // Initialize each setting with default value (null)
        return acc;
      }, {} as Record<string, any>);
  
      // Create new field with the selected type and default settings
      const newField: InputField = {
        id: uuid(),  // Generate unique ID for each field
        type: selectedOption.value,
        label: selectedOption.label,
        settings: defaultSettings,  // Store field-specific settings with default values
        icon: selectedOption.icon
      };
  
      // Add the new field to the appropriate section's inputs
      addInputToSection(newField);

      // addInputToSection(selectedFieldId, newField);
      setSelectedFieldId(newField.id);
    }
  };
  

  // Remove a field by ID
  const handleDeleteField = (inputId: string) => {
    const updatedSections = [...form.sections];

    if(selectedSectionIndex == null) return null;

    updatedSections[selectedSectionIndex].inputs = updatedSections[selectedSectionIndex].inputs.filter(
      (input) => input.id !== inputId
    );

    setForm((prevForm) => ({
      ...prevForm,
      sections: updatedSections,
    }));
  };

  // Duplicate a field by ID
  const handleDuplicateField = (inputIndex: number) => {
    if(selectedSectionIndex == null) return null;

    const updatedSections = [...form.sections];
    const inputToDuplicate = updatedSections[selectedSectionIndex].inputs[inputIndex];
    const duplicatedInput = { ...inputToDuplicate, id: uuid() }; 

    updatedSections[selectedSectionIndex].inputs = [
      ...updatedSections[selectedSectionIndex].inputs.slice(0, inputIndex + 1),
      duplicatedInput,
      ...updatedSections[selectedSectionIndex].inputs.slice(inputIndex + 1),
    ]

    setForm((prevForm) => ({
      ...prevForm,
      sections: updatedSections,
    }));
    // const fieldToDuplicate = fields?.find((field) => field.id === id);
    // console.log(fieldToDuplicate)
    // if (fieldToDuplicate) {
    //   const duplicatedField = { ...fieldToDuplicate, id: uuid() }; // Generate new ID
    //   setFields((prevFields =[]) => [...prevFields, duplicatedField]);
    // }
  };

  // Function to update field settings when selected on the DrawingBoard
  // const handleFieldSettingUpdate = (fieldId: string, newSettings: Record<string, any>) => {
  //   setFields((prevFields) =>
  //     prevFields?.map((field) =>
  //       field.id === fieldId ? { ...field, settings: newSettings } : field
  //     )
  //   );
  // };

  // Function to update field settings in the correct section
  const handleFieldSettingUpdate = (
    inputId: string,        // fieldId to identify the specific field
    newSettings: Record<string, any> // New settings object
  ) => {
    if(selectedSectionIndex === null) return null;

    console.log(inputId, newSettings);

    setForm((prevForm) => {
      const updatedSections = [...prevForm.sections]; // Clone sections array
      const section = updatedSections[selectedSectionIndex];  // Get the specific section
      console.log(section, "MY SECTION")
      // Find and update the field within the section
      const updatedInputs = section.inputs.map((input) =>
        input.id === inputId ? { ...input, settings: { ...input.settings, ...newSettings } } : input
      );
      
      // Update the section with the modified inputs
      updatedSections[selectedSectionIndex] = {
        ...section,
        inputs: updatedInputs,
      };

      // Return the updated form structure
      return {
        ...prevForm,
        sections: updatedSections,
      };
    });
  };

  // Handle form title and description update
  const handleFormChange = (e: { target: { name: any; value: any } }) => {   
   const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value, // Update form title or description
    }));
  };

  // Function to update the input field value in the correct section and field
  const handleFieldValueUpdate = (
    fieldId: string,       // Identify the specific field
    newValue: any       // New value for the input field
  ) => {
    console.log(newValue, fieldId)
    if(selectedSectionIndex == null) return;

    setForm((prevForm) => {
      const updatedSections = [...prevForm.sections]; // Clone sections array
      const section = updatedSections[selectedSectionIndex];  // Get the specific section
      
      // Find and update the field within the section
      const updatedInputs = section.inputs.map((field) =>
        field.id === fieldId ? { ...field, value: newValue } : field
      );
      
      // Update the section with the modified inputs
      updatedSections[selectedSectionIndex] = {
        ...section,
        inputs: updatedInputs,
      };

      // Return the updated form structure
      return {
        ...prevForm,
        sections: updatedSections,
      };
    });
  };

  // Handle section title and description updates

  // Update section title and description for a specific section
  const handleSectionChange = (
    sectionIndex: number,
    field: 'section_title' | 'section_desc',
    value: string
  ) => {
    if(selectedSectionIndex == null) return;

    const updatedSections = [...form.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [field]: value, // Dynamically update either title or description
    };

    setForm((prevForm) => ({
      ...prevForm,
      sections: updatedSections,
    }));
  };



// Handle selecting a field in the DrawingBoard
  const handleFieldSelect = (inputId: string) => {
    setSelectedFieldInfo({ inputId, selectedSectionIndex });
    setSelectedFieldId(inputId);

  };
  
  const selectedField =
    selectedFieldInfo.selectedSectionIndex !== null
      ? form.sections[selectedFieldInfo.selectedSectionIndex].inputs.find(
          (input) => input.id === selectedFieldInfo.inputId
        )
      : null;

  return (
    <Dialog>
      <div className='w-full '>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-[700] text-[#0F1625]">Create form</h1>
            <p className="text-[14px] font-[400] text-[#323B49]">
              Setup the requirements for onboarding sections.
            </p>
          </div>

          <div className="space-x-4">
            <DialogTrigger>
              <Button variant={"outline"} className="">Preview</Button>
            </DialogTrigger>
            <Button className="">Publish form</Button>
          </div>
        </div>

        {/* Form Builder */}
        <div className="grid grid-cols-4 gap-4 w-full mt-10 h-[calc(100dvh-23vh)]">
          <div className='col-span-3'>
            <DrawingBoard 
              fields={fields}
              form={form}
              handleDeleteField={handleDeleteField}
              handleDuplicateField={handleDuplicateField}
              onSelectField={handleFieldSelect}
              setSelectedSectionIndex={setSelectedSectionIndex}
              addNewSection={handleAddSection}
              handleFieldValueUpdate={handleFieldValueUpdate}
              handleFormChange={handleFormChange}
              handleSectionChange={handleSectionChange}
            />
          </div>
          <div className='bg-n75 col-span-1 rounded-lg'>
            <CustomSetting 
              onFieldTypeChange={handleFieldTypeChange}
              fieldSettings={selectedField?.settings!!}
              onSettingsUpdate={handleFieldSettingUpdate} 
              fieldId={selectedFieldId}
              selectedField={selectedField}
            />
          </div>
        </div>
      </div>
      <DialogContent className='max-w-[800px]'>
        {/* <DialogHeader>
         
        </DialogHeader> */}
        {/* <DialogClose asChild>
          <Button className='w-fit ' variant={"outline"}><ChevronLeft className='leading-0' strokeWidth={1.5} /> <h3 className='text-n800 text-base font-medium'>Back to form</h3></Button>
        </DialogClose> */}
        <div className=" py-2 px-4 h-[70vh]">
          <PreviewForm form={form} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateFormBuilder