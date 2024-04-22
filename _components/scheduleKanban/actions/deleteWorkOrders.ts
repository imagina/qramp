import { cacheOffline } from 'src/plugins/utils';
import { getCurrentInstance } from 'vue';
import { alert } from 'src/plugins/utils'
import crud from 'src/modules/qcrud/_services/baseService'

export default async function deleteWorkOrders(workOrderId: number): Promise<void> {
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'
        const params = {
            include: 'responsible,workOrderItems,workOrderItems.workOrderItemAttributes',
            filter: {
                businessUnitId: { operator: '!=', value: 8 },
                date: {
                    field: "created_at",
                    type: "5daysAroundToday",
                    from: null,
                    to: null
                },
                order: {
                    field: "id",
                    way: "desc"
                },
                withoutDefaultInclude: true,
            },
            page: 1
        }
        const key = `${API_ROUTE}::requestParams[${JSON.stringify(params)}]`

        await Promise.allSettled([
            cacheOffline.deleteItem(workOrderId, key),
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
