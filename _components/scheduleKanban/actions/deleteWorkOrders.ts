import { cacheOffline } from 'src/plugins/utils';
import { getCurrentInstance } from 'vue';

export default async function deleteWorkOrders(workOrderId: number): Promise<void> {
  const proxy = getCurrentInstance().appContext.config.globalProperties
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'

        await Promise.allSettled([
            cacheOffline.deleteItem(workOrderId, API_ROUTE),
            proxy.$crud.delete(
                API_ROUTE,
                workOrderId,
                {
                    params: {
                        titleOffline: `Delete Work Order - Id: ${workOrderId}`
                    }
                }
            )
        ])

        proxy.$alert.info('workOrders was deleted correctly');
    } catch (error) {
        console.log(error);
    }
}
