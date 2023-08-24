import Vue, { computed, ComputedRef, ref } from 'vue';
import store from '../store/modalSchedule.store'
import fieldsSchedule from '../models/fieldsSchedule.model'
import validateOperationType from '../actions/validateOperationType'
import saveSimpleWorkOrder from '../actions/saveSimpleWorkOrder'
import kanbanStore from '../store/kanban.store';
import getIndividualWorkOrders from '../actions/getIndividualWorkOrders';
import moment from 'moment';
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import { STATUS_DRAFT } from 'src/modules/qramp/_components/model/constants.js'
import updateSimpleWorkOrder from '../actions/updateSimpleWorkOrder';
import deleteWorkOrders from '../actions/deleteWorkOrders';
import individualRefreshByColumns from '../actions/individualRefreshByColumns';

export default function useModalSchedule(props: any, emit: any) {
  const refFormSchedule: any = ref(null);
  const showModal = computed({
    get: () => store.showModal,
    set: (value) => store.showModal = value
  })
  const titleModal: ComputedRef<string> = computed(() => store.titleModal);
  const form = computed(() => store.form);
  const loading: ComputedRef<boolean> = computed(() => store.loading);
  const actions = computed(() => [
    {
      props: {
        vIf: store.isEdit && !kanbanStore.isBlank,
        color: "green",
        label: 'Start Work Order',
      },
      action: async () => {
        store.loading = true;
        await qRampStore().changeStatus(STATUS_DRAFT, form.value.id);
        await individualRefreshByColumns();
        await hideModal();
        store.loading = false;
      },
    },
    {
      props: {
        vIf: !kanbanStore.isBlank,
        color: "primary",
        label: store.isEdit
          ? Vue.prototype.$tr("isite.cms.label.update")
          : Vue.prototype.$tr("isite.cms.label.save"),
      },
      action: async () => {
        await saveForm()
      },
    },
    {
      props: {
        vIf: store.isEdit && !kanbanStore.isBlank,
        color: "red",
        label: Vue.prototype.$tr("isite.cms.label.delete"),
      },
      action: async () => {
        store.loading = true;
        await deleteWorkOrders(form.value.id);
        await individualRefreshByColumns();
        await hideModal();
        store.loading = false;
      },
    },
  ]);
  const permisionComments = computed(() => Vue.prototype.$auth.hasAccess(`ramp.work-orders-comments.index`))
  const flightStatus = computed(() => fieldsSchedule().flightStatus.value);
  const isbound = computed(() => validateOperationType(form.value.operationTypeId));
  const fields = computed(() => fieldsSchedule().fields.value);
  function zanetizeData(key: string) {
    if (key === "flightNumber") {
      form.value[key] = form.value[key].toUpperCase().replace(/\s+/g, "");
    }
  }
  async function saveForm() {
    refFormSchedule.value.validate().then(async (success) => {
      if (success) {
        store.loading = true;
        await tranformData();
        if (store.isEdit) {
          await updateSimpleWorkOrder();
        } else {
          await saveSimpleWorkOrder();
        }
        await individualRefreshByColumns();
        await hideModal();
        store.loading = false;
      }
    });
  }
  async function tranformData() {
    form.value.inboundScheduledArrival = `${moment(form.value.inboundScheduledArrival || store.seletedDateColumn).format('MM/DD/YYYY')} ${form.value.sta || '00:00'}`;
    form.value.outboundScheduledDeparture = form.value.outboundScheduledDeparture;
    form.value.std = form.value.outboundScheduledDeparture ? moment(form.value.outboundScheduledDeparture).format('HH:mm') : null;
    const isbound = validateOperationType(form.value.operationTypeId);
    if (isbound.inbound && isbound.outbound) return;
    if (isbound.inbound && !isbound.outbound) {
      form.value.std = null;
      form.value.outboundScheduledDeparture = null;
    }
    if (!isbound.inbound && isbound.outbound) {
      form.value.sta = null;
      form.value.inboundScheduledArrival = null;
    }
  }
  async function hideModal() {
    store.reset();
    if (store.isEdit) await individualRefreshByColumns();
  }
  return {
    showModal,
    titleModal,
    loading,
    form,
    hideModal,
    actions,
    flightStatus,
    isbound,
    permisionComments,
    zanetizeData,
    fields,
    refFormSchedule,
    saveForm,
  }
}
