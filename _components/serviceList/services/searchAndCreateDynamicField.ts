export default function searchAndCreateDynamicField(arr: any[]) {
    if(arr.length === 0) return [];
    let dynamicField: any[] = [];
    arr.forEach(obj => {
        if (obj.dynamicField && obj.dynamicField.length > 0) {
            dynamicField.push(...obj.dynamicField);
        }
        
        if (obj.lists && obj.lists.length > 0) {
            dynamicField.push(...searchAndCreateDynamicField(obj.lists));
        }
    });
    return dynamicField;
}