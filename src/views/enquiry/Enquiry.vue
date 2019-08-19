<template>
  <div class="enquiry">
    <div v-if="showIdCard">
      <van-notice-bar :scrollable="false" :left-icon="security">
        乾轮车贷注重保护信息，绝不对外提供您的个人信息
      </van-notice-bar>

      <div class="uploader">
        <!--<img src="reupload" alt="" />-->
        <van-uploader :after-read="uploadImg" :before-read="beforeRead" :name="'fileFirst'">
          <div class="first-page" v-if="!firstPage">
            <div v-bind:class="[this.$route.query['status'] === undefined ? 'upload-bg' : 'idCard-bg']">
              {{text}}
            </div>
          </div>

          <div class="image-view" v-else>
            <img class="imageViewWh" :src="firstPage.content"/>
            <div class="reupload">
              <img width="24px" height="24px" :src="reupload" />
              <p>重新上传</p>
            </div>
          </div>
        </van-uploader>

        <van-uploader :after-read="uploadImg" :before-read="beforeRead" :name="'fileLast'" v-if="certificate">
          <div class="second-page" v-if="!lastPage">
            <div v-bind:class="[this.$route.query['status'] === undefined ? 'upload-bg' : 'idCard-bg']">
              {{text2}}
            </div>
          </div>

          <div class="image-view" style="margin-bottom: 0;" v-else>
            <img class="imageViewWh" :src="lastPage.content"/>
            <div class="reupload">
              <img width="24px" height="24px" :src="reupload" />
              <p>重新上传</p>
            </div>
          </div>
        </van-uploader>
      </div>

      <div class="btn-link">
        <van-button type="warning" size="large" @click="subOrder" :disabled="disabledBut" v-bind:class="{'not': disabledBut}">
          {{String(this.$route.query['status']) === '1' ? '下一步' : '提交询价订单'}}
        </van-button>
      </div>
    </div>

    <!-- 询价读取信息核实 -->
    <EnquiryMsg
      :status="this.$route.query['status']"
      :data="this.data"
      :dataNational="this.data2"
      v-if="success"/>
  </div>
