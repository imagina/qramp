import {WorkOrders} from '../contracts/getWorkOrder.contract'
import filtersStore from '../store/filters.store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import { BUSINESS_UNIT_PASSENGER, BUSINESS_UNIT_RAMP, FLIGHT } from '../../model/constants';
import dataReturnedWorkOrder from '../models/dataReturnedWorkOrder.model'
import getWorkOrderOffline from './getWorkOrderOffline';
import store from '../store/kanban.store';
import crud from 'src/modules/qcrud/_services/baseService'

export default async function getWorkOrders(refresh = false, page = 1, date): Promise<WorkOrders> {
    try {
        const isPassenger = qRampStore().getIsPassenger();
        const businessUnitId = isPassenger ? BUSINESS_UNIT_PASSENGER : BUSINESS_UNIT_RAMP;

        const params = {
            refresh,
            params: {
                take: 15,
                page,
                filter: {
                    businessUnitId,
                    ...filtersStore.payload,
                    withoutDefaultInclude: true,
                    date,
                    order: {
                        field: isPassenger ? "schedule_date_local" : 'schedule_date',
                        way: "asc",
                    },
                    type: [FLIGHT]
                },
            },
        };
        if (!store.isAppOffline) {
            return crud.index(
                "apiRoutes.qramp.workOrders",
                params,
            );
        }

        return await getWorkOrderOffline(date, page)
    } catch (error) {
        console.log(error);
        return {
            ...dataReturnedWorkOrder
        }
    }
}
