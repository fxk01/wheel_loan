<template>
  <div class="enquiryMsg">
    <div class="enquiry" v-if="String(status) !== '1'">
      <van-notice-bar :scrollable="false" :left-icon="security">
        请认真核对识别出的信息，如有误，请修正！
      </van-notice-bar>

      <ul>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">号牌号码</p>
          <p class="last-text">{{data.words['号牌号码']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">所有人</p>
          <p class="last-text">{{data.words['所有人']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">住址</p>
          <p class="last-text">{{data.words['住址']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">车辆登记地</p>
          <div class="flex flex-align-center">
            <p class="last-text">{{this.value}}</p>
            <van-image class="more" :src="more" @click="showVehicle"/>
          </div>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">品牌</p>
          <div class="flex flex-align-center">
            <p class="last-text">{{valueBrand}}</p>
            <van-image class="more" :src="more" @click="showBrandModal" v-if="!data.words['brand_id'] || data.words['brand_id'] === ''"/>
          </div>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">车系</p>
          <div class="flex flex-align-center">
            <p class="last-text">{{valueSeries}}</p>
            <van-image class="more" :src="more" @click="showSeriesModal"/>
          </div>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">车型</p>
          <div class="flex flex-align-center">
            <p class="last-text">{{valueVehicleType}}</p>
            <van-image class="more" :src="more" @click="showVehicleTypeModal"/>
          </div>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">车辆类型</p>
          <p class="last-text">{{data.words['车辆类型']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">车辆识别代号</p>
          <p class="last-text">{{data.words['车辆识别代号']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">使用性质</p>
          <p class="last-text">{{data.words['使用性质']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">注册日期</p>
          <p class="last-text">{{data.words['注册日期']}}</p>
        </li>
      </ul>

      <ul class="box-ul2">
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">检验有效期</p>
          <div class="flex flex-align-center">
            <p class="last-text">{{date}}</p>
            <van-image class="more" :src="more" @click="showTestDate"/>
          </div>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">行驶里程（万公里）</p>
          <div class="flex flex-align-center">
            <van-field
              type="number"
              v-model="valueMileage"
              onkeyup="if(!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value))execCommand('undo')"
              onafterpaste="if(!/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/.test(value))execCommand('undo')"
              class="valueMileage"
              placeholder=""
            />
            <van-image class="more more-Mileage" :src="more"/>
          </div>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">使用年限</p>
          <p class="last-text">{{data.words['使用年限']}}</p>
        </li>
      </ul>

      <footer>
        <button
          class="submitBut"
          @click="subEnquiryOrder"
          :disabled="disabledDriving"
          v-bind:class="{ 'not': disabledDriving }"
        >
          提交询价订单
        </button>
      </footer>
    </div>

    <div class="order" v-if="String(status) === '1'">
      <van-notice-bar :scrollable="false" :left-icon="security">
        请认真核对识别出的信息，如有误，请修正！
      </van-notice-bar>

      <ul>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">姓名</p>
          <p class="last-text">{{data.words['姓名']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">身份证号码</p>
          <p class="last-text">{{data.words['公民身份号码']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">住址</p>
          <p class="last-text">{{data.words['住址']}}</p>
        </li>
      </ul>

      <ul class="box-ul2">
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">签发机关</p>
          <p class="last-text">{{dataNational.words['签发机关']}}</p>
        </li>
        <li class="flex flex-align-center flex-justify-between">
          <p class="first-text">有效期限</p>
          <p class="last-text">{{dataNational.words['签发日期']}}-{{dataNational.words['失效日期']}}</p>
        </li>
      </ul>

      <footer>
        <button class="submitBut" @click="submitOrderIdCar">提交</button>
      </footer>
    </div>

    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :loading="loadingVehicle"
        :columns="columns"
        @cancel="show = false"
        @confirm="onConfirm"
        @change="onChangeCity"
      />
    </van-popup>

    <!--<van-popup v-model="showBrand" position="bottom">-->
      <!--<form action="/">-->
        <!--<van-search-->
          <!--class="search"-->
          <!--type="search"-->
          <!--:left-icon="search"-->
          <!--@search="onSearchBrand"-->
          <!--placeholder="请输入品牌首字母"-->
          <!--v-model="valueBrandSearch" />-->
      <!--</form>-->

      <!--<van-picker-->
        <!--show-toolbar-->
        <!--:loading="loadingBrand"-->
        <!--:columns="columnsBrand"-->
        <!--@cancel="showBrand = false"-->
        <!--@confirm="onConfirmBrand"-->
      <!--/>-->
    <!--</van-popup>-->

    <van-popup v-model="showBrand" position="bottom" class="showBrand">
      <van-index-bar :sticky="false">
        <div v-for="(arrValue, name) in pyLetter">
          <van-index-anchor :index="name.toUpperCase()" />
          <van-cell v-for="(item, index) in arrValue" :key="index" :title="item.text" @click="onConfirmBrand(item)"/>
        </div>
      </van-index-bar>
    </van-popup>

    <van-popup v-model="showSeries" position="bottom">
      <van-picker
        show-toolbar
        :loading="loadingSeries"
        :columns="columnsSeries"
        @cancel="showSeries = false"
        @confirm="onConfirmSeries"
      />
    </van-popup>

    <van-popup v-model="showVehicleType" position="bottom">
      <van-picker
        show-toolbar
        :loading="loadingVehicleType"
        :columns="columnsVehicleType"
        @cancel="showVehicleType = false"
        @confirm="onConfirmVehicleType"
      />
    </van-popup>

    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :min-date="minDate"
        :formatter="formatter"
        @cancel="showDate = false"
        @confirm="confirmDate"
      />
    </van-popup>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/7/4
  */

  import { more, security, search } from '@/util/data';
  import { NoticeBar, Image, Toast, Popup, Area, Picker, DatetimePicker, Field, Search, IndexBar, IndexAnchor, Cell } from 'vant';
  import { mixin } from '@/util/com';

  export default {
    mixins: [mixin],
    props: ['status', 'data', 'dataNational'],
    name: 'EnquiryMsg',
    components: {
      [NoticeBar.name]: NoticeBar,
      [Image.name]: Image,
      [Popup.name]: Popup,
      [Area.name]: Area,
      [Picker.name]: Picker,
      [DatetimePicker.name]: DatetimePicker,
      [Field.name]: Field,
      [Search.name]: Search,
      [IndexBar.name]: IndexBar,
      [IndexAnchor.name]: IndexAnchor,
      [Cell.name]: Cell
    },
    data() {
      return {
        more,
        security,
        search,
        valueBrandSearch: '',
        show: false,
        disabledDriving: true,
        cityObj: {
          province_list: {},
          city_list: {}
        },
        loadingVehicle: true,
        provinceCity: {},
        provinceCity2: {},
        value: '',
        showPicker: false,
        columns: [],

        showBrand: false,
        loadingBrand: true,
        valueBrand: '',
        columnsBrand: [],

        showSeries: false,
        loadingSeries: true,
        valueSeries: '',
        columnsSeries: [],

        showVehicleType: false,
        loadingVehicleType: true,
        valueVehicleType: '',
        columnsVehicleType: [],

        valueMileage: '',
        showDate: false,
        currentDate: new Date(),
        minDate: new Date(2019, 0),
        date: '',

        paramBrandId: '',
        paramSeriesId: '',
        paramVehicleTypeId: '',
        param13Id: '',
        param14Id: '',

        statusMsg: status,
        pyLetter: {}
      }
    },
    watch: {
      validationDriving: {
        handler(val) {
          for(let i in val) {
            if(val[i] === '') {
              this.disabledDriving = true;
              return;
            }
          }
          this.disabledDriving = false;
        },
      },
    },
    computed: {
      validationDriving() {
        if(this.type === undefined) {
          return {
            value: this.value,
            valueBrand: this.valueBrand,
            valueSeries: this.valueSeries,
            valueVehicleType: this.valueVehicleType,
            date: this.date,
            valueMileage: this.valueMileage,
          }
        }
      }
    },
    mounted() {
      this.pyLetter = {
        a: [],
        b: [],
        c: [],
        d: [],
        e: [],
        f: [],
        g: [],
        h: [],
        i: [],
        j: [],
        k: [],
        l: [],
        m: [],
        n: [],
        o: [],
        p: [],
        q: [],
        r: [],
        s: [],
        t: [],
        u: [],
        v: [],
        w: [],
        x: [],
        y: [],
        z: []
      };

      this.statusMsg = String(this.status);

      this.$store.dispatch('postCarCity', {}).then(res => {
        if(res.code === '0') {
          Toast(res.msg)
        } else {
          res.data.forEach((item) => {
            this.provinceCity[item['prov_name']] = [];
            this.provinceCity2[item['prov_name'] + ' ' + item['prov_id']] = [];
            item['cityList'].forEach((item2) => {
              if(item2['prov_name'] === item['prov_name']) {
                this.provinceCity[item2['prov_name']].push(item2['city_name']);
                this.provinceCity2[item2['prov_name'] + ' ' + item['prov_id']].push(item2['city_name'] + ' ' + item2['city_id'])
              }
            })
          });
          this.columns = [{
            values: Object.keys(this.provinceCity),
          }, {
            values: this.provinceCity['北京'],
          }];
          this.loadingVehicle = false;
        }
      });

      this.$store.dispatch('cheCarList', {type: '1'}).then(res => {
        if(res.code === '0') {
          Toast(res.msg)
        } else {
          res.data.forEach((item) => {
            if(item['brand_id'] === this.data.words['brand_id']) {
              this.onConfirmBrand({
                text: item['brand_name'],
                id: item['brand_id']
              })
            }
            this.columnsBrand.push({
              text: item['brand_name'],
              id: item['brand_id']
            })
          });

          this.columnsBrand.forEach((item) => {
            let pyArr = this.makePy(item.text);
            let pyStr = pyArr[0].substr(0, 1);
            let isArrLower = this.pyLetter[pyStr.toLowerCase()];
            if(isArrLower) {
              isArrLower.push(item)
            }
          });

          this.loadingBrand = false;
        }
      });
    },
    methods: {
      submitOrderIdCar() {
        Toast.allowMultiple();
        let toast1 = Toast.loading({
          mask: true,
          message: '提交中',
          duration: 0,
        });
        this.$store.dispatch('submitOrderId', {
          idCardFile: [this.data, this.dataNational],
          pid: this.$route.query['pid'],
          param1: this.data.words['姓名'],
          param2: this.data.words['身份证号码'],
          param3: this.data.words['住址'],
          param4: this.dataNational.words['签发机关'],
          param5: this.dataNational.words['失效日期'],
          param6: this.dataNational.words['签发日期']
        }).then(res => {
          toast1.clear();
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.$router.push({
              name: 'result',
              query: {
                status: '4',
              }
            })
          }
        })
      },
      showVehicle() {
        this.show = true
      },
      showBrandModal() {
        this.showBrand = true
      },
      showSeriesModal() {
        this.showSeries = true
      },
      showVehicleTypeModal() {
        this.showVehicleType = true
      },
      onConfirm(value) {
        for(let j in this.provinceCity2) {
          if(j.indexOf(value[0]) >= 0) {
            this.param13Id = j.split(' ')[1];
          }
          this.provinceCity2[j].forEach((item) => {
            if(item.indexOf(value[1]) >= 0) {
              this.param14Id = item.split(' ')[1];
            }
          });
        }
        this.value = value[0] + '-' + value[1];
        this.show = false;
      },
      onConfirmBrand(val) {
        this.valueBrand = val.text;
        this.paramBrandId = val.id;
        this.showBrand = false;
        this.$store.dispatch('cheCarList', {type: '2', id: this.paramBrandId}).then(res => {
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.columnsSeries = [];
            this.valueVehicleType = '';
            res.data.forEach((item) => {
              this.columnsSeries.push({
                text: item['series_name'],
                id: item['series_id']
              })
            });
            this.loadingSeries = false;
          }
        })
      },
      onConfirmSeries(val) {
        this.valueSeries = val.text;
        this.paramSeriesId = val.id;
        this.showSeries = false;
        this.$store.dispatch('cheCarList', {type: '3', id: this.paramSeriesId}).then(res => {
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.columnsVehicleType = [];
            res.data.forEach((item) => {
              this.columnsVehicleType.push({
                text: item['model_name'],
                id: item['model_id']
              })
            });
            this.loadingVehicleType = false;
          }
        })
      },
      onConfirmVehicleType(val) {
        this.valueVehicleType = val.text;
        this.paramVehicleTypeId = val.id;
        this.showVehicleType = false;
      },
      onChangeCity(picker, values) {
        picker.setColumnValues(1, this.provinceCity[values[0]]);
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      },
      showTestDate() {
        this.showDate = true
      },
      confirmDate(obj) {
        this.showDate = false;
        if(obj.getMonth() + 1 < 10) {
          this.date = obj.getFullYear() + '-0' + (obj.getMonth() + 1);
        } else {
          this.date = obj.getFullYear() + '-' + (obj.getMonth() + 1);
        }
      },
      subEnquiryOrder() {
        Toast.allowMultiple();
        let toast1 = Toast.loading({
          mask: true,
          message: '提交中',
          duration: 0,
        });
        this.$store.dispatch('subInquiryOrder', {
          vehicleLicense: this.data,
          param1: this.paramBrandId,
          param2: this.valueBrand,
          param3: this.paramSeriesId,
          param4: this.valueSeries,
          param5: this.paramVehicleTypeId,
          param6: this.valueVehicleType,
          param7: this.data.words['发证日期'],
          param8: this.data.words['使用性质'],
          param9: this.data.words['号牌号码'],
          param10: this.data.words['所有人'],
          param11: this.value[0],
          param12: this.value[1],
          param13: this.param13Id,
          param14: this.param14Id,
          param15: this.data.words['住址'],
          param16: this.data.words['注册日期'],
          param17: this.data.words['车辆识别代号'],
          param18: this.data.words['车辆类型'],
          param19: this.valueMileage,
          param20: this.date
        }).then(res => {
          toast1.clear();
          if(res.code === '0') {
            Toast(res.msg)
          } else {
            this.$router.push({
              name: 'result',
              query: {
                status: '3',
              }
            })
          }
        })

      },
    }
  }
</script>

<style lang="less" scoped>
  .enquiryMsg {
    line-height: 1;
    background-color: #F5F5F5;
    min-height: 100vh;
    /deep/ .van-picker-column li {
      font-family: inherit !important;
      font-size: initial !important;
      color: #000 !important;
      letter-spacing: inherit !important;
    }
    ul {
      background-color: #ffffff;
    }
    ul li {
      height: 14px;
      padding: 17px 0 15px 0;
      margin: 0 15px;
      border-bottom: 1px solid #EFEFEF;
      .first-text {
        font-family: PingFang-SC-Medium;
        font-size: 15px;
        color: #333333;
        letter-spacing: -0.36px;
      }
      .last-text {
        font-family: PingFang-SC-Medium;
        font-size: 15px;
        color: #999999;
        letter-spacing: -0.36px;
        text-align: right;
      }
    }
    .box-ul2 {
      margin: 10.5px 0 31.6px 0;
    }
    footer {
      padding: 0 20px 15px 20px;
      .submitBut {
        background: #FD610A;
        border-radius: 4px;
        width: 100%;
        border: none;
        height: 45px;
        /*line-height: 45px;*/
        font-family: PingFang-SC-Bold;
        font-size: 17px;
        color: #FFFFFF;
        letter-spacing: -0.41px;
        text-align: center;
      }
    }
    .not {
      background-color: #BBC2C9 !important;
      border: 0.02667rem solid #BBC2C9 !important;
    }
    .more-Mileage {
      position: absolute;
      right: 0;
      margin-right: 15px;
    }
    .valueMileage {
      /*padding-right: 0;*/
      /deep/ .van-field__control {
        font-family: PingFang-SC-Medium;
        font-size: 0.4rem;
        color: #999999;
        letter-spacing: -0.0096rem;
        text-align: right;
      }
    }
    .showBrand {
      height: 100%;
      max-height: initial;
    }
  }
</style>