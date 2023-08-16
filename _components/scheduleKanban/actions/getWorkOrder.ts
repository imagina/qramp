import Vue from 'vue';
import {WorkOrders} from '../contracts/getWorkOrder.contract'
export default function getWorkOrders(refresh = false, page = 1, date): WorkOrders {
    try {
        const params = {
            refresh,
            params: {
                take: 4,
                page,
                filter: {
                    "businessUnitId":{"operator":"!=","value":8},
                    "stationId":"12",
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