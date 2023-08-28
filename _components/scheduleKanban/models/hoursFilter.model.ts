import { HoursFilter } from '../contracts/hourFilter.contract'
const hoursFilter: HoursFilter[] = [
    {
        label: 'All Day',
        value: '0-23'
    },
    {
        label: '00 - 02:59 H',
        value: '0-2'
    },
    {
        label: '03:00 - 06:59 H',
        value: '3-6'
    },
    {
        label: '07 - 09:59 H',
        value: '7-9'
    },
    {
        label: '10 - 12:59 H',
        value: '10-12'
    },
    {
        label: '13 - 15:59 H',
        value: '13-15'
    },
    {
        label: '16 - 18:59 H',
        value: '16-18'
    },
    {
        label: '19 - 21:59 H',
        value: '19-21'
    },
    {
        label: '22 - 23:59 H',
        value: '22-23'
    },
];

export default hoursFilter;