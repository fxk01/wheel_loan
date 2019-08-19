<template>
  <div class="register">
    <van-field
      v-focusclass="'focus'"
      v-model="userPhone"
      placeholder="请输入手机号"
      v-iosbugscroll
      clearable
      type="tel"
      maxlength="11"
      :border="false"
    />
    <van-field
      v-focusclass="'focus'"
      v-model="sms"
      placeholder="请输入短信验证码"
      v-iosbugscroll
      type="number"
      maxlength="4"
      :border="false"
    >
      <van-button
        :disabled="disabled"
        class="sms"
        slot="button"
        size="small"
        plain
        type="default"
        @click="getSmsCode"
        >{{ codeText }}</van-button
      >
    </van-field>
    <van-button
      type="warning"
      size="large"
      :class="not"
      :disabled="disabledReg"
      @click="registerUser">
      注册
    </van-button>
    <p class="btn-link">
      已有账号，去
      <router-link :to="{
          name: '/passport/login',
          query: {
            redirect: this.$route.query.redirect
          }
        }"
      >
        登录</router-link
      >
    </p>
  </div>
</template>

<script>
import { Button, Field, Toast } from 'vant'
import { setTimeout, clearTimeout } from 'timers';

export default {
  name: 'register',
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Toast.name]: Toast
  },
  data () {
    return {
      userPhone: '',
      sms: '',
      disabled: false,
      disabledReg: true,
      not: 'not',
      timer: null,
      codeText: '获取验证码',
    }
  },
  computed: {
    address() {
      const { userPhone, sms } = this;
      return {
        userPhone,
        sms
      }
    }
  },
  watch: {
    address(newObj) {
      if(newObj['userPhone'].length > 0 && newObj['sms'].length > 0) {
        this.disabledReg = false;
        this.not = ''
      } else {
        this.disabledReg = true;
        this.not = 'not'
      }
    },
  },
  methods: {
    getSmsCode () {
      Toast.allowMultiple();
      const toast1 = Toast.loading({
        mask: true,
        message: '发送中',
        duration: 0,
      });
      this.disabled = true;
      this.$store.dispatch('SendSms', {
        appType: 'carloan',
        userPhone: this.userPhone,
        smsType: '10001'
      }).then(res => {
        if (res.code === '0') {
          Toast(res.msg);
          this.disabled = false
        } else {
          Toast('发送验证码成功');
          this.tick(60)
        }
        toast1.clear();
      });
    },
    tick (times) {
      this.timer && clearTimeout(this.timer);
      this.codeText = `重新获取(${times})`;
      this.timer = setTimeout(() => {
        if (times > 0) {
          times--;
          this.codeText = `重新获取(${times})`;
          this.tick(times)
        } else {
          this.disabled = false;
          this.codeText = '发送验证码';
          clearTimeout(this.timer)
        }
      }, 1000)
    },
    getUserInfo() {
      Toast.allowMultiple();
      const toast2 = Toast.loading({
        mask: true,
        message: '注册中',
        duration: 0,
      });
      this.$store.dispatch('getUserInfo', {}).then(res => {
        if (res.code === '0') {
          Toast(res.msg);
        } else if (res.code === '1') {
          Toast('注册成功');
          this.$router.push({
            name: 'home'
          })
        }
        toast2.clear()
      })
    },
    registerUser() {
      let arr = [{
        strategy: /\S+/,
        warnMsg: '手机号码不能为空',
        val: this.userPhone
      } ,{
        strategy: /^[1][0-9][0-9]{9}$/,
        warnMsg: '请输入正确的手机号',
        val: this.userPhone
      }];
      for(let i = 0; i < arr.length; i++) {
        if(!arr[i].strategy.test(arr[i].val)) {
          Toast(arr[i].warnMsg);
          return false;
        }
      }
      Toast.allowMultiple();
      const toast1 = Toast.loading({
        mask: true,
        message: '注册中',
        duration: 0,
      });
      this.$store.dispatch('Register', {
        userPhone: this.userPhone,
        regSource: 'APP',
        smsCode: this.sms,
        smsType: '10001',
      }).then(res => {
        if (res.code === '0') {
          Toast(res.msg);
        } else {
          this.getUserInfo();
        }
        toast1.clear();
      })
    },
  },
  destroyed () {
    this.timer = null
  }
}
</script>

<style lang="less" scoped>
  .register {
    .not {
      background-color: rgba(50, 50, 51, 0.88);
      border: 0.02667rem solid rgba(50, 50, 51, 0.88);
    }
  }
</style>