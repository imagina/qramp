import Vue, { ref, reactive, watch, computed } from 'vue';
import moment from "moment";
import storeKanban from "../store/kanban.store";
import modelHoursFilter from "../models/hoursFilter.model";
import qRampStore from './../../../_store/qRampStore.js'
import filtersStore from '../store/filters.store';
import getWorkOrder from '../actions/getWorkOrder'

export default function useKanbanBoard() {
  const isPassenger = computed(() => qRampStore().getIsPassenger());
  const fullscreen = ref(false);
  const filterTime = ref(null);
  const dynamicFieldTime = ref({
    value: null,
    type: "select",
    props: {
      label: "Filter by time",
      format24h: true,
      options: modelHoursFilter,
    },
  });
  const selectedDate = computed({
    get: () => storeKanban.selectedDate,
    set: (value) => (storeKanban.selectedDate = value),
  });

  const scheduleType = computed({
    get: () => storeKanban.scheduleType,
    set: (value) => (storeKanban.scheduleType = value),
  });

  const groupOptions = { name: "kanban-columns" };

  const columns = ref<any[]>([]);
  const scheduleTypeOptions = ref([
    {
      id: 2,
      label: Vue.prototype.$tr("isite.cms.label.week"),
      value: "week-agenda",
      icon: "fas fa-calendar-week",
    },
    {
      id: 3,
      label: `${Vue.prototype.$tr("isite.cms.label.day")}`,
      value: "day-agenda",
      icon: "fas fa-calendar-day",
    },
  ]);
  const extraPageActions = computed(() => {
    let extraActions: any = [
      {
        label: "Copy Tiny URL",
        props: {
          icon: "fa-light fa-copy",
        },
        action: () => {
          const routeName = isPassenger.value ? 'passenger' : 'ramp';
          /*let hrefSplit = window.location.href.split("?");
          let tinyUrl =
            Vue.prototype.$store.state.qsiteApp.originURL +
            `/#/${routeName}/schedule/public/index`;
          if (hrefSplit[1]) tinyUrl = tinyUrl + "?" + hrefSplit[1];
          Vue.prototype.$helper.copyToClipboard(tinyUrl, "Tiny URL copied!");*/
        },
      },
      {
        label: Vue.prototype.$tr("isite.cms.configList.fullScreen", {
          capitalize: true,
        }),
        props: {
          icon: fullscreen.value ? "fullscreen_exit" : "fullscreen",
        },
        action: () => {
          //this.fullscreen = !this.fullscreen;
          //Vue.prototype.$q.fullscreen.toggle();
        },
      },
      {
        label: Vue.prototype.$tr("isite.cms.label.filter"),
        vIf: true,
        props: {
          icon: "fa-duotone fa-filter",
          id: "filter-button-crud",
        },
        action: () => filtersStore.showModal = true,
      },
    ];

    if(!isPassenger.value && Vue.prototype.$auth.hasAccess('ramp.schedulers.manage')){
      extraActions.push({
        label: "Scheduler",
        props: {
          label: "Scheduler",
          icon: "fa-duotone fa-calendar-plus",
        },
        action: () => {
          /*const routeName = isPassenger.value ? 'passenger' : 'ramp';
          let hrefSplit = window.location.href.split("?");
          let tinyUrl =
            this.$store.state.qsiteApp.originURL +
            `/#/${routeName}/schedule/index`;
          if (hrefSplit[1]) tinyUrl = tinyUrl + "?" + hrefSplit[1];
          localStorage.setItem('urlSchedule', tinyUrl);*/
          //Vue.$router.push({name: 'qramp.admin.scheduler'})
        },
      })
    }
    return extraActions;
  })

  const updateColumns = async () => {
    const startOfWeek = moment(selectedDate.value).startOf("week");
    columns.value = [];
    for (let i = 0; i <= 6; i++) {
      const date = moment(startOfWeek).add(i, "days");
      columns.value.push({
        date: date,
        cards: [
          /*{ hour: "00", data: [{ "id": 1 }] },
          { hour: "01", data: [{ "id": 2 }] },
          { hour: "02", data: [{ "id": 3 }] },
          { hour: "03", data: [{ "id": 4 }] },
          { hour: "04", data: [{ "id": 5 }] },
          { hour: "05", data: [{ "id": 6 }] },
          { hour: "06", data: [{ "id": 7 }] },
          { hour: "07", data: [{ "id": 8 }] },
          { hour: "08", data: [{ "id": 9 }] },
          { hour: "09", data: [{ "id": 10 }] },
          { hour: "10", data: [{ "id": 11 }] },
          { hour: "11", data: [{ "id": 12 }] },
          { hour: "12", data: [{ "id": 13 }] },
          { hour: "13", data: [{ "id": 14 }] },
          { hour: "14", data: [{ "id": 15 }] },
          { hour: "15", data: [{ "id": 16 }] },
          { hour: "16", data: [{ "id": 17 }] },
          { hour: "17", data: [{ "id": 18 }] },
          { hour: "18", data: [{ "id": 19 }] },
          { hour: "19", data: [{ "id": 20 }] },
          { hour: "20", data: [{ "id": 21 }] },
          { hour: "21", data: [{ "id": 22 }] },
          { hour: "22", data: [{ "id": 23 }] },
          { hour: "23", data: [{ "id": 24 }] },*/
        ],
      });
    }
    
    const response = await getWorkOrder(true, {
        "date": {
          "field": "schedule_date",
          "type": "customRange",
          "from": date.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          "to": date.endOf('day').format('YYYY-MM-DD HH:mm:ss')
        }
      })
  };

  watch(selectedDate, updateColumns);
  updateColumns();
  return {
    selectedDate,
    columns,
    groupOptions,
    updateColumns,
    scheduleTypeOptions,
    scheduleType,
    filterTime,
    dynamicFieldTime,
    extraPageActions,
  };
}