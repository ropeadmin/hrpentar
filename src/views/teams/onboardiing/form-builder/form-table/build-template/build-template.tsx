'use-client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { FormField as CustomFormField } from "@/components/custom-inputs/custom-inputs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FormApiResponseType, FormDataTableType, FormDataType } from "@/store/features/form-builder/type"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCreateTemplateMutation } from "@/store/features/template/templateService"
import { toast } from "react-toastify"
import { Loader2 } from "lucide-react"


// Define the form schema with Zod
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  forms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

interface IBuildTemplateProps {
  handleDialogClose: () => void;
  wait?: () => Promise<unknown>;
  formData?: FormDataTableType[];
}

const BuildTemplateModal = ({handleDialogClose, wait, formData}: IBuildTemplateProps) => {
  const [createTemplate, {isLoading}] = useCreateTemplateMutation()
  const formMethods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", forms: [] }
  })

  const { handleSubmit, control } = formMethods

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await createTemplate(data).unwrap().then((res) => {
        if (res.status === "SUCCESS") {
          toast.success('Template created successfully')
          handleDialogClose()
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  console.log(formData, wait, handleDialogClose)

  return (
    <div>
       <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <CustomFormField
            name="name"
            label="Template name"
            type="input"
            placeholder="Enter template name"
            // required
          />

          <div>
            <h3 className="text-n900 text-base font-medium">Select the required forms for this template</h3>
            <FormField
              control={control}
              name="forms"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-2 gap-y-4 mt-4">
                    {formData && formData?.map((item) => (
                      <FormField
                        key={item._id}
                        control={control}
                        name="forms"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item._id}
                              className="flex flex-row items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item._id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item._id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item._id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal ">
                                {item.title}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}    
                  </div>                        
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button 
            className="w-full h-12" 
            type="submit"
            // onClick={handleDialogClose}
          >
            { isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> }
            Save Template
          </Button>
        </form>
      </FormProvider>

    </div>
  )
}

export default BuildTemplateModal