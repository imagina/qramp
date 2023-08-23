import Vue, { reactive, computed } from 'vue';
import modelHoursFilter from '../models/hoursFilter.model'
import filters from '../models/filters.model'
import moment, { Moment } from 'moment';

const state = reactive({
    showModal: false,
    titleModal: '',
    filters,
    form: {},
    payloadForm: {},
    loading: false,
    updateModal: false,
    scheduleTypeModel: 'week-agenda',
    selectedDate: moment().format('YYYY/MM/DD'),
    startDateTime: '',
    endDateTime: ''
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
    get form() {
      return state.form;
    },
    set form(data) {
      state.form = {...data};
    },
    get scheduleTypeModel() {
      return state.scheduleTypeModel;
    },
    set scheduleTypeModel(value: string) {
      state.scheduleTypeModel = value;
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
    get dateTimeIsFullDay() {
      return state.form['time'] === modelHoursFilter[0].value //0-23
    },
    get filterDateTime(){
      const timeFormat = 'YYYY-MM-DD HH:mm:ss'
      if(state.form['time'] !== null){
        const time = state.form['time'].split('-') || [0,0];
        const selectedDate = moment(state.selectedDate)
        const startDateTime = selectedDate.startOf('day').set({ hour: time[0], minute: 0, second: 0 }).format(timeFormat);
        const endDateTime = selectedDate.endOf('day').set({ hour: time[1], minute: 59, second: 59 }).format(timeFormat);
        return { startDateTime, endDateTime}
      }

      return {
        startDateTime: moment().startOf("day").format(timeFormat),
        endDateTime: moment().endOf("day").format(timeFormat)
      }
    },
    get payload(){
      const filters = {...state.form}
      delete filters['time']
      Object.keys(filters).forEach(
        (key) => (filters[key] === null) && delete filters[key]
      )
      return filters
    },

    reset(): void {
        //state.filters = {};
        state.showModal = false;
    },
})).value


export default store;
