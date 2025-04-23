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
    <div className='p-4 border-b shadow-sm'>
        <div className='flex items-center justify-between'>
        <Link href={'/'}>
        <Image 
          src={'/logo.svg'} 
          width={150} 
          height={50} 
          alt='logo'
          className='w-[120px] md:w-[150px]' // responsive width
        />
        </Link>
            {isSignedIn?
            <div className='flex items-center gap-3 md:gap-5'> {/* responsive gap */}
              <Link href={'/dashboard'}>
              <Button varient='outline' className='text-sm md:text-base px-3 md:px-4'> {/* responsive text and padding */}
                Dashboard
              </Button>
              </Link>
            
            <UserButton appearance={{
              elements: {
                userButtonBox: "h-8 w-8 md:h-10 md:w-10" // responsive user button size
              }
            }}/>
            </div>:
            <div className='flex items-center gap-3 md:gap-5'> {/* responsive gap */}
            <SignInButton>
              <Button className='text-sm md:text-base px-3 md:px-4'> {/* responsive text and padding */}
                Get started
              </Button>
            </SignInButton>
            </div>
          }
        </div>
    </div>
  )
}

export default Header