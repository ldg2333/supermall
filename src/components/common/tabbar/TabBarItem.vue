<!--  -->
<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "TarBarItem",
  data() {
    return {
      // isActive: false
    };
  },
  props: {
    path: String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  methods: {
    itemClick() {
      console.log("被点击");
      this.$router.push(this.path);
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
};
</script>
<style scoped>
    .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    }

    .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
    }

    .active {
      color: rgb(255, 87, 119);
    }
</style>