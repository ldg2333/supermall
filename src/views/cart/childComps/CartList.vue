<!--  -->
<template>
<div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item, index) in cartList" :key="index" :product='item'></cart-list-item>
    </scroll>
</div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

   
    import Scroll from 'components/common/scroll/Scroll'
    import {mapGetters} from 'vuex'
    import CartListItem from './CartListItem'

    export default {
        //import引入的组件需要注入到对象中才能使用
        name:'CartList',
        computed: {
            ...mapGetters(['cartList'])
        },
        components:{
            Scroll,
            CartListItem
        },
        activated() {
            this.$refs.scroll.refresh()
        },
    }
</script>
<style scoped>

    .cart-list{
        height:calc(100% - 44px - 49px - 40px);
    }

    .content{
        height: 100%;
        overflow: hidden;
    }
</style>