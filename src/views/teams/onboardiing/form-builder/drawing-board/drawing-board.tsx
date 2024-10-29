'use client'

import { Dispatch, SetStateAction } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card"
import { FormField } from '@/components/custom-inputs/custom-inputs'
import {Trash2, CirclePlus, Copy, StretchHorizontal } from "lucide-react"
import BootstrapTooltip from "@/components/ui/tooltip"
import { FormBuilderData } from "@/app/dashboard/leave/[create-form]/page"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ImageUpload from "@/components/custom-uploader/uploader"



// Define the form schema with Zod
const FormSchema = z.object({
  form_desc: z.string().nonempty({ message: "Invalid email address" }),
  form_title: z.string().nonempty({ message: "Please select a form title" }),
})

// Infer the type from the schema
type FormData = z.infer<typeof FormSchema>

type FieldConfig = {
  id: string;
  type: string; // e.g., "email", "text", "phone"
  label: string;
  icon: React.ReactNode;
  settings: {

  };
};

type DrawingBoardProps = {
  form: FormBuilderData;
  fields?: FieldConfig[];
  handleDeleteField: (index: string) => void;
  handleDuplicateField: (id: number) => void;
  onSelectField: (id: string) => void;
  addNewSection: () => void
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setSelectedSectionIndex: Dispatch<SetStateAction<number | null>>
  handleFieldValueUpdate: (fieldId: string, newValue: string) => void
  handleSectionChange: (sectionIndex: number, field: "section_title" | "section_desc", value: string) => void
};

