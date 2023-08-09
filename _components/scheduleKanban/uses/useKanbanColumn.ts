import Vue, {computed} from 'vue';
import storeKanban from '../store/kanban.store';

export default function useKanbanColumn(props: any = {}) {
  const selectedDate = computed({
    get: () => storeKanban.selectedDate,
    set: (value) => (storeKanban.selectedDate = value),
  });
  return {
    selectedDate,
  }
}