<!--  -->
<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button @click.native='checkClick' :is-checked='isSelectAll' class="check-button"></check-button>
      <span>全选</span>
    </div>

    <div class="check-price">
      合计:
      <span>{{totalPrice}}</span>
    </div>

    <div class="cacluate" @click='calcClick'>购买({{checkLength}})</div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import CheckButton from "components/content/checkButton/CheckButton";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return item.price * item.count + preValue;
          }, 0)
          .toFixed(2)
      )
    },
    checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll(){
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick(){
      if(this.isSelectAll){ // 宣布选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{ // 部分或全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }

      // this.$store.state.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择要购买的商品',2000)
      }
    }
  }
}
</script>
<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.check-price {
  flex: 1;
  margin-left: 55px;
}

.check-price span {
  color: red;
}

.cacluate{
    width: 90px;
    background-color: red;
    text-align: center;
    color: #fff;
}
</style>