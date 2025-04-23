import { Input } from '@/components/ui/input'
import React, { useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import FieldEdit from './FieldEdit'
import { db } from '@/config'
import { UserResponses } from '@/config/schema'
import moment from 'moment'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'


function FormUi({ jsonform, selectedTheme, onUpDateForms, deleteField, editable = true, formid = 0,enableUser=false}) {

  const [formdata, setformdata] = useState();
  const { user, isSignedIn} = useUser();
  let formref = useRef();
  const handelInputchange = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    })
  }

  const handelSelectChange = (name, value) => {
    setformdata({
      ...formdata,
      [name]: value,
    })

  }
  const onFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formdata)
    console.log(formid);



    const result = await db.insert(UserResponses).values({
      jsonResponse: formdata,
      createdAt: moment().format('DD/MM/yyyy'),
      formRef: formid
    })

    if (result) {
      formref.reset()
      toast("Response submitted !!")
    }
  }

  return (
    <div className="w-full max-w-2xl rounded-xl mx-auto p-6" >

      <form className="rounded-xl shadow-sm border border-gray-200 p-6 space-y-6"
        data-theme={selectedTheme} onSubmit={onFormSubmit} ref={(e) => formref = e}>

        <div className='text-center space-y-2'>
          <h2 className='text-2xl text-center font-bold text-[#0a0a0a]'>{jsonform?.formTitle}</h2>
          {jsonform?.formSubheading && (
            <p className='text-sm text-gray-500'>{jsonform?.formSubheading}</p>
          )}
          {jsonform?.formDescription && (
            <p className='text-xs text-gray-500'>{jsonform?.formDescription}</p>
          )}
        </div>

        {/* Your existing form fields */}
        {jsonform?.formFields?.map((field, index) => (
          <div key={index} className='flex items-center gap-2'>
            {field?.type == 'select' ?
              <div className='my-3 w-full'>
                <label className='text-sm font-medium text-[#3d3d3d]'>
                  {field.label}
                </label>
                <Select required={field?.required} onValueChange={(v) => handelSelectChange(field?.fieldName, v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field?.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field?.options?.map((item, index) => (
                      <SelectItem key={index} value={item?.value}>{item?.value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              : field?.type == 'radio' ?
                <div className='my-3 w-full'>
                  <label className='text-sm font-medium text-[#3d3d3d]'>
                    {field.label}
                  </label>
                  <RadioGroup required={field?.required}>
                    {field?.options?.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={item?.value} id={`radio-${index}`} onClick={() => handelSelectChange(field.fieldName, item?.value)} />
                        <Label htmlFor={`radio-${index}`}>{item?.value}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                : <div key={index} className='my-3 w-full'>
                  {field?.label && (
                    <label className='text-sm font-medium text-[#3d3d3d] flex items-center'>
                      {field.label}
                    </label>
                  )}

                  <Input
                    type={field?.type || 'text'}
                    placeholder={field?.placeholder}
                    name={field?.fieldName}
                    className='w-full'
                    required={field?.required}
                    onChange={(e) => handelInputchange(e)}
                  />
                </div>
            }
            {editable && <div>
              <FieldEdit
                defaultValue={field}
                onUpdate={(value) => onUpDateForms(value, index)}
                deleteField={() => deleteField(index)}
              />
            </div>
            }
          </div>
        ))}

        {!enableUser?
        <button type="submit" className="btn btn-primary">
        Submit
      </button>:
        isSignedIn ?<button type="submit" className="btn btn-primary">
        Submit
      </button>: (
          <SignInButton mode='modal'>
            <span className="btn btn-primary">Sign In to Submit</span>
          </SignInButton>
        )
      }

        
      </form>
    </div>
  )
}

export default FormUi