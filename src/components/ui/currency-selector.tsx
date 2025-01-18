import React, { FC, useContext } from 'react'
import { Button } from './shadcn/button';
import { cn } from '../../lib/utils';
import { currencyType } from '@/types/main';
// import { AppContext } from '@/App';

interface CurrencySelectorProps {
    className?: string;
    selectors: currencyType[];
    selected: string;
    onChange: (value: currencyType) => void
}

export const CurrencySelector: FC<CurrencySelectorProps> = ({ className, selectors, selected, onChange }) => {
    // const { currency} = useContext(AppContext);
    // const [active, setActive] = React.useState(selectors[0]);
    return (
        <div className={cn("flex", className)}>
            {
                selectors.map((selector) => (
                    <div className={cn('cursor-pointer flex-1 p-7 hover:bg-muted border-2 border-secondary', selected === selector && 'bg-secondary')}
                        key={selector} onClick={() => onChange(selector)}>{selector}</div>
                ))
            }
        </div>
    )
}
