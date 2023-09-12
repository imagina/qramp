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
        let card = column.cards.find(card => card.id === cardId);
        card = { ...response.data, editable: false };
    } catch (error) {
        console.log(error);
    }
}