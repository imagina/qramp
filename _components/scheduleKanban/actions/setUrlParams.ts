import moment from 'moment';
import store from '../store/filters.store';
import modalScheduleStore from '../store/modalSchedule.store'

export default async function setUrlParams(router:any, name){
    try {            
      const selectedDate = moment(store.selectedDate);
      const query = store.payload;
      query.type = store.scheduleType;
      query.dateStart = selectedDate.startOf("week").format('YYYYMMDD');
      query.dateEnd = selectedDate.endOf("week").format('YYYYMMDD');
      modalScheduleStore.stationId = query.stationId;
      router.push({
        name,
        query
      }).catch((error) => {
        if(error.name != ('NavigationDuplicated')) console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }
