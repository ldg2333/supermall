<!--  -->
<template>
<div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
</div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name:'BackTop'
    }
</script>
<style scoped>
    .back-top{
        position: fixed;
        right: 10px;
        bottom: 60px;
    }
    .back-top img{
        height: 43px;
        width: 43px;
    }
</style>