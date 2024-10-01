import qRampStore from '../qRampStore'
import remarkStore from '../../_components/remarks/store';
import serviceListStore from '../../_components/serviceList/store/serviceList';
import cargoStore from '../../_components/cargo/store/cargo';

export const constructionWorkOrder = async (data) => {
    let businessUnitId = qRampStore().getBusinessUnitId();
    const remarks = remarkStore().getForm();
    const serviceList = await serviceListStore().getServiceListSelected();
    const dataCargo = cargoStore().payload();
    const workOrderData = structuredClone(data)
    workOrderData.form.statusId = qRampStore().getStatusId();

    const formatData = {
        ...workOrderData.form,
        ...dataCargo.cargo,
        ...remarks,
        adHoc: workOrderData.form.adHoc == 1,
        customCustomer: workOrderData.form.customCustomer == 1,
        delay: dataCargo.delay,
        ourDelay: dataCargo.ourDelay,
        delayComment: dataCargo.delayComment,
        type: qRampStore().getTypeWorkOrder(),
        workOrderItems: [
            ...serviceList.map(item => ({
                productId: item.product_id,
                workOrderItemAttributes: item.work_order_item_attributes.map((attribute) => ({
                    attributeId: attribute.attribute_id, ...attribute
                })),
            }))
        ],
        businessUnitId,
    }

    return structuredClone(formatData)
}