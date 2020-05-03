import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 安装 toast 插件
Vue.use(toast)

// 使用懒加载的插件
// 将 img 的 src 换成 v-lazy 即可
Vue.use(VueLazyLoad,{
  // 占位符：当图片还没加载完时 显示该占位符
  loading:require('./assets/img/common/placeholder.png')
})

// 解决移动端的 300ms 的延迟
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
