<template>
  <div class="top">
    <van-nav-bar
      :title="title"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/7/1
  */

  import { NavBar } from 'vant';

  export default {
    name: 'top',
    props: ['title'],
    components: {
      [NavBar.name]: NavBar,
    },
    methods: {
      onClickLeft() {
      },
      onClickRight() {
      }
    }
  }
</script>

<style lang="less" scoped>
  .top {

  }
</style>