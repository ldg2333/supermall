<!--  -->
<template>
<div id="detail">
   <detail-nav-bar ref="nav"  @titleClick='titleClick' class="detail-nav"></detail-nav-bar>
   <scroll :probe-type='3' @scroll="contentScroll" class="content" ref="scroll">
        <detail-swiper :top-images='topImages'></detail-swiper>
        <detail-base-info :goods='goods'></detail-base-info>
        <detail-shop-info :shop='shop'></detail-shop-info>
        <detail-goods-info @imageLoad='imageLoad' :detail-info='detailInfo'></detail-goods-info>
        <detail-param-info ref="params" :paramInfo='paramInfo'></detail-param-info>
        <detail-comment-info ref="comment" :comment-info='commentInfo'></detail-comment-info>
        <goods-list ref="recommend" :goods='recommends'></goods-list>
   </scroll>
   <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
   <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
   <!-- <toast :message='message' :show='show'></toast> -->
</div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    import DetailNavBar from './childComps/DetailNavBar'
    import DetailSwiper from './childComps/DetailSwiper'
    import DetailBaseInfo from './childComps/DetailBaseInfo'
    import DetailShopInfo from './childComps/DetailShopInfo'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo'
    import DetailParamInfo from './childComps/DetailParamInfo'
    import DetailCommentInfo from './childComps/DetailCommentInfo'
    import DetailBottomBar from './childComps/DerailBottomBar'
    import BackTop from 'components/content/backTop/BackTop'

    import GoodsList from 'components/content/goods/GoodsList'
    import Scroll from 'components/common/scroll/Scroll'
    
    import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
    import {itemListenerMixin} from 'common/mixin'
    import {debounce} from 'common/utils'

    // import Toast from 'components/common/toast/Toast'

    export default {
    //import引入的组件需要注入到对象中才能使用
    name:'Detail',
    data() {
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeYopY:null,
            currentIndex:0,
            isShowBackTop:false
        }
    },
    mixins:[itemListenerMixin],
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop
    },
    methods: {
        imageLoad(){
            this.$refs.scroll.refresh()

            this.getThemeYopY()
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],1000)
        },
        contentScroll(position){
            // console.log(position);
            // 1.获取 y 值
            const positionY = -position.y

            let length = this.themeTopYs.length
            // 2.positionY 和主题的值进行对比
           for(let i = 0; i<length-1; i++){
                // 在 for in 中 此时 i 为 一个字符串
                // i = parseFloat(i)
                // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
                    
                // }

                // if(this.currentIndex !== i && (i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY >= this.themeTopYs[i])){
                //    this.currentIndex = i
                //    this.$refs.nav.currentIndex = this.currentIndex
                // }

                if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                    this.currentIndex = i
                    this.$refs.nav.currentIndex = this.currentIndex
                }
            }

            // 3.是否显示回到顶部
            this.isShowBackTop = positionY > 1000 ? true : false
        },
        backClick(){
            this.$refs.scroll.scrollTo(0,0,1000)
        },
        addToCart(){
            // 1.获取购物车需要展示的信息
            const product = {}

            product.image = this.topImages[0]
            product.title = this.goods.title
            product.desc = this.goods.desc
            product.price = this.goods.realPrice
            product.iid = this.iid

            // 2.将商品添加到购物车里面
            // this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product).then(res => {
                // this.show = true 
                // this.message = res

                // setTimeout(() => {
                //     this.show = false
                //     this.message = ''
                // },1500)

                this.$toast.show(res,2000)
                // console.log(this.$toast);
                
            })


        }
    },
    mounted() {
       
    },
    created() {
        // 1.保存传入的 iid
        this.iid = this.$route.params.iid
        
        // 2.根据 iid 请求详情数据
        getDetail(this.iid).then(res => {
            // 1.获取顶部的图片轮播数据
            const data = res.result
            this.topImages = res.result.itemInfo.topImages

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            // 3.创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            // 4.保存商品的详情数据
            this.detailInfo = data.detailInfo

            // 5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

            // 6.取出评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0]
            }

            
        })

        // 3.请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })

        // 4.给 getThemeYopY 赋值 (对 this.themeYopY 赋值的操作进行防抖)
        this.getThemeYopY = debounce(() => {
            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)  
            this.themeTopYs.push(Number.MAX_VALUE)        
            // console.log(this.themeTopYs)
        },200) 
        
    },
    destroyed() {
        this.$bus.$off('itemImageLoad',this.ItemImgListener)
    },
    }
</script>
<style scoped>
    #detail{
        position: relative;
        z-index: 10;
        background-color: #fff;
        height: 100vh;
        /* padding-bottom: 59px; */
    }

    .detail-nav{
        position: relative;
        z-index: 10;
        background-color: #fff;
    }

    .content{
        height: calc(100% - 103px);
    }
</style>