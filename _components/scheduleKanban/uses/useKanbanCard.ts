import Vue, {computed} from 'vue';
import storeKanban from '../store/kanban.store';
import {
  STATUS_DRAFT,
  STATUS_CLOSED,
  STATUS_POSTED,
  STATUS_SUBMITTED,
  STATUS_SCHEDULE,
} from '../../model/constants.js';
import workOrderList from '../../../_store/actions/workOrderList';
import qRampStore from './../../../_store/qRampStore.js'

export default function useKanbanCard(props: any = {}) {
  const isPassenger = computed(() => qRampStore().getIsPassenger());
  const colorCheckSchedule = computed(() => {
    const statusColor: string | undefined = workOrderList()
      .getWorkOrderStatusesList()
      .find(status => status.id === Number(props.card.statusId))?.color;
    const color = statusColor ? `tw-border-${statusColor}` : 'tw-border-gray-200';
    return color;
  })
  const flightStatuses = computed(() => {
    const flightStatuses: any =
      workOrderList()
        .getFlightStatusesList()
        .find(status => status.id === Number(props.card.flightStatusId || 22));
    const color = flightStatuses ? `tw-text-${flightStatuses.color}` : 'tw-text-black';
    const icon = flightStatuses?.icon || 'fa-light fa-circle-question';
    return { name: flightStatuses.name, color, icon };
  })
  const actypes = computed(() => {
    const actypesList: any =
      workOrderList()
      .getACTypesList()
        .find(ac => ac.id === Number(props.card.acTypeId));
    return actypesList ? actypesList.fullName : '';
  })
  const gates = computed(() => {
    const gateList: any =
      workOrderList()
      .getGatesList()
        .find(gate => gate.id === Number(props.card.gateId));
    if(!isPassenger.value) {
      return gateList ?  `P-${gateList.name}` : null;
    }else {
      return gateList ? `G-${gateList.name}` : null;
    }
  })
  const titleStatus = computed(() => {
    const statuses = {
      [STATUS_DRAFT]: 'Draft',
      [STATUS_CLOSED]: 'Closed',
      [STATUS_POSTED]: 'Posted',
      [STATUS_SUBMITTED]: 'Submitted',
      [STATUS_SCHEDULE]: 'Scheduled',
    };
    return statuses[props.card.statusId] || '';
  })
  return {
    colorCheckSchedule,
    titleStatus,
    flightStatuses,
    actypes,
    gates,
  };
}