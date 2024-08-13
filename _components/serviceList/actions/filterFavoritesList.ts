import serviceListStore from '../store/serviceList'
import storeFlight from '../../flight/store'

export const filterFavoritesList = () => {
    const { stationId, contractId, customerId, carrierId, operationTypeId } = storeFlight().getForm();
    return serviceListStore().getFavouriteList().filter(item => {
        const matchContract = Number(item.contractId) === Number(contractId);
        const matchCustomer = Number(item.customerId) === Number(customerId);
        const matchStation = Number(item.stationId) === Number(stationId);
        const matchCarrier = Number(item.carrierId) === Number(carrierId);
        const matchOperationType = Number(item.operationTypeId) === Number(operationTypeId);
        return matchContract && matchCustomer && matchStation && matchCarrier && matchOperationType;
    });
}