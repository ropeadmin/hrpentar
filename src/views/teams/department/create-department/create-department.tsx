'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { FormField } from "@/components/custom-inputs/custom-inputs"


// Infer the type from the schema
type FormData = z.infer<typeof FormSchema>

// Define the form schema with Zod
const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  category: z.string().nonempty({ message: "Please select a category" }),
})

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
              name="category"
              label="Department name"
              type="input"
              placeholder="Select a field type"
              required
            />

            <FormField
              name="category"
              label="Department code"
              type="input"
              placeholder="Select a field type"
              required
            />

          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default CreateDepartment