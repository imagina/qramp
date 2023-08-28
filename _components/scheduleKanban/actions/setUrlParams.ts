import moment from 'moment';
import store from '../store/filters.store';
import cache from '@imagina/qsite/_plugins/cache';

export default async function setUrlParams(proxy){
    try {
      const selectedDate = moment(store.selectedDate);
      const query = store.payload;
      query.type = store.scheduleType;
      query.dateStart = selectedDate.startOf("week").format('YYYYMMDD');
      query.dateEnd = selectedDate.endOf("week").format('YYYYMMDD');
      cache.set("stationId", store.form.stationId);

      proxy.$router.push({
        name: proxy.$route.name,
        query
      }).catch((error) => {
        if(error.name != ('NavigationDuplicated')) console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }
