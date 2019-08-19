export const asyncRouterMap = [
  {
    path: '/enquiry',
    name: 'enquiry',
    meta: {
      title: '询价',
      routerGuard: true,
      roles: ['Customer', 'RiskManagement'],
    },
    component: () => import('@/views/enquiry/Enquiry.vue'),
  },
  {
    path: '/submitOrder',
    name: 'submitOrder',
    meta: {
      title: '提单',
      routerGuard: true,
      roles: ['Customer'],
    },
    component: () => import('@/views/submitOrder/SubmitOrder.vue'),
  },
  {
    path: '/order',
    name: 'order',
    meta: {
      title: '我的订单',
      routerGuard: true,
      roles: ['Customer', 'RiskManagement'],
    },
    component: () => import('@/views/order/Order.vue'),
  },
  {
    path: '/details',
    name: 'details',
    meta: {
      title: '订单详情',
      routerGuard: true,
      roles: ['Customer', 'RiskManagement'],
    },
    component: () => import('@/views/details/Details.vue'),
  },
  {
    path: '/message',
    name: 'message',
    meta: {
      title: '消息中心',
      routerGuard: true,
      roles: ['Customer', 'RiskManagement'],
    },
    component: () => import('@/views/msg/Message.vue'),
  },
  {
    path: '/result',
    name: 'result',
    meta: {
      title: '结束结果',
      routerGuard: true,
      roles: ['Customer', 'RiskManagement'],
    },
    component: () => import('@/views/result/Result.vue'),
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      title: '404',
      roles: ['Customer', 'RiskManagement'],
    },
    component: () => import('@/views/404.vue'),
  },
];