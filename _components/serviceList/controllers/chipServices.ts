import {ref, watch, computed, ComputedRef} from 'vue';
import serviceListStore from '../store/serviceList';
import findDynamicFieldTitle from '../services/findDynamicFieldTitle';
import searchAndCreateDynamicField from '../services/searchAndCreateDynamicField';
import deleteChipRecursive from '../services/deleteChipRecursive';

const chipServicesController = (props: any = {}, emit: any = null) => {
    let lists: any = ref([]);
    const popupProxyRef: any = ref(null);
    const favouritesList: any = computed(() => {
        const serviceList: any[] = searchAndCreateDynamicField(serviceListStore().getServiceList());
        return serviceListStore().getFavouriteList().filter(item => serviceList.map(item => item.id).includes(item.id));
    })
    const showFavourite: ComputedRef<boolean> = computed(() => serviceListStore().getShowFavourite());
    const nameProduct = (productId: string) => {
        return findDynamicFieldTitle(serviceListStore().getServiceList(), productId);
    }
    const updateLists = async () : Promise<void> => {
        lists.value = await serviceListStore().getServiceListSelected();
    }

    function deleteChip(productId: string): void {
        deleteChipRecursive(productId, serviceListStore().getServiceList());
    }

    function searchProduct(productId: string): void {
        emit('search', nameProduct(productId))
        popupProxyRef.value.hide();
    }

    function favourites(): void {
        serviceListStore().setShowFavourite(!showFavourite.value)
    }

    updateLists().then();
    watch(
        () => serviceListStore().getServiceListSelected(),
        () => {
            updateLists().then();
        }
    );

    return {
        lists,
        nameProduct,
        deleteChip,
        popupProxyRef,
        searchProduct,
        showFavourite,
        favouritesList,
        favourites
    }
}
export default chipServicesController;  
