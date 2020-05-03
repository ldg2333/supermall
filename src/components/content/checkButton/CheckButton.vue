<!--  -->
<template>
<div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
</div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name:'CheckButton',
        props:{
            isChecked:{
                type:Boolean,
                default:false
            }
        }
    }
</script>
<style scoped>
    .check-button{
        border-radius: 50%;
        border: 2px solid #aaa;
        
    }
    .check{
        border-color: red;
        background-color: red;
    }
</style>