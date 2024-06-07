import { WorkOrders } from '../contracts/getWorkOrder.contract'
import dataReturnedWorkOrderModel from '../models/dataReturnedWorkOrder.model';
import getWorkOrder from './getWorkOrder'
import storeFilters from "../store/filters.store";
import qRampStore from 'src/modules/qramp/_store/qRampStore';

export default async function getIndividualWorkOrders(refresh = false, page = 1, date): Promise<WorkOrders> {
    try {
        const startDate = date.startOf('day');
        const endDate = date.endOf('day');
        const filterTime = storeFilters.filterTime;
        const response = await getWorkOrder(refresh, page,  {
            "field": qRampStore().getIsPassenger() ? 'schedule_date_local':"schedule_date",
            "type": "customRange",
            "from": startDate.set({ hour: filterTime[0], minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss'),
            "to": endDate.set({ hour: filterTime[1], minute: 59, second: 59 }).format('YYYY-MM-DD HH:mm:ss')
        })
        return response;
    } catch (error) {
        console.log(error);
        return {
            ...dataReturnedWorkOrderModel
        }
    }
}