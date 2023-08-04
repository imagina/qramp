import { reactive, computed } from 'vue';
import {
    State,
    Store,
} from '../contracts/store.contract'
import moment from 'moment';

const state = reactive<State>({
    showModal: false,
    titleModal: '',
    form: {
        carrierId: null,
        stationId: null,
        acTypeId: null,
        fromDate: null,
        untilDate: null,
        operationTypeId: null,
        flightNumber: null,
        inboundScheduleArrival: null,
        outboundScheduleDeparture: null,
        outboundFlightNumber: null,
        daysOfWeek: [],
        customerId: null,
        contractId: null,
        //customCustomerName: null,
        depDays: null,
    },
    loading: false,
    updateModal: false,
})
function dateFormatterFull(date: string): string {
    if (!date) return '';
  
    const formattedDate = moment(date).format('MM/DD/YYYY HH:mm');
    return formattedDate;
}

const store: Store = computed(() => ({
    get showModal() {
        return state.showModal;
    },
    set showModal(value) {
        state.showModal = value;
    },
    get titleModal() {
        return state.titleModal;
    },
    set titleModal(value) {
        state.titleModal = value;
    },
    get loading() {
        return state.loading;
    },
    set loading(value) {
        state.loading = value;
    },
    get updateModal() {
        return state.updateModal;
    },
    set updateModal(value) {
        state.updateModal = value;
    },
    get form() {
        return state.form;
    },
    set form(data) {
        if(data.id) {
            state.form.id = data.id
        }
        state.form.carrierId = data.carrierId
        state.form.stationId = data.stationId
        state.form.acTypeId = data.acTypeId
        state.form.fromDate = moment(data.fromDate).format('MM/DD/YYYY');
        state.form.untilDate = moment(data.untilDate).format('MM/DD/YYYY');
        state.form.operationTypeId = data.operationTypeId
        state.form.flightNumber = data.flightNumber
        state.form.inboundScheduleArrival = moment(data.inboundScheduleArrival).format('HH:mm')
        state.form.outboundScheduleDeparture = moment(data.outboundScheduleDeparture).format('HH:mm')
        state.form.outboundFlightNumber = data.outboundFlightNumber
        state.form.daysOfWeek = data.daysOfWeek || [];
        state.form.customerId = data.customerId;
        state.form.contractId = data.contractId;
        //state.form.customCustomerName = data.customCustomerName || null;
        state.form.depDays = data.depDays || null;
    },
    reset() {
        state.form = {
            carrierId: null,
            stationId: null,
            acTypeId: null,
            fromDate: null,
            untilDate: null,
            operationTypeId: null,
            flightNumber: null,
            inboundScheduleArrival: null,
            outboundScheduleDeparture: null,
            outboundFlightNumber: null,
            daysOfWeek: [],
            customerId: null,
            contractId: null,
            //customCustomerName: null,
            depDays: null,
        };
        state.showModal = false;
    },
    dateFormatterFull,
})).value


export default store;