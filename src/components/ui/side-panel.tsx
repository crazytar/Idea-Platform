import React, { FC } from 'react'
import { cn } from '../../lib/utils';



export const SidePanel = ({
    children,
    className
}: Readonly<{
    children: React.ReactNode;
    className?: string
}>) => {
    return (
        <div className={cn("flex flex-col gap-2 max-h-fit", className)}>
            {children}
        </div>
    )
}
