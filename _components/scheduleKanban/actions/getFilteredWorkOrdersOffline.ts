import moment from "moment";
import { DataWorkOrder } from "../contracts/getWorkOrder.contract";
import { cache } from 'src/plugins/utils';
import { cacheOffline } from 'src/plugins/utils';
import filtersStore from '../store/filters.store'
import crud from 'src/modules/qcrud/_services/baseService'

export default async function getFilteredWorkOrdersOffline(date): Promise<DataWorkOrder[]>{
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'
        const params = {
            params: {
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
            },
        }

        const key = `${API_ROUTE}::requestParams[${JSON.stringify(params.params)}]`

        const { data: workOrderList } = await cacheOffline.getAllList(key);
        const cards = workOrderList?.filter(workOrder => {
            const scheduleDate = workOrder.scheduleDate || workOrder.inboundScheduledArrival || workOrder.outboundScheduledDeparture

            const columnDate = moment(date?.from).format('YYYY-MM-DD')
            const workOrderDate = moment(scheduleDate).format('YYYY-MM-DD')
            const stationIdWorkOrder = Number(workOrder.stationId)
            const stationId = Number(filtersStore.payload.stationId)
            return columnDate === workOrderDate && stationIdWorkOrder === stationId
        })
        return cards
    } catch (err) {
        console.error(err)
        return []
    }

}
