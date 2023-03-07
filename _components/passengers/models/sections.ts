import serviceList from '../../serviceList/index.vue';
import flight from '../../flight.vue';
export enum STEP {
    FLIGTH = 1,
    SERVICE,
    REMARKS,
}
export type TYPE_SECCION = STEP.FLIGTH | STEP.SERVICE | STEP.REMARKS;
export interface SectionsContract {
    id: TYPE_SECCION;
    title: string;
    icon?: string,
    component?: any;
    done: boolean;
    refs: string;
    error: boolean;
}

import { ref } from 'vue';
const data = ref<SectionsContract[]>([
    {
        id: STEP.FLIGTH,
        title: 'Flight',
        icon:'fas fa-plane',
        component: flight,
        done: false,
        refs: 'flightRefs',
        error: false
    },
    {
        id: STEP.SERVICE,
        title: 'Services',
        icon:'fas fa-briefcase',
        component: serviceList,
        done: false,
        refs: 'servicesRefs',
        error: false
    },
    {
        id: STEP.REMARKS,
        title: 'Remarks',
        icon:'far fa-edit',
        component: null,
        done: false,
        refs: 'remarksRefs',
        error: false
    },
]);

export default data.value;