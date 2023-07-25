import { computed, WritableComputedRef } from 'vue';
import store from '../store/index.store';
import modelFormFields from '../models/formFields';
export default function useForm() {
    const form = computed(() => store.form);
    const formFields = computed(() => modelFormFields);
    return {
        formFields,
        form
    }
}