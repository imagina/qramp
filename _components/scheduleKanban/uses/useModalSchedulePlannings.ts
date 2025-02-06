import { ref, computed, ComputedRef, onBeforeUnmount } from 'vue';
import storeModalWorkOrderAlert from '../store/modalSchedulePlannings.store'
import workOrderList from "../../../_store/actions/workOrderList";
import baseService from 'src/modules/qcrud/_services/baseService'

export default function useModalStation() {
  const refWorkOrderAlert: any = ref(null);
  const loading: ComputedRef<boolean> = computed(() => storeModalWorkOrderAlert.loading);
  const form = computed(() => storeModalWorkOrderAlert.form);
  const std = computed(() => storeModalWorkOrderAlert.std);
  const sta = computed(() => storeModalWorkOrderAlert.sta);
  const operationName = computed(() => {
    const operationType = workOrderList().getOperationTypeList().find(item => item.id == storeModalWorkOrderAlert.form.operationTypeId)
    return `ALLWAYS HALF OPERATION (${operationType.operationName || ''})`
  })
  const showModal = computed({
    get: () => storeModalWorkOrderAlert.showModal,
    set: (value: boolean) => (storeModalWorkOrderAlert.showModal = value),
  });
  const actions = computed(()=> {
    return [
      {
        props: {
          color: "primary",
          label: storeModalWorkOrderAlert.isEdit ? 'Update':'Save',
          loading: storeModalWorkOrderAlert.loading
        },
        action: async () => {
          try {
            storeModalWorkOrderAlert.loading = true;
            if(!storeModalWorkOrderAlert.isEdit) {
              await baseService.create('apiRoutes.qramp.schedulePlanning', storeModalWorkOrderAlert.form)
            } else {
              await baseService.update('apiRoutes.qramp.schedulePlanning', storeModalWorkOrderAlert.form.id ,storeModalWorkOrderAlert.form)
            }
            storeModalWorkOrderAlert.loading = false;
            hideModal()
          } catch (e) {
            storeModalWorkOrderAlert.loading = false;
          }
        },
      },
    ];
  })

  function hideModal() {
    storeModalWorkOrderAlert.reset();
  }
  onBeforeUnmount(() => {
    hideModal()
  })
  return {
    loading,
    actions,
    refWorkOrderAlert,
    form,
    showModal,
    hideModal,
    sta,
    std,
    operationName
  };
}
