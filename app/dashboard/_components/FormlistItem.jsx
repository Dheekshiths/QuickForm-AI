import { Button } from '@/components/ui/button'
import { EditIcon, ScreenShareIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs'
import { db } from '@/config'
import { Jsonforms } from '@/config/schema'
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'

function FormlistItem({ fromRecord, jsonFrom, RefrestFormData }) {
    const { user } = useUser();
    const onDeleteform = async () => {
        const result = await db.delete(Jsonforms).
            where(and(eq(Jsonforms.id, fromRecord.id), eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress)));
        if (result) {
            toast('Form Deleted!');
            RefrestFormData();
        }
    }

    return (
        <div
            className='border shadow-sm rounded-lg p-4 bg-[#d1d1d1] overflow-hidden' >
            <div className='flex justify-between'>
                <h2 className='font-bold text-[#0a0a0a]'>{jsonFrom?.formTitle}</h2>
                <AlertDialog >
                    <AlertDialogTrigger  ><Trash2Icon className='text-[#0a0a0a] hover:scale-110 transition-all'

                    /></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Deleting Form?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete Form
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => onDeleteform()}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>


            </div>

            <h2 className='text-[#454545] text-sm'>{jsonFrom?.formSubheading}</h2>
            <hr className="my-4" style={{ borderTop: '1px solid #0a0a0a' }} />
            <div className='flex justify-between'>

                <RWebShare
                    data={{
                        text: jsonFrom?.formSubheading+" \n QuickForm AI \n Let AI build your forms Quicker and Easier!",
                        url: process.env.NEXT_PUBLIC_BASE_URL+"/liveform/"+fromRecord.id,
                        title: jsonFrom?.formTitle,
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button size='sm' variant="outline" className='flex gap-2 bg-[#d1d1d1] border-[#3d3d3d]'>
                        <ScreenShareIcon className='w-5 h-5' /> Share
                    </Button>
                </RWebShare>

                <Link href={'/edit_form/' + fromRecord.id}>
                    <Button size='sm' className='flex gap-2 bg-[#4f4f4f]'>
                        <EditIcon className='w-5 h-5' /> Edit
                    </Button>
                </Link>
            </div>
        </div>

    )
}

export default FormlistItem