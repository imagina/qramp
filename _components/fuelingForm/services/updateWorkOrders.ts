import baseService from '@imagina/qcrud/_services/baseService.js'
import store from '../store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';

export default async function updateWorkOrders() {
    try {
        store.loading = true;
        const payload = await store.payload();
        const titleOffline = qRampStore().getTitleOffline();
        const params = {params: {titleOffline}};
        await baseService.update('apiRoutes.qramp.workOrders', store.form?.id, payload, params)
        store.loading = false;
    } catch (error) {
        console.info(error);
        store.loading = false;
    }
}