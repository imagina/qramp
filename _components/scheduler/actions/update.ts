import baseService from '@imagina/qcrud/_services/baseService.js'
import store from '../store/index.store'

export default async function updateScheduler(): Promise<void> {
    try {
        store.loading = true;
        const payload = {...store.form}
        delete payload.inboundScheduleArrival
        delete payload.outboundScheduleDeparture
        delete payload.daysOfWeek
        delete payload.depDays
        await baseService.update('apiRoutes.qramp.schedulers', store.form.id, payload);
        store.loading = false;
    } catch (error) {
      store.loading = false;
      console.log(error, 'updateScheduler');
    }
}