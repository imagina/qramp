import {computed, reactive} from "vue";
import { NON_FLIGHT, OPERATION_TYPE_NON_FLIGHT } from "../../model/constants";
import qRampStore from 'src/modules/qramp/_store/qRampStore'

interface StateInterface {
  isLoadingSearch: boolean;
  selectedTab: number;
  showModal: boolean;
  titleModal: string;
  loading: boolean;
  widthModal: string;
  form: {
    flightNumber: string | null,
    customerId: string |  number | null,
    stationId: string |  number | null,
    scheduleDate: string | null,
    responsibleId: string | number | null,
    operationTypeId: number,
  },
  isOpenTableModal: boolean;
}

const state = reactive<StateInterface>({
  selectedTab: 1,
  isLoadingSearch: false,
  showModal: false,
  titleModal: 'Create Non-flight',
  loading: false,
  widthModal: '35vw',
  isOpenTableModal: false,
  form: {
    flightNumber: '',
    customerId: null,
    stationId: null,
    scheduleDate: null,
    responsibleId: null,
    operationTypeId: OPERATION_TYPE_NON_FLIGHT,
  },
})

export default computed(() => ({
  get selectedTab() {
    return state.selectedTab
  },
  set selectedTab(value) {
    state.selectedTab = value
  },
  get isLoadingSearch() {
    return state.isLoadingSearch
  },
  set isLoadingSearch(value) {
    state.isLoadingSearch = value
  },
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
  get widthModal(): string {
    return state.widthModal;
  },
  set widthModal(value: string) {
      state.widthModal = value;
  },
  get isOpenTableModal(): boolean {
    return state.isOpenTableModal;
  },
  set isOpenTableModal(value: boolean) {
    state.isOpenTableModal = value;
  },
  get form() {
    return state.form;
  },
  set form(value) {
    state.form = value;
  },
  payload() {
    const businessUnitId = qRampStore().getBusinessUnitId()
    
    return { 
      ...state.form,  
      businessUnitId,
      type: NON_FLIGHT,
      titleOffline: 'New non-flight',
    };
  },
  reset() {
    state.selectedTab = 1
    state.isLoadingSearch = false,
    state.showModal = false,
    state.titleModal = '',
    state.loading = false,
    state.widthModal = '35vw',
    state.form = {
      flightNumber: '',
      customerId: null,
      stationId: null,
      scheduleDate: null,
      responsibleId: null,
      operationTypeId: OPERATION_TYPE_NON_FLIGHT,
    }
  }
})).value
