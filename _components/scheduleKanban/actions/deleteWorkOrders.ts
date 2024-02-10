import Vue from 'vue';
import cacheOffline from 'modules/qsite/_plugins/cacheOffline.js';

export default async function deleteWorkOrders(workOrderId: number): Promise<void> {
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'

        await Promise.allSettled([
            cacheOffline.deleteItem(workOrderId, API_ROUTE),
            Vue.prototype.$crud.delete(
                API_ROUTE,
                workOrderId,
                {
                    params: {
                        titleOffline: `Delete Work Order - Id: ${workOrderId}`
                    }
                }
            )
        ])

        Vue.prototype.$alert.info('workOrders was deleted correctly');
    } catch (error) {
        console.log(error);
    }
}