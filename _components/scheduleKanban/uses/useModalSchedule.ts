import Vue, {computed,ComputedRef} from 'vue';
import store from '../store/modalSchedule.store'
import fieldsSchedule from '../models/fieldsSchedule.model'
import validateOperationType from '../actions/validateOperationType'

export default function useModalSchedule(props: any, emit: any) {
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
        //vIf: this.isEdit && !this.isBlank,
        color: "green",
        label: 'Start Work Order',
      },
      action: async() => {
        //await this.saveScheduleForm(STATUS_DRAFT);
      },
    },
    {
      props: {
        //vIf: !this.isBlank,
        color: "primary",
        label: false
          ? Vue.prototype.$tr("isite.cms.label.update")
          : Vue.prototype.$tr("isite.cms.label.save"),
      },
      action: async () => {
        
      },
    },
    {
      props: {
        //vIf: this.isEdit && !this.isBlank,
        color: "red",
        label: Vue.prototype.$tr("isite.cms.label.delete"),
      },
      action: () => {
        hideModal();
      },
    },
  ]);
  const permisionComments  = computed(() => Vue.prototype.$auth.hasAccess(`ramp.work-orders-comments.index`))
  const flightStatus = computed(() => fieldsSchedule().flightStatus.value);
  const isbound = computed(() => validateOperationType(form.value.operationTypeId));
  const fields = computed(() => fieldsSchedule().fields.value);
  function zanetizeData(key: string) {
    if (key === "flightNumber") {
      form.value[key] = form.value[key].toUpperCase().replace(/\s+/g, "");
    }
  }
  function hideModal() {
    store.reset();
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
    fields
  }
}
