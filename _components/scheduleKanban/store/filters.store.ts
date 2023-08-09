import Vue, { reactive, computed } from 'vue';

const state = reactive({
    showModal: false,
    titleModal: '',
    filters: {
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
    loading: false,
    updateModal: false,
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
    reset(): void {
        //state.filters = {};
        state.showModal = false;
    },
})).value


export default store;