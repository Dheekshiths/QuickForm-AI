import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_components/CreateForm'
import Formlist from './_components/Formlist'

function Dashboard() {
  return (
    <div className='p-8'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold'>Dashboard</h2>
        <CreateForm/>
       
      </div>
       {/*List of forms */}
       <Formlist></Formlist>
    </div>
  )
}

export default Dashboard
