import Vue, {ref, computed} from 'vue';
import sectionsModel, 
{TYPE_SECCION, STEP} from './models/sections';
import storeFlight from '../flight/store';
export default function usePassengers() {
    const step = ref<TYPE_SECCION>(STEP.FLIGTH);
    const sections = computed(() => sectionsModel);
    const flight = computed(() => storeFlight().getForm())
    return {
        sections,
        step,
        flight,
    }
}