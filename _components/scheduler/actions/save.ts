import baseService from 'modules/qcrud/_services/baseService.js'
import store from '../store/index.store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import { BUSINESS_UNIT_PASSENGER } from '../../model/constants.js';

export default async function saveScheduler(): Promise<void> {
    try {
        const isPassenger = qRampStore().getIsPassenger();
        const businessUnitId = isPassenger ? { businessUnitId : BUSINESS_UNIT_PASSENGER } : {};
        store.loading = true;
        store.validateOperationType();
        await baseService.create('apiRoutes.qramp.schedulers', {...store.form, ...businessUnitId});
        store.loading = false;
    } catch (error) {
      store.loading = false;
      console.log(error, 'saveScheduler');
    }
}