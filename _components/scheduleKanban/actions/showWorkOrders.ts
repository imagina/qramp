import storeKanban from '../store/kanban.store';
import { cacheOffline } from 'src/plugins/utils';
import { DataWorkOrder } from '../contracts/getWorkOrder.contract';
import crud from 'src/modules/qcrud/_services/baseService'

export default async function showWorkOrder(workOrderId: number): Promise<{data: DataWorkOrder | any}> {
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'

        if (!storeKanban.isAppOffline) {
            return await crud.show(API_ROUTE, workOrderId, {
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
