import Vue, { reactive, computed } from 'vue';

interface State {
    showModal: boolean;
    titleModal: string;
    loading: boolean;
    form: any;
    seletedDateColumn: any;
}

const state = reactive<State>({
    showModal: false,
    titleModal: '',
    loading: false,
    form: {},
    seletedDateColumn: null,
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
    get seletedDateColumn() {
        return state.seletedDateColumn;
    },
    set seletedDateColumn(value) {
        state.seletedDateColumn = value;
    },
    reset(): void {
        state.form = {};
        state.showModal = false;
    },
})).value


export default store;
