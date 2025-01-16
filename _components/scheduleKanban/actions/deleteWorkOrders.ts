import { cacheOffline } from 'src/plugins/utils';
import { alert } from 'src/plugins/utils'
import crud from 'src/modules/qcrud/_services/baseService'

export default async function deleteWorkOrders(workOrderId: number): Promise<void> {
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'

        await Promise.allSettled([
            cacheOffline.deleteItem(workOrderId, API_ROUTE),
            crud.delete(
                API_ROUTE,
                workOrderId,
                {
                    data: {
                      attributes: {
                        id: workOrderId,
                        titleOffline: 'Delete Work Order'
                      }
                    }
                }
            )
        ])

        alert.info('workOrders was deleted correctly');
    } catch (error) {
        console.log(error);
    }
}
