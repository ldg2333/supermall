import {debounce} from './utils'

export const itemListenerMixin  = {
    data() {
        return {
            ItemImgListener:null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.ItemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.ItemImgListener)
    },
}


import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
    components:{
        BackTop
    },
    data() {
        return {
            isShowBackTop:false
        }
    },
    methods: {
        backClick(){
            this.$refs.scroll.scrollTo(0,0,1000)
        }
    },
}