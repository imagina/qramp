import { reactive, computed } from 'vue';
import {
    State,
    Store,
} from '../contracts/store.contract'

const state = reactive<State>({
    showModal: false,
    form: {},
})


const store: Store = computed(() => ({
    get showModal() {
        return state.showModal;
    },
    set showModal(value) {
        state.showModal = value;
    },
    get form() {
        return state.form;
    },
    set form(value) {
        state.form = value;
    },
    reset() {
        state.form = {};
        state.showModal = false;
    },
})).value


export default store;