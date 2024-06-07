export default function deleteChipRecursive(productId: string, serviceList: any[]) {
    serviceList.forEach(item => {
        const dynamicField = item.dynamicField || [];
        dynamicField.forEach(element => {
            if (element.id === productId) {
                Object.keys(element.formField).forEach(key => {
                    element.formField[key].value = null;
                });
            }
        });
        if (item.lists && item.lists.length > 0) {
            deleteChipRecursive(productId, item.lists);
        }
    });
}