import { ref, computed, WritableComputedRef } from 'vue';
import store from '../store/index.store';
import modelActionsModal from '../models/modelActionsModal'
export default function useSchedulerModal() {
    const refFormFields = ref(null);
    const loading = computed(() => store.loading);
    const titleModal = computed(() => store.titleModal)
    const showModal: WritableComputedRef<boolean> = computed({
        get: () => store.showModal,
        set: (value: boolean) => store.showModal = value 
    })
    function clear() {
        store.reset();
    }
    const { actions } = modelActionsModal(refFormFields);
    return {
        showModal,
        actions,
        refFormFields,
        clear,
        loading,
        titleModal,
    }
}