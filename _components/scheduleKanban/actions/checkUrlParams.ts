import moment from 'moment';
import store from '../store/filters.store';
import getCurrentTime from './getCurrentTime';
import cache from '@imagina/qsite/_plugins/cache';

export default async function checkUrlParams(proxy){
  const params = {...proxy.$route.query}
  store.form.time = getCurrentTime();
  const localStationId = await cache.get.item("stationId") !== 'null' ? await cache.get.item("stationId") : null;
  store.stationId = getStationAssigned(proxy.$store.state.quserAuth.userData) || (params.stationId || null) || (localStationId || null);
  //const station = await workOrderList().getStationList().find(item => item.id == stationId && item.companyId === filterCompany);
  if (!store.stationId) {
    store.showModalStation = true
    return;
  }

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

        const dateStart = moment(params.dateStart).format('YYYY/MM/DD');
        const dateEnd = moment(params.endDate).format('YYYY/MM/DD');
        const dayOfweek = moment(store.selectedDate).day();
        const selectedDay = moment(dateStart).day(dayOfweek).format('YYYY/MM/DD');
        store.selectedDate = selectedDay;
        /**
         * To Do: set scheduletype to day-agenda as default.
         */
      }
    }
  } catch(err) {
    console.log(err);
  }
}

function getStationAssigned(userData) {
  try {
    let stationsAssigned = null;
    if (userData) {
      if (userData.options) {
        if (userData.options.stationsAssigned
          && Array.isArray(userData.options.stationsAssigned)
          && userData.options.stationsAssigned.length > 0) {
          stationsAssigned = userData.options.stationsAssigned.shift();
        }
      }
    }
    return stationsAssigned;
  } catch (error) {
    console.log(error)
  }
}
