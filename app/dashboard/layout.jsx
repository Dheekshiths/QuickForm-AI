"use client"
import { SignedIn, SignIn } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import SideNav from './_components/SideNav'

function Dashboardlayout({ children }) {
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 'light');
      }, []);
    return (
        <SignedIn>
            <div className='md:w-64 fixed'>
                <SideNav />
            </div>
            <div className='md:ml-64'>
                {children}
            </div>
            
        </SignedIn>
    )
}

export default Dashboardlayout