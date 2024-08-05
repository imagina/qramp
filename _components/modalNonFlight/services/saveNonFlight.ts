import baseService from 'src/modules/qcrud/_services/baseService'
import { cacheOffline } from 'src/plugins/utils'
import store from '../store/index.store'
import moment from 'moment-timezone'

export const saveWorkOrders = async () => {
    const API_ROUTE = 'apiRoutes.qramp.workOrders';
    const isOffline = !navigator.onLine;
    const offlineId = new Date().valueOf()
    const payload: any = store.payload();
    let response = { data: { id: null } }

    const payloadOffline = { 
        ...payload, 
        offline: isOffline,
        id: offlineId,
        statusId: 5,
        calendar: {
            title: '(Non-flight)',
            tos: moment(payload.scheduleDate).add(1, 'hour').format('HH:mm:ss'),
        }
    }

    try {
        store.loading = true;

        response = await baseService.create(API_ROUTE, {
            ...payload,
            offlineId: isOffline ? offlineId : null,
            ...(isOffline ? { apiRoute: API_ROUTE, } : {})
        })
    } catch (error) {
        if (isOffline) response.data = payloadOffline
        console.error(error);
    } finally {
        store.loading = false;
        if (response.data.id) {
            await cacheOffline.addNewRecord(API_ROUTE, { ...response.data })
        }
        return response.data
    }
}
