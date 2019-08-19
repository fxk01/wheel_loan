<template>
  <div class="passport">
    <div class="logo">
      <van-image :src="logo"></van-image>
    </div>
    <p class="dic">审批快 高额度 超便捷</p>
    <router-view />
  </div>
</template>


<script>
import { Image } from 'vant'
import { logo } from '@/util/data'
export default {
  name: 'passport',
  components: {
    [Image.name]: Image
  },
  data () {
    return {
      logo
    }
  }
}
</script>

<style lang="less" scoped>
.passport {
  padding: 60px 20px;
  font-size: 15px;
  color: #999999;
  text-align: center;
  /deep/ .van-cell {
    padding: 0;
    font-size: 16px;
    padding-bottom: 12px;
    border-bottom: 0.5px solid #d4d4d4;
    margin-bottom: 30px;
  }
  /deep/ .focus {
    border-color: #fd610a;
  }
  /deep/ .btn-link {
    margin-top: 40px;
    font-size: 16px;
    a {
      color: #fd610a;
      text-decoration: none;
    }
  }
  /deep/ .sms {
    border: none;
    font-size: 16px;
    color: #fd610a;
  }
  /deep/ .sms.van-button--disabled {
    color: #999;
  }
}
.logo {
  width: 155px;
  height: 43px;
  margin: 0 auto;
}
.dic {
  margin: 10px 0 60px 0;
}
</style>
