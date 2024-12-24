import React from 'react';
import axios from 'axios';
import './index.css'
import { Container } from './components/ui/container';
import { SidePanel } from './components/ui/side-panel';
import { CurrencySelector } from './components/ui/currency-selector';
import { TicketsGroup } from './components/ui/tickets-group';
import { FilterCheckBoxGroup } from './components/ui/filter-checkbox-group';
import { useRaf, useSet } from 'react-use'
// interface IContext {
//   currency: string;
//   setCurrency: (value: string) => void;
//   filterValues: string[];
//   setFilterValues: (values: string[]) => void;
// }
// export const AppContext = React.createContext<IContext>(contextDefaultValues);
// const contextDefaultValues: IContext = {  currency: '', 
//   setCurrency: (value) =>  , 
//   filterValues: [], setFilterValues: () =>  { }}
export type Ticket = {

  origin: string,
  origin_name: string
  destination: string,
  destination_name: string,
  departure_date: string,
  departure_time: string,
  arrival_date: string,
  arrival_time: string,
  carrier: string,
  stops: number,
  price: number

}
type AxiosResponse = {
  tickets: Ticket[];
}
export const stopsFilterArr =
  [{ name: 'Без пересадок', value: 0 }, { name: '1 пересадка', value: 1 },
  { name: '2 пересадки', value: 2 }, { name: '3 пересадки', value: 3 }];
export type currencyType = 'USD' | 'EUR' | 'RUB';
export const currencyArr: currencyType[] = ['USD', 'EUR', 'RUB'];

function App() {
  const [filterValues, setFilterValues] = React.useState<string[]>([]);
  const [currency, setCurrency] = React.useState<currencyType>('RUB');
  const [tickets, setTickets] = React.useState<Ticket[]>([]);
  const [stops, { toggle: toggleStop, clear: resetStops }] = useSet(new Set<number>());

  React.useEffect(() => {
    async function getData() {
      try {
        const response = (await axios.get<AxiosResponse>('/tickets.json')).data;
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
    <Container className='flex gap-4 rounded-md translate-y-32' >
      <SidePanel className='w-[300px] bg-muted rounded-md shadow-sm'>
        <CurrencySelector selectors={currencyArr} onChange={setCurrency} selected={currency} />
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

export default App;
