import Vue from 'vue';

export default function (refresh = false, page = 1, date) {
    try {
        const params = {
            refresh,
            params: {
                take: 10,
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

    }
}