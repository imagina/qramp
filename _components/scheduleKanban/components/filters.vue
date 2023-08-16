<template>
  <q-drawer
    v-model="showModal"
    overlay
    side="right"
    bordered
    :width="300"
    :breakpoint="500"
    class="bg-grey-3"
  >
    <!--Title-->
    <div class="
      row
      justify-between
      items-center
      q-pa-md"
    >
      <div class="text-subtitle1 row items-center">
        <q-icon
          name="fa-regular fa-filter"
          color="primary"
          size="20px"
          class="q-mr-sm"
        />
        <label class="
          text-primary
          text-weight-bold"
        >
          {{ $trp('isite.cms.label.filter', {capitalize: true}) }}
        </label>
        </div>
        <!-- Close icon -->
        <q-icon
          name="fa-light fa-xmark"
          color="blue-grey"
          size="20px"
          class="cursor-pointer"
          @click="showModal = false"
        />
    </div>
    <!--tabs-->
    <div class="text-center tw-px-4">
    <q-btn-toggle
      v-model="scheduleTypeModel"
      rounded
      no-caps
      unelevated
      spread
      toggle-color="primary"
      color="grey-2"
      text-color="primary"
      :options="scheduleTypeOptions"
      id="btnCalendarType"
      size="14px"
      padding="sm sm"
    />
    </div>
    <!--calendar-->
    <div class="text-center tw-p-4">
      <q-date class="text-primary shadow-4 custom_q_date"
        v-model="date"
        color="primary"
        minimal
        bordered
        today-btn
      />
    </div>
    <div class="tw-px-4 text-primary">
      <div v-for="(field, keyField) in filters" :key="keyField" >
        <dynamic-field v-model="form[keyField]" :field="field" />
      </div>
    </div>
    <!--footer -->
    <div class="
      text-center
      bg-white
      tw-p-3"
      ref="footerContent"
    >
      <q-btn
        :label="$tr('isite.cms.label.search')"
        unelevated
        color="primary"
        no-caps class="tw-w-full"
        rounded
        @click=""/>
    </div>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useFilters from '../uses/useFilters'
export default defineComponent({
  components: {},
  setup() {
    return {...useFilters()};
  },
  data () {
    return {
      date: new Date(), //dummy dev only
      scheduleTypeModel: 'week-agenda' //dummy dev only
    }
  },
  computed: {
    scheduleTypeOptions() {
      return [
        {
          id: 2,
          label: this.$tr("isite.cms.label.week"),
          value: "week-agenda",
          icon: "fa-light fa-calendar-lines"
        },
        {
          id: 3,
          label: this.$tr("isite.cms.label.day"),
          value: "day-agenda",
          icon: "fa-light fa-calendar-check",
        },
      ];
    },
  }
});
</script>
<style scoped>
.q-date {
  min-width: 200px !important;
}
</style>

