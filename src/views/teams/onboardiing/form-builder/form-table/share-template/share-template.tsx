import React from 'react'
import { Button } from '@/components/ui/button'
import Assets from '@/constants/assets.constant'
import { Copy } from 'lucide-react'
import Image from 'next/image'
import { FormField } from "@/components/custom-inputs/custom-inputs"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from 'react-hook-form'

// Define the form schema with Zod
const FormSchema = z.object({
  text: z.string({ message: "Invalid email address" }),
})

// Infer the type from the schema
type FormData = z.infer<typeof FormSchema>

const ShareTemplate = () => {

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
      {/*  */}
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-end space-x-4 mb-6">
          <div className='grow'>
            <FormField
              name="text"
              label="Invite employees"
              type="input"
              placeholder="Search employees by name or email"
            />
          </div>
    
          <Button className='mb-1'>Send invite</Button>
        </form>
      </FormProvider>
      {/*  */}
      <div className='mb-3 flex items-center justify-between'>
        <div className='flex items-center space-x-1'>
          {/* image */}
          <div className='w-8 h-8 rounded-full relative'>
            <Image
              src={Assets.icon2}
              alt=""
              fill
              className=''
            />
          </div>
          <h2 className='text-base text-n900 font-medium'>Kamsi Bentely <span className='font-light'>(you)</span></h2>
        </div>
        <p className='text-sm text-n600 font-medium'>Owner</p>
      </div>
      <hr className='mb-6 mt-2' />
      {/*  */}
      <div>
        <h3 className='mb-1 text-n900 text-sm font-medium'>Document link</h3>
        <div className='h-11 flex items-center justify-between px-5 border border-n300 bg-white w-full rounded-lg'>
          <p className='text-n900 text-base fontt-normal'>https://pentahr/onboardingtemplate-mactay-095435</p>
          <Copy size={18} className='text-n900'/>
        </div>
      </div>
    </div>
  )
}

export default ShareTemplate