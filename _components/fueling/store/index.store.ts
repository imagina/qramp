import { reactive, computed } from 'vue';
import { form } from '../models/form.model';
import {
    State,
    Store,
    Form,
} from '../contracts/store.contract'

const state = reactive<State>({
    showModal: false,
    titleModal: '',
    form: { ...form },
    loading: false,
    updateModal: false,
})

const store: Store = computed(() => ({
    get showModal(): boolean {
        return state.showModal;
    },
    set showModal(value: boolean) {
        state.showModal = value;
    },
    get titleModal(): string {
        return state.titleModal;
    },
    set titleModal(value: string) {
        state.titleModal = value;
    },
    get loading(): boolean {
        return state.loading;
    },
    set loading(value: boolean) {
        state.loading = value;
    },
    get updateModal(): boolean {
        return state.updateModal;
    },
    set updateModal(value: boolean) {
        state.updateModal = value;
    },
    get form(): Form {
        return state.form;
    },
    set form(data: Form) {
        Object.keys(form).forEach(key => {
            state.form[key] = data[key]
        })
    },
    reset(): void {
        state.form = {
            ...form
        };
        state.showModal = false;
    },
})).value


export default store;