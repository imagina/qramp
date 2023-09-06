import storeFilters from "../store/filters.store";
import storeKanban from "../store/kanban.store";

export default function getCurrentColumn() {
    try {
        return storeKanban.columns.find((col) => col.date.format('YYYY/MM/DD') === storeFilters.selectedDate)
    } catch (error) {
        console.log(error);
    }
}
