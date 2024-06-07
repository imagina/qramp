import baseService from '@imagina/qcrud/_services/baseService.js'
import store from '../store'
import qRampStore from 'src/modules/qramp/_store/qRampStore';

export default async function showWorkOrder(data) {
    try {
        store.showModal = true;
        store.loading = true;
        store.isUpdate = true;
        store.titleModal = 'Update fueling' + (data.id ? ` Id: ${data.id}` : '')
        store.widthModal = '90vw';
        const response = await baseService.show('apiRoutes.qramp.workOrders', data.id,
            {
              refresh: true,
              params: {
                include: "customer,workOrderStatus,operationType,station,contract,responsible",
              }
            })
        await qRampStore().setIsPassenger(true);
        store.form = {...response.data};
        qRampStore().setTitleOffline(store.titleModal);
        store.loading = false; 
    } catch (error) {
       console.info(error); 
    }
}