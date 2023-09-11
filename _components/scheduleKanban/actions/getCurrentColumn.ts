import storeFilters from "../store/filters.store";
import storeKanban from "../store/kanban.store";

export default function getCurrentColumn() {
    try {
        const col:any = storeKanban.columns.find((col) => col.date.format('YYYY/MM/DD') === storeFilters.selectedDate)
        return col;
    } catch (error) {
        console.log(error);
    }
}
