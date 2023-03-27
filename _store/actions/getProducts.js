import qRampStore from '../qRampStore.js';
import baseService from '@imagina/qcrud/_services/baseService.js';

export default async function getProducts(id) {
    let requestParams = {
        params: {
            filter: { categoryId: id },
            include: 'category,attributes,attributes.values'
        }
    }
    const services = [];
    await baseService.index('apiRoutes.qramp.products', requestParams).then(({ data }) => {
        const formatData = organizeProducts(data, id)
        formatData.forEach(item => {
            services.push({
                icon: "settings",
                title: item.name,
                id: item.id,
                categoryId: item.categoryId,
                formField: {
                    ...item.attributes.reduce((previousValue, currentValue, currentIndex, array) => {
                        const props = setProps(currentValue.type, currentValue.name, currentValue.values, currentIndex)
                        previousValue = {
                            ...previousValue,
                            [`${currentValue.type}${currentValue.name ? currentValue.name : ''}`]: {
                                name: currentValue.name,
                                value: currentValue.value ? currentValue.value : null,
                                type: currentValue.type === 'quantityFloat' ? 'quantity' : currentValue.type,
                                id: currentValue.id,
                                props: { ...props }
                            }
                        }
                        return previousValue
                    }, {})
                }
            })
        })
    }).catch(error => {
        console.error("[qramp-services]::init", error)
    })
    return filterProducts(services);
};

function organizeProducts(data, id) {
    const productData = qRampStore().getWorkOrderItems();
    if (productData.length > 0) {
        return data.map(product => {
            productData.map(sw => {
                if (sw.productId == product.id) {
                    product.attributes.map(att => {
                        sw.workOrderItemAttributes.map(swatt => {
                            if (swatt.attributeId == att.id) {
                                att.value = swatt.value
                                return swatt
                            }
                        })
                        return att
                    })
                }
                return sw
            })
            return product
        })
    } else {
        return data
    }
};

function setProps(type, name, options, index) {
    const readonly = qRampStore().disabledReadonly();
    if (type == 'quantity') {
        return {
            readonly,
            mask: '###################',
        }
    } else if (type == 'select') {
        return {
            readonly,
            label: name,
            options: options.map((item) => {
                item.label = item.name
                return item
            }),
            type
        }
    } else if (type == 'fullDate') {
        const options = index === 0 ? qRampStore().validateDateInboundBlockIn
            : qRampStore().validateDateOutboundBlockOut;
        return {
            readonly,
            label: name,
            hint: 'Format: MM/DD/YYYY HH:mm',
            mask: 'MM/DD/YYYY HH:mm',
            'place-holder': 'MM/DD/YYYY HH:mm',
            format24h: true,
            options,
            typeIndexDate: index,
        }
    } else if (type === 'quantityFloat') {
        return {
            readonly,
            type: 'number',
            step: "0.1"
        }
    } else {
        return {
            readonly,
            label: name,
        }
    }
};

function filterProducts(data) {
    return data.filter(items => {
        for(let item in items.formField){
          for(let key in items.formField[item]){
            if (key == 'value'){
              return items.formField[item][key]
            }
          }
        }
    })
}