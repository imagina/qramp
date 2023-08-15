import Vue, {computed, ref} from 'vue';
import storeKanban from '../store/kanban.store';
import moment from 'moment'

export default function useKanbanColumn(props: any = {}) {
  const selectedDate = computed({
    get: () => storeKanban.selectedDate,
    set: (value) => (storeKanban.selectedDate = value),
  });
  const isDraggingCard = computed({
    get: () => storeKanban.isDraggingCard,
    set: (value) => (storeKanban.isDraggingCard = value),
  });
  const cardHours = computed(() => {
    return (index, card, cards) => index !== 0 
      && moment(card.scheduleDate).format('HH') === moment(cards[index - 1].scheduleDate).format('HH')
  })
  return {
    selectedDate,
    isDraggingCard,
    cardHours,
  }
}