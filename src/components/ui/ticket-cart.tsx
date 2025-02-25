import React, { FC } from 'react'
import { Button } from './shadcn/button';
import { cn, convertPrice } from '../../lib/utils';
import { Plane } from 'lucide-react';
import { currencyType, Ticket } from '@/types/main';
import { stopsFilterArr } from '@/lib/constants';
import { AppContext } from '../providers';
import { useNavigate } from 'react-router-dom';

interface TicketCartProps {
    className?: string;
    ticket: Ticket;
    currency: currencyType;
    withButton?: boolean;
}

export const TicketCart: FC<TicketCartProps> = ({ className, ticket, currency, withButton = true }) => {
    const navigate = useNavigate();
    const { setTicket } = React.useContext(AppContext);
    return (
        <div className={cn('flex flex-1  flex-row gap-2 rounded-md shadow-sm bg-muted p-4', className)}>
            {/* Левая часть */}
            <div className="flex flex-col gap2  max-w-32 lg:max-w-60 ">
                <img src={process.env.PUBLIC_URL + '/turkich.png'} alt="ticket" className="" />
                {withButton &&
                    <Button onClick={() => { setTicket(ticket); navigate('/checkout'); }}
                        className="flex-wrap min-w-0 shrink bg-primary w-full h-14 rounded-2xl mt-6 text-sm sm:text-base font-bold"
                        size={'sm'}>
                        <span>Купить</span>
                        <span>за {convertPrice('RUB', currency, ticket.price)} {currency}</span>
                    </Button>}
            </div>
            {/* Правая часть */}
            <div className="flex justify-between flex-row items-center gap-2 w-full">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">{ticket.departure_time}</div>
                    <div className="text-sm font-bold">
                        <span>{ticket.origin}</span>, <span>{ticket.origin_name}</span>
                    </div>
                    <div className="text-sm font-thin">
                        {ticket.departure_date}
                    </div>
                </div>
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative mx-2" >
                    <span className="absolute top-[70%] left-1/2 -translate-x-1/2 text-sm font-bold">
                        {stopsFilterArr[ticket.stops].name}</span>
                </div>

                <Plane className=' ' />
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold">{ticket.arrival_time}</div>
                    <div className="text-sm font-bold">
                        <span>{ticket.destination}</span>, <span>{ticket.destination_name}</span>
                    </div>
                    <div className="text-sm font-thin">
                        {ticket.arrival_date}
                    </div>
                </div>
            </div>

        </div>
    )
}
