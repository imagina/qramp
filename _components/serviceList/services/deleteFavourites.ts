import baseService from '@imagina/qcrud/_services/baseService.js'

export default async (id) => {
    try {
        await baseService.delete('apiRoutes.qramp.favourites', id);
    } catch (error) {
        console.log(error)   
    }
}