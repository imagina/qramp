function setAttr (obj){
  const att = []
  for(let key in obj){
    if(obj[key].id && obj[key].attributeId) {
      att.push({
        name: obj[key].name,
        value: obj[key].value,
        attribute_id:obj[key].attributeId,
        id:obj[key].id,
      })
    }else if (obj[key].id && !obj[key].attributeId) {
      att.push({
        name: obj[key].name,
        value: obj[key].value,
        attribute_id:obj[key].id,
      })
    } else if(obj[key].attributeId && obj[key].value) {
      att.push({
        name: obj[key].name,
        value: obj[key].value,
        attribute_id:obj[key].attributeId,
      })
    }
  }
  return att
}
function isDelete (obj){
  const att = []
  for(let key in obj){
     return obj[key].value && obj[key].value != ""
  }
  return att
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
  const products = []
  data.forEach((items) => {
    if (items.id && items.productsId) {
      products.push({
        id: items.id,
        products_Id: items.productsId,
        work_order_item_attributes: setAttr(items.formField)
      })
    } else if (items.id && !items.productsId) {
      products.push({
        products_Id: items.id,
        work_order_item_attributes: setAttr(items.formField)
      })
    } else if (items.id && isDelete(items.formField)) {
      products.push({
        products_Id: items.productsId,
        work_order_item_attributes: setAttr(items.formField)
      })
    }
  })
  state.services = [
    ...products
  ]
}
export function SET_FORM_EQUIPMENTS(state, data) {
  const products = []
  data.forEach((items) => {
    if (items.id && items.productsId) {
      products.push({
        id: items.id,
        products_Id: items.productsId,
        work_order_item_attributes: setAttr(items.formField)
      })
    } else if (items.id && !items.productsId) {
      products.push({
        products_Id: items.id,
        work_order_item_attributes: setAttr(items.formField)
      })
    } else if (items.id && isDelete(items.formField)) {
      products.push({
        products_Id: items.productsId,
        work_order_item_attributes: setAttr(items.formField)
      })
    }
  })
  state.equipments = [
    ...products
  ]
}
export function SET_FORM_CREW(state, data) {
  const products = []
  data.forEach((items) => {
    if (items.id && items.productsId) {
      products.push({
        id: items.id,
        products_Id: items.productsId,
        work_order_item_attributes: setAttr(items.formField)
      })
    } else if (items.id && !items.productsId) {
      products.push({
        products_Id: items.id,
        work_order_item_attributes: setAttr(items.formField)
      })
    } else if (items.id && isDelete(items.formField)) {
      products.push({
        products_Id: items.productsId,
        work_order_item_attributes: setAttr(items.formField)
      })
    }
  })
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