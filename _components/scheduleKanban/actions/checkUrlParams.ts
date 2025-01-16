import moment from 'moment';
import store from '../store/filters.store';
import scheduleTypeModel from '../models/scheduleType.model';
import { router } from 'src/plugins/utils'

const DATE_FORMAT = 'YYYY/MM/DD'

export default async function checkUrlParams(): Promise<void>{
  const params = {...router.route.query}

  try{
    if(store.stationId) {
      if(Object.keys(params).length !== 0){
        if (params.stationId) store.form.stationId = params.stationId;
        if (params.stationId) store.stationId = params.stationId;
        if (params.type) store.form.scheduleType = params.type;
        if (params.carrierId) store.form.carrierId = params.carrierId;
        if (params.statusId) store.form.statusId = params.statusId;
        if (params.adHoc) store.form.adHoc = params.adHoc;
        if (params.flightStatusId) store.form.flightStatusId = params.flightStatusId;
        if (params.areaId) store.form.areaId = params.areaId;
        if( params.type) store.scheduleType = params.typeAgenda;
        store.selectedDate = getSelectedDay(params)
      } else {
        /* defaults */
        store.form.scheduleType = scheduleTypeModel[1].value;
        store.scheduleType = scheduleTypeModel[1].value
        store.selectedDate = moment().format(DATE_FORMAT);
      }
    }
  } catch(err) {
    console.log(err);
  }
}

function getSelectedDay(params: any): string {
  const isWeek = store.scheduleType == scheduleTypeModel[0].value
  if(isWeek){
    const dateStart = moment(params.dateStart, DATE_FORMAT).format(DATE_FORMAT);
    const dayOfweek = moment(store.selectedDate, DATE_FORMAT).day();
    return moment(dateStart, DATE_FORMAT).day(dayOfweek).format(DATE_FORMAT);
    } else {
    return moment(params.dateStart, DATE_FORMAT).format(DATE_FORMAT);
  }
}
