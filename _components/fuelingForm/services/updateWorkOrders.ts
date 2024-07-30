import baseService from 'src/modules/qcrud/_services/baseService.js'
import store from '../store'
import { cacheOffline } from 'src/plugins/utils'
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import moment from 'moment-timezone';

export default async function updateWorkOrders() {
    const API_ROUTE = 'apiRoutes.qramp.workOrders';
    const payload = await store.payload();
    const NEW_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss'
    const ORIGINAL_DATE_FORMAT = 'MM/DD/YYYY';
    const payloadOffline = {
        ...payload,
        offline: !navigator.onLine
    }

    try {
        store.loading = true;
        const titleOffline = qRampStore().getTitleOffline();
        const params = {params: {titleOffline}};
        await baseService.update(API_ROUTE, store.form?.id, payload, params)
        store.loading = false;
    } catch (error) {
        console.info(error);
        store.loading = false;
    } 

    (payloadOffline as any).scheduleDate = moment(
        payloadOffline.scheduleDate, 
        ORIGINAL_DATE_FORMAT
    ).format(NEW_DATE_FORMAT);
    await cacheOffline.updateRecord(API_ROUTE, payloadOffline, store.form?.id);
}