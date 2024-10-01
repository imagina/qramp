import serviceListStore from "../store/serviceList";

export const updateFavoriteServicesList = (serviceList: any[]) => {
    const favouriteListProductId = serviceListStore().getFavouriteList().map(item => item.productId);
    serviceList.forEach(item => {
        const dynamicField = item.dynamicField || [];
        dynamicField.map(element => {
            const favourite = favouriteListProductId.includes(element.id);
            element.favourite = favourite;
        });
        if (item.lists && item.lists.length > 0) {
            updateFavoriteServicesList(item.lists);
        }
    });

    serviceListStore().setServiceList(serviceList);
}