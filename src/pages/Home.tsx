import React, { FC } from 'react';
import axios from 'axios';
import { useSet } from 'react-use'
import { Container } from '@/components/ui/container';
import { SidePanel } from '@/components/ui/side-panel';
import { CurrencySelector } from '@/components/ui/currency-selector';
import { TicketsGroup } from '@/components/ui/tickets-group';
import { FilterCheckBoxGroup } from '@/components/ui/filter-checkbox-group';
import { currencyType, Ticket, AxiosResponse } from '@/types/main';
import { currencyArr, stopsFilterArr } from '@/lib/constants';

interface HomeProps {
    className?: string;
}

export const Home: FC<HomeProps> = ({ className }) => {
    const [currency, setCurrency] = React.useState<currencyType>('RUB');
    const [tickets, setTickets] = React.useState<Ticket[]>([]);
    const [stops, { toggle: toggleStop, clear: resetStops }] = useSet(new Set<number>());
    React.useEffect(() => {
        async function getData() {
            try {
                const response = (await axios.get<AxiosResponse>
                    (process.env.PUBLIC_URL + '/' + process.env.REACT_APP_INPUT_DATA_FILE)).data;
                setTickets(response.tickets);
            } catch (error) {
                console.error(error);
                setTickets([]);
            }
        }

        getData();
        toggleStop(0);
    }, [])
    return (
        <Container className='flex flex-wrap  gap-4 rounded-md md:translate-y-32 ' >
            <SidePanel className='w-full md:w-[300px] bg-muted rounded-md shadow-sm'>
                <CurrencySelector className="w-full" selectors={currencyArr} onChange={setCurrency} selected={currency} />
                <FilterCheckBoxGroup
                    title="КОЛИЧЕСТВО ПЕРЕСАДОК"
                    name="stops"
                    className="mb-5"
                    onClickCheckbox={toggleStop}
                    selectedIds={stops}
                    items={stopsFilterArr} />

            </SidePanel>
            <TicketsGroup tickets={tickets} currency={currency} stops={Array.from(stops)} />
        </Container >
    );
}
