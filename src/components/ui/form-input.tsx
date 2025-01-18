import React, { FC, useState } from 'react'
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Input } from './input';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    required?: boolean;
    name: string;
    label?: string;
    className?: string;
}

export const FormInput: FC<FormInputProps> = ({ className, name, label, required, type, ...props }) => {
    const {
        formState: { errors },
        register,
        watch,
        setValue,
    } = useFormContext();
    const value = watch(name);
    const error = errors[name]?.message;
    return (
        <div className={className}>
            {label && <p className='font-medium mb-2'>
                {label} {required && <span className='text-red-500'>*</span>}   </p>}
            <div className="relative">

                <Input className='h-12 text-sm' type='text' {...register(name)} {...props} />
                {value &&
                    <div className="absolute right-4 top-1/2 ">

                        <button /* X button */
                            onClick={() => setValue(name, '')}
                            className=
                            '-translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer'>
                            <X className="h-5 w-5" />
                        </button>

                    </div>

                }
            </div>
            {error && <p className='text-destructive text-sm'> {error as string}</p>}
        </div>
    )
}
