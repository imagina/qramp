import Vue, { ref, reactive, watch, computed } from 'vue';
import moment from "moment";
import storeKanban from "../store/kanban";
import modelHoursFilter from "../models/modelHoursFilter";

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
}