import Vue, { computed, ref, onMounted } from 'vue';
import storeKanban from '../store/kanban.store';
import moment from 'moment'
import getWorkOrder from '../actions/getWorkOrder'

export default function useKanbanColumn(props: any = {}) {
  const isLoading = ref(false);
  const cards: any = computed(() => props.column.cards);
  const date = computed(() => props.column.date)
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
  function observerCallback(entries) {
    entries.forEach(({ isIntersecting }) => {
      if (isIntersecting) {
        infiniteHandler();
      }
    });
  }
  async function infiniteHandler() {
    try {
      if(props.column.loading && props.column.total === cards.value.length) return;
      isLoading.value = true;
      props.column.page = props.column.page + 1;
      const response = await getWorkOrder(true, props.column.page,  {
        "field": "schedule_date",
        "type": "customRange",
        "from": date.value.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        "to": date.value.endOf('day').format('YYYY-MM-DD HH:mm:ss')
      })
      cards.value.push(...response.data);
      isLoading.value = false;
    } catch (error) {
      console.log(error);
      isLoading.value = false;
    }
  }
  onMounted(() => {
    const observerOptions = {
      root: document.querySelector(`.cardCtn-${date.value}`),
    };
    const target: any = document.querySelector(`.trigger-${date.value}`);
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    observer.observe(target);
  })
  return {
    selectedDate,
    isDraggingCard,
    cardHours,
    isLoading,
    cards,
    date,
  }
}