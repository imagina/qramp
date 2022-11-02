<template>
  <div>
    <div class="box box-auto-height q-mb-md">
      <page-actions
        :title="$t('ifly.cms.sidebar.schedule')"
        :extra-actions="extraPageActions"
        class="q-mb-md"
      />
    </div>
    <div class="tw-w-full tw-text-right tw-py-4">
      <q-btn
        color="secondary"
        size="sm"
        @click="$q.fullscreen.toggle()"
        :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        :label="$t('isite.cms.configList.fullScreen', { capitalize: true })"
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
          v-for="(event, index) in getEvents(timestamp.date)"
          :key="event.id"
        >
          <q-badge
            :key="index"
            class="tw-cursor-pointer"
            @click.stop.prevent="editSchedule(event)"
            :style="{ backgroundColor: event.flightStatusColor }"
          >
            <i class="fak fa-plane-right-thin-icon" />
            <span class="ellipsis">
              {{
                event.calendarTitle || event.title || event.inboundTailNumber
              }}
            </span>
          </q-badge>
        </div>
      </template>
      <template 
        #day="{ timestamp }"
        v-if="scheduleType === 'month'"
      >
        <div
          v-for="(event, index) in getEvents(timestamp.date)"
          :key="event.id"
        >
          <q-badge
            :key="index"
            class="tw-cursor-pointer"
            @click.stop.prevent="editSchedule(event)"
            :style="{ backgroundColor: event.flightStatusColor }"
          >
            <i class="fak fa-plane-right-thin-icon" /><span class="ellipsis">
              {{
                event.calendarTitle || event.title || event.inboundTailNumber 
              }}
            </span>
          </q-badge>
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
  </div>
</template>
<script>
import calendar, { QCalendar } from "@quasar/quasar-ui-qcalendar";
import modalForm from "./modalForm.vue";
export default {
  components: {
    QCalendar,
    modalForm,
  },
  data() {
    return {
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
  async created() {
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
      },
      callBack: () => { this.getFilter() },
    });
  },
  computed: {
    extraPageActions() {
      return [
        {
          //action to turn view type
          label: this.$tr(`isite.cms.label.view`),
          vIf: false,
          props: {
            icon:
              this.view == "calendar"
                ? "fas fa-list-ul"
                : "fas fa-calendar-alt",
          },
          action: () => {
            this.view = this.view == "calendar" ? "crud" : "calendar";
          },
        },
      ];
    },
  },
  methods: {
    async scheduleNext() {
      this.events = []; 
      await this.$refs.schedule.next();
      await this.getListOfSelectedWorkOrders();
    },
    async schedulePrev() {
      this.events = []; 
      await this.$refs.schedule.prev();
      await this.getListOfSelectedWorkOrders();
    },
    async getListOfSelectedWorkOrders() {
      const from = this.$filter.values.date.from;
      if(!from) {
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
          const momentDate = this.$moment(
            event.inboundScheduledArrival,
            "YYYY-MM-DD"
          ).toDate();
          let eventDate = calendar.parseDate(momentDate);
          return eventDate.date === timestamp;
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
      this.selectedData = event;
      this.$refs.modalForm.openModal("Edit schedule", this.selectedData);
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
          event.flightNumber = data.flightNumber;
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
        const from = this.$filter.values.date.from;
        const lastStart = this.$moment().startOf('month').startOf("day").format('YYYY-MM-DD HH:mm:ss');
        const lastEnd = this.$moment().endOf('month').endOf("day").format('YYYY-MM-DD HH:mm:ss');
        const filter = this.getCurrentFilterDate(lastStart, lastEnd);
        const filterCurrent = from ? this.$filter.values : filter;
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
    getFilter() {
      this.events = []; 
      this.getWorkOrderFilter(true);
      this.$root.$on('page.data.refresh', () => this.getWorkOrderFilter(true));
    },
  },
};
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css">
</style>