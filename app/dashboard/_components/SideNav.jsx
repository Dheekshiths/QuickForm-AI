import { Button } from '@/components/ui/button';
import { BookCopyIcon, ChartColumn, Cog, icons, TextQuote } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';
import { db } from '@/config';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { Jsonforms } from '@/config/schema';
function SideNav() {
    const [formlist,setformList] = useState();
    const [per,setPer]= useState(0);
    const {user} = useUser();
    useEffect(() => {
        user&&GetFormList();
    }, [user])
     const GetFormList = async () => {
            const result = await db.select().from(Jsonforms).
                where(eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(Jsonforms.id));
            setformList(result);
            const per = ((result.length/5)*100);
            setPer(per);
        }
    const menuList = [
        {
            id: 1,
            name: 'My Forms',
            icons: BookCopyIcon,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Responses',
            icons: TextQuote,
            path: '/dashboard/responses'
        },
        {
            id: 3,
            name: 'Analytics',
            icons: ChartColumn,
            path: '/dashboard/analytics'
        },
        {
            id: 3,
            name: 'Ugrade',
            icons: Cog,
            path: '/dashboard/ugrade'
        },

    ]

    const path = usePathname();
    
    return (

        <div className='h-screen shadow-sm border '>
            <div className='p-5'>
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={index} className={`flex items-center gap-5 p-3 mb-3 cursor-pointer
                     hover:bg-primary hover:text-white rounded-lg text-gray-550
                     ${path == menu.path &&'bg-primary text-white'}`}>

                        <menu.icons />
                        {menu.name}
                    </Link>
                ))}
                <div className='fixed bottom-20 p-2 w-59.8 items-center'>
                    
                    <div className='my-4'>
                    <Progress value={per} />
                    <h2 className='mt-2 mx-3 text-sm'><strong>{formlist?.length} </strong>of<strong> 5</strong> free Forms Built</h2>
                    <h2 className='mt-5 text-sm'>Ugrade for unlimited builds!</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav


