"use client"
import FormUi from '@/app/edit_form/_components/FormUi'
import { db } from '@/config'
import { Jsonforms } from '@/config/schema'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, use, useState } from 'react'

function LiveForms({ params }) {
    const { formid } = use(params);
    const [jsonform, setJsonForm] = useState([]);
    const [record, setRecord] = useState();
    useEffect(() => {
        if (formid) {
            GetData();
        }
    }, [formid]);

    const GetData = async () => {
        const result = await db.select().from(Jsonforms).where(eq(Jsonforms.id, Number(formid)));

        setRecord(result[0])
        setJsonForm(JSON.parse(result[0].jsonfrom))
        console.log(JSON.parse(result[0].jsonfrom))
        console.log(result);
        console.log(result[0]?.theme)
    }
    return (
        <div className='p-10 flex justify-center items-center' style={{
            backgroundImage:record?.backGround
        }}>

           {record&&<FormUi
                jsonform={jsonform}
                selectedTheme={record?.theme}
                formid={record?.id}
                onUpDateForms={() => console.log}
                deleteField={() => console.log}
                editable={false}
                enableUser={record?.enableUser}

            />}

            
            <div className='felx items-center justify-center fixed bottom-10 px-1 py-1 left-2 cursor-pointer'>
                <Image src={'/logo.svg'} width={100} height={40} alt="Logo" />
                <Link className='flex gap-2 items-center text-black text-sm rounded-full fixed bottom-5 left-2 cursor-pointer' href={process.env.NEXT_PUBLIC_BASE_URL}>

                    By dheekshithsreddy@gmail.com
                </Link>
            </div>
        </div>
    )
}
export default LiveForms