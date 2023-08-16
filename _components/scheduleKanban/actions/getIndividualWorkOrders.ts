import Vue from 'vue';
import {WorkOrders} from '../contracts/getWorkOrder.contract'
import getWorkOrder from './getWorkOrder'
export default async function getIndividualWorkOrders(refresh = false, page = 1, date): Promise<WorkOrders> {
    try {
        const response = await getWorkOrder(refresh, page,  {
            "field": "schedule_date",
            "type": "customRange",
            "from": date.value.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
            "to": date.value.endOf('day').format('YYYY-MM-DD HH:mm:ss')
        })
        return response;
    } catch (error) {
        console.log(error);
        return {
            data: [],
            meta: {
                page: {
                    total: 0,
                    HasNextPage: false,
                    HasPreviousPage: false,
                    currentPage: 1,
                    perPage: 1
                }
            }
        }
    }
}