import baseService from '@imagina/qcrud/_services/baseService.js'
import store from '../store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';

export default async function showWorkOrder(data) {
    try {
        store.showModal = true;
        store.loading = true;
        store.isUpdate = true;
        store.titleModal = 'Update Security'
        store.widthModal = '90vw';
        const response = await baseService.show('apiRoutes.qramp.workOrders', data.id,
            {
              refresh: true,
              params: {
                include: "customer,workOrderStatus,operationType,station,contract,responsible",
              }
            })
        store.form = {...response.data};
    } catch (error) {
       console.info(error);
    } finally {
      store.loading = false;
      if (!navigator.onLine) store.form = {...data }
      await qRampStore().setIsPassenger(true);
      qRampStore().setTitleOffline(store.titleModal);
    }
}
