import moment from 'moment';
import store from '../store/filters.store';

export default async function checkUrlParams(proxy){
  const params = {...proxy.$route.query}
  try{
    if(store.stationId){
      store.form.stationId = store.stationId;
      if(Object.keys(params).length !== 0){
        if (params.type) store.form.scheduleType = params.type;
        if (params.carrierId) store.form.carrierId = params.carrierId;
        if (params.statusId) store.form.statusId = params.statusId;
        if (params.adHoc) store.form.adHoc = params.adHoc;
        if (params.flightStatusId) store.form.flightStatusId = params.flightStatusId;
        if (params.areaId) store.form.areaId = params.areaId;
        if( params.type) store.scheduleType = params.type;

        const dateStart = moment(params.dateStart).format('YYYY/MM/DD');
        const dateEnd = moment(params.endDate).format('YYYY/MM/DD');
        const dayOfweek = moment(store.selectedDate).day();
        const selectedDay = moment(dateStart).day(dayOfweek).format('YYYY/MM/DD');
        store.selectedDate = selectedDay;
      }
    }
  } catch(err) {
    console.log(err);
  }
}
