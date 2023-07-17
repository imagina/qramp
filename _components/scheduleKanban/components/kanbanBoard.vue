<template>
  <div class="tw-flex tw-space-x-8">
    <div
      class="tw-flex-none tw-py-4 tw-border-b tw-border-gray-200 tw-space-y-4"
    >
      <q-btn-toggle
        v-model="scheduleType"
        rounded
        no-caps
        unelevated
        toggle-color="blue-grey"
        color="grey-2"
        text-color="blue-grey"
        :options="scheduleTypeOptions"
        id="btnCalendarType"
        size="14px"
        spread
        class="tw-py-2"
      />
      <q-date v-model="selectedDate" minimal size="sm"/>
      <dynamic-field v-model="filterTime" :field="dynamicFieldTime" />
    </div>

    <div class="tw-flex-1 tw-h-auto tw-flex tw-overflow-x-auto">
      <kanbanColumn
        v-for="(column, index) in columns"
        :key="index"
        :date="column.date"
        :cards="column.cards"
        :groupOptions="groupOptions"
        class="tw-flex-none tw-space-y-0 tw-h-auto tw-rounded-lg tw-shadow-md tw-border tw-w-48 tw-mx-2"
        :class="{
          'tw-border-blue-800 tw-bg-blue-800 tw-bg-opacity-20':
            selectedDate === column.date.format('YYYY/MM/DD'),
          'tw-border-gray-200':
            selectedDate !== column.date.format('YYYY/MM/DD'),
        }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, ref, reactive, watch, computed } from "vue";
import kanbanColumn from "./kanbanColumn.vue";
import moment from "moment";
import storeKanban from "../store/kanban";
import modelHoursFilter from "../models/modelHoursFilter";

export default defineComponent({
  components: {
    kanbanColumn,
  },
  setup() {
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
    const selectedDate = computed({
      get: () => storeKanban.selectedDate,
      set: (value) => (storeKanban.selectedDate = value),
    });

    const scheduleType = computed({
      get: () => storeKanban.scheduleType,
      set: (value) => (storeKanban.scheduleType = value),
    });

    const groupOptions = { name: "kanban-columns" };

    const columns = ref([]);
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

    const updateColumns = () => {
      const startOfWeek = moment(selectedDate.value).startOf("week");
      columns.value = [];
      for (let i = 0; i <= 6; i++) {
        const date = moment(startOfWeek).add(i, "days");
        const cards = [];
        cards.push(
          {
            title: date.format("YYYY-MM-DD"),
            description: "Descripción de la tarea 1",
          },
          { title: `${i}`, description: "Descripción de la tarea 2" }
          // Puedes agregar más ejemplos de tarjetas aquí
        );
        columns.value.push({
          date: date,
          cards: cards,
        });
      }
    };

    watch(selectedDate, updateColumns);
    updateColumns();
    return {
      selectedDate,
      columns,
      groupOptions,
      updateColumns,
      scheduleTypeOptions,
      scheduleType,
      filterTime,
      dynamicFieldTime,
    };
  },
});
</script>

<style scoped></style>
