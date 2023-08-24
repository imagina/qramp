import Vue, { ref, computed, ComputedRef, WritableComputedRef } from 'vue';
import store from '../store/filters.store'
import actionsModal from '../models/actionsModal.model'
import { ModelActionsModalResult } from '../contracts/modelActionsModal.contract';
import scheduleTypeOptions from '../models/scheduleType.model'
import buildKanbanStructure from '../actions/buildKanbanStructure';
import getCurrentTime from '../actions/getCurrentTime';
import moment, { Moment } from 'moment';


export default function useFilters() {
  const form = computed(() => store.form);
  /**
   * Computed property indicating whether the application is in a filters state.
   * @type {ComputedRef<any>}
   */
  const filters: ComputedRef<any> = computed(() => store.filters);
  /**
   * Computed property indicating whether the application is in a loading state.
   * @type {ComputedRef<boolean>}
   */
  const loading: ComputedRef<boolean> = computed(() => store.loading);

  /**
   * Computed property representing the title of the modal.
   * @type {ComputedRef<string>}
   */
  const titleModal: ComputedRef<string> = computed(() => store.titleModal);

  /**
   * Writable computed property controlling the visibility of the modal.
   * @type {WritableComputedRef<boolean>}
   */
  const showModal: WritableComputedRef<boolean> = computed({
    /**
     * Get the current visibility state of the modal.
     * @returns {boolean} The visibility state of the modal.
     */
    get: () => store.showModal,
    /**
     * Set the visibility state of the modal.
     * @param {boolean} value - The new visibility state to set.
     */
    set: (value: boolean) => {
      store.showModal = value;
    }
  });

  /**
   * Writable computed property controlling the state of the toggle button.
   * @type {WritableComputedRef<string>}
   */
  const scheduleType: WritableComputedRef<string> = computed({
    /**
     * Get the current value of the toggle button .
     * @returns {string} The state of the toggle buton.
     */
    get: () => store.scheduleType,
    /**
     * Set the value state of the toggle button.
     * @param {string} value - The new value state to set.
     */
    set: (value: string) => {
      store.scheduleType = value;
    }
  });

  /**
   * Writable computed property controlling the state of the q-date calendar.
   * @type {WritableComputedRef<string>}
   */
  const selectedDate: WritableComputedRef<string> = computed({
    /**
     * Get the current value of the q-date calendar.
     * @returns {string} The state of the q-date calendar.
     */
    get: () => store.selectedDate,
    /**
     * Set the value state of the q-date calendar.
     * @param {string} value - The new value state to set.
     */
    set: (value: string) => {
      store.selectedDate = value;
    }
  });

  const { actions } = actionsModal() as ModelActionsModalResult;

  function checkFilters(){
    const stationId = '12' //dev only
    store.form.stationId = stationId //dev only
    store.form.time = getCurrentTime()  //sets the current time
  }

  // validate Object Filter
  function validateObjectFilter(operator = '?', item, data) {
    if (data[item]) {
      if (typeof data[item] === 'object'
        || Array.isArray(data[item])) {
        return `${operator}${item}=${JSON.stringify(data[item])}`;
      }
      return `${operator}${item}=${data[item]}`;
    }
    return '';
  }

  async function mutateCurrentURL(){
    try {
      const objUrl = {}
      const filters = Object.keys(objUrl).length === 0 ? store.payload : objUrl;
      let paramsUrl = '';
      //scheduleType: 'week-agenda',
      filters.type = 2
      const currentDay = moment(store.selectedDate)
      filters.dateStart = currentDay.startOf("week").format('YYYYMMDD')
      filters.dateEnd = currentDay.endOf("week").format('YYYYMMDD')

      Object.keys(filters).forEach((item, index) => {
        if (index === 0) {
          paramsUrl += validateObjectFilter('?', item, filters);
        } else {
          paramsUrl += validateObjectFilter('&', item, filters);
        }
      })
      const origin = window.location.href.split('?');
      const urlBase = `${origin[0]}${paramsUrl}`
      window.history.replaceState({}, '', urlBase);
    } catch (error) {
      console.log(error);
    }
  }

  async function callBuildKanbanStructure (){
    await mutateCurrentURL()
    await buildKanbanStructure()
  }

  checkFilters()
  
  return {
    filters,
    loading,
    titleModal,
    showModal,
    form,
    actions,
    selectedDate,
    scheduleType,
    scheduleTypeOptions,
    buildKanbanStructure,
    callBuildKanbanStructure
  };
}
