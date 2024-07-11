import moment from "moment";
import { DataWorkOrder } from "../contracts/getWorkOrder.contract";
import { cacheOffline } from 'src/plugins/utils';
import filtersStore from '../store/filters.store'

export default async function getFilteredWorkOrdersOffline(date): Promise<DataWorkOrder[]>{
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'
        const { data: workOrderList } = await cacheOffline.getAllList(API_ROUTE)
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
        console.log(err)
        return []
    }

}
