import { computed, ref, WritableComputedRef } from 'vue';
import store from '../store/index.store';
import modelFormFields from '../models/formFields';
import workOrderList from '../../../_store/actions/workOrderList';

export default function useForm() {
    const refFormScheduler = ref(null);
    const refCustomer = ref(null);
    const form = computed(() => store.form);
    const loading = computed(() => store.loading);
    const updateModal = computed(() => store.updateModal);
    const { formFields } = modelFormFields();
    const isbound = computed(() => {
        if(form.value.operationTypeId) {
          const operationType = workOrderList().getOperationTypeList()
            .find(item => item.id === Number(form.value.operationTypeId));
          const type = operationType?.options?.type;
          if(type) {
            if(type === 'full'){
              return {inbound:true, outbound:true};
            }
            if(type === 'inbound') {
              return {inbound:true, outbound:false}
            }
            if(type === 'outbound') {
              return {inbound:false, outbound:true};
            }
          }
        }
        return [false, false];
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