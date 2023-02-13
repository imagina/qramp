export const STEP_SERVICE: number = 1;
import Vue , { ref } from 'vue';
const data = ref([
    {
        id: STEP_SERVICE,
        title: 'Services',
        prefix: 1,
        component: null,
        done: false,
        refs: 'servicesForm',
        error: false
    },
]);

export default data.value;