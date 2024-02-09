<template>
  <master-modal 
    v-model="visibleMapModal" 
    v-bind="modalProps" 
    :persistent="true" 
    :loading="loading" 
    @hide="close"
  >
    <searchFlights 
      v-if="!differenceInDays" 
      :workOrderData="workOrder" 
      :isSearch="false" 
    />
    <div v-if="differenceInDays">
      <div class="
       tw-py-4 
       tw-text-xl 
       tw-border 
       tw-shadow-lg 
       tw-p-4 tw-mx-4
       tw-rounded-md
       tw-text-center
       ">
        <div class="tw-py-3">
          <i class="fa-light fa-plane-circle-xmark tw-text-6xl tw-text-blue-900"></i>
        </div>
        <div>
          The date of this flight is more than 10 days, we do not have statistics for flights longer than 10 days
        </div>
      </div>
    </div>
  </master-modal>
</template>

<script>
import qRampStore from "../../_store/qRampStore.js";
import searchFlights from "src/modules/qfly/components/searchFlights/components/index.vue";
import moment from 'moment'

export default {
  components: {
    searchFlights,
  },
  data() {
    return {};
  },
  computed: {
    rightThumbColor() {
      if (this.standard.max >= 100) {
        return "tw-right-thumb tw-hidden";
      }
      return "tw-right-thumb";
    },
    visibleMapModal: {
      get() {
        return qRampStore().getVisibleMapModal();
      },
      set(value) {
        qRampStore().setVisibleMapModal(value);
      },
    },
    loading() {
      return qRampStore().getLoadingModalMap();
    },
    workOrder() {
      return qRampStore().getWorkOrder();
    },
    modalProps() {
      return {
        width: "90vw",
        title: `Flight Map : ${this.workOrder.workOrderId}`,
      };
    },
    differenceInDays() {
      const today = moment();
      const boundScheduleDate = moment(this.workOrder.boundScheduleDate);
      const differenceinDays = boundScheduleDate.diff(today, 'days');
      return differenceinDays > 10;
    }
  },
  methods: {
    close() {
      this.visibleMapModal = false;
      qRampStore().setFlightMap(null);
      qRampStore().setFlightId(null);
    },
  },
};
</script>

<style></style>