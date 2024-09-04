import { reactive, computed } from "vue";

const state = reactive({
    form: {
        customerSignature: '',
        customerName: '',
        customerTitle: '',
        representativeSignature: '',
        representativeName: '',
        representativeTitle: '',
    },
    isFull: false,
    disabledReadonly: false,
    readonly: true,
});

export default computed(() => ({
    get form() {
        return state.form;
    },
    set form(value) {
        state.form = value;
    },
    get isFull() {
        return state.isFull;
    },
    set isFull(value) {
        state.isFull = value;
    },
    get disabledReadonly() {
        return state.disabledReadonly;
    },
    set disabledReadonly(value) {
        state.disabledReadonly = value;
    },
    get readonly() {
        return state.readonly;
    },
    set readonly(value) {
        state.readonly = value;
    },
    resetStore() {
        state.form = {
            customerSignature: '',
            customerName: '',
            customerTitle: '',
            representativeSignature: '',
            representativeName: '',
            representativeTitle: '',
        };
        state.isFull = false;
        state.disabledReadonly = false;
        state.readonly = true;
    }
})).value;