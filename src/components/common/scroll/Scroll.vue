<template>
<!-- ref 一般绑定给子组件 -->
    <div class="wrapper" ref="wrapper"> 
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    import BScroll from 'better-scroll'

    export default {
        //import引入的组件需要注入到对象中才能使用
        name:'Scroll',
        props:{
            probeType:{
                type:Number, 
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                scroll:null
            }
        },
        mounted() {
            // 1.创建 BScroll 对象
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad
            })
            
            // 2.监听滚动的位置
            this.scroll.on('scroll',position => {
                // console.log(postion);
                this.$emit('scroll',position)
            })

            // 3.监听上拉事件
            this.scroll.on('pullingUp',() => {
                this.$emit('pullingUp')
            })

            
        },
        methods: {
            scrollTo(x,y,time=500){
                this.scroll.scrollTo(x,y,time)
            },
            finishPullUp(){
                this.scroll.finishPullUp()
            }
        },
    }
</script>
<style scoped>

</style>