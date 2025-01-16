import baseService from 'modules/qcrud/_services/baseService.js'

export default async (data) => {
    try {
        const response = await baseService.create('apiRoutes.qramp.favourites', { ...data });
        return response.data;
    } catch (error) {
        console.log(error)
    }
}