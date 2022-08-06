
export const state = () => ({
  order_number: null,
})

export const mutations = {
  addOrderNumber(state, orderNumber) {
    state.order_number = orderNumber
  },
}

export const actions = {
  addOrderNumber(context, orderNumber) {
    context.commit(orderNumber)
  },
}

export const getters = {
  getOrderNumber: (state) => {
    return state.order_number
  },
}
