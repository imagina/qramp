import Vue, { ref, reactive, watch, computed } from 'vue';
import moment from "moment";
import storeKanban from "../store/kanban.store";
import modelHoursFilter from "../models/hoursFilter.model";

export default function useKanbanBoard() {
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

    const columns = ref<any[]>([]);
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
        const cards = [
          { hour: "00", data: [{ "id": 1 }] },
          { hour: "01", data: [{ "id": 2 }] },
          { hour: "02", data: [{ "id": 3 }] },
          { hour: "03", data: [{ "id": 4 }] },
          { hour: "04", data: [{ "id": 5 }] },
          { hour: "05", data: [{ "id": 6 }] },
          { hour: "06", data: [{ "id": 7 }] },
          { hour: "07", data: [{ "id": 8 }] },
          { hour: "08", data: [{ "id": 9 }] },
          { hour: "09", data: [{ "id": 10 }] },
          { hour: "10", data: [{ "id": 11 }] },
          { hour: "11", data: [{ "id": 12 }] },
          { hour: "12", data: [{ "id": 13 }] },
          { hour: "13", data: [{ "id": 14 }] },
          { hour: "14", data: [{ "id": 15 }] },
          { hour: "15", data: [{ "id": 16 }] },
          { hour: "16", data: [{ "id": 17 }] },
          { hour: "17", data: [{ "id": 18 }] },
          { hour: "18", data: [{ "id": 19 }] },
          { hour: "19", data: [{ "id": 20 }] },
          { hour: "20", data: [{ "id": 21 }] },
          { hour: "21", data: [{ "id": 22 }] },
          { hour: "22", data: [{ "id": 23 }] },
          { hour: "23", data: [{ "id": 24 }] },
        ];
        columns.value.push({
          date: date,
          cards: cards,
        });
      }
      console.log(columns)
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
}