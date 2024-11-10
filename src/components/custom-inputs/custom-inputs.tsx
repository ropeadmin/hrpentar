'use client'

import React, { ReactNode } from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormItem } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

// Define the props for the reusable form field component
type FormFieldProps = {
  name: string;
  label?: string;
  type: "input" | "select" | "textarea" | "tel" | "email" | "checkbox";
  options?: { label: string; value: string; image?: string, icon?: ReactNode }[]; // For select field, image is optional
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string ) => void  ;
  onChange?: (e: any) => void;
}

export const FormField = ({ name, label, type, options, placeholder, onValueChange, required, onChange, value, disabled }: FormFieldProps) => {
  const { control, setValue, getValues } = useFormContext()

  return (
    <FormItem className="space-y-0 !p-0 !m-0 !leading-none ">
      {label && <div className="mb-2"><Label className="text-sm text-n900 font-medium !mb-5" >{label}</Label></div>}
      
      {(type === "input" || type === "tel" || type === "email") && (
        <FormControl className=" !leading-none w-full">
          <Input 
            {...control.register(name)}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
          />
        </FormControl>
      )}


      {type === "select" && options && (
        <FormControl className="">
          <Select 
            onValueChange={(value) => {
              setValue(name, value) // Update form value
              if (onValueChange) onValueChange(value) // Call the onChange handler if provided
            }}
            value={value || getValues(name)}
          > 
            <SelectTrigger>
              <SelectValue 
                data-placeholder="true"
                className="select-trigger data-placeholder:text-red-400"
                placeholder={placeholder || "Select an option"} 
              />
            </SelectTrigger>
            <SelectContent className="rounded-lg bg-white px-3 py-2 text-base placeholder:text-n400 focus-visible:outline-none focus-visible:border  focus-visible:border-n500 focus-visible:ring-0">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="py-2">
                  <div className="flex items-center">
                    {option.image && (
                      <img
                        src={option.image}
                        alt={option.label}
                        width={20}
                        height={20}
                        className="inline-block mr-2 "
                      />
                    )}
                    
                    {option.icon && (
                      <div className="w-6 h-6 flex items-center justify-center rounded-[2px] bg-n100 mr-3">
                          {option.icon}
                      </div>
                    ) }
                    <span className="text-base text-n900 font-normal">{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      )}

      {type === "textarea" && (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="resize-none"
            onChange={onChange}
          />
        </FormControl>
      )}

      {/* {type === 'checkbox' && (
        <Checkbox
          checked={value?.includes(name)}
          onCheckedChange={(checked) => {
            if (onChange) {
              onChange(
                checked
                  ? [...(value || []), name]
                  : value?.filter((val: string) => val !== name)
              );
            }
          }}
        />
      )} */}
      {/* </FormControl> */}
      {/* <FormMessage /> */}
    </FormItem>
  )
}
