import moment from 'moment';
import modelHoursFilter from '../models/hoursFilter.model'
import store from '../store/filters.store';

export default function getTitleFilter() {
    const filterTime = modelHoursFilter.find(item => store.form.time === item.value) || null;
    const selectedDate = moment(store.selectedDate);
    store.titleFilter = `${selectedDate
      .startOf("week")
      .format("MMMM D")}, ${selectedDate
        .endOf("week")
        .format("MMMM D")}, ${filterTime?.label}`
}