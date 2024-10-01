import _ from 'lodash'
import { WorkOrders } from '../contracts/getWorkOrder.contract';
import dataReturnedWorkOrder from '../models/dataReturnedWorkOrder.model'
import paginateCacheOffline from 'src/plugins/paginateCacheOffline'
import getFilteredWorkOrdersOffline from './getFilteredWorkOrdersOffline';
import storeKanban from '../store/kanban.store';
import qRampStore from 'modules/qramp/_store/qRampStore';

export default async function getWorkOrderOffline(date, page): Promise<WorkOrders> {
    try {
        const workOrdersFiltered = await getFilteredWorkOrdersOffline(date)
        storeKanban.statusIdList = workOrdersFiltered.map(workOrder => workOrder.statusId);
        const businessUnitId: any = qRampStore().getBusinessUnitId()
        const cardsChunk = await paginateCacheOffline({ data: workOrdersFiltered }, null, page, 10, { businessUnitId })
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