</template>
<script>
  import { NoticeBar, Uploader, Button, Toast } from 'vant';
  import { security, reupload } from '@/util/data';
  import EnquiryMsg from '@/components/enquiryMsg/EnquiryMsg.vue'

  export default {
    name: 'enquiry',
    components: {
      [NoticeBar.name]: NoticeBar,
      [Uploader.name]: Uploader,
      [Button.name]: Button,
      [EnquiryMsg.name]: EnquiryMsg,
    },
    data() {
      return {
        security,
        firstPage: null,
        lastPage: null,
        secondPage: null,
        showIdCard: true,
        success: false,
        type: '',
        data: {},
        data2: {},
        text: '',
        text2: '',
        certificate: true,
        reupload,
        toast1: '',
        imgBase64: [],
        disabledBut: true,
      }
    },
    watch: {
      newValue(val, oldVal) {
        if(this.type === 'vehicleLicense' && Object.keys(val).length !== 0) {
          this.disabledBut = false
        }
        if(this.type === 'idcard' && (Object.keys(val['data']).length !== 0 && Object.keys(val['data2']).length !== 0)) {
          this.disabledBut = false
        }
      }
    },
    computed: {
      newValue() {
        if(this.type === 'vehicleLicense') {
          return this.data;
        } else {
          return {
            data: this.data,
            data2: this.data2
          }
        }
      }
    },
    mounted() {
      this.type = this.$route.query['status'] === undefined ? 'vehicleLicense' : 'idcard';

      if(String(this.$route.query['status']) === '1') {
        this.text = '点击上传身份证信息（头像面）';
        this.text2 = '点击上传身份证信息（国徽面）'
      } else {
        this.certificate = false;
        this.text = '点击上传行驶证信息（主页）';
        this.text2 = '点击上传行驶证信息（副页）'
      }
    },
    methods: {
      beforeRead() {
        return true
      },
      afterReadFile(file) {
        let param = new FormData();
        param.append('file', file.file);
        param.append('type', this.type);
        param.append('side', '0');
        this.$store.dispatch('ocrfileImg', param).then(res => {
          this.toast1.clear();
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.data = res.data
          }
        })
      },
      secondReadFile(file) {
        let param = new FormData();
        param.append('file', file.file);
        param.append('type', this.type);
        param.append('side', '1');
        this.$store.dispatch('ocrfileImg', param).then(res => {
          this.toast1.clear();
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.data2 = res.data
          }
        })
      },
      subOrder() {
        if(this.$route.query['status'] === undefined) {
          this.inquiryLading([{
            title: '行驶证信息 (主页) 必传',
            data: this.data,
            text: '行驶证上传有误，请重新上传'
          }]);
        } else {
          this.inquiryLading([{
            title: '身份证正面必传',
            data: this.data,
            text: '身份证正面上传有误，请重新上传'
          }, {
            title: '身份证反面必传',
            data: this.data2,
            text: '身份证反面上传有误，请重新上传'
          }]);
        }
      },
      inquiryLading(arr) {
        if(Object.keys(this.data).length === 0) {
          Toast(arr[0].title);
          return;
        } else if(this.$route.query['status'] !== undefined && Object.keys(this.data2).length === 0) {
          Toast(arr[1].title);
          return;
        } else {
          let isWord = false;
          arr.forEach((item) => {
            if(Object.keys(item.data['words']).length === 0) {
              Toast(item.text);
              isWord = true;
            }
          });
          if(!isWord) {
            this.showIdCard = false;
            this.success = true
          }
        }
      },
      uploadImg(file, detail) {
        Toast.allowMultiple();
        this.toast1 = Toast.loading({
          mask: true,
          message: '上传中',
          duration: 0,
        });
        if(detail.name === 'fileFirst') {
          this.firstPage = file;
        } else {
          this.lastPage = file;
        }
        // 大于1.5MB的jpeg和png图片都缩小像素上传
        if(/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 1500000) {
          this.imgBase64.splice(0, this.imgBase64.length);
          let canvas =  document.createElement('canvas');
          let context = canvas.getContext('2d');
          let img = new Image();
          img.src = file.content;
          img.onload = () => {
            canvas.width = 400;
            canvas.height = 300;
            context.drawImage(img, 0, 0, 400, 300);
            file.content = canvas.toDataURL(file.file.type, 0.92);
            this.imgBase64.push(file.content);
            let blobBase = this.dataURItoBlob(this.imgBase64[0], file.file.name);
            let _file = {
              content: file.content,
              file: blobBase
            };
            if(detail.name === 'fileFirst') {
              this.afterReadFile(_file);
            } else {
              this.secondReadFile(_file);
            }
          }
        } else {
          // 不做处理的jpg和png以及gif直接保存到数组
          if(detail.name === 'fileFirst') {
            this.afterReadFile(file);
          } else {
            this.secondReadFile(file);
          }
        }
      },
      dataURItoBlob(base64Data, filename) {
        let arr = base64Data.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bStr = atob(arr[1]), n = bStr.length, u8arr = new Uint8Array(n);
        while(n--) {
          u8arr[n] = bStr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "~@/assets/theme/styles/mixins";

  .enquiry {
    /deep/ .van-notice-bar {
      background: rgba(253, 97, 10, 0.1);
      font-family: PingFang-SC-Medium;
      font-size: 13px;
      color: #fd610a;
      height: 36px;
    }
    /deep/ .van-notice-bar__left-icon,
    .van-notice-bar__right-icon {
      width: 16px;
      height: 16px;
      margin-right: 9px;
    }
    /deep/ .van-ellipsis {
      font-family: PingFang-SC-Medium;
      font-size: 13px;
      color: #FD610A;
      letter-spacing: -0.31px;
    }
    .uploader {
      text-align: center;
    }
    .upload-bg, .idCard-bg {
      box-sizing: border-box;
      font-family: PingFang-SC-Medium;
      font-size: 15px;
      color: #333333;
      letter-spacing: -0.36px;
      line-height: 1;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100%;
      padding-top: 112px;
    }
    .first-page,
    .second-page {
      box-sizing: border-box;
      width: 300px;
      height: 180px;
      margin: 20px auto;
      box-shadow: 0 4px 16px 0 rgba(86, 145, 248, 0.15);
      border-radius: 4px;
      padding: 20px;
    }
    .first-page .upload-bg {
      .bg-image("driving");
    }
    .second-page .upload-bg {
      .bg-image("driving2nd");
    }
    .first-page .idCard-bg {
      .bg-image("cardSide");
    }
    .second-page .idCard-bg {
      .bg-image("cardBack");
    }
    .btn-link {
      margin: 38px 20px 0 20px;
    }
    .btn-link /deep/ .van-button--large {
      width: 100%;
      height: 45px;
      line-height: 45px;
      margin-bottom: 82px;
    }
    .image-view {
      width: 335px;
      height: 149px;
      margin: 20px auto;
      align-items: center;
      display: flex;
      justify-content: space-between;
      .v-img {
        height: 149px;
        width: 244px;
      }
      .reupload {
        flex: 1;
        color: #2876ff;
        font-family: PingFang-SC-Medium;
        font-size: 15px;
        color: #2876ff;
        letter-spacing: -0.36px;
      }
    }
    .not {
      background-color: #BBC2C9;
      border: 0.02667rem solid #BBC2C9;
    }
    .imageViewWh {
      width: 6.50667rem;
      height: 3.97333rem
    }
  }
</style>