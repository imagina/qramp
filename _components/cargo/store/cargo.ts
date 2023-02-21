import { reactive } from 'vue';
import { 
    CargoStoreContract, 
    FormContract,
    DelayListContract,
    PayloadContract,
    UseCargoStoreContract
} from '../@Contract/cargo.contract';
const modelDelay = [
    {
      code: '',
      hours: ''
    },
];
const state = reactive<CargoStoreContract>({
    form: {
        inboundCargoTotalUldsUnloaded: '',
        inboundCargoBulkUnloaded: '',
        outboundCargoTotalUldsLoaded: '',
        outboundCargoBulkLoaded: '',
        cargoTotalKilosLoaded: '',
        cargoTotalKilosUnloaded: '',
    },
    delayList: [...modelDelay],
    delay: false,
});
export default function cargoStore(): UseCargoStoreContract {
    function getForm(): FormContract {
        return state.form;
    }
    function setForm(cargo: FormContract): void {
        state.form.inboundCargoTotalUldsUnloaded = cargo['inboundCargoTotalUldsUnloaded'] ? cargo['inboundCargoTotalUldsUnloaded'].toString() : '';
        state.form.inboundCargoBulkUnloaded = cargo['inboundCargoBulkUnloaded'] ? cargo['inboundCargoBulkUnloaded'].toString() : '';
        state.form.outboundCargoTotalUldsLoaded = cargo['outboundCargoTotalUldsLoaded'] ? cargo['outboundCargoTotalUldsLoaded'].toString() : '';
        state.form.outboundCargoBulkLoaded = cargo['outboundCargoBulkLoaded'] ? cargo['outboundCargoBulkLoaded'].toString() : '';
        state.form.cargoTotalKilosLoaded = cargo['cargoTotalKilosLoaded'] ? cargo['cargoTotalKilosLoaded'].toString() : '';
        state.form.cargoTotalKilosUnloaded = cargo['cargoTotalKilosUnloaded'] ? cargo['cargoTotalKilosUnloaded'].toString() : '';
    }
    function getDelayList(): DelayListContract[] {
        return state.delayList;
    }
    function setDelayList(data: DelayListContract[]): void {
        const delay = data['delay'] || [];
        if( delay.length === 0) {
            state.delayList = [...modelDelay];
            return;
        }
        const validateDelay = delay.length > 0;
        setDelay(validateDelay);
        state.delayList =  validateDelay 
            ?  delay 
            : [...modelDelay];
    }
    function getDelay(): boolean {
        return state.delay;
    }
    function setDelay(value: boolean): void {
        state.delay = value;
    }
    function payload(): PayloadContract {
        const delay = state.delay ? state.delayList.filter(items => {
            return items.code && items.hours
        }) : [];
        return {
            delay,
            cargo: state.form,
        }
    }
    function reset(): void {
        state.form = {
            inboundCargoTotalUldsUnloaded: '',
            inboundCargoBulkUnloaded: '',
            outboundCargoTotalUldsLoaded: '',
            outboundCargoBulkLoaded: '',
            cargoTotalKilosLoaded: '',
            cargoTotalKilosUnloaded: '',
        };
        state.delayList = [
            {
              code: '',
              hours: ''
            },
        ];
        state.delay = false;
    }
    return {
        getForm,
        setForm,
        getDelayList,
        setDelayList,
        getDelay,
        setDelay,
        reset,
        payload,
    }
}