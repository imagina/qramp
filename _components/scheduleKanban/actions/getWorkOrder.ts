import Vue from 'vue';
import {WorkOrders} from '../contracts/getWorkOrder.contract'
import filtersStore from '../store/filters.store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import {BUSINESS_UNIT_LABOR, BUSINESS_UNIT_PASSENGER, BUSINESS_UNIT_RAMP, FLIGHT, LABOR} from '../../model/constants';
import dataReturnedWorkOrder from '../models/dataReturnedWorkOrder.model'
import getWorkOrderOffline from './getWorkOrderOffline';
import store from '../store/kanban.store';

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
            return Vue.prototype.$crud.index(
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
