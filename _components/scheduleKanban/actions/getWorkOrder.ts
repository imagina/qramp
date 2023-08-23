import Vue from 'vue';
import {WorkOrders} from '../contracts/getWorkOrder.contract'
import filtersStore from '../store/filters.store'
export default function getWorkOrders(refresh = false, page = 1, date): WorkOrders {
    try {
        const params = {
            refresh,
            params: {
                take: 6,
                page,
                filter: {
                    "businessUnitId":{"operator":"!=","value":8},
                    "stationId":"12",
                    ...filtersStore.form,
                    date,
                    withoutDefaultInclude: true,
                    order: {
                        field: "schedule_date",
                        way: "asc",
                    },
                },
            },
        };
        const response = Vue.prototype.$crud.index(
            "apiRoutes.qramp.workOrders",
            params,

        );
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
