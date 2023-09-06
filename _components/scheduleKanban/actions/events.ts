import Vue, { computed, getCurrentInstance, ComputedRef } from 'vue';
export function events() {
    const proxy = (getCurrentInstance() as any).proxy as any;
    function cardRefresh() {
        proxy.$eventBus.$on('ramp.workOrders.cardRefresh', (response) => {
            console.log(response);
        })
    }

    return {
        cardRefresh
    }
}