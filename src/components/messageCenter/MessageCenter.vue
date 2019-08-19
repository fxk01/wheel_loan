<template>
  <div class="messageCenter2">
    <van-tabs v-model="active" @click="selectTabsFuc" animated>
      <van-tab v-for="(item, index) in arrData" :key="index" :title="item.title"></van-tab>
    </van-tabs>

    <div style="position: relative;">
      <div ref="msgMescroll" class="mescroll">
        <div ref="msgScroll" id="scrollWrap">
          <ul class="box-item">
            <li v-for="(item, index) in arr" :key="index">
              <div class="bg-time">6月14日&nbsp;&nbsp;17:50</div>

              <div class="bg-item">
                <div class="flex flex-align-center pd-15">
                  <van-image class="msgAvatar-img" :src="msgAvatar" />
                  <p class="user-text">{{item['content'].split(',')[0]}}</p>
                </div>

                <p class="item-msg pd-15">
                  {{item['detailMsg']}}
                </p>

                <div class="flex flex-align-center flex-justify-between item-ft pd-15" @click="detailPidFuc(item)">
                  <p class="text-detail">查看详情</p>
                  <van-image class="more-img" :src="more" />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/7/1
  */

  import MeScroll from 'mescroll.js';
  import 'mescroll.js/mescroll.min.css';
  import { Tab, Tabs, Image, Toast } from 'vant';
  import { msgAvatar, more } from '@/util/data';

  export default {
    name: 'MessageCenterCom',
    props: ['arrData'],
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      [Image.name]: Image,
      [Toast.name]: Toast,
    },
    data() {
      return {
        active: 0,
        msgAvatar,
        more,
        tabArr: [{
          title: '已估价',
          id: '20001'
        }, {
          title: '已验车',
          id: '20002'
        }],
        arr: [],
        page: 0,
        total: true,
        status: '20001',
      };
    },
    mounted() {
      this.msgMescroll = new MeScroll(this.$refs.msgMescroll, {
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
    },
    methods: {
      downCallback() {
        this.$store.dispatch('notifyListMsg', {
          status: this.status,
          pageNo: '1',
          pageSize: '10',
        }).then(res => {
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.page = 1;
            this.total = res.data['recordsTotal'];
            this.arr = res.data['data'];
            this.$nextTick(() => {
              if(this.arr.length >= this.total) {
                this.msgMescroll.endUpScroll(true);
                this.msgMescroll.endSuccess();
              } else {
                this.msgMescroll.endSuccess(res.data['data'].length, true);
              }
              if(this.$refs.msgScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
                this.msgMescroll.triggerUpScroll();
              }
            })
          }
        })
      },

      upCallback() {
        this.$store.dispatch('notifyListMsg', {
          status: this.status,
          pageNo: String(++this.page),
          pageSize: '10',
        }).then(res => {
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.total = res.data['recordsTotal'];
            res.data['data'].forEach((item) => {
              this.arr.push(item);
            });
            this.arr.forEach((item) => {
              item['content2'] = item['content'].split(',');
              item['detailMsg'] = '';
              for (let index = 1; index < item['content2'].length; index++) {
                const _item = item['content2'][index];
                if (item['content2'].includes(_item)) {
                  item['detailMsg'] += `${_item}，`;
                }
              }
            });
            this.$nextTick(() => {
              this.msgMescroll.endSuccess();
              if(this.$refs.msgScroll.offsetHeight < document.getElementsByClassName('mescroll')[0].offsetHeight) {
                if(this.arr.length < this.total) {
                  this.msgMescroll.triggerUpScroll();
                }
              }
              if(this.arr.length >= this.total) {
                this.msgMescroll.endUpScroll(true)
              } else {
                this.msgMescroll.endUpScroll(false)
              }
            })
          }
        })
      },

      selectTabsFuc(index) {
        this.arr = [];
        if(index === 0) {
          this.status = '20001'
        } else {
          this.status = '20002';
        }
        this.page = '0';
        this.msgMescroll.resetUpScroll();
      },

      detailPidFuc(obj) {
        this.$router.push({
          name: 'details',
          query: {
            pid: obj['pid'],
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/theme/styles/mixins";

  .messageCenter2 {
    background-color: #F5F5F5;
    min-height: 100vh;
    .pd-15 {
      padding: 0 15px;
    }
    /deep/ .van-tabs--line .van-tabs__wrap {
      height: 47px;
    }
    /deep/ .van-ellipsis {
      font-family: PingFang-SC-Medium;
      font-size: 16px;
      color: #333333;
      letter-spacing: -0.39px;
      text-align: center;
    }
    /deep/ .van-tab--active .van-ellipsis {
      color: #FD610A;
    }
    /deep/ .van-tabs__line {
      width: 120px !important;
      height: 1px;
      background: #FD610A;
    }
    /deep/ .van-tabs__nav--line {
      /*padding-bottom: 11px;*/
    }
    /deep/ .van-tab {
      line-height: 1;
      padding-top: 20px;
    }
    .box-item {
      padding: 20px 15px 0 15px;
      li {
        margin-bottom: 20px;
      }
      .bg-time {
        background: #D6D6D6;
        border-radius: 2px;
        width: 104px;
        height: 24px;
        line-height: 24px;
        margin: 0 auto 10px auto;
        font-family: PingFang-SC-Medium;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: -0.29px;
        text-align: center;
      }
      .bg-item {
        width: 100%;
        background: #FFFFFF;
        border-radius: 4px;
        /*height: 163px;*/
        height: 128px;
        line-height: 1;
        padding: 20px 0 15px 0;
        .msgAvatar-img {
          width: 24px;
          height: 24px;
        }
        .more-img {
          width: 11.3px;
          height: 11.3px;
        }
        .user-text {
          font-family: PingFang-SC-Medium;
          font-size: 16px;
          color: #333333;
          letter-spacing: -0.39px;
          margin-left: 10px;
        }
        .item-msg {
          font-family: PingFang-SC-Medium;
          font-size: 14px;
          color: #787878;
          letter-spacing: -0.34px;
          text-align: justify;
          margin: 17px 0 17px 0;
          line-height: 20px;
        }
        .item-ft {
          border-top: 1px solid #EFEFEF;
          height: 44.5px;
        }
        .text-detail {
          font-size: 14px;
          color: #333333;
          letter-spacing: -0.34px;
        }
      }
    }
    .mescroll {
      background-color: #F5F5F5;
      position: absolute;
      top: 0;
      bottom: 0;
      height: 620px; /*如设置bottom:50px,则需height:auto才能生效*/
    }
  }
</style>