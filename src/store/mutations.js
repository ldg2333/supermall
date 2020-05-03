export default {
    // mutations 唯一的目的就是修改 state 中状态
    // mutations 中的每个方法尽可能完成的时间比较单一一点

    AddCounter(state,payload){
        payload.count++
    },

    addToCart(state,payload){
        payload.checked = false
        state.cartList.push(payload)
    }
}