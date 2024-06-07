import Vue, {
  ref,
  computed,
  WritableComputedRef,
  ComputedRef,
  onBeforeUnmount,
  getCurrentInstance
} from 'vue';
import store from '../store/index';
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import { STATUS_CLOSED, STATUS_DRAFT, STATUS_POSTED, STATUS_SCHEDULE, STATUS_SUBMITTED, STEP_FLIGHT, STEP_SERVICE } from '../../model/constants';
import updateWorkOrders from '../services/updateWorkOrders';
import stepps from '../models/defaultModels/stepps'
import serviceListStore from '../../serviceList/store/serviceList';
import alert from '@imagina/qsite/_plugins/alert.js'
import baseService from '@imagina/qcrud/_services/baseService.js'

export default function modalFormController() {
  const proxy = (getCurrentInstance() as any).proxy as any;
  const refCreateForm: any = ref(null);
  const refStepper: any = ref(null);
  const loading: ComputedRef<boolean> = computed(() => store.loading);
  const isUpdate = computed(() => store.isUpdate);
  const titleModal: ComputedRef<string> = computed(() => store.titleModal);
  const widthModal: ComputedRef<string> = computed(() => store.widthModal);
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
        label: Vue.prototype.$tr('isite.cms.label.save'),
      },
      action: async () => {
        save()
      }
    },
  ])
  const actions = computed(() => {
    const statusId = store.form.statusId;
    const actionsUpdate = [
      {
        props: {
          vIf: Vue.prototype.$auth.hasAccess('ramp.work-orders.destroy'),
          icon: 'fa-regular fa-trash',
          class: 'btn-action-fueling',
          label: Vue.prototype.$q.screen.lt.sm ? null : Vue.prototype.$tr('isite.cms.label.delete'),
          loading: store.loading,
        },
        action: async() => {
          store.loading = true;
          await baseService.delete('apiRoutes.qramp.workOrders', store.form.id);
          store.reset();
          await proxy.$root.$emit('crud.data.refresh');
          store.loading = false;
        }
      },
      {
        props: {
          icon: 'fa-regular fa-floppy-disk',
          label: Vue.prototype.$q.screen.lt.sm ? null : 'Save to Draft',
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
          label: Vue.prototype.$tr('isite.cms.label.closeFlight'),
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
          label: Vue.prototype.$tr('isite.cms.label.save'),
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
    if (isUpdate.value) proxy.$root.$emit('crud.data.refresh');
  }

  function save() {
    refCreateForm.value.$refs.formFueling.
      validate().then(async (success) => {
        if (success) {
          refCreateForm.value.save()
        }
      })
  }
  async function update() {
    const validateFlight = await (store.refsGlobal as any).refFlight.validate();
    if (!validateFlight) {
      store.step = STEP_FLIGHT;
      const step: any = stepps.find(item => item.step === STEP_FLIGHT);
      step.error = true;
      alert.error({ message: Vue.prototype.$tr('isite.cms.message.formInvalid') })
      return;
    }
    const service = await serviceListStore().getServiceItems();
    if (service.length === 0) {
      alert.warning({
        mode: "modal",
        message: 'Surely you want to save the work order without services',
        actions: [
          {
            label: Vue.prototype.$tr('isite.cms.label.cancel'),
            color: 'grey-8',
            handler: async () => {
              store.loading = false;
            },
          },
          {
            label: Vue.prototype.$tr("isite.cms.label.yes"),
            color: "primary",
            handler: async () => {
              await updateService()
            },
          },
        ],
      });
      return;
    }
    const filterList = await serviceListStore().filterServicesListByQuantity();
    if (filterList.length > 0) {
      store.step = STEP_SERVICE;
      const step: any = stepps.find(item => item.step === STEP_SERVICE);
      step.error = true;
      alert.error({ message: Vue.prototype.$tr('You have services to correct') })
      return;
    }
    await updateService()
  }
  async function updateService() {
    await updateWorkOrders()
    store.reset();
    serviceListStore().setShowFavourite(false);
    await proxy.$root.$emit('crud.data.refresh');
    const message = Vue.prototype.$tr('isite.cms.message.recordUpdated')
    alert.info({ message })
  }
  onBeforeUnmount(() => {
    store.reset();
    serviceListStore().setErrorList([]);
    serviceListStore().setShowFavourite(false)
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
  };
}