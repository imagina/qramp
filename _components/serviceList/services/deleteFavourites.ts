import baseService from '@imagina/qcrud/_services/baseService.js'

export default async (data) => {
    try {
        await baseService.delete('apiRoutes.qsite.favourites', data.favouriteId);
    } catch (error) {
        console.log(error)   
    }
}