import { computed, WritableComputedRef } from 'vue';
import store from '../store/index';
export default function useSchedulerModal() {
    const showModal: WritableComputedRef<boolean> = computed({
        get: () => store.showModal,
        set: (value: boolean) => store.showModal = value 
    })
    return {
        showModal
    }
}