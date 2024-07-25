import { ref, computed } from 'vue';
import serviceListStore from '../../serviceList/store/serviceList'
import findDynamicFieldTitle from '../../serviceList/services/findDynamicFieldTitle'
import getWorkOrderItemsActions from '../actions/getWorkOrderItems'
import qRampStore from "src/modules/qramp/_store/qRampStore";
const chipServicesController = (props: any = {}, emit: any = null) => {
    const workOrderItemsTotal = computed(() => props.workOrderItemsTotal)
    const loading = ref(false);
    const workOrdersItems: any = ref([]);
    const popupProxyRef: any = ref(null);
    const nameProduct = (productId) => {
        return findDynamicFieldTitle(serviceListStore().getServiceList(), productId);
    }
    async function getWorkOrderItems() {
        try {
            workOrdersItems.value = [];
            loading.value = true;
            const response = await getWorkOrderItemsActions(props.workOrderId);
            workOrdersItems.value = response.data;
            await qRampStore().setTypeWorkOrder(props.typeWorkOrder);
            await serviceListStore().init();
            loading.value = false
        } catch (error) {
            console.error(error)
        }
    }
    return { 
        nameProduct, 
        popupProxyRef, 
        workOrderItemsTotal, 
        workOrdersItems,
        getWorkOrderItems,
        loading
    }
}
export default chipServicesController;  
