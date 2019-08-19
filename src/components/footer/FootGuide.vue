<template>
  <van-tabbar route class="foot-guide">
    <van-tabbar-item to="/" active-color="#FD610A">
      首页
      <img
        slot="icon"
        slot-scope="props"
        :src="
          props.active ? tabbaricon.homeicon.active : tabbaricon.homeicon.normal
        "
      />
    </van-tabbar-item>
    <van-tabbar-item to="/order" icon="refund-o">
      订单
      <img
        slot="icon"
        slot-scope="props"
        :src="
          props.active
            ? tabbaricon.ordericon.active
            : tabbaricon.ordericon.normal
        "
      />
    </van-tabbar-item>
    <!--<van-tabbar-item to="/contact" icon="contact">-->
      <!--我的-->
      <!--<img-->
        <!--slot="icon"-->
        <!--slot-scope="props"-->
        <!--:src="-->
          <!--props.active-->
            <!--? tabbaricon.accounticon.active-->
            <!--: tabbaricon.accounticon.normal-->
        <!--"-->
      <!--/>-->
    <!--</van-tabbar-item>-->
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import { tabbaricon } from '@/util/data'
export default {
  name: 'foot-guide',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data () {
    return {
      tabbaricon
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.foot-guide {
  /deep/ .van-tabbar-item__text {
    font-size: 10px;
    color: #bdbdbd;
  }
  /deep/ .van-tabbar-item--active .van-tabbar-item__text {
    color: #fd610a;
  }
}
</style>
