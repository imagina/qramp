import baseService from '@imagina/qcrud/_services/baseService.js'
import store from '../store/index.store'

export const saveWorkOrders = async () => {
    try {
        store.loading = true;
        const payload: any = store.payload();
        const response = await baseService.create('apiRoutes.qramp.workOrders', {
            ...payload,
        })
        store.loading = false;
        return response.data
    } catch (error) {
        console.error(error);
        store.loading = false;
    }
}