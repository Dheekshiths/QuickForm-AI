import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Themes from '@/app/_data/Themes'
import { Checkbox } from '@/components/ui/checkbox'
import backgrounddata from '@/app/_data/backgrounddata'
import { Button } from '@/components/ui/button'
import { db } from '@/config'
import { Jsonforms } from '@/config/schema'
import { eq } from 'drizzle-orm'

function Controler({selectedThemes,setEnableUser,selectedBackgroung}) {
  const [showmore , setShowmore] =useState(6);
  
 
  return (
    <div>
      {/*Them slecotor*/}
      <h2 className='my-1'>Select Thems</h2>
      <hr className="my-4" style={{ borderTop: '1px solid #0a0a0a' }} />
      <Select onValueChange={(value)=>selectedThemes(value)} >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {Themes.map((theme,index)=>(
            <SelectItem value={theme.theme} key={index}>
              <div className='flex items-center gap-3'>
                <div className='flex rounded-md overflow-hidden h-5 border border-gray-200 dark:border-gray-700'>
                <div className='w-5 h-5 rounded-l-md' style={{backgroundColor:theme.primary}}></div>
                <div className='w-5 h-5 ' style={{backgroundColor:theme.secondary}}></div>
                <div className='w-5 h-5 ' style={{backgroundColor:theme.accent}}></div>
                <div className='w-5 h-5 rounded-r-md' style={{backgroundColor:theme.neutral}}></div>
                
                </div>
                {theme.theme}
              </div>
              
            </SelectItem>
          ))}
          
          
        </SelectContent>
      </Select>

      {/*background slecotor*/}
      <h2 className='mt-8 my-1'>Select BackGround</h2>
      <hr className="my-4" style={{ borderTop: '1px solid #0a0a0a' }} />
      <div className='grid grid-cols-3 gap-4 '>
        {backgrounddata.map((bg,index)=>(index<showmore)&&(
          <div key={index} onClick={()=>{
            selectedBackgroung(bg.gradient)
          }} className='w-full h-[70px] rounded-lg hover: border-black hover:border-2 cursor-pointer flex items-center justify-center' 
          style={{background:bg.gradient}}>
          {index==0 && 'None'}

          </div>
        ))}
      </div>
      <Button variant='outline' className='bg-[#e7e7e7] border-[#4f4f4f] w-full mt-2' 
      onClick={()=>setShowmore(showmore>6? 6:10)}
      
      >{showmore>6? 'Less': 'More'}</Button>

      <div className='flex items-center justify-between mt-20 gap-2'>
        <Checkbox onCheckedChange={(e)=>setEnableUser(e)}/><h2 className='text-sm'><strong>Notice:</strong> Social authentication must be enabled before you can submit the form.</h2>
      </div>

    </div>
  )
}

export default Controler