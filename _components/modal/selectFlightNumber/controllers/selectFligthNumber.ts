import { onBeforeUnmount } from 'vue';
import store from '../store/selectFlightNumber'
import qRampStore from 'src/modules/qramp/_store/qRampStore';

export default function selectFligthNumberController() {
    onBeforeUnmount(() => {
        store.close();
    })
    async function getFlightMap(workOrder) {
        try {
            qRampStore().setWorkOrder(workOrder);
            qRampStore().showVisibleMapModal();
        } catch (error) {
            qRampStore().setWorkOrder(null);
            console.log(error);
        }
    }
    return { store, getFlightMap }
}
