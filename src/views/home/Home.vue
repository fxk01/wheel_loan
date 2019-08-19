<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <div class="item">
          <router-link to="">
            <van-image width="100%" height="100%" :src="banner" />
          </router-link>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="item">
          <router-link to="">
            <van-image width="100%" height="100%" :src="banner" />
          </router-link>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="item">
          <router-link to="">
            <van-image width="100%" height="100%" :src="banner" />
          </router-link>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="item">
          <router-link to="">
            <van-image width="100%" height="100%" :src="banner" />
          </router-link>
        </div>
      </van-swipe-item>
    </van-swipe>
    <van-notice-bar
      :text="notice"
      class="notice"
      background="#fff"
      :left-icon="volume"
      mode="link"
      @click="gotoMessage"
    />
    <router-link to="product" class="">
      <section class="to-product">
        <h2>乾轮车贷</h2>
        <p>全线简单操作流程 最快30分钟放款</p>
      </section>
    </router-link>
    <router-link to="company">
      <section class="to-company">
        <h2>关于我们</h2>
        <p>了解闪垫客</p>
      </section>
    </router-link>
    <foot-guide />
  </div>
</template>

<script>
  import { Swipe, SwipeItem, NoticeBar, Image } from 'vant';
  import FootGuide from '@/components/footer/FootGuide.vue'
  import FootGuideVue from '@/components/footer/FootGuide.vue';
  import { banner, volume } from '@/util/data';

  export default {
    name: 'home',
    data () {
      return {
        notice: '暂无通知',
        banner,
        volume,
      }
    },
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [NoticeBar.name]: NoticeBar,
      [Image.name]: Image,
      [FootGuide.name]: FootGuideVue,
    },
    methods: {
      gotoMessage () {
        this.$router.push('message')
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/theme/styles/mixins";
  .home {
    /deep/ .van-swipe__indicator--active {
      width: 12px;
      border-radius: 6px;
    }
  }
  .item {
    height: 130px;
  }
  .notice {
    height: 56px;
    color: #333;
    font-size: 15px;
    /deep/ .van-notice-bar__left-icon {
      margin-right: 10px;
    }
    /deep/ .van-notice-bar__right-icon {
      color: #c6c6c6;
      font-size: 12px;
    }
  }
  .to-product {
    .bg-image("product");
  }
  .to-company {
    .bg-image("company");
  }
  .to-product,
  .to-company {
    box-sizing: border-box;
    padding-top: 60px;
    line-height: 1;
    text-align: center;
    height: 170px;
    width: 100vw;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 10px;
    h2 {
      font-size: 22px;
      color: #fff;
      margin-bottom: 14px;
      font-weight: 700;
    }
  }
</style>

