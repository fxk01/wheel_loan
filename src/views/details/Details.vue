<template>
  <div class="details">
    <header>
      <p class="title">基本信息</p>

      <ul class="box-ul">
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">车牌号码</p>
          <p class="last-text">{{data['carNo']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">姓名</p>
          <p class="last-text">{{data['owner']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">状态</p>
          <p class="last-text" v-if="data['status'] === '1'" style="color: #FD610A;">询价中</p>
          <p class="last-text" v-else-if="data['status'] === '0'" style="color: #999999;">已结束</p>
          <p class="last-text" v-else-if="data['status'] === '2'" style="color: #2876FF;">已估价</p>
          <p class="last-text" v-else style="color: #2876FF;">已提单</p>
        </li>
        <li class="flex flex-align-center flex-justify-between" v-if="rightsDesc === 'risk' && data['autom_expected_prices']">
          <p class="first-text">第三方估价</p>
          <p class="last-text">{{data['autom_expected_prices']}}(元)</p>
        </li>
        <li class="flex flex-align-center flex-justify-between" v-if="rightsDesc === 'risk' && data['expected_prices']">
          <p class="first-text">人工估价</p>
          <p class="last-text">{{data['expected_prices']}}(元)</p>
        </li>
        <li class="flex flex-align-center flex-justify-between" v-if="rightsDesc !== 'risk' && data['status'] !== '1' && data['prices_update_by'] === 'system'">
          <p class="first-text">第三方估价</p>
          <p class="last-text">{{data['expected_prices']}}(元)</p>
        </li>
        <li class="flex flex-align-center flex-justify-between" v-if="rightsDesc !== 'risk' && data['status'] !== '1' && data['prices_update_by'] !== 'system'">
          <p class="first-text">人工估价</p>
          <p class="last-text">{{data['expected_prices']}}(元)</p>
        </li>
      </ul>
    </header>

    <main>
      <p class="title">行驶证照片</p>

      <ul class="flex flex-align-center flex-justify-between">
        <li>
          <img :src="data['driving_permit_files']" @click="imagePreviewFuc"/>
          <p class="item-text">行驶证信息</p>
          <!--<p class="item-text">行驶证信息（主页)</p>-->
        </li>

        <!--<li>-->
          <!--<img :src="banner"/>-->
          <!--<p class="item-text">行驶证信息（副页)</p>-->
        <!--</li>-->
      </ul>
    </main>

    <main v-if="(data['status'] === '0' || data['status'] === '3') && idCardFiles">
      <p class="title">身份证照片</p>

      <ul class="flex flex-align-center flex-justify-between">
        <li>
          <img :src="fileIdCarFront" @click="imagePreviewFuc2(0)"/>
          <p class="item-text">身份证信息(头像面)</p>
        </li>

        <li class="ml-9">
          <img :src="fileIdCarBack" @click="imagePreviewFuc2(1)"/>
          <p class="item-text">身份证信息(国徽面)</p>
        </li>
      </ul>
    </main>

    <!-- 风控 -->
    <div class="risk" v-if="rightsDesc === 'risk' && (data['status'] === '1' || data['status'] === '2') && data['flag'] !== 0 && !data['expected_prices']">
      <div class="flex flex-align-center flex-justify-between">
        <p class="evaluation-text">人工估价</p>
        <!--<p class="money-text">17，500（元)</p>-->
      </div>

      <van-field v-model="value" placeholder="请输入人工估价" />
    </div>

    <footer>
      <button v-if="data['status'] === '1' && rightsDesc !== 'risk'" @click="endOrderFuc">结束询价</button>
      <button v-if="data['status'] === '2' && rightsDesc !== 'risk'" style="background-color: #2876FF;" @click="hrefEnquiryFuc">提交借款订单</button>
      <button v-if="data['status'] === '2' && rightsDesc !== 'risk'" @click="endOrderFuc">结束提单</button>
      <button v-if="rightsDesc === 'risk' && (data['status'] === '1' || data['status'] === '2') && data['flag'] !== 0 && !data['expected_prices']" @click="assessAmountOrder">提交</button>
    </footer>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/7/3
  */

  import { mixin } from '@/util/com';
  import { banner } from '@/util/data';
  import { Field, Toast, ImagePreview } from 'vant';

  export default {
    mixins: [mixin],
    name: 'detail',
    components: {
      [Field.name]: Field,
      [Toast.name]: Toast,
      [ImagePreview.name]: ImagePreview
    },
    data() {
      return {
        banner,
        value: '',
        data: {
          driving_permit_files: ''
        },
        fileIdCarFront: banner,
        fileIdCarBack: banner,
        idCardFiles: true,
      };
    },
    mounted() {
      this.getRightsDesc();

      this.$store.dispatch('orderDetail', {pid: this.$route.query['pid']}).then(res => {
        if(res.code === '0') {
          Toast(res.msg)
        } else {
          this.data = res.data;
          this.data.driving_permit_files = res.data['queryVehicleLicensePath'];
          if(this.data['id_card_files'] !== undefined) {
            let _fileArr = JSON.parse(this.data['id_card_files']);
            this.fileIdCarFront = _fileArr[0]['queryPath'];
            this.fileIdCarBack = _fileArr[1]['queryPath']
          } else {
            this.idCardFiles = false
          }
        }
      })
    },
    methods: {
      imagePreviewFuc() {
        ImagePreview({
          images: [
            this.data['driving_permit_files']
          ],
          startPosition: 0,
        });
      },

      imagePreviewFuc2(num) {
        ImagePreview({
          images: [
            this.fileIdCarFront,
            this.fileIdCarBack
          ],
          startPosition: num,
        });
      },

      endOrderFuc() {
        Toast.allowMultiple();
        let toast1 = Toast.loading({
          mask: true,
          message: '询价中',
          duration: 0,
        });
        this.$store.dispatch('endColseInquiry', {pid: this.$route.query['pid']}).then(res => {
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            Toast('结束询价成功');
            toast1.clear();
            this.$router.push({
              name: 'result',
              query: {
                status: this.data.status,
              }
            })
          }
        })
      },

      hrefEnquiryFuc() {
        this.$router.push({
          name: 'enquiry',
          query: {
            status: 1,
            pid: this.$route.query['pid']
          }
        })
      },

      assessAmountOrder() {
        Toast.allowMultiple();
        let toast1 = Toast.loading({
          mask: true,
          message: '估价中',
          duration: 0,
        });
        this.$store.dispatch('orderAssessAmount', {
          pid: this.$route.query['pid'],
          amount: this.value
        }).then(res => {
          Toast('估价成功');
          toast1.clear();
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.$router.push({
              name: 'result',
              query: {
                status: '5',
              }
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .details {
    background-color: #F5F5F5;
    min-height: 100vh;
    /*padding: 10px 0;*/
    .ml-9 {
      margin-left: 9px;
    }
    header {
      min-height: 127px;
      background-color: #ffffff;
      padding: 15px 15px 20px 15px;
      line-height: 1;
      .title {
        font-family: PingFang-SC-Medium;
        font-size: 15px;
        color: #333333;
        letter-spacing: -0.36px;
        padding-bottom: 14px;
        margin-bottom: 15.5px;
        border-bottom: 1px solid #EFEFEF;
      }
      .box-ul li {
        margin-bottom: 20px;
      }
      .box-ul li:last-child {
        margin-bottom: 0;
      }
      .first-text {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #999999;
        letter-spacing: -0.34px;
      }
      .last-text {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.34px;
      }
    }

    main {
      background-color: #ffffff;
      height: 182px;
      margin-top: 10px;
      padding: 15px 15px 19px 15px;
      line-height: 1;
      .title {
        font-family: PingFang-SC-Medium;
        font-size: 15px;
        color: #333333;
        letter-spacing: -0.36px;
        border-bottom: 1px solid #EFEFEF;
        padding-bottom: 14px;
        margin-bottom: 15.5px;
      }
      ul li {
        text-align: center;
        width: 100%;
        img {
          /*width: 168px;*/
          width: 100%;
          height: 114px;
          border-radius: 8px;
        }
        .item-text {
          font-family: PingFang-SC-Medium;
          font-size: 12px;
          color: #999999;
          letter-spacing: -0.29px;
          text-align: center;
          margin-top: 10px;
        }
      }
    }

    footer {
      padding: 0 20px;
      button {
        margin-top: 30px;
        width: 100%;
        border: none;
        background: #FD610A;
        border-radius: 4px;
        height: 45px;
        font-family: PingFang-SC-Bold;
        font-size: 17px;
        color: #FFFFFF;
        letter-spacing: -0.41px;
        text-align: center;
      }
      button:last-child {
        margin-top: 20px;
      }
    }

    .risk {
      height: 70px;
      background-color: #ffffff;
      margin-top: 10px;
      padding: 20px 15px;
      /deep/ .van-field__control::-webkit-input-placeholder {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #999999;
        letter-spacing: -0.34px;
      }
      /deep/ .van-field__control:-moz-placeholder {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #999999;
        letter-spacing: -0.34px;
      }
      /deep/ .van-field__control::-moz-placeholder {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #999999;
        letter-spacing: -0.34px;
      }
      /deep/ .van-field__control:-ms-input-placeholder {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #999999;
        letter-spacing: -0.34px;
      }
      /deep/ .van-cell {
        border-bottom: 1px solid #E3E3E3;
        padding: 26px 0 8px 0;
      }
      line-height: 1;
      .evaluation-text {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.34px;
      }
      .money-text {
        font-family: PingFang-SC-Medium;
        font-size: 14px;
        color: #999999;
        letter-spacing: -0.34px;
        text-align: right;
      }
    }
  }
</style>