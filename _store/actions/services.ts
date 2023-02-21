import baseService from "@imagina/qcrud/_services/baseService.js";
import qRampStore from "../qRampStore.js";

export const serviceListModel = {
  id: 0,
  title: "",
  dynamicField: [],
};
export const getCategories = async (): Promise<any[]> => {
  try {
    let requestParams = {
      params: {
        include:
          "products,products.attributes,products,products.attributes.values",
      },
    };
    const response = await baseService.index(
      "apiRoutes.qramp.categories",
      requestParams
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export async function buildServiceList(): Promise<any[]> {
  try {
    const categoryList = await getCategories();
    const build = categoryList.map((item) => {
      const dynamicField = {
        dynamicField: getIfItIsTypeListOrDynamicField(item.products),
      };
      return {
        id: item.id,
        title: item.name,
        ...dynamicField,
      };
    });
    return build;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const getIfItIsTypeListOrDynamicField = (product) => {
  try {
    const data: any = [];
    const dynamicFieldModel: any = {
      icon: "settings",
    };
    const organizeProduct = organizeProducts(product);
    organizeProduct.forEach((product) => {
      dynamicFieldModel.id = product.id;
      dynamicFieldModel.categoryId = product.categoryId;
      dynamicFieldModel.title = product.name;
      dynamicFieldModel.formField = getDynamicField(product.attributes);
      data.push({ ...dynamicFieldModel });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

function getDynamicField(attributes) {
  try {
    return attributes.reduce((previousValue, currentValue, currentIndex) => {
      const props = setProps(
        currentValue.type,
        currentValue.name,
        currentValue.values,
        currentIndex
      );
      const key = `${currentValue.type}${
        currentValue.name ? currentValue.name : ""
      }`;
      const type =
        currentValue.type === "quantityFloat" ? "quantity" : currentValue.type;
      previousValue = {
        ...previousValue,
        [key]: {
          name: currentValue.name,
          value: currentValue.value ? currentValue.value : null,
          type,
          id: currentValue.id,
          props: { ...props },
        },
      };
      return previousValue;
    }, {});
  } catch (error) {
    console.log(error);
  }
}

function setProps(type, name, options, index) {
  const readonly = qRampStore().disabledReadonly();
  if (type == "quantity") {
    return {
      readonly,
      mask: "###################",
    };
  }
  if (type == "select") {
    return {
      readonly,
      label: name,
      options: options.map((item) => {
        item.label = item.name;
        return item;
      }),
      type,
    };
  }
  if (type == "fullDate") {
    const options =
      index === 0
        ? qRampStore().validateDateInboundBlockIn
        : qRampStore().validateDateOutboundBlockOut;
    return {
      readonly,
      label: name,
      hint: "Format: MM/DD/YYYY HH:mm",
      mask: "MM/DD/YYYY HH:mm",
      "place-holder": "MM/DD/YYYY HH:mm",
      format24h: true,
      options,
      typeIndexDate: index,
    };
  }
  if (type === "quantityFloat") {
    return {
      readonly,
      type: "number",
      step: "0.1",
    };
  }
  return {
    readonly,
    label: name,
  };
}

export function getListOfSelectedServices(data) {
    try {
        const service = Vue.prototype.$clone(data.filter((items) => {
            for (let item in items.formField) {
              for (let key in items.formField[item]) {
                if (key == "value") {
                  return items.formField[item][key];
                }
              }
            }
        }));
        return productDataTransformation(service);
    } catch (error) {
        console.log(error);
    }
}
function organizeProducts(data: any) {
  const productData = qRampStore().getWorkOrderItems();
  if (productData.length > 0) {
    return data.map((product) => {
      (productData as any).map((sw) => {
        if (sw.productId == product.id) {
          product.attributes.map((att) => {
            sw.workOrderItemAttributes.map((swatt) => {
              if (swatt.attributeId == att.id) {
                att.value = swatt.value;
                return swatt;
              }
            });
            return att;
          });
        }
        return sw;
      });
      return product;
    });
  } else {
    return data;
  }
}

 function setAttr(obj) {
  try {
    const att: any = [];
    for (let key in obj) {
      const data = validationDataAttr(obj, key);
      att.push({ ...data });
    }
    return att;
  } catch (error) {
    console.log(error);
  }
}
function validationDataAttr(obj: any, key: any) {
  let data: any = {
    name: obj[key].name,
    value: obj[key].value,
    type: obj[key].type,
  };
  if (obj[key].id && obj[key].attributeId) {
    data = {
      id: obj[key].id,
      attribute_id: obj[key].attributeId,
      ...data,
    };
  }
  if (obj[key].id && !obj[key].attributeId) {
    data = {
      ...data,
      attribute_id: obj[key].id,
    };
  } else if (obj[key].attributeId && obj[key].value) {
    data = {
      ...data,
      attribute_id: obj[key].attributeId,
    };
  }
  return data;
}
export function productDataTransformation(data = []) {
  try {
    const products: any = [];
    data.forEach((items: any) => {
      if (items.id || isDelete(items.formField)) {
        products.push({
          product_id: items.id,
          work_order_item_attributes: setAttr(items.formField),
        });
      }
    });
    return products;
  } catch (error) {
    console.log(error);
  }
}

function isDelete(obj) {
    try {
        const att = []
        for (let key in obj) {
            return obj[key].value && obj[key].value != ""
        }
        return att
    } catch (error) {
        console.log(error);
    }
}
