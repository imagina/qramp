import { cacheOffline, i18n } from 'src/plugins/utils';
import storeKanban from '../store/kanban.store';
import moment from 'moment'
import crud from 'src/modules/qcrud/_services/baseService'

export default async function updateWorkOrder(id: number, attributes: any): Promise<void> {
    try {
        const API_ROUTE = 'apiRoutes.qramp.workOrders'
        const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY HH:mm'
        const FORMAT_DATE = 'YYYY-MM-DDTHH:mm:ss'
        const dataUpdate = { ...attributes }
        const dataForApi = { ...attributes }

        if (storeKanban.isAppOffline) {
            dataForApi.titleOffline = `${i18n.tr("ifly.cms.form.updateWorkOrder")}`;
        }

        if (dataUpdate.inboundFlightNumber) {
            dataUpdate.calendar = {
                title: dataUpdate.inboundFlightNumber
            }
        }

        if (attributes.inboundScheduledArrival) {
            const inboundScheduledArrival = moment(
                attributes.inboundScheduledArrival,
                DEFAULT_DATE_FORMAT
            ).format(FORMAT_DATE)
            dataUpdate.scheduleDate = inboundScheduledArrival
        } else if (attributes.outboundScheduledDeparture) {
            const outboundScheduledDeparture = moment(
                attributes.outboundScheduledDeparture,
                DEFAULT_DATE_FORMAT
            ).format(FORMAT_DATE)
            dataUpdate.scheduleDate = outboundScheduledDeparture
        }

        if (attributes.inboundScheduledArrival) {
            const inboundScheduledArrival = moment(
                attributes.inboundScheduledArrival,
                DEFAULT_DATE_FORMAT
            ).format(FORMAT_DATE)
            dataUpdate.inboundScheduledArrival = inboundScheduledArrival
        }

        if (attributes.outboundScheduledDeparture) {
            const outboundScheduledDeparture = moment(
                attributes.outboundScheduledDeparture,
                DEFAULT_DATE_FORMAT
            ).format(FORMAT_DATE)
            dataUpdate.outboundScheduledDeparture = outboundScheduledDeparture
        }

        await Promise.allSettled([
            cacheOffline.updateRecord(API_ROUTE, dataUpdate, dataUpdate?.id),
            crud.update(
                API_ROUTE,
                id,
                dataForApi
            )
        ])
    } catch (error) {
        console.log(error);
    }
}
