import modelHoursFilter from '../models/hoursFilter.model'
import moment, { Moment } from 'moment';

export default function getCurrentTime() {
    try {
        const firstHour = modelHoursFilter[0].value
        const currentHour = moment().hour();
        const filterTime = modelHoursFilter.filter(item => item.value !== firstHour).find(range => {
            const [start, end] = range.value.split('-').map(Number);
            return currentHour >= start && currentHour <= end;
        }).value || null;
        return filterTime;
    } catch (error) {
        console.log(error);
        return modelHoursFilter[0].value
    }
}
