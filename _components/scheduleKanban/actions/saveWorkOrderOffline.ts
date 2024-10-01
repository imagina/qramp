import { STATUS_SCHEDULE } from '../../model/constants';
import modalScheduleStore from '../store/modalSchedule.store'
import { cacheOffline } from 'src/plugins/utils';
import moment from 'moment'

export default async function saveWorkOrderOffline(requestResponse) {
    const FORMAT_DATE = 'YYYY-MM-DDTHH:mm:ss'
    const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY HH:mm'
    const form = { ...modalScheduleStore.form };

    form.outboundScheduledDeparture = form.outboundScheduledDeparture
        ? moment(form.outboundScheduledDeparture, DEFAULT_DATE_FORMAT).format(FORMAT_DATE)
        : null

    form.inboundScheduledArrival = form.inboundScheduledArrival
        ? moment(form.inboundScheduledArrival, DEFAULT_DATE_FORMAT).format(FORMAT_DATE)
        : null

    form.scheduleDate = form.inboundScheduledArrival || form.outboundScheduledDeparture
    form.statusId = STATUS_SCHEDULE
    form.id = modalScheduleStore.form.offlineId
    form.calendar = {
        sta: form.sta,
        std: form.std,
        title: form.preFlightNumber
    }

    const data = requestResponse?.data.length === 0 ? form : requestResponse?.data
    const CACHE_PATH = 'apiRoutes.qramp.workOrders'
    await cacheOffline.addNewRecord(CACHE_PATH, data)
    return data
}
