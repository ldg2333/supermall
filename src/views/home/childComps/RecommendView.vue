<!--  -->
<template>
<div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    name:'RecommendView',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style scoped>
    .recommend{
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 10px 0 20px;
        border-bottom: 8px solid #eee;
    }

    .recommend-item{
        flex: 1;
    }

    .recommend-item img{
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
</style>