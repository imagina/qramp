import _ from 'lodash'
import { WorkOrders } from '../contracts/getWorkOrder.contract';
import dataReturnedWorkOrder from '../models/dataReturnedWorkOrder.model'
import paginateCacheOffline from '@imagina/qsite/_plugins/paginateCacheOffline'
import getFilteredWorkOrdersOffline from './getFilteredWorkOrdersOffline';
import storeKanban from '../store/kanban.store';

export default async function getWorkOrderOffline(date, page): Promise<WorkOrders> {
    try {
        const workOrdersFiltered = await getFilteredWorkOrdersOffline(date)
        storeKanban.statusIdList = workOrdersFiltered.map(workOrder => workOrder.statusId);

        const cardsChunk = await paginateCacheOffline({ data: workOrdersFiltered }, null, page)
        const data = _.orderBy(
          cardsChunk.data,
          ['scheduleDate'],
          ['asc']
        )

        return {
            data,
            meta: {
                ...dataReturnedWorkOrder.meta,
            }
        }
    } catch (err) {
        console.log(err)
        return {
            ...dataReturnedWorkOrder
        }
    }
}