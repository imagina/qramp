import { computed, ref, Ref, ComputedRef } from 'vue';
import store from '../store/index.store';
import modelFormFields from '../models/formFields';
import workOrderList from '../../../_store/actions/workOrderList';

/**
 * Custom composition function for managing form state and data.
 * @returns {{
*   formFields: Object,
*   form: ComputedRef<any>,
*   refFormScheduler: Ref<any>,
*   isbound: ComputedRef<{ inbound: boolean, outbound: boolean }>,
*   refCustomer: Ref<any>,
*   loading: ComputedRef<boolean>,
*   updateModal: ComputedRef<boolean>,
* }}
*/

export default function useForm() {
  const refFormScheduler: Ref<any> = ref(null);
  const refCustomer: Ref<any> = ref(null);
  const form: ComputedRef<any> = computed(() => store.form);
  const loading: ComputedRef<boolean> = computed(() => store.loading);
  const updateModal: ComputedRef<boolean> = computed(() => store.updateModal);
  const { formFields } = modelFormFields();
  const isbound: ComputedRef<{ inbound: boolean, outbound: boolean }> = computed(() => {
    if (form.value.operationTypeId) {
      const operationType = workOrderList().getOperationTypeList()
        .find(item => item.id === Number(form.value.operationTypeId));
      const type = operationType?.options?.type;
      if (type) {
        if (type === 'full') {
          return { inbound: true, outbound: true };
        }
        if (type === 'inbound') {
          return { inbound: true, outbound: false }
        }
        if (type === 'outbound') {
          return { inbound: false, outbound: true };
        }
      }
    }
    return { inbound: false, outbound: false };
  })
  return {
    formFields,
    form,
    refFormScheduler,
    isbound,
    refCustomer,
    loading,
    updateModal,
  }
}