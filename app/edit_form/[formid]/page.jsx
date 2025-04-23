"use client"
import { db } from '@/config'
import { Jsonforms } from '@/config/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft, LucideScreenShare, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import FormUi from '../_components/FormUi'
import { toast } from 'sonner'
import Controler from '../_components/Controler'
import { Button } from '@/components/ui/button'

import Link from 'next/link'
import { RWebShare } from 'react-web-share'



function Editform({ params }) {

  const { user } = useUser();
  const { formid } = use(params);
  const [jsonform, setJsonForm] = useState([]);
  const route = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedBackgroung, setSelectedBackgroung] = useState('none');


  useEffect(() => {
    if (user && formid) {
      GetFormData();
    }
  }, [user, formid]);
  const GetFormData = async () => {
    const res = await db.select()
      .from(Jsonforms)
      .where(
        and(
          eq(Jsonforms.id, formid),
          eq(Jsonforms.createdBy, user.primaryEmailAddress?.emailAddress)
        )
      );
    setRecord(res[0])

   
    setJsonForm(JSON.parse(res[0].jsonfrom));
    setSelectedBackgroung(res[0].backGround);
    setSelectedTheme(res[0].theme);
  }

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonform);
      UpDateFormsInDb();
    }
  }, [updateTrigger,])
  const onUpDateForms = (value, index) => {
    console.log(value, index);
    jsonform.formFields[index].label = value.label;
    jsonform.formFields[index].placeholder = value.placeholder;
    toast('Changes Made successfully!!')
    setUpdateTrigger(Date.now());
  }
  const UpDateFormsInDb = async () => {
    const result = await db.update(Jsonforms).set({
      jsonfrom: jsonform
    }).where(and(eq(Jsonforms.id, record.id), eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress)))
    console.log(record?.id)
    console.log(result);
  }

  const deleteField = (index_delete) => {
    const result = jsonform.formFields.filter((item, index) => index != index_delete)
    jsonform.formFields = result;
    toast('Deleted field successfully!!')
    setUpdateTrigger(Date.now());
  }

  const updateFormfields= async(value,columnNmae)=>{
    const result = await db.update(Jsonforms).set({
      [columnNmae]:value
    }).where(and(eq(Jsonforms.id, record.id), eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress))).returning({id:Jsonforms.id})
    toast('Updated!')
  }
  return (
    <div className='p-4 md:p-10'>
      <div className='flex justify-between items-center '>
        <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-extrabold ' onClick={() => route.back()}>
          <ArrowLeft size={18} />Previous
        </h2>
        <div className='flex gap-2'>

          {record?.id && (
            <Link href={`/liveform/${record.id}`} target="_blank">
              <Button className="flex gap-2" style={{ background: 'linear-gradient(45deg, #6d6d6d, #5d5d5d)' }}>
                <SquareArrowOutUpRight className="w-4 h-4" />
                Preview
              </Button>
            </Link>
          )}
          <RWebShare
            data={{
              text: jsonform?.formSubheading + " \n QuickForm AI \n Let AI build your forms Quicker and Easier!",
              url: process.env.NEXT_PUBLIC_BASE_URL + "/liveform/" + record.id,
              title: jsonform?.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className="flex gap-2" style={{ background: 'linear-gradient(45deg, #454545, #3d3d3d)' }}><LucideScreenShare className='w-4 h-4'></LucideScreenShare> Share</Button>

          </RWebShare>
        </div>

      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='p-6 border rounded-lg shadow-sm bg-[#e7e7e7]'>
          <Controler 
          selectedThemes={(value) => {setSelectedTheme(value),updateFormfields(value,"theme")}} 
          selectedBackgroung={(value)=>{setSelectedBackgroung(value), updateFormfields(value,"backGround")}}
          setEnableUser={(value)=> updateFormfields(value,'enableUser')}
           />
        </div>

        {/* Form Preview */}
       

          <div className='border rounded-lg p-6 lg:col-span-2 ' style={{
            backgroundImage:selectedBackgroung
          }} >
            {console.log("Passing formId:", record.id)}

            <FormUi
              jsonform={jsonform}
              selectedTheme={selectedTheme}
              onUpDateForms={onUpDateForms}
              deleteField={(index) => deleteField(index)}
              formid={record.id}  // Make sure this isn't undefined
            />
          </div>


       
      </div>
    </div>
  )

}

export default Editform
