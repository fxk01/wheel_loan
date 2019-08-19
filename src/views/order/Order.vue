<template>
  <div class="order">
    <form action="/">
      <van-search
        class="search"
        type="search"
        :left-icon="search"
        @search="onSearchOrder"
        placeholder="请输入车牌号"
        v-model="value" />
    </form>

    <van-tabs v-model="active" @click="selectTabsFuc" animated>
      <van-tab :title="index <= 0 ? item.title : `${item.title}(${item.count})`" v-for="(item, index) in arrTab" :key="index"></van-tab>
    </van-tabs>

    <div style="position: relative;">
      <div ref="orderMescroll" class="mescroll" :style="{ height: heightScroll }">
        <div ref="orderScroll" id="scrollWrap">
          <ul class="box-ul">
            <li v-for="(item, index) in arr" :key="index" @click="hrefDetailsFuc(item)">
              <div class="flex flex-align-center flex-justify-start first-wrap">
                <van-image class="car" :src="car"/>
                <p class="car-number">{{item['carNo']}}</p>
                <van-image class="more" :src="more"/>
              </div>

              <div class="last-wrap">
                <p>姓名：{{item['owner']}}</p>
                <p>手机号：{{item['user_phone']}}</p>
                <p v-if="item['order_status'] === '10001'">询价时间：{{item['update_time_str']}}</p>
                <p v-else-if="item['order_status'] === '10002'">估价时间：{{item['update_time_str']}}</p>
                <p v-else-if="item['order_status'] === '10003'">提单时间：{{item['update_time_str']}}</p>
                <p v-else>结束时间：{{item['update_time_str']}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <foot-guide />
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/7/2
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css';
  import { Search, Tab, Tabs, Image, Toast } from 'vant';
  import FootGuide from '@/components/footer/FootGuide.vue'
  import FootGuideVue from '@/components/footer/FootGuide.vue';
  import { search, car, more } from '@/util/data';
  import { mixin } from '@/util/com';

  export default {
    mixins: [mixin],
    name: 'order',
    components: {
      [FootGuide.name]: FootGuideVue,
      [Search.name]: Search,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Image.name]: Image,
      [Toast.name]: Toast,
    },
    data() {
      return {
        value: '',
        active: 0,
        search,
        car,
        more,
        arr: [],
        page: 0,
        total: true,
        status: '',
        heightScroll: 'auto',
        carNo: '',
        arrTab: [{
          title: '全部',
        }, {
          title: '询价中',
          count: ''
        }, {
          title: '已估价',
          count: ''
        }, {
          title: '已提单',
          count: ''
        }, {
          title: '已结束',
          count: ''
        }]
      };
    },
    mounted() {
      this.orderMescroll = new MeScroll(this.$refs.orderMescroll, {
        down: {
          auto: false,
          callback: this.downCallback,
        },
        up: {
          auto: true,
          callback: this.upCallback,
          htmlNodata: '<p class="upwarp-nodata">— 已经到底部了 —</p>',
          loadFull: {
            use: false,
            delay: 500
          }
        },
      });

      this.$store.dispatch('ordListCountList', {}).then(res => {
        if(res.code === '0') {
          Toast(res.msg)
        } else {
          this.arrTab.forEach((item, index) => {
            if(index > 0) {
              item.count = res.data[index];
            }
          })
        }
      });

      this.heightScroll = this.heightRoll(['order', 'foot-guide']);
    },
    methods: {
      downCallback() {
        this.$store.dispatch('orderList', {
          status: this.status,
          pageNo: '1',
          pageSize: '10',
          carNo: this.carNo
        }).then(res => {
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.page = 1;
            this.total = res.data['recordsTotal'];
            this.arr = res.data['data'];
            this.$nextTick(() => {
              if(this.arr.length >= this.total) {
                this.orderMescroll.endUpScroll(true);
                this.orderMescroll.endSuccess();
              } else {
                this.orderMescroll.endSuccess(res.data['data'].length, true);
              }
              if(this.$refs.orderScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
                this.orderMescroll.triggerUpScroll();
              }
            })
          }
        })
      },

      upCallback() {
        this.$store.dispatch('orderList', {
          status: this.status,
          pageNo: String(++this.page),
          pageSize: '10',
          carNo: this.carNo
        }).then(res => {
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.total = res.data['recordsTotal'];
            res.data['data'].forEach((item) => {
              this.arr.push(item);
            });
            this.$nextTick(() => {
              this.orderMescroll.endSuccess();
              if(this.$refs.orderScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
                if(this.arr.length < this.total) {
                  this.orderMescroll.triggerUpScroll();
                }
              }
              if(this.arr.length >= this.total) {
                this.orderMescroll.endUpScroll(true)
              } else {
                this.orderMescroll.endUpScroll(false)
              }
            })
          }
        })
      },

      selectTabsFuc(index) {
        this.arr = [];
        if(index === 0) {
          this.status = ''
        } else {
          this.status = String(index);
        }
        this.page = '0';
        this.orderMescroll.resetUpScroll();
      },

      hrefDetailsFuc(obj) {
        this.$router.push({
          name: 'details',
          query: {
            pid: obj['pid'],
          }
        })
      },

      onSearchOrder() {
        this.arr = [];
        this.carNo = this.value;
        this.page = '0';
        this.orderMescroll.resetUpScroll();
      }
    }
  }
