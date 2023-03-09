import Vue, { reactive, computed } from 'vue';
export interface StateContract {
    isPassenger: boolean;
}
const state = reactive<StateContract>({
    isPassenger: false,
});

const store = {
    isPassenger: {
        get: (): boolean => state.isPassenger,
        set(value: boolean) {
            console.log(value);
            state.isPassenger = value;
        },
    },
    reset: (): void => {
        state.isPassenger = false;
    },
    clear: (): void => {
        state.isPassenger = false;
    },
}

export default computed(() => store).value;