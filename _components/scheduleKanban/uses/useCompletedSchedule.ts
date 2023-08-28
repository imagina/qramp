import Vue, {computed} from 'vue';
import {STATUS_DRAFT, STATUS_SCHEDULE} from '../../model/constants.js';
import modalScheduleStore from '../store/modalSchedule.store'
import _ from "lodash";

export default function useCompletedSchedule(props: any, emit: any) {
  const scheduleType = computed(() => props.scheduleType);
  const dateColumn = computed(() => props.dateColumn);
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
        return objeto.statusId !== STATUS_DRAFT && objeto.statusId !== STATUS_SCHEDULE;
    })
  }
  function countIncompleteEvents(): number[] {
    let incomplete = 0;
    let completed = 0;

    props.dataWo.forEach((objeto) => {
      if (objeto.statusId === STATUS_DRAFT || objeto.statusId === STATUS_SCHEDULE) {
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
  }
}