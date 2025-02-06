import {computed, inject, ref } from 'vue';
import storeKanban from '../store/kanban.store';
import {
  STATUS_DRAFT,
  STATUS_CLOSED,
  STATUS_POSTED,
  STATUS_SUBMITTED,
  STATUS_SCHEDULE,
  NON_FLIGHT,
} from '../../model/constants.js';
import workOrderList from '../../../_store/actions/workOrderList';
import qRampStore from './../../../_store/qRampStore.js'
import modalScheduleStore from '../store/modalSchedule.store'
import showWorkOrder from '../actions/showWorkOrders';
import openInlineSchedule from '../actions/openInlineSchedule'
import scheduleTypeModel from "../models/scheduleType.model";
import selectFlightNumberStore from '../../modal/selectFlightNumber/store/selectFlightNumber'
import validateOperationType from '../actions/validateOperationType'
import moment from 'moment';
import { i18n } from 'src/plugins/utils'
import storeModalSchedulePlannings from '../store/modalSchedulePlannings.store'
import baseService from 'src/modules/qcrud/_services/baseService';
export default function useKanbanCard(props: any = {}) {
  const objectSelected = ref(false);
  const refFormOrders: any = inject('refFormOrders');
  const isBlank = computed(() => storeKanban.isBlank);
  const isPassenger = computed(() => qRampStore().getIsPassenger());
  const isWeekAgenda = computed(() => storeKanban.scheduleType == scheduleTypeModel[0].value );
  const colorCheckSchedule = computed(() => {
    const statusColor: string | undefined = workOrderList()
      .getWorkOrderStatusesList()
      .find(status => status.id === Number(props.card.statusId))?.color;
    const color = statusColor ? `tw-border-${statusColor}` : 'tw-border-gray-200';
    return color;
  })
  const operationType = computed(() => {
    const operationType = workOrderList()
      .getOperationTypeList().find(operationType => operationType.id == props.card.operationTypeId);
    return operationType?.options?.type
  });
  const flightStatuses = computed(() => {
    const flightStatuses: any =
      workOrderList()
        .getFlightStatusesList()
        .find(status => status.id === Number(props.card.flightStatusId));
    const color = flightStatuses ? `tw-text-${flightStatuses.color}` : 'tw-text-gray-400';
    const icon = flightStatuses?.icon || 'fa-solid fa-circle-question';
    return flightStatuses ? { name: flightStatuses.name, color, icon } : { name: 'Unknown', color, icon: 'fa-solid fa-circle-question' };
  })
  const actypes = computed(() => {
    const actypesList: any =
      workOrderList()
      .getACTypesList()
        .find(ac => ac.id === Number(props.card.acTypeId));
    return actypesList ? actypesList.fullName : '';
  })
  const gates = computed(() => {
    if(props.card.calendar?.gate && isPassenger.value) {
      if(props.card.calendar.gate.trim().length !== 0 ) return props.card.calendar.gate
    }
    const gateList: any =
      workOrderList()
      .getGatesList()
        .find(gate => gate.id === Number(props.card.gateId));
    return gateList ? `${gateList.name}` : null;
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

  const isNonFlight = computed(() => props.card.type === NON_FLIGHT)

  async function openModalSchedule() {
    if (!isWeekAgenda.value && modalScheduleStore.showInline) return
    if (!isWeekAgenda.value && props.card.statusId === STATUS_SCHEDULE && !isPassenger.value){
      openInlineSchedule(props);
      return;
    }
    modalScheduleStore.titleModal = `Edit schedule Id: ${props.card.id}`;
    modalScheduleStore.seletedDateColumn = props.dateColumn;
    if(props.card.statusId !== STATUS_SCHEDULE || isPassenger.value) {
      const titleModal = i18n.tr('ifly.cms.form.updateWorkOrder') + (props.card.id ? ` Id: ${props.card.id}` : '')
      const response = await showWorkOrder(props.card.id);
      await refFormOrders.value.loadform({
        modalProps: {
          title: titleModal,
          update: true,
          workOrderId: response.data.id,
          width: "90vw",
        },
        data: response.data,
      });
      return;
    }
    modalScheduleStore.isEdit = true;
    modalScheduleStore.showModal = true;
    modalScheduleStore.form = { ...props.card };
  }
  function openModalSelectFlightNumber() {
    let workOrder: any = null;
    const isbound = validateOperationType(props.card.operationTypeId);
    if(isbound.inbound && isbound.outbound) {
      selectFlightNumberStore.showModal = true;
      selectFlightNumberStore.flightNumbers = props.card;
      return;
    }
    if(isbound.inbound && !isbound.outbound) {
        const flightNumberInbound = props.card.faFlightId ? props.card.faFlightId.split('-')[0] : null;
        workOrder = {
          workOrderId: props.card.id,
          faFlightId: props.card.faFlightId,
          flightNumber: flightNumberInbound || props.card.inboundFlightNumber,
          boundScheduleDate: props.card.inboundScheduleArrival || moment().format('YYYY-MM-DDTHH:mm:ss'),
          type: 'inbound',
        }
    }
    if(!isbound.inbound && isbound.outbound) {
      const flightNumberoutbound = props.card.outboundFaFlightId ? props.card.outboundFaFlightId.split('-')[0] : null;
      workOrder = {
        workOrderId: props.card.id,
        faFlightId: props.card.outboundFaFlightId,
        flightNumber: flightNumberoutbound || props.card.outboundFlightNumber,
        boundScheduleDate: props.card.outboundScheduledDeparture || moment().format('YYYY-MM-DDTHH:mm:ss'),
        type: 'outbound',
      }
    }
    qRampStore().setWorkOrder(workOrder);
    qRampStore().showVisibleMapModal();

  }
  function selectObject(e) {
    const box = document.querySelector(`.kanban-card-${props.card.id}`);
    if (!objectSelected.value) {
      createGhostCard(box);

      document.addEventListener('mousemove', moveObject);
      document.addEventListener('mouseup', unSelectObject);
      objectSelected.value = true;
    }
  }

  function unSelectObject() {
    const ghostCard = document.querySelector('.ghost-card');
    if (ghostCard) {
      ghostCard.remove();
    }

    document.removeEventListener('mousemove', moveObject);
    objectSelected.value = false;
  }

  function moveObject(e) {
    const ghostCard = document.querySelector('.ghost-card');
    if (ghostCard) {
      ghostCard.style.top = `${e.clientY + 5}px`;
      ghostCard.style.left = `${e.clientX + 5}px`;
    }
  }

  function createGhostCard(originalCard) {
    const ghostCard = originalCard.cloneNode(true);
    ghostCard.classList.add('ghost-card');
    ghostCard.style.position = 'absolute';
    ghostCard.style.pointerEvents = 'none'; // Para que no interfiera con los eventos
    ghostCard.style.opacity = '0.7';
    ghostCard.style.zIndex = '1000';
    const rect = originalCard.getBoundingClientRect();
    ghostCard.style.top = `${rect.top}px`;
    ghostCard.style.left = `${rect.left}px`;
    ghostCard.style.width = `${rect.width}px`;
    ghostCard.style.height = `${rect.height}px`;
    document.body.appendChild(ghostCard);
  }
  async function openModalWorkOrderAlert() {
    try {
      storeModalSchedulePlannings.loading = true;
      const params = {
        refresh: true,
        params: {
          filter: {
            field: 'flight_number',
            operationType: props.card.operationTypeId
          }
        },
      }
      const response = await baseService.show('apiRoutes.qramp.schedulePlanning',props.card.calendar.title, params);
      if(response.status === 200) {
        storeModalSchedulePlannings.form.id = response.data.id;
      }
      storeModalSchedulePlannings.isEdit =  response.status === 200 ? true : false;
      storeModalSchedulePlannings.showModal = true;
      storeModalSchedulePlannings.form.flightNumber = props.card.calendar.title || null;
      storeModalSchedulePlannings.form.operationTypeId = props.card.operationTypeId || null;
      storeModalSchedulePlannings.form.alwaysHalf = response.data.alwaysHalf || false;
      storeModalSchedulePlannings.std = props.card.calendar.std || null;
      storeModalSchedulePlannings.sta = props.card.calendar.sta || null;
      storeModalSchedulePlannings.loading = false;
    } catch (e) {
      storeModalSchedulePlannings.loading = false;
      storeModalSchedulePlannings.isEdit = false;
      console.log(e);
    }
  }
  return {
    colorCheckSchedule,
    titleStatus,
    flightStatuses,
    actypes,
    gates,
    openModalSchedule,
    isBlank,
    isPassenger,
    storeKanban,
    openModalSelectFlightNumber,
    isNonFlight,
    moment,
    selectObject,
    openModalWorkOrderAlert,
    operationType
  };
}
