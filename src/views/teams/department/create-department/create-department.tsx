'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { FormField } from "@/components/custom-inputs/custom-inputs"
import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


// Infer the type from the schema
type FormData = z.infer<typeof FormSchema>

// Define the form schema with Zod
const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  category: z.string().nonempty({ message: "Please select a category" }),
})

export const fieldHOD = [];

const CreateDepartment = () => {

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
          <div className="grid grid-cols-2 gap-x-4">
            <FormField
              name="name"
              label="Department name"
              type="input"
              placeholder="Select a field type"
              required
            />

            <FormField
              name="code"
              label="Department code"
              type="input"
              placeholder="Select a field type"
              required
            />
          </div>
          <div className="mt-1.5">
            <FormField
              name="hod"
              label="Assign head of department"
              type="select"
              placeholder="Select head of department"
              options={fieldHOD}
              required
            />
          </div>

          <DialogFooter className='mt-4'>
            <Button variant={"outline"} className="border border-n300">Cancel</Button>
            <Button 
              type="submit" 
              className="" 
              // onClick={() => handleDeleteTemplate(id)}
              > Create department
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </div>
  )
}

export default CreateDepartment