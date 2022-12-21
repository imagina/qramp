<template>
  <q-form ref="lineForm">
    <div
      class="
        tw-border
        tw-rounded-lg
        tw-py-3
        tw-px-4
        tw-mx-2
        tw-my-1
        lg:tw-flex
        lg:tw-space-x-2
      "
    >
      <div v-for="(field, keyField) in fields.form" :key="keyField">
        <dynamic-field
          :field="field"
          v-model="event[keyField]"
          class="tw-w-full lg:tw-w-48"
          :class="{ 'tw-hidden tw-w-0': keyField === 'stationId' }"
        />
      </div>
      <div class="tw-space-x-2 tw-my-1">
        <button
          v-if="event.isUpdate && !isBlank"
          class="tw-bg-blue-800 tw-rounded-lg tw-px-2 tw-py-1 tw-text-white"
          @click.prevent="save"
        >
          <i class="fa-light fa-floppy-disk" />
          <q-tooltip>
            Save
          </q-tooltip>
        </button>
        <button
          v-if="event.isUpdate"
          @click.prevent="$emit('dismissEvent', event)"
          class="tw-bg-blue-800 tw-rounded-lg tw-px-2 tw-py-1 tw-text-white"
        >
          <i class="fa-light fa-xmark"></i>
          <q-tooltip>
            Discard
          </q-tooltip>
        </button>
      </div>
    </div>
  </q-form>
</template>
<script>
import scheduleField from "./fields/scheduleField.js";
import qRampStore from '../../_store/qRampStore.js';

export default {
  mixins: [scheduleField],
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.$nextTick(async function () {
      this.sessionStationId =
        sessionStorage.getItem("stationId") !== "null"
          ? sessionStorage.getItem("stationId")
          : null;
      await this.getScheduleStatusList();
    });
  },
  computed: {
    tranformaDate() {
        const inboundScheduledArrival = `${this.$moment(this.event.inboundScheduledArrival).format('MM/DD/YYYY')} ${this.event.sta}`;
        this.event.sta = this.$moment(this.event.sta, 'HH:mm:ss').format('HH:mm');
        this.event.std = this.$moment(this.event.std, 'HH:mm:ss').format('HH:mm');
        return {
            sta: this.event.sta,
            std: this.event.std,
            stationId: this.event.stationId,
            preFlightNumber: this.event.preFlightNumber,
            gateId: this.event.gateId,
            scheduleStatusId: this.event.scheduleStatusId,
            inboundScheduledArrival: inboundScheduledArrival,
        }
    },
    isBlank() {
      return qRampStore().getIsblank();
    },
  },
  methods: {
    save() {
      try {
        this.$refs.lineForm.validate().then(async (success) => {
          if (success) {
            if (this.event.isUpdate && typeof this.event.id === "string") {
              this.event.isUpdate = false;  
              this.$emit("addSchedule", this.tranformaDate);
            } else {
              this.event.isUpdate = false;
              this.$emit("updateSchedule", {...this.tranformaDate, id: this.event.id});
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>