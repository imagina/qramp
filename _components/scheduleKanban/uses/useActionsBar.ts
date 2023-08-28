import Vue, { computed, ref, getCurrentInstance } from "vue";
import buildKanbanStructure from "../actions/buildKanbanStructure";
import storeFilters from "../store/filters.store";
import moment from "moment";
import getTitleFilter from "../actions/getTitleFilter";
import setUrlParams from "../actions/setUrlParams";

export default function useActionsBar(props: any) {
  const proxy = (getCurrentInstance() as any).proxy as any;
  const selectedDate = computed(() => moment(storeFilters.selectedDate));
  const titleFilter = computed(() => storeFilters.titleFilter);
  async function changeDate(offset: number): Promise<void> {
    const router = proxy.$router;
    const route = proxy.$route;
    const dayMultiplier = storeFilters.scheduleType === "week-agenda" ? 7 : 1;
    const adjustedOffset = dayMultiplier * offset;

    storeFilters.selectedDate = selectedDate.value
      .add(adjustedOffset, "days")
      .format("YYYY/MM/DD");
    await setUrlParams(router, route.name);
    await buildKanbanStructure();
  }

  async function next(): Promise<void> {
    await changeDate(1);
    getTitleFilter()
  }

  async function back(): Promise<void> {
    await changeDate(-1);
    getTitleFilter()
  }
  function openDrawerFilter() {
    storeFilters.showModal = true;
  }
  return {
    next,
    back,
    openDrawerFilter,
    titleFilter,
  };
}

