import { Ticket } from '@/types/main';
import React, { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast';
import { TelegramRoot } from './telegram-root';
interface IContext {
    ticket: Ticket | null;
    setTicket: (value: Ticket) => void;
}
export const AppContext = React.createContext<IContext>({} as IContext);
export const Providers = ({ children }: PropsWithChildren) => {
    // const [ticket, setTicket] = React.useState<Ticket>({} as Ticket);
    const ctx: IContext = {
        ticket: {} as Ticket,
        setTicket: (value: Ticket) => { ctx.ticket = JSON.parse(JSON.stringify(value)); }
    }

    return (
        <TelegramRoot>
            <AppContext.Provider value={ctx}>
                {children}
                <Toaster />
            </AppContext.Provider>
        </TelegramRoot>

    )
}
