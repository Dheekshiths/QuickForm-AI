"use client"
import React, { useRef } from 'react'
import { FileEdit, Share2, Sparkles, ArrowRight } from 'lucide-react'

function Hero() {
  const howItWorksRef = useRef(null)

  const scrollToHowItWorks = () => {
    if (howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative overflow-hidden bg-gray-50">
      {/* Animated Grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none animate-grid-scroll" />
      </div>

      <section className="relative z-10 lg:grid lg:h-auto min-h-screen">
        <div className="mx-auto w-full max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          {/* Hero Section */}
          <div className="mx-auto max-w-prose text-center mb-20">
            <h1 className="text-3xl sm:text-4xl font-bold text-secondary sm:text-5xl">
              Let 
              <strong className="text-primary"> AI Build </strong>
              your forms in seconds!
            </h1>

            <p className="mt-4 text-sm sm:text-base text-pretty text-secondary sm:text-lg/relaxed">
              Accelerate your form creation process with AI-generated forms that are fast, reliable, and tailored to your requirements.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 sm:mt-10">
              <a
                className="inline-block rounded-lg border bg-primary px-4 sm:px-6 py-2 sm:py-3 font-medium text-white shadow-sm transition-colors hover:bg-secondary hover:border-secondary text-sm sm:text-base"
                href="/dashboard"
              >
                Get Started
              </a>

              <button
                onClick={scrollToHowItWorks}
                className="inline-block rounded-lg border border-gray-200 px-4 sm:px-6 py-2 sm:py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 text-sm sm:text-base"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* How It Works Section */}
          <div ref={howItWorksRef} className="mt-40 sm:mt-96 lg:mt-80">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-8 sm:mb-16">How It Works</h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative">
              {/* Card 1 */}
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow w-full max-w-xs sm:max-w-none">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                    <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Describe Your Form</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Simply write a prompt explaining what kind of form you need. Our AI understands your requirements.
                  </p>
                </div>
              </div>

              {/* Animated Arrow 1 */}
              <div className="hidden md:flex items-center justify-center animate-bounce-x rotate-90 md:rotate-0">
                <ArrowRight className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400" />
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow w-full max-w-xs sm:max-w-none">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                    <FileEdit className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Customize Your Form</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Review the AI-generated form and make any adjustments. Add, remove, or modify fields as needed.
                  </p>
                </div>
              </div>

              {/* Animated Arrow 2 */}
              <div className="hidden md:flex items-center justify-center animate-bounce-x rotate-90 md:rotate-0">
                <ArrowRight className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400" />
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow w-full max-w-xs sm:max-w-none">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-3 sm:p-4 rounded-full mb-3 sm:mb-4">
                    <Share2 className="w-6 sm:w-8 h-6 sm:h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Share & Collect Data</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Publish your form and share it with respondents. View responses in real-time with our dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

        .animate-bounce-x {
          animation: bounceX 2s ease-in-out infinite;
        }

        @keyframes bounceX {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
        }
      `}</style>
    </div>
  )
}

export default Hero