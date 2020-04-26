<!--  -->
<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <home-swiper :banners='banners'></home-swiper>
        <recommend-view :recommends='recommends'></recommend-view>
        <feature-view></feature-view>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    import NavBar from 'components/common/navbar/NavBar'
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'

    import {getHomeMultidata} from 'network/home'

    export default {
        //import引入的组件需要注入到对象中才能使用
        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView
        },
        data() {
            return {
                banners:[],
                recommends:[]
            }
        },
        created() {
            // 1.请求多个数据
            getHomeMultidata().then(data => {
                this.banners = data.data.banner.list
                this.recommends = data.data.recommend.list
            })
        },
    }
</script>
<style scoped>

   

    .home-nav{
        background-color: var(--color-tint);
        color: #fff;

        position: sticky;
        left: 0;
        top: 0;
        right: 0;
        z-index: 9;
    }
</style>