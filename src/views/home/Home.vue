<!--  -->
<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tab-control v-show="isTabFixed" class="tab-control" ref="tabControl1" @tabClick='tabClick' :titles='["流行","新款","精选"]'></tab-control>
        <scroll class="content" ref='scroll' @pullingUp='loadMore' :probe-type='3' @scroll="contentScroll" :pull-up-load='true'>
            <home-swiper @swiperImageLoad='swiperImageLoad' :banners='banners'></home-swiper>
            <recommend-view :recommends='recommends'></recommend-view>
            <feature-view></feature-view>
            <tab-control v-show="!isTabFixed"  ref="tabControl2" @tabClick='tabClick' :titles='["流行","新款","精选"]'></tab-control>
            <goods-list :goods='showGoods'></goods-list>
        </scroll>

        <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
</div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

   
    import HomeSwiper from './childComps/HomeSwiper'
    import RecommendView from './childComps/RecommendView'
    import FeatureView from './childComps/FeatureView'

    import NavBar from 'components/common/navbar/NavBar'
    import TabControl from 'components/content/tabControl/TabControl'
    import GoodsList from 'components/content/goods/GoodsList'
    import BackTop from 'components/content/backTop/BackTop'

    import {getHomeMultidata,getHomeGoods} from 'network/home'
    import Scroll from 'components/common/scroll/Scroll'
    import {debounce} from 'common/utils'
    import {itemListenerMixin} from 'common/mixin'

    export default {
        //import引入的组件需要注册到对象中才能使用
        components:{
            NavBar,
            HomeSwiper,
            RecommendView,
            FeatureView,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        computed: {
            showGoods(){
                return this.goods[this.currentType].list
            }
        },
        data() {
            return {
                banners:[],
                recommends:[],
                goods:{
                    "pop":{page:0,list:[]},
                    "new":{page:0,list:[]},
                    "sell":{page:0,list:[]}
                },
                currentType:'pop',
                isShowBackTop:false,
                tabOffsetTop:0,
                isTabFixed:false,
                saveY:0,
                ItemImgListener:null
            }
        },
        
        created() {
            // 1.请求多个数据
            this.getHomeMulitidata(),
            // 2.请求商品数据
            this.getHomeGoods('pop')
            this.getHomeGoods('new')
            this.getHomeGoods('sell')
        },
        methods: {

            /*
                事件监听相关的方法
            */ 

           tabClick(index){
               switch(index){
                   case 0:
                       this.currentType = 'pop'
                       break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
               }
               this.$refs.tabControl1.currentIndex = index
               this.$refs.tabControl2.currentIndex = index
           },

           backClick(){
               this.$refs.scroll.scrollTo(0,0,1000)
           },
           contentScroll(position){
               // 1.判断 BackTop 是否显示
               this.isShowBackTop = position.y < -1000 ? true : false

               // 2.决定 tabControl 是否吸顶 (position:fixed)
               this.isTabFixed = (-position.y + 44) > this.tabOffsetTop
           },

           loadMore(){
               this.getHomeGoods(this.currentType)
           },
           
            swiperImageLoad(){
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },

            /*
                网络请求相关的方法
            */ 
            getHomeMulitidata(){
                getHomeMultidata().then(data => {
                    this.banners = data.data.banner.list
                    this.recommends = data.data.recommend.list
                })
            },
            getHomeGoods(type){
                const page = this.goods[type].page + 1
                getHomeGoods(type,page).then(data => {
                    this.goods[type].list.push(...data.data.list)
                    this.goods[type].page += 1

                    // 完成了上拉加载更多
                    this.$refs.scroll.finishPullUp()
                })
            }
        },
        destroyed() {
            
        },
        activated() {
            this.$refs.scroll.scrollTo(0,this.saveY)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            // 1.保存 Y 值
            this.saveY = this.$refs.scroll.getScrollY()

            // 2.取消全局事件的监听
            this.$bus.$off('itemImageLoad',this.ItemImgListener)
        },
        mixins:[itemListenerMixin]
    }
</script>
<style scoped>
   
    #home{
        /* padding-top: 44px; */
        height: 100vh;
        position: relative;
    }

    .home-nav{
        background-color: var(--color-tint);
        color: #fff;

        /* 在使用浏览器时原生滚动时 为了让导航不跟随一起滚动 */
        /* position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 9; */
    }
    /* .fixed{
        position: fixed;
        top: 44px;
        right: 0;
        z-index: 9;
    } */

    .tab-control{
        position: relative;
        z-index: 9;
        height: 44px;
        line-height: 44px;
    }

    /* .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 49px;
    } */

    .content{
        height: calc(100% - 93px);
        overflow: hidden;
    }
</style>