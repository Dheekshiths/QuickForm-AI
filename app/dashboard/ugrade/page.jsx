"use client"
import React from 'react'
import pricingdata from './pricingdata'
import { useUser } from '@clerk/nextjs'

function Ugrade() {
    const {user} = useUser();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
  {pricingdata.map((item,index)=>(
            <div key={index} className="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900 ">
                <strong>{item.plan}</strong>
                
                <span className="sr-only">Plan</span>
              </h2>
      
              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {item.price}₹ </strong>
      
                <span className="text-sm font-medium text-gray-700">/month</span>
              </p>
            </div>
      
           
      
            <a
              href={item.link+'?prefilled_email='+user?.primaryEmailAddress?.emailAddress}
              target='_blank'
              className="mt-8 block rounded-full border border-black bg-white px-12 py-3 text-center text-sm font-medium text-black hover:ring-1 hover:ring-black focus:ring-3 focus:outline-hidden"
            >
              Make Payment
            </a>
          </div>
        ))}
    
  </div>
</div>
  )
}

export default Ugrade