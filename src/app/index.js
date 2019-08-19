import Vue from 'vue'
import { Lazyload } from 'vant'

Vue.use(Lazyload, {});
import './storage'
// 主题 初始化样式
import '@/assets/theme/styles/index.less'
// 自定义指令
import '@/directives/index'
// // mock
// import '@/_mock/index'
import './permission'
