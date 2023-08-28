import Vue, { ref, computed, provide, getCurrentInstance } from 'vue';
import storeKanban from "../store/kanban.store";
import storeFilter from '../store/filters.store'
import modelHoursFilter from "../models/hoursFilter.model";
import qRampStore from './../../../_store/qRampStore.js'
import filtersStore from '../store/filters.store';
import _ from "lodash";
import buildKanbanStructure from '../actions/buildKanbanStructure';
import individualRefreshByColumns from '../actions/individualRefreshByColumns'
import checkUrlParams from '../actions/checkUrlParams';
import setUrlParams from '../actions/setUrlParams';
import getTitleFilter from '../actions/getTitleFilter';

export default function useKanbanBoard(props) {
  const proxy = (getCurrentInstance() as any).proxy as any;
  const refFormOrders = ref(null);
  provide('refFormOrders', refFormOrders);
  const isPassenger = computed(() => qRampStore().getIsPassenger());
  const isDraggingCard = computed(() => storeKanban.isDraggingCard);
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

  const selectedDate = computed(() => storeFilter.selectedDate);

  const scheduleType = computed({
    get: () => storeKanban.scheduleType,
    set: (value) => (storeKanban.scheduleType = value),
  });

  const groupOptions = { name: "kanban-columns" };

  const columns: any = computed({
    get: () => storeKanban.columns,
    set: (value) => (storeKanban.columns = value),
  });

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
      },
      {
        label: Vue.prototype.$tr("isite.cms.label.filter"),
        vIf: true,
        props: {
          icon: "fa-duotone fa-filter",
          id: "filter-button-crud",
        },
        action: () => { filtersStore.showModal = true },
      },
    ];

    /*if(!isPassenger.value && Vue.prototype.$auth.hasAccess('ramp.schedulers.manage')){
      extraActions.push({
        label: "Scheduler",
        props: {
          label: "Scheduler",
          icon: "fa-duotone fa-calendar-plus",
        },
        action: () => {
          const routeName = isPassenger.value ? 'passenger' : 'ramp';
          let hrefSplit = window.location.href.split("?");
          let tinyUrl =
            this.$store.state.qsiteApp.originURL +
            `/#/${routeName}/schedule/index`;
          if (hrefSplit[1]) tinyUrl = tinyUrl + "?" + hrefSplit[1];
          localStorage.setItem('urlSchedule', tinyUrl);
          //Vue.$router.push({name: 'qramp.admin.scheduler'})
        },
      })
    }*/
    return extraActions;
  })

  const init = async () => {
    await checkUrlParams(proxy);
    if (storeFilter.stationId) {
      getTitleFilter();
      await setUrlParams(proxy);
      await buildKanbanStructure();
    } else {
      storeFilter.showModalStation = true
    }
  };

  init();
  return {
    selectedDate,
    columns,
    groupOptions,
    scheduleTypeOptions,
    scheduleType,
    filterTime,
    dynamicFieldTime,
    extraPageActions,
    isDraggingCard,
    buildKanbanStructure,
    refFormOrders,
    individualRefreshByColumns,
  };
}
