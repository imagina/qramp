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
 * The loading state is
 * @returns An object with the following properties:
 * getServiceData
 * setServiceList
 * getServiceList
 * setLoading
 * getLoading
 * resetStore
 * init
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
     * This function takes an array of ServiceModelContract objects and assigns it to the serviceList
     * property of the state object.
     * @param {ServiceModelContract[]} value - ServiceModelContract[]
     */
    function setServiceList(value: ServiceModelContract[]): void {
        state.serviceList = value;
    }
    
    /**
     * This function returns an array of ServiceModelContract objects.
     * @returns The serviceList array.
     */
    function getServiceList(): ServiceModelContract[] {
        return state.serviceList;
    }
   
    /**
     * This function takes a boolean value and sets the loading property of the state object to that
     * value.
     * @param {boolean} value - boolean - The value to set the loading state to.
    */
    function setLoading(value: boolean): void {
        state.loading = value;
    }
    
    /**
     * This function returns a boolean value that is the value of the loading property of the state
     * object.
     * @returns The loading state.
    */
    function getLoading(): Boolean {
        return state.loading;
    }
    
    /**
     * The function is called resetStore and it takes no parameters and returns nothing.
     */
    function resetStore(): void {
        setServiceList([]);
    }
    /**
     * The loading state is set to true before the data is fetched because the nextTick function is
     * called before the getServiceData function is called. 
     * The loading state is set to false after the data is fetched because the getServiceData function
     * is called before
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