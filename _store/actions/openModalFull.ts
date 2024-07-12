import { i18n } from 'src/plugins/utils'

export const openModalFull = async (ref, workOrder, customProps={}) => {
    if (!workOrder || !ref) return
    const titleModal = i18n.tr('ifly.cms.form.updateWorkOrder') + (workOrder.id ? ` Id: ${workOrder.id}` : '')

    await (ref as any)?.loadform({
        modalProps: {
            title: titleModal,
            update: true,
            workOrderId: workOrder.id,
            width: "90vw",
            ...customProps
        },
        data: workOrder,
    });
}