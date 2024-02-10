import { getCurrentInstance } from 'vue';
import qRampStore from "src/modules/qramp/_store/qRampStore";
import modalScheduleStore from '../store/modalSchedule.store'

export default async function updateSimpleWorkOrder(): Promise<void> {
  const proxy = getCurrentInstance().appContext.config.globalProperties
    try {
        const params = {params: {
            titleOffline: qRampStore().getTitleOffline()
          }};
        await proxy.$crud.update("apiRoutes.qramp.schedule", modalScheduleStore.form.id, modalScheduleStore.form, params);
    } catch (error) {
        console.log(error)
    }
}
