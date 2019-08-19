import Passport from '@/views/passport/Passport.vue'

export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '乾轮车贷',
      keepAlive: true,
    },
    component: () => import('@/views/home/Home.vue'),
  },
  {
    path: '/passport',
    name: 'passport',
    component: Passport,
    redirect: '/passport/login',
    meta: {
      title: '登录',
    },
    children: [
      {
        path: 'login',
        name: '/passport/login',
        component: () => import('@/views/passport/login/Login.vue'),
        meta: {
          title: '登录',
        },
      },
      {
        path: 'register',
        name: '/passport/register',
        component: () => import('@/views/passport/register/Register.vue'),
        meta: {
          title: '注册',
        },
      },
    ],
  },
  {
    path: '/company',
    name: 'company',
    meta: {
      title: '公司介绍',
    },
    component: () => import('@/views/about/company/Company.vue'),
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      title: '产品介绍',
    },
    component: () => import('@/views/about/product/Product.vue'),
  },
];