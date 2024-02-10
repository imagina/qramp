import { getCurrentInstance } from 'vue';
import {WorkOrders} from '../contracts/getWorkOrder.contract'
import filtersStore from '../store/filters.store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import { BUSINESS_UNIT_PASSENGER, BUSINESS_UNIT_RAMP } from '../../model/constants';
import dataReturnedWorkOrder from '../models/dataReturnedWorkOrder.model'
import getWorkOrderOffline from './getWorkOrderOffline';
import store from '../store/kanban.store';

export default async function getWorkOrders(refresh = false, page = 1, date): Promise<WorkOrders> {
  const proxy = getCurrentInstance().appContext.config.globalProperties
    try {
        const isPassenger = qRampStore().getIsPassenger();
        const businessUnitId = isPassenger ? BUSINESS_UNIT_PASSENGER : BUSINESS_UNIT_RAMP;

        const params = {
            refresh,
            params: {
                take: 10,
                page,
                filter: {
                    businessUnitId,
                    ...filtersStore.payload,
                    date,
                    withoutDefaultInclude: true,
                    order: {
                        field: "schedule_date",
                        way: "asc",
                    },
                },
            },
        };
        if (!store.isAppOffline) {
            return proxy.$crud.index(
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
