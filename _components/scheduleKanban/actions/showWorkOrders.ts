import Vue from 'vue';
import storeKanban from '../store/kanban.store';
import cacheOffline from 'modules/qsite/_plugins/cacheOffline.js';
import { DataWorkOrder } from '../contracts/getWorkOrder.contract';

export default async function showWorkOrder(workOrderId: number): Promise<{data: DataWorkOrder | any}> {
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'

        if (!storeKanban.isAppOffline) {
            return await Vue.prototype.$crud.show(API_ROUTE, workOrderId, {
                refresh: true,
                include:
                    "customer,workOrderStatus,operationType,station,contract,responsible,flightStatus,scheduleStatus,gate",
            })
        }

        const cacheData = await cacheOffline.getItemById(workOrderId, API_ROUTE)
        return {
            data: cacheData
        }

    } catch (error) {
        console.log(error);
        return { data: {} }
    }
}
