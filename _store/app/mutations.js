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
      id:items.id,
      categoryId: items.categoryId,
      attributes : setAttr(items.formField)
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