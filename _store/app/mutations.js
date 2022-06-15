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
  console.log('delay', data)
  state.delay = [
    ...data
  ]
}
export function SET_FORM_PRODUCTS(state, data) {
  function setAttr (obj){
    const att = []
    for(let key in obj){
      att.push({
        name: obj[key].name,
        value: obj[key].value,
        id:obj[key].id,
      })
    }
    return att
  }
  const products = []
  data.forEach((items) => {
    products.push({
      products_Id: items.productsId ? items.productsId : items.id,
      category_Id: items.categoryId,
      work_order_item_attributes: setAttr(items.formField)
    })
  })
  state.products = [
    ...state.products,
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