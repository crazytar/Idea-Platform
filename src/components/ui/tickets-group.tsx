import React, { FC } from 'react'
// import { tickets } from '../../lib/tickets.json';
import { TicketCart } from './ticket-cart';
import { cn } from '../../lib/utils';
import { currencyType, Ticket } from '@/App';
interface TicketsGroupProps {
    className?: string;
    tickets: Ticket[];
    currency: currencyType;
    stops: number[];

}

// export type Ticket = typeof tickets extends (infer U)[] ? U : never;
export const TicketsGroup: FC<TicketsGroupProps> = ({ className, tickets, currency, stops }) => {
    console.log('stops', stops);
    return (
        <div className={cn('flex flex-1 flex-col gap-2', className)}>
            {
                tickets.length && tickets
                    .filter(ticket => stops.includes(ticket.stops))
                    .sort((a, b) => a.price - b.price)
                    .map((ticket: Ticket, index: number) => (
                        <TicketCart key={index} ticket={ticket} currency={currency} />
                    ))
            }

        </div>
    )
}
