import qRampStore from "src/modules/qramp/_store/qRampStore";
import modalScheduleStore from '../store/modalSchedule.store'
import crud from 'src/modules/qcrud/_services/baseService'


export default async function updateSimpleWorkOrder(): Promise<void> {
    try {
        const params = {params: {
            titleOffline: qRampStore().getTitleOffline()
          }};
        await crud.update("apiRoutes.qramp.schedule", modalScheduleStore.form.id, modalScheduleStore.form, params);
    } catch (error) {
        console.log(error)
    }
}
