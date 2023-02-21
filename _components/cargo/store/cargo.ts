import { reactive } from 'vue';
const modelDelay = [
    {
      code: '',
      hours: ''
    },
];
const state = reactive({
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
export default function cargoStore() {
    function getForm() {
        return state.form;
    }
    function setForm(cargo) {
        state.form.inboundCargoTotalUldsUnloaded = cargo['inboundCargoTotalUldsUnloaded'] ? cargo['inboundCargoTotalUldsUnloaded'].toString() : '';
        state.form.inboundCargoBulkUnloaded = cargo['inboundCargoBulkUnloaded'] ? cargo['inboundCargoBulkUnloaded'].toString() : '';
        state.form.outboundCargoTotalUldsLoaded = cargo['outboundCargoTotalUldsLoaded'] ? cargo['outboundCargoTotalUldsLoaded'].toString() : '';
        state.form.outboundCargoBulkLoaded = cargo['outboundCargoBulkLoaded'] ? cargo['outboundCargoBulkLoaded'].toString() : '';
        state.form.cargoTotalKilosLoaded = cargo['cargoTotalKilosLoaded'] ? cargo['cargoTotalKilosLoaded'].toString() : '';
        state.form.cargoTotalKilosUnloaded = cargo['cargoTotalKilosUnloaded'] ? cargo['cargoTotalKilosUnloaded'].toString() : '';
    }
    function getDelayList() {
        return state.delayList;
    }
    function setDelayList(data): void {
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
    function getDelay() {
        return state.delay;
    }
    function setDelay(value: boolean): void {
        state.delay = value;
    }
    function payload() {
        const delay = state.delay ? state.delayList.filter(items => {
            return items.code && items.hours
        }) : [];
        return {
            delay,
            cargo: state.form,
        }
    }
    function reset() {
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