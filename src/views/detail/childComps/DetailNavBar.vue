<!--  -->
<template>
<div>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
            <div @click='titleClick(index)' :class="{active:index === currentIndex}"  class="title-item" v-for="(item, index) in titles" :key="index">
                {{item}}
            </div>
        </div>
   </nav-bar>
</div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    import NavBar from 'components/common/navbar/NavBar'

    export default {
        //import引入的组件需要注入到对象中才能使用
        name:'DetailNavBar',
        components:{
            NavBar
        },
        data() {
            return {
                titles:['商品','参数','评论','推荐',],
                currentIndex:0
            }
        },
        methods: {
            titleClick(index){
                this.currentIndex = index
                this.$emit('titleClick',index)
            },
            backClick(){
                this.$router.go(-1)
            }
        },
    }
</script>
<style scoped>

    .title{
        display: flex;
        font-size: 13px;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }

    .back img{
        margin-top:12px ;
    }

</style>