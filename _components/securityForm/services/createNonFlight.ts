import baseService from 'src/modules/qcrud/_services/baseService.js'
import store from '../store'

export const createNonFlight = async () => {
    const API_ROUTE = 'apiRoutes.qramp.workOrders';
    const payload = await store.payload();

    try {
        store.loading = true;
        await baseService.create(API_ROUTE, payload)
        store.loading = false;
    } catch (error) {
        console.info(error);
        store.loading = false;
    }
}
