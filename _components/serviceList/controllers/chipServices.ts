import { ref, watch, computed, ComputedRef, onMounted } from 'vue';
import serviceListStore from '../store/serviceList';
import findDynamicFieldTitle from '../services/findDynamicFieldTitle';
import searchAndCreateDynamicField from '../services/searchAndCreateDynamicField';
import deleteChipRecursive from '../services/deleteChipRecursive';
import { store, helper } from 'src/plugins/utils'
import baseService from 'modules/qcrud/_services/baseService.js'
import qRampStore from '../../../_store/qRampStore.js';
import { documentationPaths } from 'src/modules/qramp/_components/model/constants.js'

const chipServicesController = (props: any = {}, emit: any = null) => {
    let lists: any = ref([]);
    const popupProxyRef: any = ref(null);
    const token = ref('')
    const path = ref('')
    const favouritesList: any = computed(() => {
        const serviceList: any[] = searchAndCreateDynamicField(serviceListStore().getServiceList());
        return serviceListStore().getFavouriteList().filter(item => serviceList.map(service => service.id).includes(item.productId));
    })
    const servicesAlertSetting = computed(() => store.getSetting('ramp::servicesAlert'))
    const isAppOffline = computed(() => store.state.qofflineMaster.isAppOffline);
    const permissionFavourite = computed(() => ({
        create: store.hasAccess('ramp.favourites.create'),
        edit: store.hasAccess('ramp.favourites.edit'),
        index: store.hasAccess(`ramp.favourites.index`),
        destroy: store.hasAccess(`ramp.favourites.destroy`),
    }));
    const showFavourite: ComputedRef<boolean> = computed(() => serviceListStore().getShowFavourite());
    const helpText = computed(() => ({
      title: 'Favorites',
      description: `
        Add services as favorites by clicking the star icon.
        ${helper.documentationLink(`/docs/agione/${path.value}/work-orders#favorites`, token.value)}
      `
    }));
    const nameProduct = (productId: string) => {
        return findDynamicFieldTitle(serviceListStore().getServiceList(), productId);
    }
    const updateLists = async () : Promise<void> => {
        lists.value = await serviceListStore().getServiceListSelected();
        lists.value.forEach(list => {
          const workOrderItemAttributes = list.work_order_item_attributes || [];
          workOrderItemAttributes.forEach(async item => {
            if(item.type === 'select' && Array.isArray(JSON.parse(item.value))) {
              const response = await baseService.index('apiRoutes.qsetupagione.employees', {
                params: {
                  filter:{
                    id: JSON.parse(item.value)
                  }
                }
              })
              item.value = JSON.parse(item.value).length > 0 ? response.data.map((item) => item.name).join(',') : '';
            }
          })
        })
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

    onMounted(async () => {
      token.value = await helper.getToken()
      path.value = documentationPaths[qRampStore().getBusinessUnitId() || '']
    })

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
        favourites,
        permissionFavourite,
        isAppOffline,
        servicesAlertSetting,
        helpText
    }
}
export default chipServicesController;
