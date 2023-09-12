import storeKanban from "../store/kanban.store";
import showWorkOrders from './showWorkOrders'
import modalScheduleStore from '../store/modalSchedule.store';

export default async function setIndividualCards(cardId: number): Promise<void> {
    try {
        const foundCard = storeKanban.columns
            .flatMap(column => column.cards)
            .find(card => card.id === cardId);

        if (!foundCard) return;
        const response = await showWorkOrders(cardId);
        Object.assign(foundCard, { ...response.data, editable: false });
    } catch (error) {
        console.log(error);
    }
}