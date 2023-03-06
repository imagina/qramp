export enum STEP {
    FLIGTH = 1,
    SERVICE,
    REMARKS,
}
export type TYPE_SECCION = STEP.FLIGTH | STEP.SERVICE | STEP.REMARKS;
export interface SectionsContract {
    id: TYPE_SECCION;
    title: string;
    prefix: number;
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
        prefix: 1,
        component: null,
        done: false,
        refs: 'flightRefs',
        error: false
    },
    {
        id: STEP.SERVICE,
        title: 'Services',
        prefix: 2,
        component: null,
        done: false,
        refs: 'servicesRefs',
        error: false
    },
    {
        id: STEP.REMARKS,
        title: 'Remarks',
        prefix: 3,
        component: null,
        done: false,
        refs: 'remarksRefs',
        error: false
    },
]);

export default data.value;