import Vue, { reactive, computed } from 'vue';

interface State {
    showModal: boolean,
    titleModal: string,
    loading: boolean,
    form: any
}

const state = reactive<State>({
    showModal: false,
    titleModal: '',
    loading: false,
    form: {}
})

const store = computed(() => ({
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
    get form() {
      return state.form;
    },
    set form(data) {
      state.form = {...data};
    },
    reset(): void {
        //state.form = {};
        state.showModal = false;
    },
})).value


export default store;
