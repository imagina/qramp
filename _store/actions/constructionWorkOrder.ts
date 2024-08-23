import qRampStore from '../qRampStore'
import remarkStore from '../../_components/remarks/store';
import { LABOR, BUSINESS_UNIT_PASSENGER, BUSINESS_UNIT_LABOR } from '../../_components/model/constants';
import serviceListStore from '../../_components/serviceList/store/serviceList';
import cargoStore from '../../_components/cargo/store/cargo';

export const constructionWorkOrder = async (data) => {
    let businessUnitId = qRampStore().getBusinessUnitId();
    const remarks = remarkStore().getForm();
    const serviceList = await serviceListStore().getServiceListSelected();
    const dataCargo = cargoStore().payload();
    data.form.statusId = qRampStore().getStatusId();

    const formatData = {
        ...data.form,
        ...dataCargo.cargo,
        ...remarks,
        adHoc: data.form.adHoc == 1,
        customCustomer: data.form.customCustomer == 1,
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