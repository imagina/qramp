export default function findDynamicFieldTitle(serviceList: any[], productId: string): string | null {
    for (const item of serviceList) {
        const dynamicField = item.dynamicField || [];
        const field = dynamicField.find((field: any) => field.id === productId);
        if (field) {
            return field.title;
        }
        if (item.lists && item.lists.length > 0) {
            const title = findDynamicFieldTitle(item.lists, productId);
            if (title) {
                return title;
            }
        }
    }
    return null;
}