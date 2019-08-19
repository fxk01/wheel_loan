<template>
  <div class="product">
    <h1>乾轮车贷</h1>
    <p class="doc">
      乾轮车贷是闪垫客信息科技针对汽车金融短、频、快的特性，高效解决中小企业以及个人快速实现资金周转的互联网金融应用APP，面向全国，满足各地区不同层次资金借款的需求。
    </p>
    <section class="superiority">
      <h2>产品优势</h2>
      <van-row type="flex" justify="space-between">
        <van-col span="8">
          <div class="icon-box">
            <van-image :src="approve"> </van-image>
          </div>
          <h4>审批快</h4>
          <p>
            在线处理申请快<br />
            最快1小时
          </p>
        </van-col>
        <van-col span="8">
          <div class="icon-box">
            <van-image :src="limit"> </van-image>
          </div>
          <h4>高额度</h4>
          <p>
            申请额度最高<br />
            无上限
          </p>
        </van-col>
        <van-col span="8">
          <div class="icon-box">
            <van-image :src="speedy"> </van-image>
          </div>
          <h4>超便捷</h4>
          <p>
            手机操作，0材料<br />
            省时省力
          </p>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between">
        <van-col span="8">
          <div class="icon-box">
            <van-image :src="toll"> </van-image>
          </div>
          <h4>收费透明</h4>
          <p>
            支付痕迹，随时<br />
            查账
          </p>
        </van-col>
        <van-col span="8">
          <div class="icon-box">
            <van-image :src="minimum"> </van-image>
          </div>
          <h4>无最低收费</h4>
          <p>
            按比例收费
          </p>
        </van-col>
        <van-col span="8">
          <div class="icon-box">
            <van-image :src="rate"> </van-image>
          </div>
          <h4>费率低</h4>
          <p>
            最低可至1%
          </p>
        </van-col>
      </van-row>
      <h3>全线简单操作流程 最快30分钟放款</h3>
      <div class="ikon">
        <van-image :src="ikon" />
      </div>

      <div class="panel reg">
        <h4>简便注册</h4>
        <p>分分钟提交借款申请</p>
      </div>
      <div class="panel bid">
        <h4>合理出值</h4>
        <p>综合市场评估车辆各平台信息，出值合理</p>
      </div>
      <div class="panel eaa">
        <h4>实时审批</h4>
        <p>快速审批，实时放款</p>
      </div>
      <h2>流程说明</h2>
      <ul class="explain">
        <li>
          1、上传行驶证照片、填写车辆信息，提交询价申请；
        </li>
        <li>
          2、工作人员将在30分钟内回复报价；
        </li>
        <li>
          3、收到报价提醒短信后，登录app查询并提交订单；
        </li>
        <li>
          4、工作人员将在30分钟内致电预约验车时间（当天验车）；
        </li>
        <li>
          5、现场验车，给出可借款金额；
        </li>
        <li>
          6、接受可借款金额。签约，车辆入库同时工作人员陪同借款人到放款处签字放款（非京牌签约后可直接放款）；
        </li>
        <li>
          7、放款；
        </li>
        <li>
          8、借款人缴纳押金、服务费等；
        </li>
        <li>
          9、借款人按合同约定的日期和金额还款；
        </li>
        <li>
          10、借款结清，借款人提车。
        </li>
      </ul>
    </section>
    <div class="btn-link">
      <van-button
        v-if="!token"
        type="info"
        size="large"
        :to="{ name: '/passport/login', query: { redirect: '/product' } }"
        >登录去询价</van-button
      >
      <!--v-if="roles === 'Customer'"-->
      <van-button type="info" size="large" to="enquiry">
        我要询价
      </van-button>
    </div>
  </div>
</template>

<script>
  import { Row, Col, Image, Button } from "vant";
  import { mapGetters } from "vuex";
  import { approve, limit, speedy, toll, minimum, rate, ikon } from "@/util/data";

  export default {
    name: "company",
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Image.name]: Image,
      [Button.name]: Button
    },
    data () {
      return {
        approve,
        limit,
        speedy,
        toll,
        minimum,
        rate,
        ikon
      };
    },
    computed: {
      ...mapGetters(['roles', 'token'])
    },
    methods: {},
    mounted() {
    }
  };
</script>


<style lang="less" scoped>
  @import "~@/assets/theme/styles/mixins";
  .product {
    box-sizing: border-box;
    padding: 47px 20px 50px 20px;
    .bg-image("productbg");
    background-repeat: no-repeat;
    background-size: 100%;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    h1 {
      font-family: PingFang-SC-Bold;
      font-size: 24px;
      color: #fff;
      text-align: center;
      line-height: 1;
      margin-bottom: 36px;
    }
  }
  .superiority {
    background: #fff;
    margin: 0 -20px;
    margin-top: 35px;
    border-radius: 20px 20px 0 0;
    padding: 40px 20px 24px 20px;
    font-size: 12px;
    color: #8b8f93;
    h2 {
      font-family: PingFangSC-Medium;
      font-weight: 700;
      text-align: center;
      font-size: 20px;
      color: #191f25;
      position: relative;
      margin-bottom: 30px;
      &::before,
      &::after {
        content: "";
        display: inline-block;
        height: 13px;
        width: 54px;
        margin: 0 11px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100% 100%;
      }
      &::before {
        .bg-image("icbefor");
      }
      &::after {
        .bg-image("icafter");
      }
    }
    /deep/ .van-row {
      text-align: center;
      margin-bottom: 30px;
      h4 {
        font-family: PingFang-SC-Medium;
        font-size: 15px;
        color: #333;
        padding: 10px 0;
      }
      p {
        font-size: 12px;
      }
    }
    .icon-box {
      height: 56px;
      width: 56px;
      margin: 0 auto;
    }
    h3 {
      text-align: center;
      font-family: PingFang-SC-Bold;
      font-size: 18px;
      color: #333333;
      font-weight: 700;
      padding: 26px 0 32px 0;
    }
    .ikon {
      margin: 0 -20px;
    }
    .panel {
      box-sizing: border-box;
      height: 80px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
      margin-bottom: 10px;
      padding: 20px;
      line-height: 1;
      background-repeat: no-repeat;

      h4 {
        font-size: 16px;
        color: #333;
      }
      p {
        font-size: 13px;
        margin-top: 10px;
      }
    }
    .reg {
      .bg-image("zhuce");
      background-size: 74px 58px;
      background-position: 256px bottom;
    }
    .bid {
      .bg-image("heliyongyao");
      background-size: 74px 58px;
      background-position: 251px bottom;
    }
    .eaa {
      .bg-image("shenpi");
      background-size: 74px 57px;
      background-position: 254px bottom;
      margin-bottom: 70px;
    }
  }
  .explain {
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    color: #333333;
    line-height: 28px;
  }
  .btn-link {
    position: fixed;
    width: 100vw;
    height: 50px;
    left: 0;
    bottom: 0;
  }
</style>