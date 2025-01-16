import baseService from 'modules/qcrud/_services/baseService.js'
import store from '../store/index.store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import {BUSINESS_UNIT_LABOR, CARGO_PAX, LABOR, BUSINESS_UNIT_CARGO} from '../../model/constants.js';
import cargo from "../../cargo/index.vue";

export default async function saveScheduler(): Promise<void> {
    try {
        let businessUnitId: any = qRampStore().getBusinessUnitId();
        businessUnitId = qRampStore().getBusinessUnitId() !== 'null' ? {businessUnitId} : {};
        const type = qRampStore().getBusinessUnitId() === BUSINESS_UNIT_CARGO &&
        qRampStore().getTypeWorkOrder() === CARGO_PAX ? {type: CARGO_PAX} : {};
        store.loading = true;
        store.validateOperationType();
        await baseService.create('apiRoutes.qramp.schedulers', {...store.form, ...businessUnitId, ...type});
        store.loading = false;
    } catch (error) {
      store.loading = false;
      console.log(error, 'saveScheduler');
    }
}
