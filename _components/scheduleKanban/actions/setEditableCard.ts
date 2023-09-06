import storeKanban from "../store/kanban.store";
import getCurrentColumn from "./getCurrentColumn";

export default function setEditableCard(id, value) {
    try {
        const col = getCurrentColumn()
        col.cards = col.cards.map(card => {
            return card.id === id ? {...card, editable: value} : card;
        });        
    } catch (error) {
        console.log(error);
    }
}
