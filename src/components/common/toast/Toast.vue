<!--  -->
<template>
<div class='toast' v-show="isShow">
    <div>
        {{message}}
    </div>
</div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
        //import引入的组件需要注入到对象中才能使用
        name:'Toast',
        // props:{
        //     message:{
        //         type:String,
        //         default:''
        //     },
        //     show:{
        //         type:Boolean,
        //         default:false
        //     }
        // }
        data() {
            return {
                message:'',
                isShow:false
            }
        },
        methods: {
            show(message,duration = 1000){
                this.isShow = true
                this.message = message

                setTimeout(() => {
                    this.isShow = false
                    this.message = ''
                },duration)
            }
        },
    }
</script>
<style scoped>
    .toast{
        position:fixed;
        top:50%;
        left:50%;
        padding:8px 10px;
        transform:translate(-50% , -50%);
        color:#fff;
        background-color: rgba(0,0,0,.75);
        z-index: 888;
    }
</style>