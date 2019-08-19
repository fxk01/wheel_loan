<template>
  <div class="company">
    <van-image :src="aboutCompany"> </van-image>
  </div>
</template>
<script>
import { Image } from 'vant'
import { aboutCompany } from '@/util/data'
export default {
  name: 'company',
  components: {
    [Image.name]: Image
  },
  data () {
    return {
      aboutCompany
    }
  }
}
</script>
<style lang="less" scoped>
  .company {
    /deep/ .van-image {
      height: 100vh;
    }
  }
</style>