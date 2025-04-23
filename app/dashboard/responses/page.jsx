"use client"
import { db } from '@/config';
import { Jsonforms } from '@/config/schema';
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import Responseslist from './_components/responseslist';

function Responses() {
    const {user} = useUser();
    const [formlist, setFormlist] = useState()

    useEffect(()=>{
        user&&GetFormdata()
    },[user])

    const GetFormdata= async()=>{
        const result = await db.select().from(Jsonforms).where(eq(Jsonforms.createdBy,user?.primaryEmailAddress?.emailAddress));
        setFormlist(result)
        console.log(result)
    }
  return (
    <div className='p-8'>
   
      <h2 className='text-3xl font-bold'>Responses</h2>
      <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5 '>
      {formlist&&formlist.map((form, index) => (
                <div key={index}>
                  <Responseslist
                  formRecord={form}
                  jsonFrom={JSON.parse(form.jsonfrom)}
                  ></Responseslist>
                  
                </div>
            ))}
            
      </div>
    
    
  </div>
  )
}


export default Responses