</script>

<style lang="less" scoped>
  .order {
    background-color: #F5F5F5;
    /*min-height: 100vh;*/
    .search /deep/ .van-image {
      width: 16px;
      height: 16px;
    }
    /deep/ .van-tabs__content--animated {
      overflow: inherit;
    }
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
    /deep/ .van-search {
      padding: 7px 15px 20px 15px;
    }
    /deep/ .van-tab {
      font-family: PingFang-SC-Medium;
      font-size: 15px;
      color: #333333;
      letter-spacing: -0.36px;
      text-align: center;
      line-height: 15px;
    }
    /deep/ .van-tabs--line .van-tabs__wrap {
      height: auto;
    }
    /deep/ .van-tabs__nav--line {
      padding-bottom: 16px;
      /*padding-top: 15.5px;*/
    }
    /deep/ .van-tabs__line {
      background: #FD610A;
      width: 75px !important;
      height: 2px;
      border-radius: inherit;
      bottom: 0;
    }
    /deep/ .van-tabs--line {
      /*padding-top: 31px;*/
      padding-top: 47px;
    }
    /deep/ .van-search__content {
      border-radius: 8px;
    }
    .box-ul li:first-child {
      margin-top: 0;
    }
    .box-ul {
      li {
        min-height: 88px;
        padding: 13px 15px 15px 15px;
        background-color: #ffffff;
        margin-top: 11px;
        line-height: 1;
        .car {
          width: 20px;
          height: 20px;
        }
        .more {
          width: 12.5px;
          height: 12.5px;
        }
      }
      .first-wrap {
        border-bottom: 1px solid #EFEFEF;
        padding-bottom: 11px;
      }
      .last-wrap {
        font-family: PingFang-SC-Medium;
        font-size: 13px;
        color: #666666;
        letter-spacing: -0.31px;
        line-height: 13px;
        margin-top: 15.5px;
      }
      .last-wrap p {
        margin-bottom: 15px;
      }
      .last-wrap p:last-child {
        margin-bottom: 0;
      }
      .car-number {
        font-family: PingFang-SC-Medium;
        font-size: 15px;
        color: #333333;
        width: 89%;
        letter-spacing: -0.36px;
        margin-left: 10px;
      }
    }
    .mescroll {
      background-color: #F5F5F5;
      position: absolute;
      top: 0;
      bottom: 0;
      height: 570px; /*如设置bottom:50px,则需height:auto才能生效*/
    }
    /deep/ .mescroll-downwarp {
      /*margin-top: 86px;*/
    }
  }
</style>