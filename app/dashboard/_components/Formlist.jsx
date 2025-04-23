"use client"
import { db } from '@/config';
import { Jsonforms } from '@/config/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import FormlistItem from './FormlistItem';

function Formlist() {

    const { user } = useUser();
    const [formList, setformList] = useState([]);
    useEffect(() => {
        user && GetFormList();
    }, [user])
    const GetFormList = async () => {
        const result = await db.select().from(Jsonforms).
            where(eq(Jsonforms.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(Jsonforms.id));
        setformList(result);
        console.log(result);
    }
    return (
        <div className='mt-5 grid grid-cols-2 md:grid-cols-3 gap-5 '>
            {formList.map((form, index) => (
                <div key={index}>
                    <FormlistItem jsonFrom={JSON.parse(form.jsonfrom)} fromRecord={form} RefrestFormData={GetFormList} />
                </div>
            ))}
        </div>
    )
}

export default Formlist