import baseService from '@imagina/qcrud/_services/baseService.js';

export const getCategories = async () => {
    let requestParams = {
        params: {
            include: 'products'
        }
    }
    const response = await baseService.index('apiRoutes.qramp.categories', requestParams);
    console.log(response.data);
    return response.data;
}

