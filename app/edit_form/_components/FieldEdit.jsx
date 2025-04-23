import { FileEditIcon, TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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


import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


function FieldEdit({ defaultValue, onUpdate,deleteField }) {

    const [label, setLable] = useState(defaultValue?.label);
    const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);

    return (
        <div className='gap-1 flex'>
            <Popover>
                <PopoverTrigger><FileEditIcon className='w-4 h-4'></FileEditIcon></PopoverTrigger>
                <PopoverContent>

                    <h2 className='text-sm'>Field Edits</h2>
                    <div>
                        <Label className='text-xs'>Lable Name</Label>
                        <Input type='text' defaultValue={defaultValue.label}
                            onChange={(e) => setLable(e.target.value)}
                        ></Input>
                    </div>
                    <div>
                        <Label className='text-xs'>Place Holder</Label>
                        <Input type='text' defaultValue={defaultValue.placeholder}
                            onChange={(e) => setPlaceholder(e.target.value)}
                        ></Input>
                    </div>
                    <Button size="sm" className='mt-3'
                        onClick={() => onUpdate({
                            label: label,
                            placeholder: placeholder,
                        })}
                    > Make Changes</Button>
                </PopoverContent>
            </Popover>
            <AlertDialog>
                <AlertDialogTrigger><TrashIcon className='w-4 h-4' ></TrashIcon></AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this field
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=>deleteField()} >Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>




        </div>

    )
}

export default FieldEdit