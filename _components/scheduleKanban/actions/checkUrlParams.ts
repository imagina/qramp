import moment from 'moment';
import store from '../store/filters.store';
import getCurrentTime from './getCurrentTime';

export default async function checkUrlParams(params){
    store.form.time = getCurrentTime();
    try{
      if(Object.keys(params).length !== 0){        
        /* 12 is for Dev only -> To Do: get stationId from cache */
        store.stationId = params.stationId ? params.stationId : null
        store.form.stationId = store.stationId;

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
      }else{    
        /**
         * To Do: load defaults filters
         */    
        /** 
         * To Do: check cache filter 
         */
        
        /* 12 is for Dev only -> To Do: show modal if stationId isn't cached */
        //store.stationId = '12'
        store.form.stationId = store.stationId;
        
        /**
         * To Do: set scheduletype to day-agenda as default.
         */
      }
    } catch(err) {
      console.log(err);
    }
  }
