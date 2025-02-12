import { computed, ComputedRef, ref, onBeforeUnmount, inject, onMounted } from 'vue';
import store from '../store/modalSchedule.store'
import fieldsSchedule from '../models/fieldsSchedule.model'
import validateOperationType from '../actions/validateOperationType'
import saveSimpleWorkOrder from '../actions/saveSimpleWorkOrder'
import kanbanStore from '../store/kanban.store';
import moment from 'moment';
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import { STATUS_DRAFT } from 'src/modules/qramp/_components/model/constants.js'
import deleteWorkOrders from '../actions/deleteWorkOrders';
import individualRefreshByColumns from '../actions/individualRefreshByColumns';
import showWorkOrder from '../actions/showWorkOrders';
import storeKanban from '../store/kanban.store';
import getCurrentColumn from '../actions/getCurrentColumn';
import setEditableCard from '../actions/setEditableCard';
import setIndividualCards from '../actions/setIndividualCards'
import updateWorkOrder from '../actions/updateWorkOrder'
import { store as pluginStore, i18n, alert } from 'src/plugins/utils'
import { documentationLink } from 'src/modules/qramp/common/documentationLink.js'
import { documentationPaths } from 'src/modules/qramp/_components/model/constants.js'

export default function useModalSchedule(props: any, emit: any) {
  const refFormSchedule: any = ref(null);
  const token = ref(null);
  const refFormOrders: any = inject('refFormOrders');
  const showModal = computed({
    get: () => store.showModal,
    set: (value) => store.showModal = value
  });
  const titleModal: ComputedRef<string> = computed(() => store.titleModal);
  const form = computed(() => store.form);
  const loading: ComputedRef<boolean> = computed(() => store.loading);
  const showCommentsComponent = computed(() => !store.showInline)
  const actions = computed(() => [
    {
      props: {
        vIf: store.isEdit && !kanbanStore.isBlank,
        color: 'green',
        icon: 'fa-light fa-bring-forward',
        label: 'Start Work Order',
      },
      action: async () => {
        store.loading = true;
        await qRampStore().changeStatus(STATUS_DRAFT, form.value.id);
        await setIndividualCards(form.value.id);
        await showModalFull();
        await hideModal();
        store.loading = false;
      },
    },
    {
      props: {
        vIf: !kanbanStore.isBlank,
        color: 'primary',
        icon: 'fa-light fa-pen-to-square',
        label: store.isEdit
          ? i18n.tr("isite.cms.label.update")
          : i18n.tr("isite.cms.label.save"),
      },
      action: async () => {
        await saveForm()
      },
    },
    {
      props: {
        vIf: pluginStore.hasAccess(`ramp.work-orders.destroy`) && store.isEdit && !kanbanStore.isBlank,
        color: "red",
        icon: 'fa-light fa-trash',
        label: i18n.tr("isite.cms.label.delete"),
      },
      action: async () => {
        try {
          alert.error({
            mode: "modal",
            title: `${form.value.preFlightNumber}`,
            message: i18n.tr('isite.cms.message.deleteRecord'),
            actions: [
              {
                label: i18n.tr('isite.cms.label.cancel'),
                color: 'grey',
              },
              {
                label: i18n.tr('isite.cms.label.delete'),
                color: 'red',
                handler: async () => {
                  store.loading = true;
                  await Promise.allSettled([
                    deleteWorkOrders(form.value.id),
                    setTimeout(() => {
                      individualRefreshByColumns()
                      hideModal()
                    }, 1000),
                  ])
                  store.loading = false;
                }
              },
            ],
          });
        } catch (err) {
          store.loading = false;
          console.log(err)
        }
      },
    },
  ]);
  const permisionComments = computed(() => pluginStore.hasAccess(`ramp.work-orders-comments.index`))
  const flightStatus = computed(() => fieldsSchedule().flightStatus.value);
  const isbound = computed(() => validateOperationType(form.value.operationTypeId));
  const fields = computed(() => fieldsSchedule().fields.value);
  const helpText = computed(() => {
    const path = documentationPaths[qRampStore().getBusinessUnitId() || 0]
    return {
      title: 'Create an Work Order',
      description: `
        Need help? Check the documentation for more information on creating Work Orders.
        ${documentationLink(`/docs/agione/${path}/schedule#create-an-schedule`, token.value)}
      `,
    }
  });
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
          await updateWorkOrder(form.value.id, form.value);
        } else {
          try {
            await saveSimpleWorkOrder();
          } catch (error) {
            console.log(error);
          }
        }
        hideInline();

        if(!store.isEdit) {
          individualRefreshByColumns();
        }

        await setIndividualCards(form.value.id);
        await hideModal();

        store.loading = false;
      }
    });
  }

  async function tranformData() {
    const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY HH:mm'
    form.value.inboundScheduledArrival = `${moment(
      form.value.inboundScheduledArrival || store.seletedDateColumn
    ).format('MM/DD/YYYY')} ${form.value.sta || '00:00'}`;
    form.value.outboundScheduledDeparture = form.value.outboundScheduledDeparture;
    form.value.std = form.value.outboundScheduledDeparture
      ? moment(form.value.outboundScheduledDeparture, DEFAULT_DATE_FORMAT).format('HH:mm')
      : null;
    form.value.preFlightNumber = form.value.inboundFlightNumber;
    const isbound = validateOperationType(form.value.operationTypeId);
    if (isbound.inbound && isbound.outbound) {
      form.value.outboundFlightNumber = form.value.preFlightNumber;
      return
    }
    if (isbound.inbound && !isbound.outbound) {
      form.value.std = null;
      form.value.outboundScheduledDeparture = null;
      form.value.outboundFlightNumber = null;
    }
    if (!isbound.inbound && isbound.outbound) {
      form.value.sta = null;
      form.value.inboundScheduledArrival = null;
      form.value.inboundFlightNumber = null;
      form.value.outboundFlightNumber = form.value.preFlightNumber;
    }
  }
  async function hideModal() {
    store.reset();
    if (store.isEdit) await individualRefreshByColumns();
  }

  function hideInline(){
    if(!store.showInline) return;
    if(props.card?.id){
      store.showInline = false;
      setEditableCard(props.card.id, false);
    } else {
      const col = getCurrentColumn();
      if (props.card.duplicated){
        const card = col.cards.find((card) => card.duplicated === props.card.duplicated);
        const index = col.cards.indexOf(card)
        col.cards.splice(index, 1);
        store.isEdit = false;
        store.showInline = false;
        return;
      }
      if(col.cards){
        col.cards.shift();
      }
    }
    store.isEdit = false
    store.showInline = false;
  }
  async function showModalFull() {
    const titleModal = i18n.tr('ifly.cms.form.updateWorkOrder') + (form.value.id ? ` Id: ${form.value.id}` : '')
    const response = await showWorkOrder(form.value.id);
    await refFormOrders.value.loadform({
      modalProps: {
        title: titleModal,
        update: true,
        workOrderId: response.data.id,
        width: "90vw",
      },
      data: response.data,
    });
  }
  
  onMounted(async () => {
    token.value = await qRampStore().getToken()
  })

  onBeforeUnmount(() => {
    store.reset();
  });
  return {
    showModal,
    hideInline,
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
    showCommentsComponent,
    storeKanban,
    i18n,
    helpText,
  }
}
