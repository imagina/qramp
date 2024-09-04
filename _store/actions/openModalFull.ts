import { i18n } from 'src/plugins/utils'
import qRampStore from '../qRampStore'

export const openModalFull = async (ref, workOrder, customProps={}) => {
    if (!workOrder || !ref) return
    const titleModal = i18n.tr('ifly.cms.form.updateWorkOrder') 

    await (ref as any)?.loadform({
        modalProps: {
            title: `${titleModal} ${(workOrder.id ? ` Id: ${workOrder.id}` : '')}`,
            update: true,
            workOrderId: workOrder.id,
            width: "90vw",
            ...customProps
        },
        data: workOrder,
    });

    qRampStore().setTitleOffline(titleModal);
}