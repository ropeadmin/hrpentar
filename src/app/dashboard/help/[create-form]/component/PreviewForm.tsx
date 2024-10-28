'use client'

import { Dispatch, SetStateAction, useState } from 'react';
import { FormBuilderData, InputField } from '../page';
import { FormField } from '@/components/custom-inputs/custom-inputs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PhoneInput } from "react-international-phone";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Form preview component
const PreviewForm = ({form}: {form: FormBuilderData} ) => {
  const [date, setDate] = useState<Date>()

  return (
    <div className="container mx-auto p-4">
      {/* Form Header */}
      <div className="form-header mb-4">
        <h1 className="text-[28px] text-n900 font-bold ">{form.form_title || "Untitled Form"}</h1>
        <p className="text-base text-n600 font-normal">{form.form_title || "No description available."}</p>
      </div>

      {/* Sections */}
      {form.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section mb-8 py-2">
          {/* Section Title and Description */}
          <h2 className="text-lg font-bold ">{section.section_title || `Section ${sectionIndex + 1}`}</h2>
          <p className="text-n600 text-sm mb-4">{section.section_desc || "No section description."}</p>

          {/* Section Inputs */}
          <div className=" w-full gap-4 grid grid-cols-2">
            {section.inputs.map((input, inputIndex) => (
              <div key={inputIndex} className={`${input.type === "textarea" ? "col-span-2" : null}`}>
                {renderInputField(input, date, setDate)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Helper function to render different input types
const renderInputField = (input: InputField, date: Date | undefined, setDate: Dispatch<SetStateAction<Date | undefined>>) => {
  switch (input.type) {
    case 'textarea':
      return (
        <div className='col-span-4'>
          <div className="mb-2"><Label className="text-sm text-n900 font-medium !mb-5" >{input?.value}{input?.settings.required && <span className="text-red-500"> *</span>}</Label></div>
          <Textarea
            placeholder={"Enter text"}
            className="resize-none"
            required={input.settings.required || false}
          />
        </div>
      );
    case 'phone':
      return (
        <>
          <div className="mb-2"><Label className="text-sm text-n900 font-medium !mb-5" >{input?.value}{input?.settings.required && <span className="text-red-500"> *</span>}</Label></div>
          <PhoneInput
            defaultCountry="ng"
            value={""}
            forceDialCode={true}
          />
        </>
      );
    case 'date':
      return (
        <>
          <div className="mb-2"><Label className="text-sm text-n900 font-medium !mb-5" >{input?.value}{input?.settings.required && <span className="text-red-500"> *</span>}</Label></div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start items-center text-left font-normal h-11",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className={cn(
                  "mr-2 h-4 w-4",
                  !date && "text-n400"
                  )} 
                />
                {date ? format(date, "PPP") : <span className='text-base text-n400 font-normal'>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </>
      );
    case 'email':
      return (
        <>
          <div className="mb-2"><Label className="text-sm text-n900 font-medium !mb-5" >{input?.value}{input?.settings.required && <span className="text-red-500"> *</span>}</Label></div>
          <Input 
            type="email"
            placeholder={"name@example.com"}
            disabled={input.settings.disabled || false}
            required={input.settings.required || false}
          />
        </>
      );
    case 'checkbox':
      return <input type="checkbox" className="input checkbox-input"  />;
    case 'radio':
      return <input type="radio" className="input radio-input"  />;
    default:
      return <input type="text" placeholder="Unsupported input type" className="input text-input"  />;
  }
};

export default PreviewForm;
