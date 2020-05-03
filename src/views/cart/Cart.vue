<!--  -->
<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>

        <!-- 商品列表 -->
        <cart-list></cart-list>

        <!-- 底部汇总 -->
       <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    import NavBar from 'components/common/navbar/NavBar'
    import {mapGetters} from 'vuex'
    import CartList from './childComps/CartList'
    import CartBottomBar from './childComps/CartBottomBar'
    
    
    export default {
        //import引入的组件需要注入到对象中才能使用
        name:'Cart',
        components:{
            NavBar,
            CartList,
            CartBottomBar
        },
        computed: {
            // cartLength(){
            //     return this.$store.getters.cartLength
            // },
            // ...mapGetters([
            //     'cartLength',
            //     'cartList'
            // ])

            ...mapGetters({
                length:'cartLength',
                list:'cartList'
            })
        },
    }
</script>
<style scoped>

    .cart{
        height: 100vh;
    }

    .nav-bar{
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
    }

    
</style>