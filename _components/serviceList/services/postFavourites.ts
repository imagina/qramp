import baseService from '@imagina/qcrud/_services/baseService.js'

export default async (data) => {
    try {
        const response = await baseService.create('apiRoutes.qsite.favourites', {
            favouritableType: 'Idata.Data.Entities.Ramp',
            favouritableId: data.id
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}