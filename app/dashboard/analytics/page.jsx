import React from 'react'
import { Construction } from 'lucide-react'

function Analytics() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center p-4">
      <Construction className="w-16 h-16 text-gray-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-700 mb-2">Page Under Construction</h1>
      <p className="text-gray-500 text-sm max-w-md">
        We're currently working on building this Analytics dashboard for you. 
        Stay tuned — it’s coming soon!
      </p>
    </div>
  )
}

export default Analytics
