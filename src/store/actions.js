export default {

    // Actions 可以返回一个 Promise

    addCart(context,payload){
        return new Promise((resolve,reject) => {
            // 1.查找之前数据中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

            // payload 新添加的商品
            // for (let item of state.cartList) {
            //     if(item.iid === payload.iid){
            //         oldProduct = item
            //     }
            // }

            // 2.判断 oldProduct
            if(oldProduct){
                context.commit('AddCounter',oldProduct)
                resolve('当前的商品数量+1')
            }else{
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit('addToCart',payload)
                resolve('进入购物车成功')
            }
        })
    }
}