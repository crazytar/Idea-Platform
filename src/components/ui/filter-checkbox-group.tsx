import { it } from 'node:test';
import React, { FC, useContext } from 'react'
import { Checkbox } from './shadcn/checkbox';
import { cn } from '../../lib/utils';
import { stopsFilterArr } from '@/App';

interface FilterCheckBoxGroupProps {
    className?: string;
    title: string;
    name: string;
    onClickCheckbox: (value: number) => void;
    selectedIds: Set<number>;
    items: typeof stopsFilterArr;
}

export const FilterCheckBoxGroup: FC<FilterCheckBoxGroupProps> = ({ className,
    title,
    name,
    onClickCheckbox,
    selectedIds,
    items
}) => {

    return (
        <div className={cn('flex flex-col items-start gap-2 p-4', className)}>
            <p className="font-bold mb-3">{title}</p>
            {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                        onCheckedChange={() => onClickCheckbox(item.value)}
                        checked={selectedIds.has(item.value)}
                        value={item.value}
                        className="rounded-[8px] w-6 h-6 border-2 border-secondary text-secondary checked:bg-secondary"
                        id={`checkbox-${String(item.name)}}`}
                    />
                    <label
                        htmlFor={`checkbox-${String(name)}}`}
                        className="leading-none cursor-pointer flex-1">
                        {item.name}
                    </label>
                </div>
            ))}
        </div>
    )
}
