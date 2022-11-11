<template>
  <div :class="{ 'fullscreen tw-bg-white tw-p-3': fullscreen }">
    <div class="box box-auto-height q-mb-md">
      <page-actions
        :title="$t('ifly.cms.sidebar.schedule')"
        :extra-actions="extraPageActions"
        :excludeActions="fullscreen ? ['filter'] : []"
        @refresh="getWorkOrderFilter(true)"
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
      style="height: calc(100vh - 50px)"
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
        <div  class="tw-overflow-y-auto tw-overflow-x-hidden tw-h-28 tw-px-2">
          <div
            v-for="(event, index) in getEvents(timestamp.date)"
            :key="event.id"
          >
            <q-badge
              :key="index"
              class="tw-cursor-pointer"
              @click.stop.prevent="editSchedule(event)"
              :class="`bg-${event.flightStatusColor}`"
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
                  v-if="event.time"
                  class="
                    tw-text-xs
                    tw-my-1
                    tw-px-1
                    tw-mx-2
                    tw-rounded-md
                    tw-text-white
                    tw-cursor-pointer"
                  @click.stop.prevent="editSchedule(event)"
                  :class="event.flightStatusColor ? `bg-${event.flightStatusColor}`: 'tw-bg-blue-800'"
                  :style="badgeStyles(event, 'body', timeStartPos, timeDurationHeight)"
                >
                  <div
                    class="tw-font-semibold"
                    style="font-size: 9.5px"
                  >
                    <i class="fak fa-plane-right-thin-icon" />
                    {{ event.calendarTitle }}
                  </div>
                  <div>
                    Time: {{ event.time }}
                  </div>
                </div>
              </template>
          </template>
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
            fa-duotone fa-loader fa-spin fa-pulse
            tw-text-7xl tw-text-blue-800
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
  </div>
</template>
<script>
import calendar, { QCalendar } from "@quasar/quasar-ui-qcalendar";
import modalForm from "./modalForm.vue";
import formOrders from "../formOrders.vue";
import _ from "lodash";

