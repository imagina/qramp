<template>
  <div :class="{ 'fullscreen tw-bg-white tw-p-3 tw-overflow-x-scroll': fullscreen }">
    <div class="box box-auto-height q-mb-md">
      <page-actions
        ref="pageActions"
        :title="$t('ifly.cms.sidebar.schedule')"
        multipleRefresh
        :extra-actions="extraPageActions"
        :excludeActions="fullscreen ? ['filter'] : []"
        @refresh="getWorkOrderFilter(true, selectedDateStart, selectedDateEnd)"
        class="q-mb-md"
      />
    </div>
    <q-btn-toggle
      v-model="scheduleTypeComputed"
      no-caps
      unelevated
      toggle-color="blue-grey"
      color="white"
      text-color="blue-grey"
      :options="scheduleTypeOptions"
      id="btnCalendarType"
      size="14px"
      padding="md sm"
      spread
    />
    <div class="tw-flex tw-justify-center tw-items-center">
      <q-btn
        dense
        flat
        label="Prev"
        @click="schedulePrev"
        icon="fa-regular fa-chevron-left"
        class="tw-w-1/2"
      />
      <q-btn
        dense
        flat
        label="Next"
        @click="scheduleNext"
        icon-right="fa-regular fa-chevron-right"
        class="tw-w-1/2"
      />
    </div>
    <q-calendar
      ref="schedule"
      v-model="selectedDate"
      :view="scheduleType"
      locale="en-us"
      class="tw-w-full"
      animated
      hour24Format
      @click:day2="eventSchedule"
      @click:day:header2="eventSchedule"
    >
      <template #day="{ timestamp }">
        <div
          v-if="$moment(selectedDate).format('MM') === $moment(timestamp.date).format('MM')"
          class="tw-overflow-y-auto tw-overflow-x-hidden tw-h-28 tw-px-2">
          <div
            v-for="(event, index) in getEvents(timestamp.date)"
            :key="event.id"
          >
            <q-badge
              :key="index"
              class="tw-cursor-pointer tw-text-xs  tw-bg-white tw-border tw-border-grey-100"
              @click.stop.prevent="editSchedule(event)"
              :class="
                event.scheduleStatus
                  ? `tw-text-${event.scheduleStatus.color} tw-font-semibold`
                  : 'tw-text-black'
              "
            >
              <i class="fak fa-plane-right-thin-icon" /><span class="ellipsis">
                {{ event.calendarTitle }}
              </span>
            </q-badge>
          </div>
        </div>
      </template>
      <template #day-body="{ timestamp, timeStartPos, timeDurationHeight }">
        <template>
          <template v-for="(event, index) in getEvents(timestamp.date)">
            <div
              :key="index"
              v-if="event.time && !event.isUpdate"
              class="
                tw-text-lg
                tw-my-1
                tw-p-3
                tw-mx-2
                tw-rounded-md
                tw-border 
                tw-border-grey-100
                tw-flex
              "
              @click.stop.prevent="editSchedule(event)"
              :class="classSchedule(event)"
              :style="
                badgeStyles(event, 'body', timeStartPos, timeDurationHeight)
              "
            >
              <div class="tw-font-semibold tw-w-1/2">
                <i class="fak fa-plane-right-thin-icon" />
                {{ event.calendarTitle }}
              </div>
              <div class="tw-text-right tw-w-1/2 tw-space-x-2">
                <button
                  v-if="event.id && scheduleType === 'day-agenda'"
                  @click.stop.prevent="editSchedule(event, 'day')"
                  class="
                    tw-bg-blue-800 
                    tw-rounded-lg 
                    tw-px-2
                    tw-text-white">
                  <i class="fa-light fa-pen-to-square tw-text-sm"/>
                  <q-tooltip>
                    Edit
                  </q-tooltip>
                </button>
                <button
                  v-if="event.id && scheduleType === 'day-agenda'"
                  class="
                    tw-bg-red-500 
                    tw-rounded-lg 
                    tw-px-2  
                    tw-text-white"
                    @click="deleteSchedule(event.id)" 
                  >
                  <i class="fa-light fa-trash-can tw-text-sm"/>
                  <q-tooltip>
                    Delete
                  </q-tooltip>
                </button>
              </div>
            </div>
            <lineForm
              :key="index"
              v-if="event.isUpdate"
              :event="event"
              @dismissEvent="dismissEvent"
              @addSchedule="addSchedule"
              @updateSchedule="updateSchedule"
            />
            
          </template>
        </template>
      </template>
      <template #day-header="{ timestamp }">
        <div class="tw-mx-4 tw-py-4" v-if="scheduleType === 'day-agenda'">
          <button
            class="
              tw-bg-blue-800 
              tw-text-white 
              tw-rounded-lg 
              tw-px-4"
              @click="addNewDayToSchedule(timestamp)"
              :disabled="events.some(item => item.isUpdate)"
            >
            <i class="fa-light fa-plus"></i> New
          </button>
        </div>
      </template>
    </q-calendar>
    <div
      v-if="loading"
      class="
        tw-flex
        tw-justify-center
        tw-absolute
        tw-inset-0
        tw-pt-64
        tw-bg-white
        tw-bg-opacity-75
        tw-z-20
      "
    >
      <div>
        <i
          class="
            fa-duotone 
            fa-loader 
            fa-spin 
            fa-pulse
            tw-text-7xl 
            tw-text-blue-800
          "
        />
      </div>
    </div>
    <modalForm
      ref="modalForm"
      @addSchedule="addSchedule"
      @updateSchedule="updateSchedule"
      @deleteSchedule="deleteSchedule"
    />
    <form-orders ref="formOrders" />
    <stationModal
      ref="stationModal"
      @saveFilterStationId="saveFilterStationId"
    />
  </div>
