import {
  ref,
  computed,
  WritableComputedRef,
  ComputedRef,
  onMounted, provide
} from 'vue';
import store from '../store/index';
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import {
  STATUS_CLOSED,
  STATUS_DRAFT,
  STATUS_POSTED,
  STATUS_SCHEDULE,
  STATUS_SUBMITTED,
  STEP_FLIGHT,
  STEP_SERVICE,
  modalFullProps,
} from '../../model/constants';
import updateWorkOrders from '../services/updateWorkOrders';
import stepps from '../models/defaultModels/stepps'
import serviceListStore from '../../serviceList/store/serviceList';
import baseService from "src/modules/qcrud/_services/baseService.js";
import { alert, store as storeUtil, i18n } from 'src/plugins/utils';
import { useQuasar } from 'quasar';
import showWorkOrder from '../services/showWorkOrder'
import workOrderList from '../../../_store/actions/workOrderList';
import { constructionWorkOrder } from 'src/modules/qramp/_store/actions/constructionWorkOrder';
import getWorkOrder from 'src/modules/qramp/_components/scheduleKanban/actions/showWorkOrders';
import { showChipForNoFlight } from 'src/modules/qramp/_store/actions/showChipForNoFlight';
import { createNonFlight } from '../services/createNonFlight';

export default function modalFormController(props: any = null, emit: any = null) {
  const $q = useQuasar();
  provide('closeModal', clear);
  provide('showWorkOrder', showWorkOrder);
  const refCreateForm: any = ref(null);
  const refStepper: any = ref(null);
  const loading: ComputedRef<boolean> = computed(() => store.loading);
  const isUpdate = computed(() => store.isUpdate);
  const titleModal: ComputedRef<string> = computed(() => store.titleModal);
  const widthModal: ComputedRef<string> = computed(() => store.widthModal);
  const chip: ComputedRef<{ label: string } | null> = computed(() => store.chip);
  const showModal: WritableComputedRef<boolean> = computed({
    get: () => store.showModal,
    set: (value: boolean) => {
      store.showModal = value;
    }
  });
  const actionsCreate = ref([
    {
      props: {
        color: 'primary',
        label: i18n.tr('isite.cms.label.save'),
      },
      action: async () => {
        qRampStore().setTitleOffline('New Security')
        save()
      }
    },
  ])
  const operationType = computed(() => {
    const type = workOrderList()
      .getOperationTypeList()
      .find(item => item.id === Number(store.form.operationTypeId));
    return type?.options?.type;
  })
  const actions = computed(() => {
    const statusId = store.form.statusId;
    const parentId = store.form.parentId;
    const showOpenSourceWorkOrder = Boolean(parentId);
    const workOrder = qRampStore().getClonedWorkOrder();
    const actionsUpdate = [
      {
        props: {
          vIf: storeUtil.hasAccess('ramp.work-orders.destroy'),
          icon: 'fa-regular fa-trash',
          class: 'btn-action-fueling',
          label: $q.screen.lt.sm ? null : i18n.tr('isite.cms.label.delete'),
          loading: store.loading,
        },
        action: async() => {
          store.loading = true;
          await baseService.delete('apiRoutes.qramp.workOrders', store.form.id);
          store.reset();
          await emit('refresh-data');
          store.loading = false;
        }
      },
      {
        props: {
          vIf: !showOpenSourceWorkOrder && Boolean(workOrder),
          class: 'btn-action-form-orders',
          label: $q.screen.lt.sm ? null : 'Return to cloned work order',
          icon: 'fa-regular fa-arrow-left',
        },
        action: async() => {
          loadChildData();
        }
      },
      {
        props: {
          icon: 'fa-brands fa-sourcetree',
          class: 'btn-action-form-orders',
          label: $q.screen.lt.sm ? null : 'Open source work order',
          vIf: showOpenSourceWorkOrder,
          loading: store.loading,
        },
        action: async () => {
          await loadParentData();
        }
      },
      {
        props: {
          icon: 'fa-regular fa-floppy-disk',
          label: $q.screen.lt.sm ? null : 'Save to Draft',
          class: 'btn-action-fueling',
          vIf: statusId == STATUS_DRAFT || statusId == STATUS_CLOSED || statusId == STATUS_SCHEDULE,
          loading: store.loading,
        },
        action: async () => {
          store.changeStatus(STATUS_DRAFT)
          await update();
        }
      },
      {
        props: {
          icon: 'fal fa-check',
          class: 'close-btn-bg-color',
          'text-color': 'positive',
          label: 'Close',
          vIf: statusId == STATUS_DRAFT || statusId == STATUS_CLOSED || statusId == STATUS_SCHEDULE,
          loading: store.loading,
        },
        action: async () => {
          store.changeStatus(STATUS_CLOSED)
          await update();
        }
      },
      {
        props: {
          icon: 'fa-thin fa-floppy-disk',
          label: i18n.tr('isite.cms.label.save'),
          class: 'btn-action-fueling',
          vIf: statusId == null || statusId == STATUS_POSTED || (statusId == STATUS_SUBMITTED && qRampStore().editPermissionseSubmitted()),
          loading: store.loading,
        },
        action: async () => {
          await update();
        }
      },
      {
        props: {
          vIf: store.step > 1,
          color: 'white',
          'text-color': 'primary',
          icon: 'fas fa-arrow-left',
        },
        action: () => {
          refStepper.value.back();
        }
      },
      {
        props: {
          vIf: store.step < 3,
          'text-color': 'white',
          style: 'background-color: #3865C2',
          'icon-right': 'fas fa-arrow-right',
        },
        action: () => {
          refStepper.value.next()
        }
      },
    ];
    return isUpdate.value ? actionsUpdate : actionsCreate.value;
  });
  function clear(): void {
    store.reset();
    serviceListStore().setShowFavourite(false)
    serviceListStore().setErrorList([]);
    if (isUpdate.value) emit('refresh-data');
  }

  function save() {
    refCreateForm.value.$refs.formSimpleWorkOrders.
      validate().then(async (success) => {
        if (success) {
          refCreateForm.value.saveSimpleWorkOrder()
        }
      })
  }
  async function update() {
    const validateFlight = await (store.refsGlobal as any).refFlight.validate();
    if (!validateFlight) {
      store.step = STEP_FLIGHT;
      const step: any = stepps.find(item => item.step === STEP_FLIGHT);
      step.error = true;
      alert.error({ message: i18n.tr('isite.cms.message.formInvalid') })
      return;
    }

    const service = await serviceListStore().getServiceItems();

    const alerts = [
      {
        validate: service.length === 0,
        message: 'Are you sure you want to save the work order without services?',
        accept: false
      },
      {
        validate: (
          (store.form.outboundTailNumber.trim().toUpperCase() !== store.form.inboundTailNumber.trim().toUpperCase()) && 
          operationType.value === 'full'
        ),
        message: 'Inbound and Outbound have different tail numbers. Are you sure you want to save the work order?',
        accept: false
      }
    ]

    const activeAlerts = alerts.filter(item => item.validate && !item.accept);

    await qRampStore().runAlerts(alerts, async () => {
      store.isClone ? await createService() : await updateService()
    });

    if (activeAlerts.length > 0) return;

    const filterList = await serviceListStore().filterServicesListByQuantity();
    const validateServices = await serviceListStore().getRefGlobal().refServiceList?.validate() || true;

    if (filterList.length > 0 || !validateServices) {
      store.step = STEP_SERVICE;
      const step: any = stepps.find(item => item.step === STEP_SERVICE);
      step.error = true;
      alert.error({ message: i18n.tr('You have services to correct') })
      return;
    }
    store.isClone ? await createService() : await updateService()
  }

  async function handleActionsAfterUpdatingOrCreating(message: string) {
    store.reset();
    serviceListStore().setShowFavourite(false);
    await emit('refresh-data');
    alert.info({ message })
  }

  async function updateService() {
    await updateWorkOrders()
    const message = i18n.tr('isite.cms.message.recordUpdated')
    handleActionsAfterUpdatingOrCreating(message)
  }
  async function createService() {
    await createNonFlight()
    const message = i18n.tr('isite.cms.message.recordCreated')
    handleActionsAfterUpdatingOrCreating(message)
  }
  async function getDataTable() {
    await emit('refresh-data')
  }
  function loadform({ data, modalProps }) {
    const { isClone, title, update, width, lastTitle, chip } = modalProps

    store.showModal = true;
    store.loading = true;
    store.isUpdate = update;
    store.titleModal = title;
    store.lastTitle = lastTitle;
    store.widthModal = width;
    store.isClone = isClone;
    store.form = data;
    store.chip = showChipForNoFlight(data.type, chip);
    store.loading = false;
  }
  async function loadChildData() {
    store.loading = true;
    store.resetForm()
    const flight = qRampStore().getClonedWorkOrder()
    store.form = { ...flight }
    await workOrderList().getFavourites()

    const modalProps = {
      ...modalFullProps,
      title: store.lastTitle,
      isClone: true
    }

    loadform({ data: flight, modalProps })
  }
  async function loadParentData() {
    store.loading = true;
    const data = store.form;
    const formData = structuredClone(await constructionWorkOrder({ form: data }))
    qRampStore().setClonedWorkOrder(formData)

    store.resetForm()
    const workOrder = await getWorkOrder(formData?.parentId)
    workOrder.data.parentId = null
    store.form = { ...workOrder.data }
    await workOrderList().getFavourites()
    const workOrderId = workOrder.data.id

    const modalProps = {
      ...modalFullProps,
      title: `${i18n.tr('ifly.cms.form.updateWorkOrder')} ${workOrderId ? `Id: ${workOrderId}` : ''}`,
      lastTitle: store.titleModal,
      chip: {
        label: "Parent",
      },
      parent: true
    }

    loadform({ data: workOrder.data, modalProps })
  }
  onMounted(async () => {
    store.emitEvent.refreshData = await getDataTable();
  })
  return {
    showModal,
    clear,
    loading,
    titleModal,
    widthModal,
    actions,
    refCreateForm,
    save,
    isUpdate,
    refStepper,
    getDataTable,
    loadform,
    chip,
  };
}
