import Vue, { reactive, computed } from 'vue';
export interface ModalPropsContract {
    update: boolean;
    title: string;
    width: string;
}
export interface StateContract {
    showModal: boolean,
    loading: boolean,
    modalProps: ModalPropsContract,
    isPassenger: boolean;
}
const state = reactive<StateContract>({
    showModal: false,
    loading: false,
    modalProps: {
        update: false,
        title: '',
        width: '90vw'
    },
    isPassenger: false,
});

const store = {
    showModal: {
        get: (): boolean => state.showModal,
        set(value: boolean) {
            state.showModal = value;
        },
    },
    loading: {
        get: (): boolean => state.loading,
        set(value: boolean) {
            state.loading = value;
        },
    },
    modalPropsTitle: {
        get: (): string => state.modalProps.title,
        set(value: string) {
            state.modalProps.title = value;
        },
    },
    modalPropsUpdate: {
        get: (): boolean => state.modalProps.update,
        set(value: boolean) {
            state.modalProps.update = value;
        },
    },
    modalProps: state.modalProps,
    isPassenger: {
        get: (): boolean => state.isPassenger,
        set(value: boolean) {
            console.log(value);
            state.isPassenger = value;
        },
    },
    reset: (): void => {
        // set form
    },
    clear: (): void => {
        state.isPassenger = false;
        state.showModal = false;
    },
}

export default computed(() => store).value;