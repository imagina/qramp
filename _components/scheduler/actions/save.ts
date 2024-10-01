import baseService from 'modules/qcrud/_services/baseService.js'
import store from '../store/index.store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import {BUSINESS_UNIT_LABOR, LABOR} from '../../model/constants.js';

export default async function saveScheduler(): Promise<void> {
    try {
        let businessUnitId: any = qRampStore().getBusinessUnitId();
        store.loading = true;
        store.validateOperationType();
        await baseService.create('apiRoutes.qramp.schedulers', {...store.form, businessUnitId});
        store.loading = false;
    } catch (error) {
      store.loading = false;
      console.log(error, 'saveScheduler');
    }
}