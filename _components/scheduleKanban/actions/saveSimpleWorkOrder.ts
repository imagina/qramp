import qRampStore from 'src/modules/qramp/_store/qRampStore';
import Vue, { computed} from 'vue';
import { BUSINESS_UNIT_PASSENGER, COMPANY_PASSENGER, COMPANY_RAMP } from '../../model/constants.js';
import modalScheduleStore from '../store/modalSchedule.store'

export default async function saveSimpleWorkOrders() {
    try {
        const isPassenger = qRampStore().getIsPassenger();
        const companyId = isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP
        const businessUnitId = isPassenger ? { businessUnitId: BUSINESS_UNIT_PASSENGER } : {};
        const response = await Vue.prototype.$crud.create(
          "apiRoutes.qramp.simpleWorkOrders",
          {
            ...modalScheduleStore.form,
            titleOffline: Vue.prototype.$tr('ifly.cms.form.newWorkOrder'),
            companyId,
            ...businessUnitId,
          }
        );
        return response;
      } catch (error) {
        console.error(error);
      }
}