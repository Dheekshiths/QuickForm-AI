'use client'

import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-50">
      {/* Animated Grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none animate-grid-scroll" />
      </div>

      <header className="relative z-10 pt-8">
        <div className="flex items-center justify-center gap-3 px-4">
          <Image 
            src={'/logo.svg'} 
            alt="QuickForm AI" 
            width={320} 
            height={112} 
            className="w-64 sm:w-72 md:w-80 h-auto" 
            priority
          />
        </div>
      </header>

      {/* Centered SignIn card */}
      <main className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md border border-gray-100">
          <div className="mb-6 sm:mb-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-sm sm:text-base">Sign in to access your dashboard</p>
          </div>
          <SignIn />
        </div>
      </main>

      {/* Global styles */}
      <style jsx global>{`
        .bg-grid {
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 90px 90px;
          background-position: 0 0;
        }
        
        .animate-grid-scroll {
          animation: gridScroll 3s linear infinite;
        }
        
        @keyframes gridScroll {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0 80px;
          }
        }
      `}</style>
    </div>
  )
}
