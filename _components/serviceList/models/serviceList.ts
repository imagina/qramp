import cargo from '../../cargo.vue';
import { ref, computed, reactive} from 'vue';
import { buildServiceList }  from '../../../_store/actions/services';
export interface PropsContract {
    readonly?: boolean;
    mask?: string;
    label?: string;
    hint?: string;
    placeHolder?: string;
    format24h?: boolean;
    typeIndexDate?: number;
}

export interface QuantityContract {
    name: string;
    value?: any;
    type: string;
    id: number;
    props?: PropsContract;
}

export interface Inputremark {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}

export interface FullDateStart {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}

export interface FullDateEnd {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}

export interface Quantityquantity {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}

export interface DynamicField {
    icon: string;
    title: string;
    id: number;
    categoryId: number;
    formField: any;
}

export interface ListContract {
    id: number;
    title: string;
    dynamicField?: DynamicField[];
    lists?: any[];
}


export interface Quantity2 {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}
export interface ServiceModelContract {
    id?: number;
    title?: string;
    lists?: ListContract[];
    dynamicField?: DynamicField[];
    component?: any;
    form?: any,
}

const dataModel: ServiceModelContract[] = [
    {
        id: 4,
        title: 'Cargo',
        component: cargo,
        form: {},
    },
];
const state = reactive<any>({
    serviceList: [],
});


export default function serviceListStore() {
    async function getServiceData(): Promise<void> {
        console.log('ingreso');
        const response = (await buildServiceList() as Array<any>).filter(item => item.id !== 4);
        console.log(response);
        setServiceList([...response, ...dataModel]);
    }
    function setServiceList(value: ServiceModelContract[]) {
        state.serviceList = value;
    }
    function getServiceList(): ServiceModelContract[] {
        return state.serviceList;
    }
    return {
        getServiceData,
        setServiceList,
        getServiceList,
    }
}