import { ref, watch, computed, onMounted } from 'vue';
import serviceListStore from '../../serviceList/store/serviceList'
import baseService from '@imagina/qcrud/_services/baseService.js'
import findDynamicFieldTitle from '../../serviceList/services/findDynamicFieldTitle'
import getWorkOrderItemsActions from '../actions/getWorkOrderItems'
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
            loading.value = true;
            const response = await getWorkOrderItemsActions(props.workOrderId);
            workOrdersItems.value = response.data;
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