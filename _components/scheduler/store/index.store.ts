import { reactive, computed } from 'vue';
import {
    State,
    Store,
} from '../contracts/store.contract'

const state = reactive<State>({
    showModal: false,
})


const store: Store = computed(() => ({
    get showModal() {
        return state.showModal;
    },
    set showModal(value) {
        state.showModal = value;
    }
})).value


export default store;