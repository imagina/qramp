import baseService from 'modules/qcrud/_services/baseService.js'
import store from '../store/index.store';
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import {BUSINESS_UNIT_LABOR, BUSINESS_UNIT_PASSENGER, CARGO_PAX, LABOR} from '../../model/constants';

export default async function updateScheduler(): Promise<void> {
    try {
        let businessUnitId: any = qRampStore().getBusinessUnitId();
        businessUnitId = qRampStore().getBusinessUnitId() !== 'null' ? {businessUnitId} : {};
        const type = qRampStore().getBusinessUnitId() === 'null' &&
        qRampStore().getTypeWorkOrder() === CARGO_PAX ? {type: CARGO_PAX} : {};
        store.loading = true;
        store.validateOperationType();
        const payload = {...store.form, ...businessUnitId}
        await baseService.update('apiRoutes.qramp.schedulers', store.form.id, {...payload, ...type});
        store.loading = false;
    } catch (error) {
      store.loading = false;
      console.log(error, 'updateScheduler');
    }
}
