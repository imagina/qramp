import Vue from 'vue'
export default async function (refresh = false) {
    try {
        const params = {
            refresh,
            params: {
                filter: {
                    //businessUnitId,
                    //...filterClone,
                    //date: item,
                    withoutDefaultInclude: true,
                    order: {
                        field: "id",
                        way: "desc",
                    },
                },
            },
        };
        const response = await Vue.prototype.$crud.index(
            "apiRoutes.qramp.workOrders",
            params,

        );
        const responseData = response.data;
        return
    } catch (error) {
        console.log(error);

    }
}