import Vue, { reactive, computed } from 'vue';
import modelHoursFilter from '../models/hoursFilter.model'
import moment, { Moment } from 'moment';

const state = reactive({
    showModal: false,
    titleModal: '',
    filters: {
        time: {
          value: null,
          type: 'select',
          props: {
            label: 'Filter by time',
            format24h: true,
            options: modelHoursFilter,
            alphabeticalSort: false,
          }
        },
        carrierId: {
          value: null,
          type: "select",
          loadOptions: {
            apiRoute: "apiRoutes.qsetupagione.airlines",
            select: { label: "airlineName", id: "id" },
            requestParams: {
            },
          },
          props: {
            label: "Carrier",
            clearable: true,
          },
        },
        stationId: {
          value: null,
          type: "select",
          loadOptions: {
            apiRoute: "apiRoutes.qsetupagione.setupStations",
            select: { label: "fullName", id: "id" },
            requestParams: {
              filter: {
                companyId: 26,
              },
            },
          },
          props: {
            label: "Station",
          },
        },
        statusId: {
          value: null,
          type: 'select',
          loadOptions: {
            apiRoute: 'apiRoutes.qramp.workOrderStatuses',
            select: { 'label': 'statusName', 'id': 'id' },
            requestParams: {
              filter: {
                companyId: 26,
              },
            },
          },
          props: {
            label: 'Status',
            'clearable': true
          },
        },
        adHoc: {
          value: null,
          type: "select",
          props: {
            label: "Ad Hoc",
            clearable: true,
            options: [
              { label: Vue.prototype.$tr("isite.cms.label.yes"), value: true },
              { label: Vue.prototype.$tr("isite.cms.label.no"), value: false },
            ],
          },
        },
        flightStatusId: {
          value: null,
          type: "select",
          loadOptions: {
            apiRoute: "apiRoutes.qfly.flightStatuses",
            select: { label: "name", id: "id" },
            requestParams: {
              filter: {
                companyId: 26,
              },
            },
          },
          props: {
            label: "Flight Status",
            clearable: true,
          },
        },
        areaId: {
          value: null,
          type: 'select',
          loadOptions: {
            apiRoute: 'apiRoutes.qsetupagione.areas',
            select: { label: 'name', id: 'id' },
            requestParams: {
              filter: {
                companyId: 26,
              },
            },
          },
          props: {
            label: 'Areas',
            'clearable': true
          },
        },
        type: {
          value: null,
        },
        dateStart: {
          value: null,
        },
        dateEnd: {
          value: null,
        },  
    },
    form: {},
    payloadForm: {},
    loading: false,
    updateModal: false,
    scheduleTypeModel: 'week-agenda',
    date: moment().format('YYYY/MM/DD')
})

function getFilterTimeCurrent(){
  const currentHour = moment().hour();
  const filterTime = modelHoursFilter.filter(item => item.value !== '0-23').find(range => {
    const [start, end] = range.value.split('-').map(Number);
      return currentHour >= start && currentHour <= end;
  }).value || null;
  return filterTime
}

function checkFilters(){
  state.form.time = getFilterTimeCurrent()  //sets the current time
}

checkFilters()

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
    get date() {
      return state.date;
    },
    set date(value: string) {
      state.date = value;
    },
    get dateTimeIsFullDay() {
      return state.form.time === modelHoursFilter[0].value //0-23
    },
    get startDateTime(){
      const time = state.form.time.split('-') || [0,0];
      return moment(state.date).startOf('day').set({ hour: time[0], minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
    },
    get endDateTime(){
      const time = state.form.time.split('-') || [0,0];
      return moment(state.date).endOf('day').set({ hour: time[1], minute: 59, second: 59 }).format('YYYY-MM-DD HH:mm:ss');
    },
    reset(): void {
        //state.filters = {};
        state.showModal = false;
    },
})).value


export default store;
