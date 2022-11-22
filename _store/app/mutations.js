function setAttr(obj) {
  try {
      const att = [];
      for (let key in obj) {
          if (obj[key].id && obj[key].attributeId) {
              att.push({
                  name: obj[key].name,
                  value: obj[key].value,
                  attribute_id: obj[key].attributeId,
                  id: obj[key].id,
                  type: obj[key].type,
              })
          } else if (obj[key].id && !obj[key].attributeId) {
              att.push({
                  name: obj[key].name,
                  value: obj[key].value,
                  attribute_id: obj[key].id,
                  type: obj[key].type,
              })
          } else if (obj[key].attributeId && obj[key].value) {
              att.push({
                  name: obj[key].name,
                  value: obj[key].value,
                  attribute_id: obj[key].attributeId,
                  type: obj[key].type,
              })
          }
      }
      return att
  } catch (error) {
      console.log(error);
  }
}
function productDataTransformation(data = []) {
  try {
      const products = [];
      data.forEach((items) => {
          if (items.id && items.productsId) {
              products.push({
                  id: items.id,
                  product_id: items.productsId,
                  work_order_item_attributes: setAttr(items.formField)
              })
          } else if (items.id && !items.productsId) {
              products.push({
                  product_id: items.id,
                  work_order_item_attributes: setAttr(items.formField)
              })
          } else if (items.id && isDelete(items.formField)) {
              products.push({
                  product_id: items.productsId,
                  work_order_item_attributes: setAttr(items.formField)
              })
          }
      })
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
export function SET_FORM_FLIGHT(state, data) {
  state.form = {
    ...state.form,
    ...data
  };
}
export function SET_FORM_CARGO(state, data) {
  state.form = {
    ...state.form,
    ...data
  };
}
export function SET_FORM_DELAY(state, data) {
  state.delay = [
    ...data
  ]
}
export function SET_FORM_SERVICES(state, data) {
  const products = productDataTransformation(data);
  state.services = [
    ...products
  ]
}
export function SET_FORM_EQUIPMENTS(state, data) {
  const products = productDataTransformation(data);
  state.equipments = [
    ...products
  ]
}
export function SET_FORM_CREW(state, data) {
  const products = productDataTransformation(data);
  state.crew = [
    ...products
  ]
}
export function SET_FORM_REMARK(state, data) {
  state.form = {
    ...state.form,
    ...data
  };
}
export function SET_FORM_SIGNATURE(state, data) {
  state.form = {
    ...state.form,
    ...data
  };
}
export function SET_FORM_STATUS_ID(state, value) {
  state.form = {
    ...state.form,
    ...value
  };
}