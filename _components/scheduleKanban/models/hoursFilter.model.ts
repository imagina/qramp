import { HoursFilter } from '../contracts/hourFilter.contract'
const hoursFilter: HoursFilter[] = [
    {
        label: 'All Day',
        value: '0-23'
    },
    {
        label: '00:00 - 02:59',
        value: '0-2'
    },
    {
        label: '03:00 - 06:59',
        value: '3-6'
    },
    {
        label: '07:00 - 09:59',
        value: '7-9'
    },
    {
        label: '10:00 - 12:59',
        value: '10-12'
    },
    {
        label: '13:00 - 15:59',
        value: '13-15'
    },
    {
        label: '16:00 - 18:59',
        value: '16-18'
    },
    {
        label: '19:00 - 21:59',
        value: '19-21'
    },
    {
        label: '22:00 - 23:59',
        value: '22-23'
    },
];

export default hoursFilter;