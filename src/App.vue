<template>
  <div>
    <mt-header fixed title="每日新闻"></mt-header>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="外卖">
      <img slot="icon" src="./assets/1212.jpg" >
      首页
    </mt-tab-item>
    <mt-tab-item id="订单">
      <img slot="icon" src="./assets/321321.jpg">
      消息
    </mt-tab-item>
    <mt-tab-item id="发现">
    <img slot="icon" src="./assets/1233.jfif">
    通讯录
    </mt-tab-item>
    <mt-tab-item id="我的">
    <img slot="icon" src="./assets/33213.jfif">
    设置
  </mt-tab-item>
</mt-tabbar>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      selected:''
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
 scoped>

</sty>
