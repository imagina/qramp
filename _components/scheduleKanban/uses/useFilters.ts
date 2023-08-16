import Vue, { ref, computed, ComputedRef, WritableComputedRef } from 'vue';
import store from '../store/filters.store'
import actionsModal from '../models/actionsModal.model'
import { ModelActionsModalResult } from '../contracts/modelActionsModal.contract';
import scheduleTypeOptions from '../models/scheduleType.model'

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
  const scheduleTypeModel: WritableComputedRef<string> = computed({
    /**
     * Get the current value of the toggle button .
     * @returns {string} The state of the toggle buton.
     */
    get: () => store.scheduleTypeModel,
    /**
     * Set the value state of the toggle button.
     * @param {string} value - The new value state to set.
     */
    set: (value: string) => {
      store.scheduleTypeModel = value;
    }
  });

  /**
   * Writable computed property controlling the state of the q-date calendar.
   * @type {WritableComputedRef<boolean>}
   */
  const dateModel: WritableComputedRef<string> = computed({
    /**
     * Get the current value of the q-date calendar.
     * @returns {string} The state of the q-date calendar.
     */
    get: () => store.dateModel,
    /**
     * Set the value state of the q-date calendar.
     * @param {string} value - The new value state to set.
     */
    set: (value: string) => {
      store.dateModel = value;
    }
  });
  
  const { actions } = actionsModal() as ModelActionsModalResult;
  
  return {
    filters,
    loading,
    titleModal,
    showModal,
    form,
    actions,
    dateModel,
    scheduleTypeModel,
    scheduleTypeOptions
  };
}