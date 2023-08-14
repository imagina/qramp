import Vue, {computed, ref} from 'vue';
import storeKanban from '../store/kanban.store';

export default function useKanbanColumn(props: any = {}) {
  const selectedDate = computed({
    get: () => storeKanban.selectedDate,
    set: (value) => (storeKanban.selectedDate = value),
  });
  const isDraggingCard = computed({
    get: () => storeKanban.isDraggingCard,
    set: (value) => (storeKanban.isDraggingCard = value),
  });
  return {
    selectedDate,
    isDraggingCard,
  }
}