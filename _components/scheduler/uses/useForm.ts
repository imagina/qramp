import { computed, ref, WritableComputedRef } from 'vue';
import store from '../store/index.store';
import modelFormFields from '../models/formFields';
import workOrderList from '../../../_store/actions/workOrderList';

export default function useForm() {
    const refFormScheduler = ref(null);
    const form = computed(() => store.form);
    const { formFields } = modelFormFields();
    const isbound = computed(() => {
        if(form.value.operationTypeId) {
          const operationType = workOrderList().getOperationTypeList()
            .find(item => item.id === Number(form.value.operationTypeId));
          const type = operationType?.options?.type;
          if(type) {
            if(type === 'full'){
              return [true, true];
            }
            if(type === 'inbound') {
              return [true, false]
            }
            if(type === 'outbound') {
              return [false, true];
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
    }
}