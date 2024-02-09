import moment from 'moment';
import {reactive, computed } from 'vue';
interface State {
  showModal: boolean;
  title: string;
  flightNumbers: any,
  loading: boolean,
}
const state = reactive<State>({
  showModal: false,
  title: 'Track flight details',
  flightNumbers: [],
  loading: false,
});


const store = computed(() => ({
  get showModal(): boolean {
    return state.showModal;
  },
  set showModal(value: boolean) {
    state.showModal = value;
  },
  get loading(): boolean {
    return state.loading;
  },
  set loading(value: boolean) {
    state.loading = value;
  },
  get title(): string {
    return state.title;
  },
  set title(value: string) {
    state.title = value;
  },
  get flightNumbers(): any {
    return state.flightNumbers;
  },
  set flightNumbers(item: any) {
    const flightNumberInbound = item.faFlightId.split('-')[0] || null;
    const flightNumberoutbound = item.outboundFaFlightId.split('-')[0] || null;
    const inbound = {
      workOrderId: item.id, 
      faFlightId: item.faFlightId, 
      flightNumber: flightNumberInbound || item.inboundFlightNumber,
      boundScheduleDate: item.inboundScheduleArrival || moment().format('YYYY-MM-DDTHH:mm:ss'),
      type: 'inbound',
    }
    const outbound = {
      workOrderId: item.id, 
      faFlightId: item.outboundFaFlightId, 
      flightNumber: flightNumberoutbound || item.outboundFlightNumber,
      boundScheduleDate: item.outboundScheduledDeparture || moment().format('YYYY-MM-DDTHH:mm:ss'),
      type: 'outbound',
    }
    if(item.inboundFlightNumber && item.outboundFlightNumber) {
      state.flightNumbers = [inbound, outbound];
      return;
    }
    if(item.inboundFlightNumber && !item.outboundFlightNumber) {
      state.flightNumbers = [inbound];
      return;
    }
    if(!item.inboundFlightNumber && item.outboundFlightNumber) {
      state.flightNumbers = [outbound];
      return;
    }
  },
  close() {
    state.showModal = false;
  }
})).value;

export default store;