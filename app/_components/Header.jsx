"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { SignInButton, SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function Header() {
  const {user,isSignedIn} = useUser();

  const path = usePathname();

  useEffect(()=>{
    console.log(path)
  },[])
  return !path.includes('liveform')&& (
    <div className='p-4 border-b shadow-sm '>
        <div className='flex items-center justify-between'>
        <Link href={'/'}>
        <Image src={'/logo.svg'} width={150} height={50} alt='logo'/>
        </Link>
            {isSignedIn?
            <div className='flex items-center gap-5'>
              <Link href={'/dashboard'}>
              <Button varient='outline' >Dashboard</Button>
              </Link>
              
            
            <UserButton/>
            </div>:
            <div className='flex items-center gap-5'>
            <SignInButton>
              <Button>Get started</Button>
            </SignInButton>
            </div>
          }
        </div>
    </div>
  )
}

export default Header

