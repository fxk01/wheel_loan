<template>
  <div class="messageCenter">
    <MsgCom :arrData="tabArr"/>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/7/24
  */

  import { getToken } from '@/util/auth'
  import MsgCom from '@/components/messageCenter/MessageCenter.vue'

  export default {
    name: 'Message',
    components: {
      MsgCom,
    },
    data () {
      return {
        tabArr: [{
          title: '已估价'
        }, {
          title: '已验车'
        }]
      }
    },
    mounted() {
      if(getToken('rights_desc') === 'RiskManagement') {
        this.tabArr[0].title = '询价中'
      }
    }
  }
</script>

<style lang="less" scoped>
  .messageCenter{
    /*/deep/ .van-pull-refresh__track{*/
      /*min-height: calc(100vh - 64px)*/
    /*}*/
  }
</style>