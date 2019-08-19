<template>
  <div class="resultCom">
    <van-image class="subImg" :src="subImg"/>
    <p class="rul-text">{{text}}</p>
    <button class="sub-but" @click="backHomeFuc">确定</button>
  </div>
</template>

<script>
  import { subImg } from '@/util/data';
  import { Image } from 'vant';

  export default {
    name: 'resultCom',
    components: {
      [Image.name]: Image
    },
    data() {
      return {
        subImg,
        text: '',
      }
    },
    mounted() {
      if(this.$route.query['status'] === '1') {
        this.text = '结束询价成功'
      } else if(this.$route.query['status'] === '2') {
        this.text = '结束提单成功'
      } else if(this.$route.query['status'] === '3') {
        this.text = '提交询价订单成功，请等待报价...'
      } else if(this.$route.query['status'] === '4') {
        this.text = '提交订单成功，等待工作人员与您预约验车时间'
      } else if(this.$route.query['status'] === '5') {
        this.text = '估价成功'
      }
    },
    methods: {
      backHomeFuc() {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .resultCom {
    padding: 82px 20px 0 20px;
    text-align: center;
    line-height: 1;
    .rul-text {
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      color: #333333;
      letter-spacing: -0.39px;
      text-align: center;
      margin: 19px 0 50px 0;
    }
    .sub-but {
      background: #FD610A;
      border-radius: 4px;
      height: 45px;
      width: 100%;
      font-family: PingFang-SC-Bold;
      font-size: 17px;
      color: #FFFFFF;
      letter-spacing: -0.41px;
      text-align: center;
      border: none;
    }
  }
</style>