import {
  STATUS_POSTED,
  STATUS_SUBMITTED,
  STATUS_CLOSED,
  STATUS_DRAFT,
  STATUS_SCHEDULE,
} from "../model/constants";
import eventModel from './models/eventModel.js';
export default {
  components: {
    QCalendar,
    modalForm,
    formOrders,
  },
  data() {
    return {
      fullscreen: false,
      loading: false,
      eventLoading: false,
      selectedDate: this.$moment().format("YYYY-MM-DD"),
      selectedData: null,
      scheduleType: "month",
      events: [],
      scheduleTypeOptions: [
        {
          label: this.$tr("isite.cms.label.month"),
          value: "month",
          icon: "fas fa-calendar-alt",
        },
        {
          label: this.$tr("isite.cms.label.week"),
          value: "week-agenda",
          icon: "fas fa-calendar-week",
        },
        {
          label: this.$tr("isite.cms.label.day"),
          value: "day-agenda",
          icon: "fas fa-calendar-day",
        },
      ],
    };
  },
  watch: {
    '$route': {
      deep: true,
      handler: async function () {
        this.$router.go();
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.setFilter();
    });
  },
  computed: {
    scheduleTypeComputed: {
      get() {
        return this.scheduleType;
      },
      async set(value) {
        this.scheduleType = value;
        await this.$refs.schedule;
        await this.getListOfSelectedWorkOrders();
      },
    },
    extraPageActions() {
      return [
        {
          label: 'Copy Tiny URL',
          props: {
            icon: 'fa-light fa-copy',
          },
          action: () => {
            let hrefSplit = window.location.href.split("?")
            let tinyUrl = this.$store.state.qsiteApp.originURL+'/#/ramp/schedule/public/index';
            if(hrefSplit[1])
              tinyUrl = tinyUrl + '?' + hrefSplit[1];
            this.$helper.copyToClipboard(tinyUrl,"Tiny URL copied!")
          },
        },
        {
          label: this.$t('isite.cms.configList.fullScreen', { capitalize: true }),
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
                clearable: true,
              },
            },
            stationId: {
              value: null,
              type: "select",
              loadOptions: {
                apiRoute: "apiRoutes.qsetupagione.setupStations",
                select: { label: "stationName", id: "id" },
              },
              props: {
                label: "Station",
                clearable: true,
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
          },
          callBack: this.getFilter,
          storeFilter: false,
        };
    },  
  },
  methods: {
    async scheduleNext() {
      await this.$refs.schedule.next();
      await this.getListOfSelectedWorkOrders();
    },
    async schedulePrev() {
      await this.$refs.schedule.prev();
      await this.getListOfSelectedWorkOrders();
    },
    async getListOfSelectedWorkOrders() {
      try {
        this.events = [];
        const lastStart = this.$refs.schedule.lastStart;
        const lastEnd = this.$refs.schedule.lastEnd;
        await this.getWorkOrderFilter(false, lastStart, lastEnd);
      } catch (error) {
        console.log(error);
      }
    },
    getEvents(timestamp) {
      try {
        let events = this.$clone(this.events || []);
        const filters = events.filter((event) => {
          if (event.inboundScheduledArrival) {
            const momentDate = this.$moment(
              event.inboundScheduledArrival,
              "YYYY-MM-DD"
            ).toDate();

            let eventDate = calendar.parseDate(momentDate);
            return eventDate.date === timestamp;
          }
          return false;
        }).map(item => ({
          ...item,
          time: item.sta,
        }));
        return _.orderBy(filters, ['inboundScheduledArrival', 'time'], ['asc', 'asc']);
      } catch (error) {
        console.log(error);
      }
    },
    eventsMap() {
      const map = {};
      this.events.forEach((event) =>
        (map[event.inboundScheduledArrival] =
          map[event.inboundScheduledArrival] || []).push(event)
      );
      return map;
    },
    eventSchedule(event) {
      this.selectedData = event.scope.timestamp;
      this.$refs.modalForm.openModal(
        `Create schedule date: ${event.scope.timestamp.date}`,
        null,
        event.scope.timestamp.date
      );
    },
    editSchedule(event) {
      this.showWorkOrder(event);
    },
    async addSchedule(data) {
      try {
        await this.$refs.modalForm.setLoading(true);
        const response = await this.saveRequestSimpleWorkOrder(data);
        this.events.push({ ...response.data });
        await this.$refs.modalForm.setLoading(false);
        await this.$refs.modalForm.hideModal();
      } catch (error) {
        console.log(error);
        await this.$refs.modalForm.setLoading(false);
      }
    },
    updateSchedule(data) {
      try {
        const event = this.events.find(
          (item) => item.id === this.selectedData.id
        );
        if (event) {
          event.title = data.calendarTitle;
          event.sta = data.sta;
          event.std = data.std;
          event.preFlightNumber = data.preFlightNumber;
          event.gateId = data.gateId;
        }
      } catch (error) {
        console.log(error);
      }
    },
    deleteSchedule() {
      try {
        const events = this.events.filter(
          (item) => item.id !== this.selectedData.id
        );
        this.events = events;
      } catch (error) {
        console.log(error);
      }
    },
    getCurrentFilterDate(lastStart, lastEnd) {
      try {
        let lastStartM = this.$moment(lastStart)
          .startOf("month")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
        let lastEndM = this.$moment(lastEnd)
          .endOf("month")
          .endOf("day")
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
      dateEnd = null
    ) {
      try {
        let lastStart = this.$moment(this.selectedDate)
          .startOf("month")
          .startOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
        let lastEnd = this.$moment(this.selectedDate)
          .endOf("month")
          .endOf("day")
          .format("YYYY-MM-DD HH:mm:ss");
        if (dateStart && dateEnd) {
          lastStart = dateStart;
          lastEnd = dateEnd;
        }
        const currentFilterDate = this.getCurrentFilterDate(lastStart, lastEnd);
        const filter =  Object.keys(this.$route.query).length === 0 ? this.$filter.values : this.$route.query;
        const thereAreFilters =
          Object.keys(filter).length > 0
            ? filter
            : {};
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
        this.loading = true;
        const params = {
          refresh,
          params: {
            include: "flightStatus,gate",
            filter: {
              ...filter,
              withoutDefaultInclude: true,
              order: {
                field: "inbound_scheduled_arrival",
                way: "asc",
              },
            },
          },
        };
        const response = await this.$crud.index(
          "apiRoutes.qramp.workOrders",
          params
        );
        this.events = response.data;
        //this.events = eventModel;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    showWorkOrder(data) {
      this.$crud
        .show("apiRoutes.qramp.workOrders", data.id, {
          refresh: true,
          params: {
            include:
              "customer,workOrderStatus,operationType,station,contract,responsible,flightStatus",
          },
        })
        .then((item) => {
          if (item.statusId !== STATUS_SCHEDULE) {
            this.$refs.formOrders.loadform({
              modalProps: {
                title: `${this.$tr("ifly.cms.form.updateWorkOrder")} Id: ${
                  data.id
                }`,
                update: true,
                workOrderId: data.id,
                width: "90vw",
              },
              data: item.data,
            });
            return;
          }
          this.selectedData = item.data;
          this.$refs.modalForm.openModal("Edit schedule", item.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFilter() {
      this.events = [];
      this.getWorkOrderFilter();
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
    badgeStyles (event, type, timeStartPos, timeDurationHeight) {
      const s = {}
      if (timeStartPos) {
        // don't clamp position to 0px
        s.top = timeStartPos(event.time, false) + 'px'
        s.position = 'absolute'
        if (event.side !== undefined) {
          s.width = '50%'
          if (event.side === 'right') {
            s.left = '50%'
          }
        }
        else {
          s.width = '100%'
        }
      }
      if (timeDurationHeight) {
        s.height = timeDurationHeight(event.duration) + 'px'
      }
      s['align-items'] = 'flex-start'
      return s
    },
  },
};
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css">
</style>