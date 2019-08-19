import Vue from 'vue'
import Storage from 'vue-ls'
import * as _ from 'loadsh'

Vue.use(_.clone(Storage), {
  namespace: 'ql_', //storage 前缀
  name: 'ls', //注入VUE 中的别名 ，this.$ls
  storage: 'local',
});

Vue.use(_.clone(Storage), {
  namespace: 'ql_ss_', //storage 前缀
  name: 'ss', //注入VUE 中的别名 ，this.$ss
  storage: 'session',
});