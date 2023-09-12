import storeKanban from "../store/kanban.store";
import showWorkOrders from './showWorkOrders'
import modalScheduleStore from '../store/modalSchedule.store';

export default async function setIndividualCards(cardId: number): Promise<void> {
    const column: any = storeKanban.columns.find(item => {
        return item.date.format('YYYY-MM-DD') === modalScheduleStore.seletedDateColumn
    });
    if (!column) return;
    try {
        const response = await showWorkOrders(cardId);
        column.cards = response.data;
    } catch (error) {
        console.log(error);
    }
}