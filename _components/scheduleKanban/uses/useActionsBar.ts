import Vue, { computed, ref, getCurrentInstance } from "vue";
import buildKanbanStructure from "../actions/buildKanbanStructure";
import storeFilters from "../store/filters.store";
import moment from "moment";
import getTitleFilter from "../actions/getTitleFilter";
import setUrlParams from "../actions/setUrlParams";
import storeKanban from "../store/kanban.store";
import scheduleTypeModel from "../models/scheduleType.model";

export default function useActionsBar(props: any) {
  const proxy = (getCurrentInstance() as any).proxy as any;
  const selectedDate = computed(() => moment(storeFilters.selectedDate));
  const titleFilter = computed(() => storeFilters.titleFilter);
  const isWeekAgenda = computed(() => storeKanban.scheduleType == scheduleTypeModel[0].value );
  async function changeDate(offset: number): Promise<void> {
    const dayMultiplier = storeFilters.scheduleType === scheduleTypeModel[0].value ? 7 : 1;
    const adjustedOffset = dayMultiplier * offset;

    storeFilters.selectedDate = selectedDate.value
      .add(adjustedOffset, "days")
      .format("YYYY/MM/DD");
    await setUrlParams(proxy);
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

  async function week(){
    storeKanban.scheduleType = scheduleTypeModel[0].value; //week view
    await setUrlParams(proxy);
    await buildKanbanStructure();
    getTitleFilter()
  }

  async function today(){
    storeKanban.scheduleType = scheduleTypeModel[1].value; //day view
    storeFilters.selectedDate = moment().format('YYYY/MM/DD');
    await setUrlParams(proxy);
    await buildKanbanStructure();
    getTitleFilter()
  }

  return {
    next,
    back,
    openDrawerFilter,
    titleFilter,
    isWeekAgenda,
    week,
    today
  };
}

