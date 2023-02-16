import cargo from '../../cargo.vue';
import { reactive, nextTick } from 'vue';
import { buildServiceList } from '../../../_store/actions/services';
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

export interface ServiceListStoreContract {
    getServiceData(): Promise<void>;
    setServiceList(value: ServiceModelContract[]): void;
    getServiceList(): ServiceModelContract[];
    setLoading(value: boolean): void;
    getLoading(): Boolean;
    resetStore(): void;
    init(): Promise<void>;
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
    loading: false,
});

/**
   * @author Wilmer Ramiro Cristancho 
   * @returns { getServiceData, setServiceList, getServiceList} 
*/
export default function serviceListStore(): ServiceListStoreContract {
    /**
     *
     * @returns getServiceData 
    */
    async function getServiceData(): Promise<void> {
        try {
            const response = (await buildServiceList() as Array<any>).filter(item => item.id !== 4);
            setServiceList([...response, ...dataModel]);
        } catch (error) {
            console.log(error);
        }
    }
    /**
     *
     * @param value - Service
     *
     * @returns void set Service List
    */
    function setServiceList(value: ServiceModelContract[]): void {
        state.serviceList = value;
    }
    /**
     *
     * @returns {Array<id, title, list?, dynamicField?, component?,form?>}  get Service List
    */
    function getServiceList(): ServiceModelContract[] {
        return state.serviceList;
    }
    /**
     *
     * @param value {boolean}
     *
     * @returns void setLoading
    */
    function setLoading(value: boolean): void {
        state.loading = value;
    }
    /**
    *
    *
    * @returns {Boolean} get loading
   */
    function getLoading(): Boolean {
        return state.loading;
    }
    /**
     * @returns  {void} reset Store
    */
    function resetStore(): void {
        setServiceList([]);
    }
    /**
     * @returns  {void} get existing service list
    */
    async function init(): Promise<void> {
      nextTick(async () => {
        setLoading(true);
        await getServiceData();
        setLoading(false);
      }) 
    }
    return {
        getServiceData,
        setServiceList,
        getServiceList,
        setLoading,
        getLoading,
        resetStore,
        init,
    }
}