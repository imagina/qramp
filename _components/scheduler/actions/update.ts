import baseService from '@imagina/qcrud/_services/baseService.js'
import store from '../store/index.store';
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import {BUSINESS_UNIT_LABOR, BUSINESS_UNIT_PASSENGER, LABOR} from '../../model/constants';

export default async function updateScheduler(): Promise<void> {
    try {
        const isPassenger = qRampStore().getIsPassenger();
        let businessUnitId: any = isPassenger ? { businessUnitId: BUSINESS_UNIT_PASSENGER } : {};
        if(qRampStore().getTypeWorkOrder() === LABOR) {
            businessUnitId = { businessUnitId: BUSINESS_UNIT_LABOR }
        }
        store.loading = true;
        store.validateOperationType();
        const payload = {...store.form, ...businessUnitId}
        await baseService.update('apiRoutes.qramp.schedulers', store.form.id, payload);
        store.loading = false;
    } catch (error) {
      store.loading = false;
      console.log(error, 'updateScheduler');
    }
}