</template>
<script>
import convertStringToObject from '@imagina/qsite/_plugins/convertStringToObject.js';
import calendar, { QCalendar } from "@quasar/quasar-ui-qcalendar";
import modalForm from "./modals/modalForm.vue";
import formOrders from "../formOrders.vue";
import stationModal from "./modals/stationModal.vue";
import _ from "lodash";
import qRampStore from '../../_store/qRampStore.js';
import {
  STATUS_SCHEDULE,
} from "../model/constants";
import lineForm from './lineForm.vue';

export default {
  props:{
    isBlank: {
      type: Boolean,
      default: () => false,
    }
  },
  components: {
    QCalendar,
    modalForm,
    formOrders,
    stationModal,
    lineForm,
  },
  data() {
    return {
      fullscreen: false,
      loading: false,
      eventLoading: false,
      selectedDate: this.$moment().startOf("month").startOf("day").format("YYYY-MM-DD"),
      selectedDateEnd: this.$moment().endOf("month").endOf("day").format("YYYY-MM-DD"),
      selectedDateStart: this.$moment().startOf("month").startOf("day").format("YYYY-MM-DD"),
      scheduleType: 'month',
      events: [],
      stationId: null,
      filterData: null,
      cloneEvent: {},
    };
  },
  watch: {
    $route: {
      deep: true,
      handler: async function () {
        this.$router.go();
      },
    },
  },
  mounted() {
    this.$nextTick(async function () {
        await this.init();
    });
  },
  beforeDestroy() {
    this.$nextTick(async function () {
      this.filter.reset();
    });
  },
  computed: {
    classSchedule() {
      return event => {
        const color = event.scheduleStatus ? event.scheduleStatus.color : 'black';
        return {
          [`tw-text-${color}`] : event.scheduleStatus,
          'tw-cursor-pointer': this.scheduleType !== 'day-agenda',
          'tw-text-black': !event.scheduleStatus
        }
      }
    },
    scheduleTypeOptions() {
      return [
        {
          id: 1,
          label: `${this.$tr("isite.cms.label.month")} (${this.$moment(this.selectedDate).format('MMMM')})`,
          value: "month",
          icon: "fas fa-calendar-alt",
        },
        {
          id: 2,
          label: this.$tr("isite.cms.label.week"),
          value: "week-agenda",
          icon: "fas fa-calendar-week",
        },
        {
          id: 3,
          label: this.$tr("isite.cms.label.day"),
          value: "day-agenda",
          icon: "fas fa-calendar-day",
        },
      ];
    },
    filter() {
      this.filterData = this.$clone(this.$filter.values);
      return this.$filter;
    },
    userData() {
      return this.$store.state.quserAuth.userData;
    },
    scheduleTypeComputed: {
      get() {
        return this.scheduleType;
      },
      async set(value) {
        this.scheduleType = value;
        await this.$refs.schedule;
        await this.getListOfSelectedWorkOrders(value);
      },
    },
    extraPageActions() {
      return [
        {
          label: "Copy Tiny URL",
          props: {
            icon: "fa-light fa-copy",
          },
          action: () => {
            let hrefSplit = window.location.href.split("?");
            let tinyUrl =
              this.$store.state.qsiteApp.originURL +
              "/#/ramp/schedule/public/index";
            if (hrefSplit[1]) tinyUrl = tinyUrl + "?" + hrefSplit[1];
            this.$helper.copyToClipboard(tinyUrl, "Tiny URL copied!");
          },
        },
        {
          label: this.$t("isite.cms.configList.fullScreen", {
            capitalize: true,
          }),
          props: {
            icon: this.fullscreen ? "fullscreen_exit" : "fullscreen",
          },
          action: () => {
            this.fullscreen = !this.fullscreen;
            this.$q.fullscreen.toggle();
          },
        },
      ];
    },
    filsterAction() {
      return {
        name: this.$route.name,
        fields: {
          customerId: {
            value: null,
            type: "select",
            loadOptions: {
              apiRoute: "apiRoutes.qramp.setupCustomers",
              select: { label: "customerName", id: "id" },
            },
            props: {
              label: "Customer",
              clearable: true,
            },
          },
          statusId: {
            value: null,
            type: "select",
            loadOptions: {
              apiRoute: "apiRoutes.qramp.workOrderStatuses",
              select: { label: "statusName", id: "id" },
            },
            props: {
              label: "Status",
              clearable: true
            },
          },
          stationId: {
            value: this.stationId,
            type: "select",
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.setupStations",
              select: { label: "stationName", id: "id" },
            },
            props: {
              label: "Station",
            },
          },
          adHoc: {
            value: null,
            type: "select",
            props: {
              label: "Ad Hoc",
              clearable: true,
              options: [
                { label: this.$tr("isite.cms.label.yes"), value: true },
                { label: this.$tr("isite.cms.label.no"), value: false },
              ],
            },
          },
          flightStatusId: {
            value: null,
            type: "select",
            loadOptions: {
              apiRoute: "apiRoutes.qfly.flightStatuses",
              select: { label: "name", id: "id" },
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
        callBack: this.getFilter,
        storeFilter: true,
      };
    },
  },
  methods: {
   async init() {
      try {
        qRampStore().setIsblank(this.isBlank)
        await this.initUrlMutate();
        setTimeout(async () => {
          await this.setFilter();
        }, 100);
      } catch (error) {
        console.log(error);
      }
    },
    async initUrlMutate() {
      const obj = await convertStringToObject();
      const localStationId = sessionStorage.getItem("stationId") !== 'null' ? sessionStorage.getItem("stationId") : null;
        this.stationId = this.getStationAssigned() || (obj.stationId || null) || (localStationId || null);
        if (!this.stationId) {
          await this.$refs.stationModal.showModal();
          return;
        }
        if(obj.dateStart) {
          this.selectedDate = this.$moment(obj.dateStart, 'YYYYMMDD').format('YYYY-MM-DD');
        }
        if(obj.dateEnd) {
          this.selectedDateEnd = this.$moment(obj.dateEnd, 'YYYYMMDD').format('YYYY-MM-DD');
        }
        if (!obj.stationId) {
          await this.mutateCurrentURL();
        }
    },
    getStationAssigned() {
      try {
        let stationsAssigned = null;
        if(this.userData) {
          if(this.userData.options) {
            if(this.userData.options.stationsAssigned 
              && Array.isArray(this.userData.options.stationsAssigned)
              && this.userData.options.stationsAssigned.length > 0) {
                stationsAssigned = this.userData.options.stationsAssigned.shift();
            }
          }
        }
        return stationsAssigned;
      } catch (error) {
        console.log(error)
      }
      
    }, 
    async scheduleNext() {
      this.selectedDate = this.$moment(this.selectedDate).startOf("month").startOf("day").add(1, 'M').format("YYYY-MM-DD");
      await this.$refs.schedule.next();
      await this.getListOfSelectedWorkOrders(this.scheduleTypeComputed);
    },
    async schedulePrev() {
      this.selectedDate = this.$moment(this.selectedDate).startOf("month").startOf("day").add(-1, 'M').format("YYYY-MM-DD");
      await this.$refs.schedule.prev();
      await this.getListOfSelectedWorkOrders(this.scheduleTypeComputed);
    },
    async getListOfSelectedWorkOrders(type = false) {
      try {
        this.events = [];
        const lastStart = this.$refs.schedule.lastStart;
        const lastEnd = this.$refs.schedule.lastEnd;
        await this.getWorkOrderFilter(true, lastStart, lastEnd, type);
      } catch (error) {
        console.log(error);
      }
    },
    getEvents(timestamp) {
      try {
        let events = this.$clone(this.events || []);
        const filters = events
          .filter((event) => {
            if (event.inboundScheduledArrival) {
              const momentDate = this.$moment(
                event.inboundScheduledArrival,
                "YYYY-MM-DD"
              ).toDate();

              let eventDate = calendar.parseDate(momentDate);
              return eventDate.date === timestamp;
            }
            return false;
          })
          .map((item) => ({
            ...item,
            sta: this.$moment(item.sta, 'HH:mm:ss').format('HH:mm'),
            std: this.$moment(item.std, 'HH:mm:ss').format('HH:mm'),
            time: item.sta,
          }));
        const order = _.orderBy(
          filters,
          ["time"],
          ["asc"]
        );
        return order;
      } catch (error) {
        console.log(error);
      }
    },
    eventSchedule(event) {
      if(this.scheduleType !== 'day-agenda') {
        if(!this.isBlank && !event.scope.outside) {
          this.selectedData = event.scope.timestamp;
          this.$refs.modalForm.openModal(
            `Create schedule date: ${event.scope.timestamp.date}`,
            null,
            event.scope.timestamp.date
          );
        }
      }
    },
    async editSchedule(event, type = null) {
      await this.showWorkOrder(event, type);
    },
    async addSchedule(data) {
      try {
        await this.$refs.modalForm.setLoading(true);
        const response = await this.saveRequestSimpleWorkOrder(data);
        await this.$refs.modalForm.setLoading(false);
        await this.$refs.modalForm.hideModal();
        await this.getWorkOrderFilter(true, this.selectedDateStart, this.selectedDateEnd);
        this.$alert.success('workOrders was added correctly');
        //this.$router.go();
      } catch (error) {
        console.log(error);
        await this.$refs.modalForm.setLoading(false);
      }
    },
    async updateSchedule(data) {
      try {
        await this.$refs.modalForm.setLoading(true);
        const event = this.events.find(
          (item) => item.id === data.id
        );
        if (event) {
          const dataForm = {};
          dataForm.id = data.id;
          dataForm.sta = data.sta;
          dataForm.std = data.std;
          dataForm.stationId = data.stationId;
          dataForm.preFlightNumber = data.preFlightNumber;
          dataForm.gateId = data.gateId;
          dataForm.scheduleStatusId = data.scheduleStatusId;
          dataForm.inboundScheduledArrival = data.inboundScheduledArrival;
          await this.$crud.update("apiRoutes.qramp.schedule", data.id ,dataForm);
          await this.getWorkOrderFilter(true, this.selectedDateStart, this.selectedDateEnd);
          //await this.$router.go();
          this.$alert.info('The workOrders was updated correctly');
        }
        await this.$refs.modalForm.setLoading(false);
        await this.$refs.modalForm.hideModal();
      } catch (error) {
        await this.$refs.modalForm.setLoading(false);
        await this.$refs.modalForm.hideModal();
        console.log(error);
      }
    },
    deleteSchedule(scheduleId) {
      try {
        const events = this.events.filter(
          (item) => item.id !== scheduleId
        );
        this.events = events;
        this.$crud.delete("apiRoutes.qramp.workOrders", scheduleId);
        this.$alert.info('workOrders was deleted correctly');
      } catch (error) {
        console.log(error);
      }
    },
    async getCurrentFilterDate(lastStart, lastEnd) {
      try {
        const startDate = this.$moment(this.$refs.schedule.lastStart);
        const endDate = this.$moment(this.$refs.schedule.lastEnd);
        if(this.scheduleType === 'month' && startDate.format('MM') === this.$moment(lastEnd).format('MM')) {
          lastStart = startDate.startOf("month").format("YYYY-MM-DD");
          lastEnd = endDate.endOf("month").format("YYYY-MM-DD");
        }
        if(this.scheduleType !== 'month') {
          lastStart = startDate.format("YYYY-MM-DD");
          lastEnd = endDate.format("YYYY-MM-DD");
        }
        let lastStartM = this.$moment(lastStart)
          .startOf('day')
          .format("YYYY-MM-DD HH:mm:ss");
        let lastEndM = this.$moment(lastEnd)
          .endOf('day')
          .format("YYYY-MM-DD HH:mm:ss");
        return {
          date: {
            field: "inbound_scheduled_arrival",
            type: "custom",
            from: lastStartM,
            to: lastEndM,
          },
        };
      } catch (error) {
        console.log(error);
      }
    },
    async getWorkOrderFilter(
      refresh = false,
      dateStart = null,
      dateEnd = null, 
      type = false
    ) {
      try {
        this.selectedDateStart = this.$moment(this.selectedDate).format("YYYY-MM-DD HH:mm:ss");
        if (dateStart && dateEnd) {
          this.selectedDateStart = dateStart;
          this.selectedDateEnd = dateEnd;
        }
        const currentFilterDate = await this.getCurrentFilterDate(this.selectedDateStart, this.selectedDateEnd);
        const objUrl = await convertStringToObject();
        const filter =
          Object.keys(objUrl).length === 0 ? this.$filter.values : objUrl;
        const thereAreFilters = Object.keys(filter).length > 0 ? filter : {};
        const scheduleTypeOption = this.scheduleTypeOptions.find(item => item.id === Number(thereAreFilters.type)) || 'month';
        const scheduleTypeId = this.scheduleTypeOptions.find(item => item.value === this.scheduleType) || {};
        thereAreFilters.type = String(scheduleTypeId.id) || '1';
        thereAreFilters.dateStart = this.$moment(this.selectedDateStart).format('YYYYMMDD');
        thereAreFilters.dateEnd = this.$moment(this.selectedDateEnd).format('YYYYMMDD');
        if(type) this.mutateCurrentURLBrowser(thereAreFilters);
        this.scheduleType = type ? type : scheduleTypeOption.value;
        const filterCurrent = {
          ...thereAreFilters,
          ...currentFilterDate,
        };
        await this.getWorkOrders(refresh, filterCurrent);
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async getWorkOrders(refresh = false, filter) {
      try {
        const filterClone = this.$clone(filter);
        delete filterClone.type;
        delete filterClone.dateStart;
        delete filterClone.dateEnd;
        this.loading = true;
        const params = {
          refresh,
          params: {
            include: "flightStatus,gate,scheduleStatus",
            filter: {
              ...filterClone,
              withoutDefaultInclude: true,
              order: {
                field: "id",
                way: "desc",
              },
            },
          },
        };
        const response = await this.$crud.index(
          "apiRoutes.qramp.workOrders",
          params
        );
        this.events = response.data.map((item) => ({ ...item, isUpdate: false }));
        //this.events = eventModel;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    async showWorkOrder(reponseSchedule, type = null) {
      const response = await this.$crud.show("apiRoutes.qramp.workOrders", reponseSchedule.id, {
            refresh: true,
            include:
              "customer,workOrderStatus,operationType,station,contract,responsible,flightStatus,scheduleStatus,gate",
      })
          if (response.data.statusId !== STATUS_SCHEDULE) {
            await this.$refs.formOrders.loadform({
              modalProps: {
                title: `${this.$tr("ifly.cms.form.updateWorkOrder")} Id: ${
                  response.data.id
                }`,
                update: true,
                workOrderId: response.data.id,
                width: "90vw",
              },
              data: response.data,
            });
            return;
          }
          response.data.sta = this.$moment(response.data.sta, 'HH:mm:ss').format('HH:mm');
          response.data.std = this.$moment(response.data.std, 'HH:mm:ss').format('HH:mm');
          if(type === 'day' && this.scheduleType === 'day-agenda') {
            const index = this.events.indexOf(item => item.id == reponseSchedule.id);
              this.events[index] = response.data;
              this.cloneEvent = await this.$clone(this.events);
              const eventFind = this.events.find(item => item.id === reponseSchedule.id);
              if(eventFind) {
                eventFind.isUpdate = true;
              }
              return;
          }
          if(this.scheduleType !== 'day-agenda') {
            await this.$refs.modalForm.openModal("Edit schedule",  response.data, response.data.inboundScheduledArrival);
          }
    },
    async getFilter() {
      this.events = [];
      if (this.stationId) {
        await sessionStorage.setItem("stationId", this.filter.values.stationId || null);
        await this.getWorkOrderFilter(true);
      }
    },
    setFilter() {
      return new Promise(async (resolve, reject) => {
        this.$filter.setFilter(this.filsterAction);
        resolve(true);
      });
    },
    async saveRequestSimpleWorkOrder(form) {
      try {
        const response = await this.$crud.create(
          "apiRoutes.qramp.simpleWorkOrders",
          form
        );
        return response;
      } catch (error) {
        console.error(error);
      }
    },
    badgeStyles(event, type, timeStartPos, timeDurationHeight) {
      const s = {};
      if (timeStartPos) {
        // don't clamp position to 0px
        s.top = timeStartPos(event.time, false) + "px";
        s.position = "absolute";
        if (event.side !== undefined) {
          s.width = "50%";
          if (event.side === "right") {
            s.left = "50%";
          }
        } else {
          s.width = "100%";
        }
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + "px";
      }
      s["align-items"] = "flex-start";
      return s;
    },
    async saveFilterStationId(stationId) {
      this.stationId = stationId;
      await this.mutateCurrentURL();
      await this.emitFilter();
      await this.$router.go();
    },
    async mutateCurrentURL() {
      try {
        const scheduleTypeId = this.scheduleTypeOptions.find(item => item.value === this.scheduleType);
        const origin = window.location.href.split("?");
        const dateStart = this.$moment(this.selectedDateStart).format('YYYYMMDD');
        const dateEnd = this.$moment(this.selectedDateEnd).format('YYYYMMDD');
        const urlBase = `${origin[0]}?stationId=${this.stationId}&type=${scheduleTypeId ? scheduleTypeId.id : 1 }&dateStart=${dateStart}&dateEnd=${dateEnd}`;
        window.history.replaceState({}, "", urlBase);
      } catch (error) {
        console.log(error);
      }
    },
    async mutateCurrentURLBrowser(data) {
      try {
        let paramsUrl = '';
        Object.keys(data).forEach((item, index) => {
          if(this.$filter.fields.hasOwnProperty(item)) {
            if(index === 0) {
              paramsUrl += this.validateObjectFilter('?', item, data);
            } else {
              paramsUrl += this.validateObjectFilter('&', item, data);
            }
          }
        });
        const origin = window.location.href.split('?');
        const urlBase = `${origin[0]}${paramsUrl}`
        window.history.replaceState({}, '', urlBase);
      } catch (error) {
        console.log(error);
      }
    },
    // validate Object Filter
    validateObjectFilter(operator = '?', item, data) {
      if(data[item]) {
        if(typeof data[item] === 'object' 
          || Array.isArray(data[item])) {
          return  `${operator}${item}=${JSON.stringify(data[item])}`;
        }
        return `${operator}${item}=${data[item]}`;
      }
      return '';
    },
    emitFilter() {
      //Add Values
      setTimeout(() => {
        this.setFilter();
      }, 1000);
    },
    emitFilterSchedule(filter) {
      //Add Values
      this.$filter.addValues(filter)
      //Call back
      if (this.filter && this.filter.callBack) this.filter.callBack(this.filter)
    },
    addNewDayToSchedule(event) {
      try {
        const date = `${this.$moment(event.date).format('YYYY-MM-DD')}T23:59:59`;
        this.sessionStationId = sessionStorage.getItem("stationId") !== 'null' ? sessionStorage.getItem("stationId") : null;
        const data = {
          calendarTitle: null,
          id: this.$uid(),
          sta: null,
          std: null,
          stationId: this.sessionStationId,
          preFlightNumber: null,
          gateId: null,
          scheduleStatusId: null,
          inboundScheduledArrival: date,
          isUpdate: true, 
        }
        this.events.push({...data});
      } catch (error) {
        console.log(error);
      } 
    },
    dismissEvent(event) {
      if(typeof event.id === "number") {
        const eventFind = this.events.find(item => item.id === event.id);
        if(eventFind) {
          eventFind.isUpdate = false;
        }
        return;
      }
      this.events = this.events.filter(item => item.id !== event.id);
    }
  },
};
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css">
</style>