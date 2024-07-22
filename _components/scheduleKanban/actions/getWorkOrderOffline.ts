import _ from 'lodash'
import { WorkOrders } from '../contracts/getWorkOrder.contract';
import dataReturnedWorkOrder from '../models/dataReturnedWorkOrder.model'
import paginateCacheOffline from 'src/plugins/paginateCacheOffline'
import getFilteredWorkOrdersOffline from './getFilteredWorkOrdersOffline';
import storeKanban from '../store/kanban.store';
import qRampStore from 'modules/qramp/_store/qRampStore';
import {
  BUSINESS_UNIT_LABOR,
  BUSINESS_UNIT_PASSENGER,
  LABOR
} from "src/modules/qramp/_components/model/constants";
import { BUSINESS_UNIT_RAMP } from '../../model/constants';

export default async function getWorkOrderOffline(date, page): Promise<WorkOrders> {
    try {
        const isPassenger = qRampStore().getIsPassenger();
        const workOrdersFiltered = await getFilteredWorkOrdersOffline(date)
        storeKanban.statusIdList = workOrdersFiltered.map(workOrder => workOrder.statusId);
        let businessUnitId: any = isPassenger ? { businessUnitId: BUSINESS_UNIT_PASSENGER } : {businessUnitId: BUSINESS_UNIT_RAMP};
        if(qRampStore().getTypeWorkOrder() === LABOR) {
          businessUnitId = { businessUnitId: BUSINESS_UNIT_LABOR }
        }
        const cardsChunk = await paginateCacheOffline({ data: workOrdersFiltered }, null, page, 10, {...businessUnitId})
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
