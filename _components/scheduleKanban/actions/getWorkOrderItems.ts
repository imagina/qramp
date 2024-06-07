import baseService from '@imagina/qcrud/_services/baseService.js'

const workOrderItems = async (workOrderId: number) => {
    try {
        const params = {
            refresh: true,
            params: {
                include: 'workOrderItemAttributes',
                filter: {
                    workorderId: workOrderId
                }
            }
            
        };
    
        return await baseService.index('apiRoutes.qramp.workOrderItems', params);
    } catch (error) {
        console.error(error)
    }
}

export default workOrderItems;