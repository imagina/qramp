import Vue, {ref, computed} from 'vue';
import sectionsModel, 
{TYPE_SECCION, STEP} from './models/sections';
export default function usePassengers() {
    const step = ref<TYPE_SECCION>(STEP.FLIGTH);
    const sections = computed(() => sectionsModel);
    return {
        sections,
        step,
    }
}