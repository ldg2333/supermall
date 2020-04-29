<!--  -->
<template>
<div class="goods">
    <goods-list-item v-for="(item, index) in goods" :goods-item='item' :key="index">

    </goods-list-item>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

    import GoodsListItem from './GoodsListItem'

    export default {
        //import引入的组件需要注入到对象中才能使用
        name:'GoodsList',
        props:{
            goods:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            GoodsListItem
        }
    }
</script>
<style scoped>
    .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    /* justify-content: space-between; */
    
    padding: 2px;
  }
</style>