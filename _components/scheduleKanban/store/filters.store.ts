import { reactive, computed } from 'vue';
import modelHoursFilter from '../models/hoursFilter.model'
import scheduleTypeModel from '../models/scheduleType.model';
import filterModel from '../models/filters.model'
import moment from 'moment';
import { State } from '../contracts/filtersStore.contract';
import storeKanban from '../store/kanban.store';
import { LABOR, BUSINESS_UNIT_LABOR, FLIGHT } from "src/modules/qramp/_components/model/constants";
import qRampStore from "src/modules/qramp/_store/qRampStore";
import { CARGO_PAX, BUSINESS_UNIT_CARGO } from '../../model/constants';

const state = reactive<State>({
    showModal: false,
    titleModal: '',
    filters: filterModel(),
    form: {
      time: '0-23'
    },
    loading: false,
    updateModal: false,
    scheduleType: scheduleTypeModel[1].value,
    selectedDate: moment().format('YYYY/MM/DD'),
    startDateTime: '',
    endDateTime: '',
    fullDay: modelHoursFilter[0].value,
    stationId: null,
    showModalStation: false,
    titleFilter: '',
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
    get filters() {
        return state.filters;
    },
    set filters(data) {
        state.filters = {...data};
    },
    get titleFilter(): string {
      return state.titleFilter;
    },
    set titleFilter(data: string) {
        state.titleFilter = data;
    },
    get form() {
      return state.form;
    },
    set form(data) {
      state.form = {...data};
    },
    get scheduleType() {
      return state.scheduleType;
    },
    set scheduleType(value: string) {
      state.scheduleType = value;
    },
    get selectedDate() {
      return state.selectedDate;
    },
    set selectedDate(value: string) {
      state.selectedDate = value;
    },
    get startDateTime() {
      return state.startDateTime;
    },
    set startDateTime(value: string) {
      state.startDateTime = value;
    },
    get endDateTime() {
      return state.endDateTime;
    },
    set endDateTime(value: string) {
      state.endDateTime = value;
    },
    get stationId(): string | null  {
      return state.stationId;
    },
    set stationId(value: string | null) {
      state.stationId = value;
    },
    get showModalStation(){
      return state.showModalStation;
    },
    set showModalStation(value: boolean){
      state.showModalStation = value;
    },
    get filterTime(){
      if(state.form.time !== null){
        const TIME_DEFAULT = '0-23';
        storeKanban.isAppOffline && (state.form.time = TIME_DEFAULT);
        const filterTime = state.form.time.split('-') || [0,0];
        return filterTime;
      }
      return state.fullDay.split('-');
    },
    get payload(){
      const typeWorkOrderFromStore = qRampStore().getTypeWorkOrder();
      let businessUnitId: any = qRampStore().getBusinessUnitId();
      businessUnitId = businessUnitId !== 'null' ? {businessUnitId} : {};
      let typeWorkOrder = {};
      if (businessUnitId === BUSINESS_UNIT_LABOR) {
        typeWorkOrder = { type: [LABOR] };
      } else if (qRampStore().getBusinessUnitId() == BUSINESS_UNIT_CARGO && typeWorkOrderFromStore === CARGO_PAX) {
        typeWorkOrder = { type: [CARGO_PAX] };
      } else if (qRampStore().getBusinessUnitId() == 'null' && typeWorkOrderFromStore !== CARGO_PAX) {
        typeWorkOrder = { type: [FLIGHT] };
      }

      const stationCompanies = qRampStore().getFilterCompany();
      const filters = {
        ...state.form,
        ...typeWorkOrder,
        ...businessUnitId,
        stationCompanies
      };
      delete filters.time;
      delete filters.scheduleType;
      Object.keys(filters).forEach(
        (key) => (filters[key] === null) && delete filters[key]
      );
      return filters
    },
    reset(): void {
        //state.filters = {};
        state.showModal = false;
    },
})).value


export default store;
