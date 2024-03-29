import qRampStore from 'src/modules/qramp/_store/qRampStore';
import Vue from 'vue';
import { BUSINESS_UNIT_PASSENGER } from '../../model/constants.js';
import modalScheduleStore from '../store/modalSchedule.store'
import { WorkOrders } from '../contracts/getWorkOrder.contract.js';
import dataReturnedWorkOrderModel from '../models/dataReturnedWorkOrder.model';
import saveWorkOrderOffline from './saveWorkOrderOffline';
import storeKanban from '../store/kanban.store';

export default async function saveSimpleWorkOrders(): Promise<WorkOrders> {
    try {
        const API_ROUTE = 'apiRoutes.qramp.simpleWorkOrders'
        let response = { ...dataReturnedWorkOrderModel }

        const isPassenger = qRampStore().getIsPassenger();
        const offlineId = new Date().valueOf();
        const form = { ...modalScheduleStore.form };
        const businessUnitId = isPassenger ? { businessUnitId: BUSINESS_UNIT_PASSENGER } : {};

        try {
          response = await Vue.prototype.$crud.create(
            API_ROUTE,
            {
              ...form,
              offlineId: storeKanban.isAppOffline ? offlineId: null,
              titleOffline: Vue.prototype.$tr('ifly.cms.form.newWorkOrder'),
              ...businessUnitId,
            }
          );
        } catch (err) {
          console.log(err)
        }
        modalScheduleStore.form.offlineId = offlineId
        
        response = await saveWorkOrderOffline(response);
        
        return response;
      } catch (error) {
        console.error(error);
        return {
          ...dataReturnedWorkOrderModel
        }
      }
}