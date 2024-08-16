import {WorkOrders} from '../contracts/getWorkOrder.contract'
import filtersStore from '../store/filters.store'
import dataReturnedWorkOrder from '../models/dataReturnedWorkOrder.model'
import getWorkOrderOffline from './getWorkOrderOffline';
import store from '../store/kanban.store';
import crud from 'src/modules/qcrud/_services/baseService'

export default async function getWorkOrders(refresh = false, page = 1, date): Promise<WorkOrders> {
    try {
        let searchData: any = store.search ? { search: store.search } : {};
        const params = {
            refresh,
            params: {
                take: 15,
                page,
                filter: {
                    ...filtersStore.payload,
                    withoutDefaultInclude: true,
                    date,
                    order: {
                        field: "schedule_date_local",
                        way: "asc",
                    },
                    ...searchData,
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
