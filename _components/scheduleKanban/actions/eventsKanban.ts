import setIndividualCards from './setIndividualCards';

export default function eventsKanban(proxy: any) {
    function cardRefresh() {
        try {
            proxy.$eventBus.$on('ramp.workOrders.cardRefresh', async (response) => {
                await setIndividualCards(response.data.id || 0)
            })
        } catch (error) {
            console.log(error);
        }
    }
    return {
        cardRefresh
    }
}