<template>
  <div
    :class="{'fullscreen tw-bg-white tw-p-3': fullscreen }"
  >
    <div class="box box-auto-height q-mb-md">
      <page-actions
        :title="$t('ifly.cms.sidebar.schedule')"
        :extra-actions="extraPageActions"
        class="q-mb-md"
      />
    </div>
    <q-btn-toggle
      v-model="scheduleType"
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
    {{   }}
    <q-calendar
      ref="schedule"
      v-model="selectedDate"
      :view="scheduleType"
      locale="en-us"
      class="tw-w-full"
      animated
      @click:day2="eventSchedule"
      @click:day:header2="eventSchedule"
    >
      <template 
        #day-header="{ timestamp }"
        v-if="scheduleType === 'week' || scheduleType === 'day'"
      >
        <div 
          class="
            tw-overflow-y-auto 
            tw-overflow-x-hidden 
            tw-h-28
            tw-px-2"
        >
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
              <i class="fak fa-plane-right-thin-icon" />
              <span class="ellipsis">
                {{
                  event.calendarTitle
                }}
              </span>
            </q-badge>
          </div>
        </div>
      </template>
      <template 
        #day="{ timestamp }"
        v-if="scheduleType === 'month'"
      >
        <div 
          class="
            tw-overflow-y-auto 
            tw-overflow-x-hidden 
            tw-h-28
            tw-px-2"
        >
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
      <q-spinner color="primary" size="5em" />
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
import {
  STATUS_POSTED,
  STATUS_SUBMITTED,
  STATUS_CLOSED,
  STATUS_DRAFT,
  STATUS_SCHEDULE,
} from "../model/constants"
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
          value: "week",
          icon: "fas fa-calendar-week",
        },
        {
          label: this.$tr("isite.cms.label.day"),
          value: "day",
          icon: "fas fa-calendar-day",
        },
      ],
    };
  },
  created() {
    this.$nextTick(function () {
      this.setFilter();
      this.$root.$on('page.data.refresh', () => this.getWorkOrderFilter(true));
    })
  },
  beforeDestroy() {
    this.$filter.setFilter({});
  },
  computed: {
    extraPageActions() {
      return [
        {
          label: this.$t('isite.cms.configList.fullScreen', { capitalize: true }),
          props: {
            icon: this.fullscreen ? 'fullscreen_exit' : 'fullscreen',
          },
          action: () => {
            this.fullscreen = !this.fullscreen;
            this.$q.fullscreen.toggle();
          },
        },
      ];
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
      const filter = Object.keys(this.$filter.values).length > 0 ? this.$filter.values : null;
      if(!filter) {
        this.events = []; 
        const lastStart = this.$refs.schedule.lastStart;
        const lastEnd = this.$refs.schedule.lastEnd;
        const filter = this.getCurrentFilterDate(lastStart, lastEnd);
        await this.getWorkOrders(false, filter);
      }
    },
    getEvents(timestamp) {
      try {
        let events = this.$clone(this.events || []);
        return events.filter(event => {
          if(event.inboundScheduledArrival) {
            const momentDate = this.$moment(
            event.inboundScheduledArrival,
            "YYYY-MM-DD"
            ).toDate();
            let eventDate = calendar.parseDate(momentDate);
            return eventDate.date === timestamp;
          }
          return false;
        });
      } catch (error) {
        console.log(error);
      }
    },
    eventSchedule(event) {
      this.selectedData = event.scope.timestamp;
      this.$refs.modalForm.openModal(
        `Create schedule date: ${event.scope.timestamp.date}`
      );
    },
    editSchedule(event) {
      this.showWorkOrder(event);
    },
    addSchedule(data) {
      try {
        this.events.push({
          id: this.events.length + 1,
          date: this.selectedData.date,
          ...data,
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateSchedule(data) {
      try {
        const event = this.events.find(
          (item) => item.id === this.selectedData.id
        );
        if (event) {
          event.title = data.title;
          event.STA = data.STA;
          event.STD = data.STD;
          event.preFlightNumber = data.preFlightNumber;
          event.gateId = data.gateId;
          event.color = data.color;
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
        return {
          date: {
            field:"inbound_scheduled_arrival",
            type: "customer",
            from: lastStart,
            to: lastEnd
          }
       }
    },
    async getWorkOrderFilter(refresh = false) {
      try {
        const from = Object.keys(this.$filter.values).length > 0 ? this.$filter.values.date.from : null;
        const lastStart = this.$moment().startOf('month').startOf("day").format('YYYY-MM-DD HH:mm:ss');
        const lastEnd = this.$moment().endOf('month').endOf("day").format('YYYY-MM-DD HH:mm:ss');
        const filter = this.getCurrentFilterDate(lastStart, lastEnd);
        const filterCurrent = Object.keys(this.$filter.values).length > 0 ? this.$filter.values : filter;
        this.selectedDate = from ? from : this.$moment().format("YYYY-MM-DD HH:mm:ss");
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
            include: 'flightStatus,gate',
            filter: {
              //statusId: 2,
              ...filter,
              withoutDefaultInclude: true,
            },
          },
        };
        const response = await this.$crud.index(
          "apiRoutes.qramp.workOrders",
          params
        );
        this.events = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    showWorkOrder(data) {
      this.$crud.show('apiRoutes.qramp.workOrders', data.id,
        {
          refresh: true,
          params: {
            include: "customer,workOrderStatus,operationType,station,contract,responsible,flightStatus"
          }
        }).then((item) => {
          if(item.statusId !== STATUS_SCHEDULE) {
            this.$refs.formOrders.loadform({
              modalProps: {
                title: `${this.$tr('ifly.cms.form.updateWorkOrder')} Id: ${data.id}`,
                update: true,
                workOrderId: data.id,
                width: '90vw'
              },
              data: item.data,
            })
            return;
          }
          this.selectedData = item.data;
          this.$refs.modalForm.openModal("Edit schedule", item.data);
        }).catch((err) => {
          console.log(err);
        });
    },
    getFilter() {
      this.events = []; 
      this.getWorkOrderFilter(true);
    },
    setFilter() {
      return new Promise(async (resolve, reject) => {
        this.$filter.setFilter({
          name: this.$route.name,
          fields: {
            date: {
              props: {
                label: "Arrival Date",
              },
              name: "inboundScheduledArrival",
              field: { value: "inbound_scheduled_arrival" },
            },
            statusId: {
              value: null,
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.qramp.workOrderStatuses',
                select: { 'label': 'statusName', 'id': 'id' },
              },
              props: {
                label: 'Status',
                'clearable': true
              },
            },
          },
          callBack: this.getFilter,
        });
        resolve(true);
      })
    }
  },
};
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css">
</style>