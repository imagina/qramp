import cargo from '../../cargo.vue';
import { reactive, nextTick } from 'vue';
import { buildServiceList } from '../../../_store/actions/services';
import { 
    ServiceModelContract, 
    ServiceListStoreContract, 
    ReactiveStoreContract 
} from '../@Contract/index.contract';

const dataModel: ServiceModelContract[] = [
    {
        id: 4,
        title: 'Cargo',
        component: cargo,
        form: {},
    },
];
const state = reactive<ReactiveStoreContract>({
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