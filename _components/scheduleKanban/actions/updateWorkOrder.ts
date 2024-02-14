import Vue from 'vue';
import { cacheOffline } from 'src/plugins/utils';
import { getCurrentInstance } from 'vue';
import storeKanban from '../store/kanban.store';
import moment from 'moment'

export default async function updateWorkOrder(id: number, attributes: any): Promise<void> {
  const proxy = getCurrentInstance().appContext.config.globalProperties
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'
        const FORMAT_DATE = 'YYYY-MM-DDTHH:mm:ss'
        const dataUpdate = { ...attributes }
        const dataForApi = { ...attributes }

        if (storeKanban.isAppOffline) {
            dataForApi.titleOffline = `${proxy.$tr("ifly.cms.form.updateWorkOrder")} Id: ${dataForApi.id}`;
        }

        if (dataUpdate.inboundFlightNumber) {
            dataUpdate.calendar = {
                title: dataUpdate.inboundFlightNumber
            }
        }

        if (attributes.inboundScheduledArrival) {
            const inboundScheduledArrival = moment(attributes.inboundScheduledArrival).format(FORMAT_DATE)
            dataUpdate.scheduleDate = inboundScheduledArrival
        } else if (attributes.outboundScheduledDeparture) {
            const outboundScheduledDeparture = moment(attributes.outboundScheduledDeparture).format(FORMAT_DATE)
            dataUpdate.scheduleDate = outboundScheduledDeparture
        }

        if (attributes.inboundScheduledArrival) {
            const inboundScheduledArrival = moment(attributes.inboundScheduledArrival).format(FORMAT_DATE)
            dataUpdate.inboundScheduledArrival = inboundScheduledArrival
        }

        if (attributes.outboundScheduledDeparture) {
            const outboundScheduledDeparture = moment(attributes.outboundScheduledDeparture).format(FORMAT_DATE)
            dataUpdate.outboundScheduledDeparture = outboundScheduledDeparture
        }

        await Promise.allSettled([
            cacheOffline.updateRecord(API_ROUTE, dataUpdate, dataUpdate?.id),
            proxy.$crud.update(
                API_ROUTE,
                id,
                dataForApi
            )
        ])
    } catch (error) {
        console.log(error);
    }
}