const DrawingBoard = ({ fields, handleSectionChange, addNewSection,handleFormChange, form, handleDeleteField, handleFieldValueUpdate, handleDuplicateField, onSelectField, setSelectedSectionIndex }: DrawingBoardProps) => {

  const formMethods = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  })

  const { handleSubmit, register, setValue } = formMethods

  // Update the onSubmit function to use FormData type
  const onSubmit = (data: FormData) => {
    console.log("Form data:", data)
  }

  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="w-full ">
            <CardContent className="w-full h-full p-5">
              <div className="grid grid-cols-2 w-full gap-4 ">
                <FormField
                  name="form_title"
                  label="Form title"
                  type="input"
                  placeholder="Enter form title"
                  required
                  value={form.form_title}
                  onChange={(e) => handleFormChange(e)}
                />

                <FormField
                  name="form_desc"
                  label="Form description (Optional)"
                  type="input"
                  placeholder="Enter form description"
                  value={form.form_desc}
                  onChange={handleFormChange}
                />  
              </div>
            </CardContent>
          </Card>
          {
            form.sections.map((section, sectionIndex) => (
              <div className="" key={sectionIndex}>
                <div className="relative mb-6 mt-10"  onClick={() => setSelectedSectionIndex(sectionIndex)}>
                  <div className="absolute -top-6 bg-[#444CE7] px-3 w-fit h-6 flex items-center justify-center rounded-t-lg">
                    <span className="text-white text-xs font-medium">{`Section 1 of ${sectionIndex + 1}`}</span>
                  </div>
                  <Card className="w-full mt-4 rounded-tl-none">
                    <CardContent className="w-full h-full p-5 pt-5">
                      <div className="grid grid-cols-2 w-full  gap-4">
                        <FormField
                          name={`section_title-${sectionIndex}`}
                          label="Section title"
                          type="input"
                          placeholder="Enter section title"
                          value={section.section_title}
                          required
                          onChange={(e) =>
                            handleSectionChange(sectionIndex, 'section_title', e.target.value)
                          }
                        />
      
                        <FormField
                          name={`section_desc-${sectionIndex}`}
                          label="Section description (Optional)"
                          type="input"
                          placeholder="Enter section description"
                          value={section.section_desc}
                          onChange={(e) =>
                            handleSectionChange(sectionIndex, 'section_desc', e.target.value)
                          }
                        />  
                      </div>
                    </CardContent>
                  </Card>
                </div>  
                {section.inputs.map((input, inputIndex) => (
                  <Card className="w-full mb-6" key={input.id} onClick={() => onSelectField(input.id)}>
                    <CardHeader className="w-full flex flex-row items-center justify-between px-5 pb-0">
                      <div className="flex items-center ">
                        <div className="w-6 h-6 flex items-center justify-center rounded-[2px] bg-n100 mr-3">
                          {input.icon}
                        </div>
                        <span className="text-base text-n600 font-medium">{input.label}</span>
                      </div>

                      {/* setting */}
                      <div>
                        <div className="flex items-center space-x-5">
                          <BootstrapTooltip title="Add Section" placement="bottom" sx={{ color: "#FFFFFF",  }}>
                            <StretchHorizontal color="#687588" size={20} />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Add Component" placement="bottom" sx={{ color: "#FFFFFF",  }}>
                            <CirclePlus color="#687588" size={20} onClick={() => addNewSection()}  />
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Add Duplicate" placement="bottom" sx={{ color: "#FFFFFF",  }}>
                            <Copy  color="#687588"size={20} onClick={() => handleDuplicateField(inputIndex)}/>
                          </BootstrapTooltip>
                          <BootstrapTooltip title="Delete" placement="bottom" sx={{ color: "#FFFFFF",  }}>
                            <Trash2 color="#EF0000" size={20} onClick={() => handleDeleteField(input.id)} />
                          </BootstrapTooltip>
                        </div>
                      </div>

                    </CardHeader>
                    <CardContent className="w-full h-full p-5">
                        {
                          input.type === "email" &&  (
                            <div className="grid grid-cols-2 w-full gap-4 ">
                              <FormField
                                name={`email_title-${input.id}`}
                                type="input"
                                placeholder="Enter question"
                                required
                                value={input?.value || ""}
                                onChange={(e) => handleFieldValueUpdate(input.id, e.target.value)}
                              />
            
                              <FormField
                                name={`email_desc-${input.id}`}
                                type="input"
                                placeholder="name@example.com"
                                required
                                disabled={true}
                              />  
                            </div>
                          )
                        }

                        {
                          input.type === "phone" &&  (
                            <div className="grid grid-cols-2 w-full gap-4 ">
                              <FormField
                                name={`phone_title-${input.id}`}
                                type="input"
                                placeholder="Enter question"
                                required
                                onChange={(e) => handleFieldValueUpdate(input.id, e.target.value)}
                              />
            
                              <FormField
                                name={`phone_desc-${input.id}`}
                                type="input"
                                placeholder="Enter phone number "
                                required
                                disabled={true}
                              />  
                            </div>
                          )
                        }

                        {
                          input.type === "website" &&  (
                            <div className="grid grid-cols-2 w-full gap-4 ">
                              <FormField
                                name={`website_title-${input.id}`}
                                type="input"
                                placeholder="Enter question"
                                required
                                onChange={(e) => handleFieldValueUpdate(input.id, e.target.value)}
                              />
            
                              <FormField
                                name={`website_desc-${input.id}`}
                                type="input"
                                placeholder="https//www.example.com"
                                required
                                disabled={true}
                              />  
                            </div>
                          )
                        }

                        {
                          input.type === "dropdown" &&  (
                            <div className="grid grid-cols-2 w-full gap-4 ">
                              <FormField
                                name={`dropdown_title-${input.id}`}
                                type="input"
                                placeholder="Enter question"
                                required
                                onChange={(e) => handleFieldValueUpdate(input.id, e.target.value)}
                              />
            
                              {/* <FormField
                                name={`dropdown_desc-${input.id}`}
                                type="input"
                                placeholder="Add options"
                                required
                                disabled={true}
                              />   */}
                              <DropdownMenu>
                                <DropdownMenuTrigger className="w-full">
                                  <Button 
                                    variant={"outline"}
                                    className="w-full justify-start text-[#A0AEC0] font-normal textt-base"
                                  >
                                    Add Options
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Billing</DropdownMenuItem>
                                  <DropdownMenuItem>Team</DropdownMenuItem>
                                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              
                            </div>
                          )
                        }

                        {
                          input.type === "date" &&  (
                            <div className="grid grid-cols-2 w-full gap-4 ">
                              <FormField
                                name={`date_title-${input.id}`}
                                type="input"
                                placeholder="Enter question"
                                required
                                onChange={(e) => handleFieldValueUpdate(input.id, e.target.value)}
                              />
            
                              <FormField
                                name={`date_desc-${input.id}`}
                                type="input"
                                placeholder="mm/dd/yy"
                                required
                                disabled={true}
                              />  
                            </div>
                          )
                        }

                        {   
                          input.type === "textarea" &&  (
                            <div className="grid grid-cols-1 w-full gap-4 ">
                              <FormField
                                name="form_title"
                                type={input.type}
                                placeholder="Enter text description here"
                                required
                                onChange={(e) => handleFieldValueUpdate(input.id, e.target.value)}
                              /> 
                            </div>
                          )
                        }
                        {   
                          input.type === "upload" &&  (
                            <div className="grid grid-cols-1 w-full gap-4 ">
                              <FormField
                                name={`image-${input.id}`}
                                type="input"
                                placeholder="Enter question"
                                required
                                onChange={(e) => handleFieldValueUpdate(input.id, e.target.value)}
                              />
                              <ImageUpload  files={[]} /> 
                            </div>
                          )
                        }
                    </CardContent>
                  </Card>
                ))  }
              </div>
            ))
          }          
        </form>
      </FormProvider>

      {/* Modal */}

    </div>
  )
}

export default DrawingBoard