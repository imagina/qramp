<template>
  <div>
    <q-form ref="lineForm">
      <div
        class="
          tw-border tw-rounded-lg tw-py-3 tw-px-4 tw-mx-2 tw-my-1
          lg:tw-flex lg:tw-space-x-2 lg:tw-flex-wrap md:tw-flex-wrap
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
            class="tw-bg-green-500 tw-rounded-lg tw-px-2 tw-py-1 tw-text-white"
            @click.prevent="save(STATUS_DRAFT)"
          >
            <i class="fa-sharp fa-regular fa-bring-forward" />
            <q-tooltip>
              Start Work Order
            </q-tooltip>
          </button>
          <button
            v-if="event.isUpdate && !isBlank"
            class="tw-bg-blue-800 tw-rounded-lg tw-px-2 tw-py-1 tw-text-white"
            @click.prevent="save"
          >
            <i class="fa-light fa-floppy-disk" />
            <q-tooltip>
              {{ $tr("isite.cms.label.save") }}
            </q-tooltip>
          </button>
          <button
            v-if="!isNaN(event.id) && event.isUpdate && !isBlank && permisionComments"
            class="tw-bg-blue-800 tw-rounded-lg tw-px-2 tw-py-1 tw-text-white"
            @click.prevent="openCommentsModal"
          >
            <i class="fa-light fa-comment" />
            <q-tooltip>
              {{ $tr("isite.cms.label.comment") }}
            </q-tooltip>
          </button>
          <button
            v-if="event.isUpdate"
            @click.prevent="$emit('dismissEvent', event)"
            class="tw-bg-blue-800 tw-rounded-lg tw-px-2 tw-py-1 tw-text-white"
          >
            <i class="fa-light fa-xmark"></i>
            <q-tooltip> Discard </q-tooltip>
          </button>
        </div>
      </div>
    </q-form>
    <commentsModal
      v-if="!isNaN(event.id)"
      :key="event.id"
      ref="commentsModal"
      :commentableId="event.id"
    />
  </div>
</template>
<script>
import scheduleField from "./fields/scheduleField.js";
import qRampStore from "../../_store/qRampStore.js";
import commentsModal from "./modals/commentsModal.vue";
import {STATUS_DRAFT} from '../model/constants.js';
export default {
  components: { commentsModal },
  mixins: [scheduleField],
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      STATUS_DRAFT,
    }
  },
  created() {
    this.$nextTick(async function () {
      this.sessionStationId =
        sessionStorage.getItem("stationId") !== "null"
          ? sessionStorage.getItem("stationId")
          : null;
      await this.getFlightStatusList();
    });
  },
  computed: {
    tranformaDate() {
      const inboundScheduledArrival = `${this.$moment(
        this.event.inboundScheduledArrival
      ).format("MM/DD/YYYY")} ${this.event.sta}`;
      this.event.sta = this.$moment(this.event.sta, "HH:mm:ss").format("HH:mm");
      this.event.std = this.$moment(this.event.std, "HH:mm:ss").format("HH:mm");
      return {
        isClone: this.event.isClone || false,
        sta: this.event.sta,
        std: this.event.std,
        stationId: this.event.stationId,
        preFlightNumber: this.event.preFlightNumber,
        gateId: this.event.gateId,
        flightStatusId: this.event.flightStatusId,
        acTypeId: this.event.acTypeId,
        inboundScheduledArrival: inboundScheduledArrival,
        carrierId: this.event.carrierId,
        statusId: this.event.statusId,
      };
    },
    isBlank() {
      return qRampStore().getIsblank();
    },
    permisionComments() {
      return this.$auth.hasAccess(`ramp.work-orders-comments.index`)
    },
  },
  methods: {
    save(statusId = null) {
      try {
        this.$refs.lineForm.validate().then(async (success) => {
          if (success) {
            if (this.event.isUpdate && typeof this.event.id === "string") {
              this.event.isUpdate = false;
              this.$emit("addSchedule", this.tranformaDate);
            } else {
              this.event.isUpdate = false;
              if(statusId) {
                this.event.statusId = statusId;
              }
              this.$emit("updateSchedule", {
                ...this.tranformaDate,
                id: this.event.id,
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    openCommentsModal() {
      if(this.$refs.commentsModal){
        this.$refs.commentsModal.showModal();
      }
    }
  },
};
</script>