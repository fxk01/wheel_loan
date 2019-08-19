<template>
  <div class="messageCenter">
    <MsgCom :arrData="tabArr"/>
  </div>
</template>

<script>
  /**
   * @Description:
   * @author 李凯明
   * @date 2019/6/28
  */

  import { getToken } from '@/util/auth'
  import MsgCom from '@/components/messageCenter/MessageCenter.vue'

  export default {
    name: 'MessageCenter',
    components: {
      MsgCom,
    },
    data() {
      return {
        tabArr: [{
          title: '已估价',
          id: '20001'
        }, {
          title: '已验车',
          id: '20002'
        }]
      };
    },
  }
</script>

<style lang="less" scoped>
  .messageCenter {

  }
</style>