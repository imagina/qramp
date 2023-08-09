import Vue, { ref, computed, ComputedRef, WritableComputedRef } from 'vue';
import store from '../store/filters.store'
import actionsModal from '../models/actionsModal.model'
import { ModelActionsModalResult } from '../contracts/modelActionsModal.contract';

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
  
  const { actions } = actionsModal() as ModelActionsModalResult;
  
  return {
    filters,
    loading,
    titleModal,
    showModal,
    form,
    actions,
  };
}