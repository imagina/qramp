import Vue from 'vue';
export default async function showWorkOrder(workOrderId: number) {
    try {
        return await Vue.prototype.$crud.show("apiRoutes.qramp.workOrders", workOrderId, {
            refresh: true,
            include:
                "customer,workOrderStatus,operationType,station,contract,responsible,flightStatus,scheduleStatus,gate",
        })
    } catch (error) {
        console.log(error);
    }
}