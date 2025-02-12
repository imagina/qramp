import qRampStore from '../qRampStore';
import flightStore from "../../_components/flight/store";
import { openModalFull } from './openModalFull';
import baseService from 'src/modules/qcrud/_services/baseService.js';

export const getWorkOrderAndOpenModal = async (ref, data, modalProps={}, makeRequest=true) => {
    qRampStore().showLoading()
    flightStore().setIsLoading(false)
    openModalFull(ref, data, modalProps)

    if (!makeRequest || !navigator.onLine) {
        openModalFull(ref, data)
        flightStore().setIsLoading(true)
        qRampStore().hideLoading()
        return;
    }

    await baseService.show('apiRoutes.qramp.workOrders', data.id, {
        refresh: true,
        params: {
            include: "customer,workOrderStatus,operationType,station,contract,responsible",
        }
    }).then(async (item) => {
        openModalFull(ref, item.data, modalProps)
    }).catch((err) => {
        console.error(err)
    }).finally(() => {
        flightStore().setIsLoading(true)
        qRampStore().hideLoading()
    })
  }