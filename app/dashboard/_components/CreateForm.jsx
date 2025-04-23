"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea';
import chatSession from '@/config/gemini_AiModel';
import { useUser } from '@clerk/nextjs';
import { db } from '@/config';
import { Jsonforms } from '@/config/schema';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';

const PROMPT = `
Please generate a form JSON structure with the following EXACT property names:
{
  "formTitle": "string",        
  "formSubheading": "string",   
  "formDescription": "string",  
  "formFields": [               
    {
      "fieldName": "string",    
      "label": "string",        
      "type": "string",        
      "placeholder": "string",   
      "required": boolean,      
      "options": [             
        {
          "value": "string",   
          "label": "string"     
        }
      ]
    }
  ]
}

Important requirements:
1. Maintain these EXACT property names in the response
2. All field objects must include all specified properties (use null for optional values)
3. For select fields, include both value and label in options
4. Never change property names between responses
5.there should atleast 7 formFields 
`;
function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const [userInput, setUserInput] = useState();
    const [loading, setLoadting] = useState();
    const { user } = useUser();
    const route = useRouter();

    const onCreateForm = async () => {
        console.log(userInput);

        const result = await chatSession.sendMessage("Description:" + userInput + PROMPT);
        setLoadting(true);
        console.log('AI Response:', result.response.text());
        if (result.response.text()) {
            const resp = await db.insert(Jsonforms).values({
                jsonfrom: result.response.text(),
                createdBy: user?.primaryEmailAddress.emailAddress,
                createdAt: moment().format('DD/MM/yyyy'),
            }).returning({ id: Jsonforms.id });
            console.log("Recent Form ID: ", resp[0].id);
            if (resp[0].id) {
                route.push('/edit_form/' + resp[0].id)
            }
            setLoadting(false);
        }
        setLoadting(false);

    }
    return (
        <div>
            <Button onClick={() => setOpenDialog(true)}>Build New Form</Button>
            <Dialog open={openDialog}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Build new Form with AI</DialogTitle>
                        <div className='my-5'>
                            <Textarea className="my-5 " placeholder="Decribe your form" onChange={(event) => setUserInput(event.target.value)} />
                            <div className='flex gap-2 my-2 justify-end'>
                                <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancle</Button>
                                <Button disabled={loading} onClick={onCreateForm}>
                                    {loading && <Loader2Icon className="animate-spin mr-2" />}
                                    {loading ? 'Creating...' : 'Create'}
                                </Button>
                            </div>
                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateForm