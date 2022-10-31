<template>
  <div 
    :class="{'fullscreen tw-bg-white tw-p-3': fullscreen }">
    <div 
      class="
        tw-w-full 
        tw-text-right 
        tw-py-4"
      >
      <q-btn
        color="secondary"
        size="sm"
        @click="fullscreen = !fullscreen"
        :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
        :label="$t('isite.cms.configList.fullScreen', {capitalize: true})"
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
      <template #day-header="{ timestamp }">
        <div
          v-for="(event, index) in getEvents(timestamp.date)"
          :key="event.id"
        >
          <q-badge
            :key="index"
            class="tw-cursor-pointer"
            @click.stop.prevent="editSchedule(event)"
            :style="{ backgroundColor: event.color }"
          >
            <i class="fak fa-plane-right-thin-icon" /><span class="ellipsis">{{
              event.title
            }}</span>
          </q-badge>
        </div>
      </template>
      <template #day="{ timestamp }">
        <div
          v-for="(event, index) in getEvents(timestamp.date)"
          :key="event.id"
        >
          <q-badge
            :key="index"
            class="tw-cursor-pointer"
            @click.stop.prevent="editSchedule(event)"
            :style="{ backgroundColor: event.color }"
          >
            <i class="fak fa-plane-right-thin-icon" /><span class="ellipsis">{{
              event.title
            }}</span>
          </q-badge>
        </div>
      </template>
    </q-calendar>
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
import eventModel from "./models/eventModel.js";
import modalForm from "./modalForm.vue";
export default {
  components: {
    QCalendar,
    modalForm,
  },
  data() {
    return {
      fullscreen: false,
      selectedDate: this.$moment().format("YYYY-MM-DD"),
      selectedData: null,
      scheduleType: "month",
      events: eventModel,
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
  methods: {
    scheduleNext() {
      this.$refs.schedule.next();
    },
    schedulePrev() {
      this.$refs.schedule.prev();
    },
    getEvents(timestamp) {
      try {
        let events = this.$clone(this.events || []);
        let response = [];
        events.forEach((event) => {
          const momentDate = this.$moment(event.date, "YYYY-MM-DD").toDate();
          let eventDate = calendar.parseDate(momentDate);
          if (eventDate.date === timestamp) {
            response.push({
              ...event,
            });
          }
        });
        return response;
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
  },
};
</script>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css">
#myDiv.fullscreen{
    z-index: 9999; 
    width: 100%; 
    height: 100%; 
    position: absolute; 
    top: 0; 
    left: 0;

 }
</style>