import Vue, {computed} from 'vue';
import {STATUS_DRAFT, STATUS_SCHEDULE} from '../../model/constants.js';
import modalScheduleStore from '../store/modalSchedule.store'
import storeKanban from '../store/kanban.store'
import _ from "lodash";
import getCurrentColumn from '../actions/getCurrentColumn';


export default function useCompletedSchedule(props: any, emit: any) {
  const isBlank = computed(() => storeKanban.isBlank);
  const scheduleType = computed(() => props.scheduleType);
  const dateColumn = computed(() => props.dateColumn);

  const showInline = computed(()=> modalScheduleStore.showInline)
  const modalShowSchedule = computed({
    get: () => modalScheduleStore.showModal,
    set: (value: boolean) => modalScheduleStore.showModal = value
  })
  const modalTitleSchedule = computed({
    get: () => modalScheduleStore.titleModal,
    set: (value: string) => modalScheduleStore.titleModal = value
  })
  function isEventListComplete(): boolean { 
     return _.every(props.dataWo, (objeto) => {
        return objeto.statusId !== STATUS_DRAFT && objeto.statusId !== STATUS_SCHEDULE && objeto.statusId;
    })
  }
  function countIncompleteEvents(): number[] {
    let incomplete = 0;
    let completed = 0;

    props.dataWo.forEach((objeto) => {
      if (!objeto.statusId 
        || objeto.statusId === STATUS_DRAFT 
        || objeto.statusId === STATUS_SCHEDULE) 
      {
        incomplete++;
      } else {
        completed++;
      }
    });

    return [completed, incomplete];
  }
  function titleCompletedSchedule(): string {
    const completed = isEventListComplete();
    const event = countIncompleteEvents();
    return completed ? ' Completed' : ` ${event[1]} Not completed`
  }

  function totalCompleted(): string {
    const complete = countIncompleteEvents();
    return ` ${complete[0]} Completed`;
  }
  function openModalForm() {
    modalScheduleStore.isEdit = false;
    modalShowSchedule.value = true;
    modalTitleSchedule.value = `Create schedule date: ${dateColumn.value}`;
    modalScheduleStore.seletedDateColumn = dateColumn.value;
  }

  function openInlineForm() {
    modalScheduleStore.isEdit = false;
    modalScheduleStore.showInline = true;
    modalScheduleStore.seletedDateColumn = dateColumn.value;
    const dummyCard = {
      id: false,
      editable: true,
      statusId: null,
    }
    const col = getCurrentColumn()
    col.cards.unshift(dummyCard)
  }

  function refresh() {
    emit('refresh');
  }
  return {
    isEventListComplete,
    titleCompletedSchedule,
    scheduleType,
    totalCompleted,
    countIncompleteEvents,
    modalShowSchedule,
    refresh,
    openModalForm,
    isBlank,
    openInlineForm,
    showInline
  }
}
