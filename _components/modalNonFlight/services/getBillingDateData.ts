import store from '../store/index.store'
import workOrderList from 'src/modules/qramp/_store/actions/workOrderList'
import qRampStore from 'src/modules/qramp/_store/qRampStore'
import alert from '@imagina/qsite/_plugins/alert.js'

export const getBillingDateData = async () => {
    try {
        store.isLoadingSearch = true

        const billingDateData = await workOrderList().getBillingClosedDate(true) || {};
        if (billingDateData?.data?.plainValue) {
            qRampStore().setBillingDate(billingDateData?.data?.plainValue);
        }
        store.isOpenTableModal = true;
    } catch (error) {
        alert.error({
            message: 'Error getting billing date'
        })
        console.error(error);
    } finally {
      store.isLoadingSearch = false
    }
}