import {
    ref,
    computed,
    WritableComputedRef,
    ComputedRef,
    Ref,
    onMounted
} from 'vue';
import store from '../store/index.store';
import modelActionsModal from '../models/modelActionsModal';
import { SchedulerModalComposition, HelpText } from '../contracts/useSchedulerModal.contract'
import { ModelActionsModalResult } from '../contracts/modelActionsModal.contract'
import { documentationPaths } from 'src/modules/qramp/_components/model/constants.js'
import { documentationLink } from 'src/modules/qramp/common/documentationLink.js'
import qRampStore from 'src/modules/qramp/_store/qRampStore.js'
/**
 * Custom composition function for managing scheduler modal state and actions.
 * @returns {SchedulerModalComposition}
 */
export default function useSchedulerModal(props: any = null, emit:any = null): SchedulerModalComposition {
    /**
     * Reference to the form fields for the scheduler modal.
     * @type {Ref<HTMLElement | null>}
     */
    const refFormFields: Ref<HTMLElement | null> = ref(null);
    const token: Ref<string | null> = ref(null)
    const path: Ref<string> = ref('')

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

    const helpText: ComputedRef<HelpText> = computed(() => {
        return {
            title: '',
            description: `
                Need help? Check the documentation for more information on creating Scheduler.
                ${documentationLink(`/docs/agione/${path.value}/schedule#create-a-scheduler`, token.value)}
            `
        }
    });

    /**
     * Reset the scheduler modal state.
     * @function
     * @returns {void}
     */
    function clear(): void {
        store.reset();
    }

    const { actions } = modelActionsModal(emit) as ModelActionsModalResult;

    onMounted(() => {
        token.value = qRampStore().getToken()
        path.value = documentationPaths[qRampStore().getBusinessUnitId() || 0]
    })

    return {
        showModal,
        actions,
        refFormFields,
        clear,
        loading,
        titleModal,
        helpText,
    };
}
