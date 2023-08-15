import Vue, {computed} from 'vue';
import {STATUS_DRAFT, STATUS_SCHEDULE} from '../../model/constants.js';
import _ from "lodash";

export default function useCompletedSchedule(props: any) {
  const timestamp = computed(() => props.timestamp);
  const scheduleType = computed(() => props.scheduleType);
  function isEventListComplete(date: string): boolean {
    return false
    return _.every(Object.entries(props.getEvents(date, false).data), (elemento) => {
      return _.every(elemento[1], (objeto) => {
        return objeto.statusId !== STATUS_DRAFT && objeto.statusId !== STATUS_SCHEDULE;
      });
    });
  }
  function countIncompleteEvents(date: string): number[] {
    let incomplete = Math.floor(Math.random() * 9) + 1;
    let completed = Math.floor(Math.random() * 9) + 1;

    /* dev only
    let incomplete = 0;
    let completed = 0;

    const events = props.getEvents(date, false).data;

    Object.entries(events).forEach((entry: any) => {
      entry[1].forEach((objeto) => {
        if (objeto.statusId === STATUS_DRAFT || objeto.statusId === STATUS_SCHEDULE) {
          incomplete++;
        } else {
          completed++;
        }
      });
    });
    */

    return [completed, incomplete];
  }
  function titleCompletedSchedule(date: string): string {
    const completed = isEventListComplete(date);
    const event = countIncompleteEvents(date);
    return completed ? ' Completed' : ` ${event[1]} Not completed`
  }

  function totalCompleted(date: string): string {
    const complete = countIncompleteEvents(date);
    return ` ${complete[0]} Completed`;
  }

  return {
    isEventListComplete,
    titleCompletedSchedule,
    timestamp,
    scheduleType,
    totalCompleted,
    countIncompleteEvents,
  }
}
