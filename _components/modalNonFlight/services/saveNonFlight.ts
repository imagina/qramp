import baseService from 'src/modules/qcrud/_services/baseService'
import { cacheOffline } from 'src/plugins/utils'
import store from '../store/index.store'
import qRampStore from 'src/modules/qramp/_store/qRampStore'

export const saveWorkOrders = async () => {
    const API_ROUTE = 'apiRoutes.qramp.workOrders';
    const isOffline = !navigator.onLine;
    const offlineId = new Date().valueOf()
    const payload: any = store.payload();
    let response = { data: { id: null } }

    try {
        store.loading = true;

        response = await baseService.create(API_ROUTE, {
            ...payload,
        })
        store.loading = false;
        return response.data
    } catch (error) {
        console.error(error);
        store.loading = false;
    }

    const payloadOffline = { 
        ...payload, 
        offline: isOffline,
        id: isOffline ? offlineId : response?.data?.id,
        type: qRampStore().getTypeWorkOrder(),
        calendar: {
            title: '(Non-flight)',
        }
    }
    cacheOffline.addNewRecord(API_ROUTE, { ...payloadOffline })
}
